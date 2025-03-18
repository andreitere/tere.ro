<script setup lang="ts">
import { categories_colors } from "~/lib/constants";
const route = useRoute();

const category = route.params.category;

const page_title = category.charAt(0).toUpperCase() + category.slice(1);

const article_filter = {
  draft: false,
};

if (category == "trips") {
  definePageMeta({ layout: "trips" });
}

const getCategoryColor = (category) => {
  if (categories_colors.hasOwnProperty(category.toLowerCase())) {
    return categories_colors[category.toLowerCase()];
  } else {
    return categories_colors.random;
  }
};

if (category !== "blog") {
  article_filter.categories = { $contains: [category] };
} else {
  article_filter.categories = { $not: { $contains: ["trips"] } };
}

const root_path = category != "blog" ? category : "blog";

const data = await queryContent("/blog")
  .where(article_filter)
  .sort({ date: -1 })
  .find();
const categories = data
  .reduce((acc, next) => acc.concat(next.category), [])
  .filter((v, i, s) => s.indexOf(v) == i && !!v);

const getArticlePath = (article: { categories: string[], _path: string }): string => {
  return [article.categories[0], article._path.split("/").at(-1)].join("/");
};
</script>

<template>
  <div>
    <div class="flex justify-center"><Menu /></div>
    <h1 class="my-10 text-2xl font-bold text-center">{{ page_title }}</h1>
    <div class="flex gap-2 my-2 justify-center">
      <div
        class="rounded text-sm px-1 text-white"
        :style="`background: ${getCategoryColor(category)}`"
        v-for="category in categories"
      >
        {{ category }}
      </div>
    </div>
  </div>
  <div v-for="article in data" :key="article._path">
    <div
      v-if="category == 'blog'"
      class="flex flex-col space-y-2 rounded p-3 border-[1px] border-solid border-gray-100 hover:border-gray-300 transition dark:border-gray-800"
    >
      <NuxtLink :to="getArticlePath(article)">
        <h2 class="text-lg font-semibold leading-normal text-pretty">
          {{ article.title }}
        </h2>
      </NuxtLink>
      <p class="text-xs text-muted-foreground">{{ article.description }}</p>
    </div>
    <div
      v-if="category == 'trips'"
      class="flex flex-col py-3 space-y-3 rounded ransition dark:border-gray-800"
    >
      <div
        class="max-h-[300px] object-contain overflow-hidden bg-center rounded"
      >
        <img :src="article.image" />
      </div>
      <NuxtLink :to="getArticlePath(article)">
        <h2
          class="text-xl font-semibold leading-normal text-pretty text-center"
        >
          {{ article.title }}
        </h2>
      </NuxtLink>
      <p class="text-xs text-muted-foreground text-center">
        {{ article.description }}
      </p>
      <div class="h-[1px] w-[10px] bg-black mx-auto my-10"></div>
    </div>
  </div>
</template>

<style scoped></style>
