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
    <pre>
<!--    {{ data }}-->
  </pre>
    <div v-for="article in data" :key="article._path" class="rounded p-3 border-[1px] border-solid dark:border-gray-800">
      <NuxtLink :to="article._path"><h2 class="text-lg font-semibold leading-normal text-pretty">{{ article.title }}</h2></NuxtLink>
      <p class="text-sm text-muted-foreground">{{ article.description }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>