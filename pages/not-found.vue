<script setup lang="ts">
import type { BlogCollectionItem } from "~/types/content";

definePageMeta({
  layout: "default",
});

// Define meta information for the 404 page
useSeoMeta({
  title: "Page Not Found | Andrei Terecoasa",
  description: "Looks like you've ventured into uncharted territory. Let's help you find your way back.",
});

// Get a list of latest blog posts for recommendations
const { data: recentPosts } = await useAsyncData('recent-404-posts', () =>
  queryCollection('blog')
    .where("draft", "=", false)
    .order("date", "DESC")
    .limit(3)
    .all()
);

// Generate article URLs
const getArticlePath = (article: BlogCollectionItem): string => {
  return "/" + [article.category, article.path?.split("/").at(-1)].join("/");
};
</script>

<template>
  <div>
    <Menu :centered="true" />
    <div class="mx-auto max-w-4xl space-y-8 py-16 text-center">
      <div class="flex justify-center">
        <div class="relative w-full h-64 mb-8">
          <!-- Animated terminal with "404 Not Found" -->
          <div class="absolute inset-0 bg-gray-900 dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700 p-4 flex flex-col">
            <div class="flex space-x-2 mb-4">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div class="flex-1 flex flex-col items-center justify-center text-left font-mono">
              <div class="typing-animation w-full">
                <span class="text-green-500">$ </span>
                <span class="text-white">find /</span>
              </div>
              <div class="mt-2 w-full overflow-hidden">
                <span class="text-red-500">Error 404: </span>
                <span class="text-white">Page not found</span>
              </div>
              <div class="mt-4 w-full">
                <span class="text-green-500">$ </span>
                <span class="text-white">help<span class="cursor">_</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1 class="text-4xl font-bold">Oops! Page Not Found</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Looks like you've ventured into uncharted territory.
        The page you're looking for seems to have gone on an adventure of its own.
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-6 mt-10">
        <NuxtLink to="/" 
          class="group px-6 py-3.5 bg-gradient-to-r from-primary to-primary/90 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Homepage
        </NuxtLink>
        
        <a href="javascript:history.back()" 
          class="group px-6 py-3.5 bg-transparent border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Go Back
        </a>
      </div>

      <div v-if="recentPosts?.length" class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <h2 class="text-2xl font-semibold mb-6">Maybe you'd like to read:</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <NuxtLink v-for="post in recentPosts" :key="post.path" :to="getArticlePath(post)"
            class="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-primary dark:hover:border-primary transition-colors">
            <h3 class="font-medium mb-2 hover:text-primary transition-colors">{{ post.title }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{{ post.description }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cursor {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}

.typing-animation {
  overflow: hidden;
  white-space: nowrap;
  animation: typing 2s steps(20, end);
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}
</style>
