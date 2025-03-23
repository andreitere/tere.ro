<script setup lang="ts">
import { categories_colors, getCategoryColor } from "~/lib/constants";
import { getDisplayName } from "~/lib/display-names";
import Giscus from "@giscus/vue";
import TagList from "~/components/TagList.vue";
import type { BlogCollectionItem } from "~/types/content";

const route = useRoute();
const { slug, category } = route.params;
// Get article data
const { data: articleData } = await useAsyncData(`blog/${slug}`, () =>
  queryCollection(`blog`).where("path", "=", `/blog/${slug}`).first()
);

// Get next and previous articles
const { data: allArticles } = await useAsyncData('all-articles', () =>
  queryCollection('blog')
    .where("draft", "=", false)
    .order("date", "DESC")
    .all()
);

// Find current article index
const currentIndex = allArticles.value?.findIndex(article => article.path === `/blog/${slug}`) || -1;
const prevArticle = currentIndex > 0 ? allArticles.value?.[currentIndex - 1] : null;
const nextArticle = currentIndex < (allArticles.value?.length || 0) - 1 ? allArticles.value?.[currentIndex + 1] : null;

// Get related articles from same category (latest 2)
const { data: relatedArticles } = await useAsyncData('related-articles', () =>
  queryCollection('blog')
    .where("draft", "=", false)
    .where("category", "=", articleData.value?.category)
    .where("path", "<>", `/blog/${slug}`)
    .order("date", "DESC")
    .limit(2)
    .all()
);

// Helper function to get article URL
const getArticleUrl = (article) => {
  const slug = article.path?.split("/").at(-1);
  return `/${article.category}/${slug}`;
};

// Set meta tags if we have article data
useSeoMeta({
  title: articleData.value?.title,
  ogTitle: articleData.value?.title,
  description: articleData.value?.description,
  ogDescription: articleData.value?.description,
  ogType: "article",
  ogUrl: `https://tere.ro/${articleData.value?.category}/${slug}`,
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
    "@id": `https://tere.ro/${articleData.value?.category}/${slug}`
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
    { property: 'article:section', content: articleData.value?.category },
    { property: 'article:tag', content: articleData.value?.category },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: articleData.value?.title },
    { name: 'twitter:description', content: articleData.value?.description },
    { name: 'twitter:image', content: articleData.value?.image || "https://avatars.githubusercontent.com/u/3197966?v=4" }
  ]
});

defineOgImageComponent("tere", {
  headline: "Andrei Terecoasa",
  title: articleData.value?.title,
  description: articleData.value?.description,
  theme: "#E67B2E",
  colorMode: "dark",
});

// Add this near the top of your script setup
// After fetching the article data
useArticleMeta('blog', articleData.value as BlogCollectionItem);
</script>

<template>
  <div itemscope itemtype="https://schema.org/BlogPosting">
    <Menu :centered="true" />
    <div class="mx-auto max-w-4xl space-y-6">
      <header :class="[
        'mb-8 flex flex-col space-y-4 pb-4 relative',
        articleData?.tags?.includes('tips') ? 'border-0' : 'border-b-[1px] border-solid border-gray-300'
      ]">
        <div v-if="articleData?.tags?.includes('tips')" class="absolute  left-0 right-0 flex justify-center">
          <div class="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 
            text-white dark:text-amber-50 text-sm font-medium rounded-full shadow-md flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Tip
          </div>
        </div>
        <div :class="[
          'text-center space-y-4 rounded-xl',
          articleData?.tags?.includes('tips') ? 'bg-gradient-to-br from-amber-50/80 via-amber-50/40 to-white dark:from-amber-900/30 dark:via-amber-900/10 dark:to-gray-900 p-8 border border-amber-200 dark:border-amber-800 mt-4' : ''
        ]">
          <h1 class="text-4xl font-bold" itemprop="headline">{{ articleData?.title }}</h1>
          <p class="text-muted-foreground text-sm max-w-2xl mx-auto" itemprop="description">{{ articleData?.description
            }}</p>
        </div>
        <div class="flex flex-wrap gap-2 items-center justify-center">
          <NuxtLink :to="`/${articleData?.category}`" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all
                   dark:bg-slate-800/50 dark:hover:bg-slate-700/50 dark:border-slate-700/50 dark:hover:border-slate-600/50 dark:text-gray-300 dark:hover:text-gray-200
                   bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-slate-300 text-slate-800">
            <span class="w-2 h-2 rounded-full"
              :style="`background: ${getCategoryColor(articleData?.category) || categories_colors.random}`"></span>
            {{ getDisplayName(articleData?.category) }}
          </NuxtLink>
        </div>
        <!-- <TagList :tags="articleData?.tags" size="md" class="justify-center" /> -->
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

      <!-- Navigation -->
      <nav class="flex justify-between items-center py-8 border-t border-gray-200 dark:border-gray-800">
        <div v-if="prevArticle" class="flex-1">
          <NuxtLink :to="getArticleUrl(prevArticle)" class="group flex flex-col gap-1">
            <span class="text-sm text-gray-500 dark:text-gray-400">Previous</span>
            <span class="font-medium group-hover:text-primary transition-colors">{{ prevArticle.title }}</span>
          </NuxtLink>
        </div>
        <div v-if="nextArticle" class="flex-1 text-right">
          <NuxtLink :to="getArticleUrl(nextArticle)" class="group flex flex-col gap-1">
            <span class="text-sm text-gray-500 dark:text-gray-400">Next</span>
            <span class="font-medium group-hover:text-primary transition-colors">{{ nextArticle.title }}</span>
          </NuxtLink>
        </div>
      </nav>

      <!-- Related Articles -->
      <div v-if="relatedArticles?.length" class="py-8 border-t border-gray-200 dark:border-gray-800">
        <h2 class="text-xl font-bold mb-6">More from {{ getDisplayName(articleData?.category) }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NuxtLink v-for="article in relatedArticles" :key="article.path" :to="getArticleUrl(article)"
            class="group p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-colors flex flex-col h-full">
            <div class="flex-grow">
              <h3 class="font-medium mb-2 group-hover:text-primary transition-colors">{{ article.title }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{{ article.description }}</p>
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-4">
              {{ $dayjs(article.date).format("MMMM D, YYYY") }}
            </div>
          </NuxtLink>
        </div>
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
