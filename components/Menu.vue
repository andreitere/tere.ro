<script setup lang="ts">
import MaterialSymbolsHomeRounded from "~icons/material-symbols/home-rounded"

defineProps<{
  centered?: boolean
}>()
</script>

<template>
  <nav :class="[
    'flex items-center space-x-6 mb-6 flex-wrap text-muted-foreground relative',
    centered ? 'justify-center' : ''
  ]">
    <NuxtLink v-for="item in [
      { to: '/', label: 'Home' },
      { to: '/blog', label: 'Blog' },
      { to: '/#work', label: 'Experience', hash: true },
      { to: '/#education', label: 'Education', hash: true },
      { to: '/#skills', label: 'Skills', hash: true },
      { to: '/#references', label: 'References', hash: true },
      { to: '/projects', label: 'Projects' },
    ]" :key="item.to" :to="item.to" :class="[
        'relative px-1 py-1.5 text-sm font-medium transition-colors hover:text-foreground',
        'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300',
        'hover:after:scale-x-100',
        $route.path === item.to || (item.hash && $route.hash === item.to.substring(1)) ? 'text-foreground after:scale-x-100' : ''
      ]">
      {{ item.label }}
    </NuxtLink>
    <!-- <NuxtLink to="/trips" class="text-sm font-medium">Trips</NuxtLink> -->
  </nav>
</template>

<style lang="scss">
.router-link-exact-active {
  @apply font-bold text-foreground;
}

@keyframes slideDown {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}
</style>
