<script setup lang="ts">
import { categories_colors, getCategoryColor } from "~/lib/constants";
import { getDisplayName } from "~/lib/display-names";
import Giscus from "@giscus/vue";

const route = useRoute();
const { slug } = route.params;
// Get article data
const { data: articleData } = await useAsyncData(`blog/${slug}`, () =>
  queryContent(`blog/${slug}`).findOne()
);
// Set meta tags if we have article data
useSeoMeta({
  title: articleData.value?.title,
  ogTitle: articleData.value?.title,
  description: articleData.value?.description,
  ogDescription: articleData.value?.description,
  ogType: "article",
  ogUrl: `https://tere.ro/${articleData.value?.categories[0]}/${slug}`,
});

// Add article schema
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: articleData.value?.title,
  description: articleData.value?.description,
  image: articleData.value?.image || "https://avatars.githubusercontent.com/u/3197966?v=4",
  datePublished: articleData.value?.date,
  dateModified: articleData.value?.date,
  author: {
    "@type": "Person",
    name: "Andrei Terecoasa",
    url: "https://tere.ro"
  },
  publisher: {
    "@type": "Organization",
    name: "Andrei Terecoasa",
    logo: {
      "@type": "ImageObject",
      url: "https://avatars.githubusercontent.com/u/3197966?v=4"
    }
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `https://tere.ro/${articleData.value?.categories[0]}/${slug}`
  }
};

// Add structured data to head
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(articleSchema)
    }
  ],
  meta: [
    { name: 'author', content: 'Andrei Terecoasa' },
    { property: 'article:published_time', content: articleData.value?.date },
    { property: 'article:modified_time', content: articleData.value?.date },
    { property: 'article:section', content: articleData.value?.categories[0] },
    { property: 'article:tag', content: articleData.value?.categories.join(',') },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: articleData.value?.title },
    { name: 'twitter:description', content: articleData.value?.description },
    { name: 'twitter:image', content: articleData.value?.image || "https://avatars.githubusercontent.com/u/3197966?v=4" }
  ]
});

defineOgImageComponent("OgImage", {
  headline: "Andrei Terecoasa",
  title: articleData.value?.title,
  description: articleData.value?.description,
  theme: "#ff0000",
  colorMode: "dark",
});
</script>

<template>
  <div itemscope itemtype="https://schema.org/BlogPosting">
    <Menu :centered="true" />
    <div class="mx-auto max-w-4xl space-y-6">
      <header class="mb-8 flex flex-col space-y-4 border-b-[1px] border-solid border-gray-300 pb-4">
        <div class="text-center space-y-4">
          <h1 class="text-4xl font-bold" itemprop="headline">{{ articleData?.title }}</h1>
          <p class="text-muted-foreground text-sm max-w-2xl mx-auto" itemprop="description">{{ articleData?.description
            }}</p>
        </div>
        <div class="flex flex-wrap gap-2 items-center justify-center">
          <NuxtLink v-for="cat in articleData?.categories" :key="cat" :to="`/${cat}`" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all
                   dark:bg-slate-800/50 dark:hover:bg-slate-700/50 dark:border-slate-700/50 dark:hover:border-slate-600/50 dark:text-gray-300 dark:hover:text-gray-200
                   bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-slate-300 text-slate-800">
            <span class="w-2 h-2 rounded-full"
              :style="`background: ${getCategoryColor(cat) || categories_colors.random}`"></span>
            {{ getDisplayName(cat) }}
          </NuxtLink>
        </div>
        <div class="flex items-center justify-center">
          <time :datetime="articleData?.date"
            class="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-medium flex items-center gap-1.5"
            itemprop="datePublished">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {{ $dayjs(articleData?.date).format("MMMM D, YYYY") }}
          </time>
        </div>
      </header>
      <div class="prose" itemprop="articleBody">
        <ContentRenderer :value="articleData" />
      </div>
      <div itemprop="author" itemscope itemtype="https://schema.org/Person">
        <meta itemprop="name" content="Andrei Terecoasa" />
        <meta itemprop="url" content="https://tere.ro" />
      </div>
      <Giscus id="comments" repo="andreitere/tere.ro" repoId="R_kgDOLF-PkA" category="Announcements"
        categoryId="DIC_kwDOLF-PkM4CeBWs" mapping="url" reactionsEnabled="1" emitMetadata="0" inputPosition="top"
        theme="preferred_color_scheme" lang="en" loading="lazy" />
    </div>
  </div>
</template>

<style scoped></style>
