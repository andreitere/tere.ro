# Plex GPU Transcoding with Nvidia in Docker on Arch Linux

## Overview

This guide documents the correct configuration for enabling Nvidia GPU hardware transcoding in Plex Media Server running in Docker on an Arch-based Linux system.

## Prerequisites

- Arch Linux (or Arch-based distribution)
- Nvidia GPU with hardware encoding support
- Nvidia proprietary drivers installed
- Docker and Docker Compose
- Nvidia Container Toolkit

## System Setup

### 1. Install Required Packages

```bash
# Install Nvidia drivers (if not already installed)
sudo pacman -S nvidia nvidia-utils

# Install Nvidia Container Toolkit
sudo pacman -S nvidia-container-toolkit
```

### 2. Configure Docker for Nvidia Runtime

Create or edit `/etc/docker/daemon.json`:

```json
{
    "runtimes": {
        "nvidia": {
            "args": [],
            "path": "nvidia-container-runtime"
        }
    }
}
```

Restart Docker to apply changes:

```bash
sudo systemctl restart docker
```

### 3. Verify Nvidia Setup

Check that the Nvidia runtime is available:

```bash
docker info | grep -i runtime
```

Expected output should include `nvidia` in the runtimes list:
```
Runtimes: nvidia runc io.containerd.runc.v2
```

Verify GPU is accessible:

```bash
nvidia-smi
```

## Docker Compose Configuration

### Correct Plex Service Configuration

Here's the correct configuration for Plex with GPU transcoding enabled:

```yaml
plex:
  image: lscr.io/linuxserver/plex:latest
  container_name: plex
  restart: unless-stopped
  networks:
    - media_stack_network
  ports:
    - "32400:32400/tcp"
    - "3005:3005/tcp"
    - "8324:8324/tcp"
    - "32469:32469/tcp"
    - "1900:1900/udp"
    - "32410:32410/udp"
    - "32412:32412/udp"
    - "32413:32413/udp"
    - "32414:32414/udp"
  volumes:
    - plex:/config
    - /path/to/media:/media
    - plex-transcode:/transcode
  environment:
    - TZ=Europe/Bucharest
    - PUID=0
    - PGID=0
    - VERSION=docker
    - NVIDIA_VISIBLE_DEVICES=all
    - NVIDIA_DRIVER_CAPABILITIES=video,compute,utility
  labels:
    - "com.centurylinklabs.watchtower.enable=true"
  deploy:
    resources:
      reservations:
        devices:
          - driver: nvidia
            count: all
            capabilities: [video,compute,utility]
```

### Key Configuration Elements

#### Environment Variables

- `NVIDIA_VISIBLE_DEVICES=all` - Makes all GPUs visible to the container
- `NVIDIA_DRIVER_CAPABILITIES=video,compute,utility` - Specifies required GPU capabilities

#### GPU Device Passthrough (Deploy Resources)

```yaml
deploy:
  resources:
    reservations:
      devices:
        - driver: nvidia
          count: all
          capabilities: [video,compute,utility]
```

This is the **modern, recommended method** for GPU passthrough in Docker Compose. It:
- Uses the Nvidia Container Runtime
- Automatically mounts Nvidia libraries into the container
- Exposes GPU devices at `/dev/nvidia*`
- Enables video encoding/decoding capabilities

### Alternative Methods (Not Recommended)

#### Method 1: Runtime Directive
```yaml
runtime: nvidia
```
This works but is considered legacy.

#### Method 2: Manual Device Mounting
```yaml
devices:
  - /dev/nvidia0:/dev/nvidia0
  - /dev/nvidiactl:/dev/nvidiactl
  - /dev/nvidia-modeset:/dev/nvidia-modeset
  - /dev/nvidia-uvm:/dev/nvidia-uvm
  - /dev/nvidia-uvm-tools:/dev/nvidia-uvm-tools
```
This exposes devices but doesn't automatically mount Nvidia libraries.

