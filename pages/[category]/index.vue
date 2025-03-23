<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";
import { categories_colors, getCategoryColor } from "~/lib/constants";
import { getDisplayName } from "~/lib/display-names";
const route = useRoute();
const category = route.params.category as string;
const page_title = category.charAt(0).toUpperCase() + category.slice(1);

const article_filter = {
  draft: false,
  category: category !== "blog"
    ? category
    : { $not: "trips" }
};

const formatDate = (date: string) => {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d);
};

const data = await queryCollection("blog")
  .where("draft", "=", false)
  .where("category", "=", category)
  .order("date", "DESC")
  .all();

const getArticlePath = (article: BlogCollectionItem): string => {
  return "/" + [article.category, article.path?.split("/").at(-1)].join("/");
};


defineOgImageComponent("tere", {
  headline: "Andrei Terecoasa",
  title: getDisplayName(category),
  theme: "#E67B2E",
  colorMode: "dark",
});

</script>

<template>
  <div>
    <div class="flex justify-center"><Menu /></div>
    <h1 class="my-10 text-2xl font-bold text-center">{{ page_title }}</h1>
  </div>
  <div class="gap-4 space-y-6">
    <div v-for="article in data" :key="article.path"
      class="group relative overflow-hidden rounded-xl shadow hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      <div class="absolute top-0 left-0 w-1 h-full transition-all duration-300 group-hover:w-4"
        :style="{ backgroundColor: getCategoryColor(article.category) }">
        <span
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 origin-center whitespace-nowrap text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {{ article.category }}
        </span>
      </div>
      <div class="p-4 border border-gray-100 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900">
        <NuxtLink :to="getArticlePath(article)" class="block space-y-5">
          <h2 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-200">
            {{ article.title }}
          </h2>
          <p class="text-sm text-muted-foreground mb-3">{{ article.description }}</p>
          <div class="flex items-center justify-end text-xs text-muted-foreground">
            <time :datetime="article.date"
              class="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {{ formatDate(article.date) }}
            </time>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
