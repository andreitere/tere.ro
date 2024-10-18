<script setup lang="ts">
import { categories_colors } from "~/lib/constants";
import { formatDate } from "~/lib/utils.js"
const route = useRoute();

const category = route.params.category;

const article_filter = {
  draft: false,
};


const getCategoryColor = (category) => {
  if (categories_colors.hasOwnProperty(category.toLowerCase())) {
    return categories_colors[category.toLowerCase()];
  } else {
    return categories_colors.random;
  }
};


const root_path = category != "blog" ? category : "blog";

const articles = await queryContent("/blog")
  .where(article_filter)
  .sort({ created_at: -1 })
  .find();

</script>

<template>
  <div v-for="article in articles" :key="article._path">
    <div class="flex flex-col space-y-4 rounded-lg p-5 bg-card text-card-foreground border-[1px] border-muted">
      <NuxtLink :to="article._path">
        <h1 class="leading-normal text-pretty text-2xl">
          {{ article.title }}
        </h1>
      </NuxtLink>
      <p class="text-foreground">{{ article.description }}</p>
      <div class="flex space-x-4 text-sm">
        <div class="flex items-center space-x-2">
          <i-material-symbols:edit-calendar-sharp /><span>{{ formatDate(article.created_at) }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <i-material-symbols:folder-open-rounded /><span>{{ (article.categories || []).join(', ') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