**Important**: Do NOT use `privileged: true` as a workaround. While it exposes device files, it doesn't mount the required Nvidia libraries.

## Deployment

### Start the Container

```bash
docker compose up -d plex
```

### Verify GPU Access Inside Container

```bash
# Check Nvidia devices are present
docker exec plex ls -la /dev/nvidia*

# Check Nvidia libraries are mounted
docker exec plex bash -c "ldconfig -p | grep -i nvidia"

# Verify GPU driver is accessible
docker exec plex cat /proc/driver/nvidia/version
```

Expected output:
```
crw-rw-rw- 1 root root 195,   0 Jan 28 18:29 /dev/nvidia0
crw-rw-rw- 1 root root 195, 255 Jan 28 18:29 /dev/nvidiactl
...

libnvidia-encode.so.1 (libc6,x86-64) => /usr/lib/x86_64-linux-gnu/libnvidia-encode.so.1
...

NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  580.126.09
```

### Check Docker Container Configuration

```bash
docker inspect plex | grep -A 20 '"DeviceRequests"'
```

Should show:
```json
"DeviceRequests": [
    {
        "Driver": "nvidia",
        "Count": -1,
        "DeviceIDs": null,
        "Capabilities": [
            [
                "video",
                "compute",
                "utility"
            ]
        ],
        "Options": null
    }
]
```

## Plex Configuration

### Enable Hardware Transcoding

1. Open Plex Web UI
2. Navigate to **Settings → Transcoder**
3. Enable **"Use hardware acceleration when available"**
4. Select **"Use hardware-accelerated video encoding"**
5. Save settings

### Verify Hardware Transcoding is Working

Play a video that requires transcoding (e.g., play at a lower quality or on a device that requires transcoding).

Monitor GPU usage on the host:

```bash
# Watch GPU utilization in real-time
watch -n 1 nvidia-smi

# Monitor encoder/decoder usage specifically
nvidia-smi dmon -s u
```

During transcoding, you should see:
- GPU in **P1** or **P2** performance state (not P8 idle)
- Non-zero **enc** (encoder) or **dec** (decoder) utilization
- Power usage around 30-50W (depending on workload)

## GPU Power States Explained

| State | Description | Power | Clock Speed | When |
|-------|-------------|-------|-------------|------|
| P8 | Idle | ~14W | 180-400 MHz | No transcoding activity |
| P1 | Active Video | ~32-50W | 2000-2500 MHz | Video encoding/decoding |
| P0 | Maximum Performance | 50W+ | Max clocks | Heavy compute workloads |

**Normal behavior:**
- GPU enters P1 when transcoding starts
- GPU stays in P1 for 30-60 seconds after transcoding stops
- GPU returns to P8 idle state automatically

This is optimal - the driver keeps the GPU "warm" briefly in case you resume playback, avoiding constant state transitions.

## Troubleshooting

### GPU Not Detected in Plex

**Symptoms:**
- Plex doesn't show hardware transcoding options
- CPU usage is high during transcoding
- `nvidia-smi` doesn't show Plex processes

**Solutions:**

1. Verify Nvidia Container Runtime is installed:
   ```bash
   nvidia-ctk --version
   ```

2. Check Docker daemon configuration:
   ```bash
   cat /etc/docker/daemon.json
   ```

3. Ensure `deploy.resources.reservations` section is uncommented and properly formatted

4. Restart the container:
   ```bash
   docker compose down plex && docker compose up -d plex
   ```

### GPU Devices Present but No Libraries

**Symptoms:**
- `/dev/nvidia*` devices exist in container
- `ldconfig -p | grep nvidia` returns nothing
- Plex can't initialize hardware transcoding

**Solution:**
This means the Nvidia Container Runtime isn't being used. Ensure you're using the `deploy.resources.reservations` method, not just `privileged: true` or manual device mounting.

### Permission Denied Errors

