<script setup lang="ts">
import type { ProjectCollectionItem } from '~/types/content'
import Menu from '~/components/Menu.vue'
import ExternalLink from "~icons/mingcute/external-link-line"
import GithubIcon from "~icons/mdi/github"

const { data } = await useAsyncData<ProjectCollectionItem[]>('projects', () => 
  queryCollection<'projects'>('projects')
    .order('date', 'DESC')
    .all()
)

useHead({
  title: 'Projects | Andrei Terecoasa',
  meta: [
    {
      name: 'description',
      content: 'A collection of my personal and professional projects',
    },
  ],
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <Menu centered />
    <h1 class="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">Projects</h1>
    
    <div class="grid gap-8 md:grid-cols-2">
      <article
        v-for="project in data || []"
        :key="project.path"
        class="group relative bg-gradient-to-br from-card to-card/80 rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-border/50"
      >
        <!-- Base gradient always visible -->
        <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-40"></div>
        <div class="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-30"></div>
        
        <!-- Additional hover gradients -->
        <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
        <div class="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-all duration-500 delay-100"></div>
        
        <NuxtLink
          :to="project.external ? project.externalUrl : project.path"
          :target="project.external ? '_blank' : '_self'"
          class="block h-full relative z-10"
        >
          <div class="p-8">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-semibold group-hover:text-primary transition-colors">{{ project.title }}</h2>
              <div class="flex items-center text-sm text-muted-foreground/80">
                <span>{{ new Date(project.date).getFullYear() }}</span>
                <span v-if="project.endDate" class="mx-2">-</span>
                <span v-if="project.endDate">{{ new Date(project.endDate).getFullYear() }}</span>
                <span v-else-if="project.active" class="ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">Active</span>
              </div>
            </div>
            
            <p class="text-muted-foreground/70 mb-6 text-sm leading-relaxed">{{ project.description }}</p>
            
            <div class="flex flex-wrap gap-4 mb-6">
              <a v-if="project.externalUrl" 
                 :href="project.externalUrl" 
                 target="_blank"
                 class="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Visit Project <ExternalLink class="w-4 h-4" />
              </a>
              <a v-if="project.githubUrl" 
                 :href="project.githubUrl" 
                 target="_blank"
                 class="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                View Code <GithubIcon class="w-4 h-4" />
              </a>
            </div>
            
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-2 py-1 bg-primary/5 text-primary/90 rounded-md text-xs font-medium border border-primary/10 hover:bg-primary/10 hover:border-primary/20 transition-colors"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>
  </div>
</template>

<style scoped>
.group {
  box-shadow: 0 4px 12px -6px theme('colors.primary.DEFAULT / 5%');
}

.group:hover {
  box-shadow: 0 0 30px -10px theme('colors.primary.DEFAULT / 15%');
}
</style> 