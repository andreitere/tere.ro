<script setup lang="ts">
import MaterialSymbolsHomeRounded from "~icons/material-symbols/home-rounded"
</script>

<template>
  <div class="flex items-center space-x-4 mb-6">
    <div class="flex items-center">
      <MaterialSymbolsHomeRounded/>
      <div>
        <NuxtLink to="/" class="text-sm font-bold leading-none">Home</NuxtLink>
      </div>
    </div>
    <div class="flex items-center">
      <div>
        <NuxtLink to="/blog" class="text-sm font-bold leading-none">Blog</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>