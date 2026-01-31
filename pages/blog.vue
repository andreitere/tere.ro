<script setup lang="ts">
import { getCategoryColor } from "~/lib/constants";
import CalendarIcon from "~icons/material-symbols/calendar-today-outline";
import ArrowRight from "~icons/material-symbols/arrow-right-alt";

const formatDate = (date: string) => {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(d);
};

const data = await queryCollection("blog")
  .where("draft", "=", false)
  .where("category", "<>", "travel")
  .order("date", "DESC")
  .all();

useArticleMeta();

const getArticlePath = (article: BlogCollectionItem): string => {
  return "/" + [article.category, article.path?.split("/").at(-1)].join("/");
};
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <Menu centered />
    
    <!-- Header with retro styling -->
    <header class="text-center my-12 space-y-4 animate-fade-in">
      <span class="font-mono text-xs tracking-widest text-primary uppercase">// Archive</span>
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight">Blog</h1>
      <p class="font-mono text-sm text-muted-foreground max-w-md mx-auto">
        Debugging stories, config recipes, and things I learned the hard way
      </p>
    </header>

    <!-- Articles Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
      <article 
        v-for="(article, index) in data" 
        :key="article.path"
        class="group relative animate-fade-in"
        :style="{ animationDelay: `${0.1 + index * 0.05}s` }"
      >
        <NuxtLink 
          :to="getArticlePath(article)" 
          class="block h-full"
        >
          <!-- Card -->
          <div class="relative h-full p-6 rounded-xl bg-card border border-border overflow-hidden transition-all duration-300 hover:border-primary/30 glow-hover">
            <!-- Category indicator line -->
            <div 
              class="absolute top-0 left-0 w-full h-1 transition-all duration-300"
              :style="{ backgroundColor: getCategoryColor(article.category) }"
            ></div>
            
            <!-- Hover gradient -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <!-- Content -->
            <div class="relative flex flex-col h-full">
              <!-- Meta row -->
              <div class="flex items-center justify-between mb-4">
                <span 
                  class="font-mono text-[10px] tracking-wider uppercase px-2 py-1 rounded-md"
                  :style="{ 
                    backgroundColor: `${getCategoryColor(article.category)}20`,
                    color: getCategoryColor(article.category)
                  }"
                >
                  {{ article.category }}
                </span>
                <time 
                  :datetime="article.date"
                  class="font-mono text-xs text-muted-foreground flex items-center gap-1.5"
                >
                  <CalendarIcon class="w-3.5 h-3.5" />
                  {{ formatDate(article.date) }}
                </time>
              </div>
              
              <!-- Title -->
              <h2 class="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                {{ article.title }}
              </h2>
              
              <!-- Description -->
              <p class="font-mono text-sm text-muted-foreground flex-grow line-clamp-3 mb-4">
                {{ article.description }}
              </p>
              
              <!-- Read more -->
              <div class="flex items-center gap-2 font-mono text-xs text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <span>Read article</span>
                <ArrowRight class="w-4 h-4" />
              </div>
            </div>
            
            <!-- Corner accent -->
            <div class="absolute bottom-0 right-0 w-16 h-16 overflow-hidden opacity-10 group-hover:opacity-20 transition-opacity">
              <div 
                class="absolute bottom-0 right-0 w-32 h-32 -translate-x-1/2 translate-y-1/2 rounded-full"
                :style="{ backgroundColor: getCategoryColor(article.category) }"
              ></div>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>

    <!-- Empty state -->
    <div v-if="!data?.length" class="text-center py-20">
      <p class="font-mono text-muted-foreground">No articles found.</p>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
