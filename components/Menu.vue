<script setup lang="ts">
import MaterialSymbolsHomeRounded from "~icons/material-symbols/home-rounded"
</script>

<template>
  <div class="flex items-center space-x-4 mb-6 flex-wrap text-muted-foreground">
    <div class="flex items-center">
      <div>
        <NuxtLink to="/" class="text-sm font-semibold leading-none">Home</NuxtLink>
      </div>
    </div>
    <div class="flex items-center">
      <div>
        <NuxtLink to="/blog" class="text-sm font-semibold leading-none">Blog</NuxtLink>
      </div>
    </div>
    <div class="flex items-center">
      <div>
        <a href="/#work" class="text-sm font-semibold leading-none">Experience</a>
      </div>
    </div>
    <div class="flex items-center">
      <div>
        <a href="/#education" class="text-sm font-semibold leading-none">Education</a>
      </div>
    </div>
    <div class="flex items-center">
      <div>
        <a href="/#skills" class="text-sm font-semibold leading-none">Skills</a>
      </div>
    </div>
    <div class="flex items-center">
      <div>
        <a href="/#projects" class="text-sm font-semibold leading-none">Projects</a>
      </div>
    </div>
     <div class="flex items-center">
      <div>
        <a href="/#references" class="text-sm font-semibold leading-none">References</a>
      </div>
    </div>
    <div class="flex items-center">
      <div>
        <NuxtLink to="/trips" class="text-sm font-semibold leading-none">Trips</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style>
.router-link-exact-active {
  @apply font-bold text-black;
}
</style>