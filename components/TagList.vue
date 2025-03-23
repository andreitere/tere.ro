<script setup lang="ts">
defineProps<{
  tags?: string[];
  size?: 'sm' | 'md';
}>();
</script>

<template>
  <div v-if="tags?.length" class="flex flex-wrap gap-2">
    <NuxtLink
      v-for="tag in tags"
      :key="tag"
      :to="`/tags/${tag}`"
      class="inline-flex items-center gap-1.5 transition-all"
      :class="{
        'px-2 py-1 text-xs': size === 'sm',
        'px-3 py-1.5 text-sm': size === 'md' || !size,
      }"
    >
      <span 
        class="rounded-md bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 px-2 py-1 text-gray-300 hover:text-gray-200"
      >
        #{{ tag }}
      </span>
    </NuxtLink>
  </div>
</template> 