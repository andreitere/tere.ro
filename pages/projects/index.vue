<script setup lang="ts">
import type { ProjectCollectionItem } from '~/types/content'
import ExternalLink from "~icons/mingcute/external-link-line"
import GithubIcon from "~icons/mdi/github"
import DotFilled from "~icons/ph/dot-fill"

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

// Add breadcrumbs for SEO - shows "Home > Projects" in Google
useBreadcrumbsForProjects();
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <Menu centered />
    
    <!-- Header -->
    <header class="text-center my-12 space-y-4 animate-fade-in">
      <span class="font-mono text-xs tracking-widest text-primary uppercase">// Portfolio</span>
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight">Projects</h1>
      <p class="font-mono text-sm text-muted-foreground max-w-md mx-auto">
        Shipped code, weekend experiments, and ideas that escaped my head
      </p>
    </header>
    
    <!-- Projects Grid -->
    <div class="grid gap-6 md:grid-cols-2 stagger-children">
      <article
        v-for="(project, index) in data || []"
        :key="project.path"
        class="group relative animate-fade-in"
        :style="{ animationDelay: `${0.1 + index * 0.08}s` }"
      >
        <NuxtLink
          :to="project.external ? project.externalUrl : project.path"
          :target="project.external ? '_blank' : '_self'"
          class="block h-full"
        >
          <div class="relative h-full p-6 rounded-xl bg-card border border-border overflow-hidden transition-all duration-300 hover:border-primary/30 glow-hover">
            <!-- Decorative corner -->
            <div class="absolute top-0 right-0 w-20 h-20 overflow-hidden">
              <div class="absolute top-0 right-0 w-40 h-40 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <!-- Content -->
            <div class="relative space-y-4">
              <!-- Header -->
              <div class="flex items-start justify-between gap-4">
                <div class="space-y-1">
                  <h2 class="text-xl font-semibold group-hover:text-primary transition-colors duration-200 flex items-center gap-2">
                    {{ project.title }}
                    <DotFilled 
                      v-if="project.active" 
                      class="w-4 h-4 text-green-500 animate-pulse" 
                      title="Active project"
                    />
                  </h2>
                  <div class="font-mono text-xs text-muted-foreground">
                    <span>{{ new Date(project.date).getFullYear() }}</span>
                    <template v-if="project.endDate">
                      <span class="mx-1">→</span>
                      <span>{{ new Date(project.endDate).getFullYear() }}</span>
                    </template>
                    <template v-else-if="project.active">
                      <span class="mx-1">→</span>
                      <span class="text-primary">Present</span>
                    </template>
                  </div>
                </div>
              </div>
              
              <!-- Description -->
              <p class="font-mono text-sm text-muted-foreground leading-relaxed">
                {{ project.description }}
              </p>
              
              <!-- Links -->
              <div class="flex flex-wrap gap-3 pt-2">
                <a 
                  v-if="project.externalUrl" 
                  :href="project.externalUrl" 
                  target="_blank"
                  @click.stop
                  class="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-md bg-muted/50 hover:bg-muted"
                >
                  <span>Visit</span>
                  <ExternalLink class="w-3.5 h-3.5" />
                </a>
                <a 
                  v-if="project.githubUrl" 
                  :href="project.githubUrl" 
                  target="_blank"
                  @click.stop
                  class="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-md bg-muted/50 hover:bg-muted"
                >
                  <span>Code</span>
                  <GithubIcon class="w-3.5 h-3.5" />
                </a>
              </div>
              
              <!-- Tags -->
              <div class="flex flex-wrap gap-2 pt-2">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="font-mono text-[10px] tracking-wider uppercase px-2 py-1 rounded-md bg-primary/5 text-primary/80 border border-primary/10"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>

    <!-- Empty state -->
    <div v-if="!data?.length" class="text-center py-20">
      <p class="font-mono text-muted-foreground">No projects found.</p>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}
</style>
