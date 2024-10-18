<script setup lang="ts"></script>

<template>
  <div class="flex flex-col my-6 text-muted-foreground text-lg uppercase navigation">
    <div class="nav-item">
      <NuxtLink to="/" class="leading-none">Home</NuxtLink>
    </div>

    <div class="nav-item">
      <div class="i-material-symbols:home-rounded"></div>
      <NuxtLink to="/blog" class=" leading-none">Blog</NuxtLink>
    </div>

    <div class="nav-item">
      <NuxtLink to="/work"">Experience</NuxtLink>
    </div>
    <div class="nav-item">
      <NuxtLink :to="{path: '/', hash: '#education'}">Education</NuxtLink>
    </div>
    <div class="nav-item">
      <div>
        <a href="/#skills" class=" leading-none">Skills</a>
      </div>
    </div>
    <div class="nav-item">
      <div>
        <a href="/#projects" class=" leading-none">Projects</a>
      </div>
    </div>
    <div class="nav-item">
      <div>
        <a href="/#references" class=" leading-none">References</a>
      </div>
    </div>
    <div class="nav-item">
      <div>
        <NuxtLink to="/trips" class=" leading-none">Trips</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.navigation {

  .nav-item {
    @apply rounded-lg w-full;
    font-size: 16px;
    font-weight: 500;
    padding: 10px 16px;

    &:has(.router-link-exact-active) {
      @apply text-foreground;
      font-weight: 600;
      background-color: rgb(38, 38, 38);
    }
  }
}
</style>
