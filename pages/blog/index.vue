<script setup lang="ts">
import {Switch} from "~/components/ui/switch";

const data = await queryContent('/blog').where({draft: false}).sort({date: -1}).find()

</script>

<template>
  <div class="mx-auto max-w-2xl space-y-6">
    <div>
      <Menu/>
      <h1 class="text-2xl font-bold">Blog</h1>
    </div>
    <div v-for="article in data" :key="article._path" class="flex flex-col space-y-2 rounded p-3 border-[1px] border-solid border-gray-100 hover:border-gray-300 transition dark:border-gray-800">
      <NuxtLink :to="article._path"><h2 class="text-lg font-semibold leading-normal text-pretty">{{ article.title }}</h2></NuxtLink>
      <p class="text-xs text-muted-foreground">{{ article.description }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>