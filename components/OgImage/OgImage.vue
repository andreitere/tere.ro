<script setup lang="ts">
withDefaults(defineProps<{
  title?: string,
  headline?: string,
  description?: string,
}>(), {
  title: 'title',
  description: 'title',
  headline: 'title',
})
</script>

<template>
  <div
    class="h-full w-full flex items-start justify-start border-solid border-blue-500 border-[12px] bg-black font-mono text-pretty">
    <div class="flex items-start justify-start h-full">
      <div class="flex flex-col justify-between w-full h-full text-white p-20">
        <div class="header">
          <p class="text-[26px] font-semibold">{{ headline }}</p>
          <h1 class="text-[60px] font-black mt-[20px] text-left">
            {{ title }}
          </h1>
        </div>
        <p class="text-muted-foreground italic text-[24px]">{{ description }}</p>
        <p class="text-2xl font-bold mb-0 text-green-400">
          tere.ro
        </p>
      </div>
    </div>
  </div>
</template>
