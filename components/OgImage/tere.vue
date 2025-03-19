<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string,
  headline?: string,
  description?: string,
  theme?: string,
  image?: string,
  category?: string,
}>(), {
  title: 'Untitled Article',
  description: 'No description provided',
  headline: 'Andrei Terecoasa',
  theme: '#10b981',
})

// Compute truncated description with ellipsis if needed
const truncatedDescription = computed(() => {
  if (!props.description) return '';
  return props.description.length > 100 
    ? `${props.description.slice(0, 97)}...` 
    : props.description;
});

// Determine accent color
const accentColor = computed(() => props.theme || '#10b981');
</script>

<template>
  <div
    class="h-full w-full flex items-center justify-start bg-gray-900 font-sans text-pretty relative overflow-hidden">
    <!-- Gradient background effect -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90"></div>
    
    <!-- Accent color circle -->
    <div class="absolute -right-40 -bottom-40 w-96 h-96 rounded-full opacity-20"
         :style="`background-color: ${accentColor}`"></div>
    <div class="absolute -left-20 -top-20 w-64 h-64 rounded-full opacity-10"
         :style="`background-color: ${accentColor}`"></div>
    
    <div class="flex items-start justify-start h-full w-full relative z-10">
      <div class="flex flex-col justify-between w-full h-full p-20 text-white">
        <div class="header">
          <div class="flex items-center gap-3 mb-4">
            <div v-if="category" class="px-3 py-1 rounded-full text-sm font-bold" 
                 :style="`background-color: ${accentColor}30; color: ${accentColor}`">
              {{ category }}
            </div>
            <p class="text-[26px] font-bold tracking-tight" :style="`color: ${accentColor}`">{{ headline }}</p>
          </div>
          <h1 class="text-[64px] font-black mt-[20px] text-left leading-tight tracking-tight">
            {{ title }}
          </h1>
        </div>
        <div class="flex flex-col gap-8">
          <p class="text-[26px] text-gray-300 font-light">{{ truncatedDescription }}</p>
          <div class="flex items-center gap-3">
            <div class="h-1 w-10" :style="`background-color: ${accentColor}`"></div>
            <p class="text-2xl font-black tracking-tight" :style="`color: ${accentColor}`">
              tere.ro
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
