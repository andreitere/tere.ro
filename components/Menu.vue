<script setup lang="ts">
defineProps<{
  centered?: boolean
}>()

const navItems = [
  { to: '/', label: 'Home', code: '00' },
  { to: '/about', label: 'About', code: '01' },
  { to: '/blog', label: 'Blog', code: '02' },
  { to: '/projects', label: 'Projects', code: '03' },
]
</script>

<template>
  <nav 
    aria-label="Main navigation"
    role="navigation"
    :class="[
      'relative py-6',
      centered ? 'text-center' : ''
    ]"
  >
    <!-- Decorative lines -->
    <div class="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-border"></div>
    
    <!-- Nav container -->
    <div :class="[
      'relative flex items-center gap-1 md:gap-2 flex-wrap bg-background px-2',
      centered ? 'justify-center w-fit mx-auto' : 'w-fit'
    ]">
      <NuxtLink 
        v-for="(item, index) in navItems" 
        :key="item.to" 
        :to="item.to" 
        :aria-label="item.label"
        class="nav-item group relative px-4 py-2 font-mono text-sm transition-all duration-300"
        :class="[
          $route.path === item.to 
            ? 'text-primary' 
            : 'text-muted-foreground hover:text-foreground'
        ]"
        :style="{ animationDelay: `${index * 0.05}s` }"
      >
        <!-- Background highlight -->
        <span 
          class="absolute inset-0 rounded-md bg-primary/5 scale-95 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
          :class="{ 'opacity-100 scale-100 bg-primary/10': $route.path === item.to }"
        ></span>
        
        <!-- Content -->
        <span class="relative flex items-center gap-2">
          <span class="text-[10px] opacity-40 group-hover:opacity-70 transition-opacity">{{ item.code }}</span>
          <span class="font-medium">{{ item.label }}</span>
        </span>

        <!-- Active indicator -->
        <span 
          v-if="$route.path === item.to"
          class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
        ></span>
      </NuxtLink>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav-item {
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 2px;
    height: 0;
    background: hsl(var(--primary));
    transition: height 0.2s ease;
  }

  &:hover::before,
  &.router-link-exact-active::before {
    height: 60%;
  }
}

.router-link-exact-active {
  font-weight: 600;
}
</style>