**Symptoms:**
- Container starts but GPU operations fail
- Permission errors in Plex logs

**Solution:**
Ensure the container user has access to GPU devices. The LinuxServer.io Plex image handles this automatically, but if using a different image, you may need to add the container user to the `video` group.

### GPU Stuck in High Power State

**Symptoms:**
- GPU stays in P1/P2 indefinitely
- High idle power consumption

**Possible causes:**
- Plex generating video preview thumbnails (check library settings)
- Hardware tone mapping enabled
- Active background tasks

**Solutions:**
1. Wait 1-2 minutes after stopping playback - this is normal behavior
2. Check Plex scheduled tasks: Settings → Scheduled Tasks
3. Disable thumbnail generation if not needed: Settings → Library → "Generate video preview thumbnails"

## Performance Monitoring

### Real-time GPU Monitoring

```bash
# Basic monitoring
nvidia-smi

# Continuous monitoring (updates every 2 seconds)
watch -n 2 nvidia-smi

# Detailed utilization monitoring
nvidia-smi dmon

# Process monitoring
nvidia-smi pmon

# Encoder/Decoder specific monitoring
nvidia-smi dmon -s u
```

### Checking Active Transcoding Sessions

In Plex Web UI:
1. Go to Settings → Status → Dashboard
2. Active transcoding sessions will show "(hw)" indicator for hardware transcoding

## Common Issues and Solutions

### Issue: "NVIDIA_VISIBLE_DEVICES set but GPU not accessible"

This indicates the Nvidia Container Runtime isn't properly configured.

**Solution:**
```bash
# Reconfigure Docker for Nvidia runtime
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
docker compose restart plex
```

### Issue: Container fails to start with GPU error

**Error message:** `could not select device driver "nvidia" with capabilities: [[gpu]]`

**Solution:**
Change `capabilities: [gpu]` to `capabilities: [video,compute,utility]` in the deploy section.

### Issue: Transcoding works but uses CPU instead of GPU

**Solution:**
1. Verify hardware transcoding is enabled in Plex settings
2. Some codecs/containers don't support hardware transcoding
3. Check Plex logs for hardware transcoding errors: `/config/Library/Application Support/Plex Media Server/Logs/`

## Best Practices

1. **Use the deploy.resources.reservations method** - It's the modern, recommended approach
2. **Don't use privileged mode** - It's unnecessary and a security risk
3. **Specify exact capabilities needed** - Use `[video,compute,utility]` instead of `[gpu]`
4. **Monitor GPU usage during testing** - Verify hardware transcoding is actually being used
5. **Keep Nvidia drivers updated** - Newer drivers often have better transcoding performance
6. **Use a dedicated transcode directory** - Map it to fast storage (SSD/NVMe) or tmpfs

## Additional Resources

- [Plex Hardware Transcoding Documentation](https://support.plex.tv/articles/115002178853-using-hardware-accelerated-streaming/)
- [Nvidia Container Toolkit Documentation](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/index.html)
- [LinuxServer.io Plex Image Documentation](https://docs.linuxserver.io/images/docker-plex)
- [Docker Compose GPU Support](https://docs.docker.com/compose/gpu-support/)

## Conclusion

Hardware transcoding with Nvidia GPUs in Docker requires:
1. Nvidia Container Toolkit installed and configured
2. Proper `deploy.resources.reservations` configuration in docker-compose.yml
3. Correct environment variables (`NVIDIA_VISIBLE_DEVICES`, `NVIDIA_DRIVER_CAPABILITIES`)
4. Hardware transcoding enabled in Plex settings

Once configured correctly, you should see:
- GPU utilization during transcoding
- "(hw)" indicator in Plex dashboard
- Significantly reduced CPU usage during transcoding
- GPU power states transitioning between P8 (idle) and P1 (active)

The configuration described in this guide provides optimal performance and follows current best practices for GPU passthrough in containerized environments.
