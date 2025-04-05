<script setup lang="ts">
import ExternalLink from "~icons/mingcute/external-link-line";
import GithubIcon from "~icons/mdi/github";
import type { ProjectCollectionItem } from '~/types/content'

const route = useRoute()
const { slug } = route.params

const { data: project } = await useAsyncData<ProjectCollectionItem>(`project-${slug}`, () =>
  queryCollection<'projects'>('projects')
    .where('path', '=', `/projects/${slug}`)
    .first()
)
console.log(project.value)
// If project is external, redirect to external URL
if (project.value?.external && project.value?.externalUrl) {
  navigateTo(project.value.externalUrl, { external: true })
}

useHead({
  title: `${project.value?.title || 'Project'} | Andrei Terecoasa`,
  meta: [
    {
      name: 'description',
      content: project.value?.description || '',
    },
  ],
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <Menu centered />
    
    <article class="max-w-3xl mx-auto">
      <header class="mb-12 text-center">
        <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
          {{ project?.title }}
        </h1>
        
        <div class="flex items-center justify-center gap-4 mb-6">
          <div class="flex items-center text-sm text-muted-foreground/80">
            <span>{{ new Date(project?.date || '').getFullYear() }}</span>
            <span v-if="project?.endDate" class="mx-2">-</span>
            <span v-if="project?.endDate">{{ new Date(project?.endDate).getFullYear() }}</span>
            <span v-else-if="project?.active" class="ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">Active</span>
          </div>
        </div>
        
        <div class="flex flex-wrap gap-2 justify-center mb-6">
          <span
            v-for="tag in project?.tags"
            :key="tag"
            class="px-2 py-1 bg-primary/5 text-primary/90 rounded-md text-xs font-medium border border-primary/10"
          >
            {{ tag }}
          </span>
        </div>

        <div class="flex items-center justify-center gap-4">
          <a v-if="project?.externalUrl" 
             :href="project.externalUrl" 
             target="_blank"
             class="inline-flex items-center gap-1.5 px-6 py-2 text-sm font-medium rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white dark:hover:text-black transition-colors"
          >
            Visit Project <ExternalLink class="w-4 h-4" />
          </a>
          <a v-if="project?.githubUrl" 
             :href="project.githubUrl" 
             target="_blank"
             class="inline-flex items-center gap-1.5 px-6 py-2 text-sm font-medium rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white dark:hover:text-black transition-colors"
          >
            View Code <GithubIcon class="w-4 h-4" />
          </a>
        </div>
      </header>

      <div v-if="project" class="prose dark:prose-invert max-w-none">
        <ContentRenderer :value="project" />
      </div>
    </article>
  </div>
</template> 