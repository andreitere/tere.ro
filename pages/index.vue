<script setup lang="ts">
import MaterialSymbolsGlobe from "~icons/material-symbols/globe";
import GithubIcon from "~icons/mdi/github";
import InstagramIcon from "~icons/uim/instagram";
import FacebookIcon from "~icons/ic/baseline-facebook";
import LinkedinIcon from "~icons/ph/linkedin-logo-bold";
import ArrowRight from "~icons/material-symbols/arrow-right-alt";

const { data: { value: { meta: resume } } } = await useAsyncData("resume", () =>
  queryCollection("other").where("stem", "=", "other/resume").first()
);

useArticleMeta('resume', resume);

defineOgImageComponent("tere", {
  headline: "Andrei Terecoasa",
  title: resume?.basics.name,
  description: resume?.basics.summary,
  theme: "#E67B2E",
  colorMode: "dark",
});
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 flex-grow place-content-center py-12 md:py-20">
    <!-- Hero Section -->
    <section class="hero-section mb-16 stagger-children">
      <div class="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
        <!-- Avatar with retro frame -->
        <div class="relative group animate-fade-in">
          <div class="absolute -inset-1 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl opacity-60 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-500"></div>
          <div class="relative">
            <img 
              src="https://avatars.githubusercontent.com/u/3197966?v=4" 
              alt="Andrei Terecoasa"
              class="w-36 h-36 md:w-44 md:h-44 rounded-xl object-cover border-2 border-background relative z-10"
              itemprop="image" 
            />
            <!-- Decorative corner accents -->
            <div class="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
            <div class="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
            <div class="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
            <div class="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
          </div>
        </div>

        <!-- Info -->
        <div class="flex-grow text-center md:text-left space-y-4 animate-fade-in" style="animation-delay: 0.1s">
          <div class="space-y-2">
            <p class="font-mono text-sm text-primary tracking-wider uppercase">Software Engineer</p>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight" itemprop="name">
              {{ resume?.basics.name }}
            </h1>
          </div>
          
          <p class="font-mono text-muted-foreground flex items-center justify-center md:justify-start gap-2 text-sm">
            <MaterialSymbolsGlobe class="text-primary" />
            <span itemprop="address">{{ resume?.basics.location.city }}, {{ resume?.basics.location.country }}</span>
          </p>

          <!-- Social Links - Retro styled -->
          <div class="flex items-center justify-center md:justify-start gap-3 pt-4">
            <a 
              v-for="(social, index) in [
                { href: 'https://github.com/andreitere', icon: GithubIcon, label: 'GitHub' },
                { href: 'https://www.instagram.com/andreiterecoasa/', icon: InstagramIcon, label: 'Instagram' },
                { href: 'https://www.facebook.com/andreiterecoasa/', icon: FacebookIcon, label: 'Facebook' },
                { href: 'https://www.linkedin.com/in/andrei-terecoasa', icon: LinkedinIcon, label: 'LinkedIn' },
              ]"
              :key="social.href"
              :href="social.href" 
              target="_blank" 
              :aria-label="social.label"
              class="relative group/social p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 glow-hover"
              :style="{ animationDelay: `${0.2 + index * 0.05}s` }"
              itemprop="sameAs"
            >
              <component :is="social.icon" class="w-5 h-5 text-muted-foreground group-hover/social:text-primary transition-colors" />
            </a>
            <a 
              href="https://teamcoding.eu/" 
              target="_blank" 
              aria-label="TeamCoding"
              class="relative p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 font-mono font-bold text-sm text-muted-foreground hover:text-primary glow-hover"
              itemprop="sameAs"
            >
              TC
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation -->
    <Menu />

    <!-- About Section with retro card styling -->
    <section class="mt-12 animate-fade-in" style="animation-delay: 0.3s">
      <div class="relative">
        <!-- Section label -->
        <div class="flex items-center gap-4 mb-6">
          <span class="font-mono text-xs tracking-widest text-primary uppercase">// About</span>
          <div class="flex-grow h-px bg-gradient-to-r from-primary/50 to-transparent"></div>
        </div>

        <div class="space-y-4 font-mono text-base leading-relaxed text-muted-foreground">
          <p class="animate-fade-in" style="animation-delay: 0.35s" itemprop="description">
            I build software that works. By day, I write <span class="text-primary">JavaScript</span> and <span class="text-primary">Python</span> to solve real problems. 
            By night, I break things in my homelab and occasionally put them back together.
          </p>
          <p class="animate-fade-in" style="animation-delay: 0.4s">
            Here you'll find technical deep-dives, debugging war stories, and notes-to-self that might save you a few hours of head-scratching.
          </p>
          <p class="animate-fade-in" style="animation-delay: 0.45s">
            When I'm not staring at a terminal, I'm either chasing light with a camera or watching cars go very fast in circles (<span class="text-accent">F1</span>, specifically).
          </p>
        </div>
      </div>
    </section>

    <!-- Quick Links Section -->
    <section class="mt-16 animate-fade-in" style="animation-delay: 0.5s">
      <div class="flex items-center gap-4 mb-6">
        <span class="font-mono text-xs tracking-widest text-primary uppercase">// Explore</span>
        <div class="flex-grow h-px bg-gradient-to-r from-primary/50 to-transparent"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NuxtLink 
          v-for="(link, index) in [
            { to: '/blog', title: 'Blog', desc: 'Code, configs, and occasional clarity', icon: '01' },
            { to: '/projects', title: 'Projects', desc: 'Shipped code and side quests', icon: '02' },
          ]"
          :key="link.to"
          :to="link.to"
          class="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 overflow-hidden glow-hover"
          :style="{ animationDelay: `${0.55 + index * 0.05}s` }"
        >
          <!-- Hover gradient -->
          <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative flex items-center justify-between">
            <div class="space-y-1">
              <span class="font-mono text-xs text-muted-foreground">{{ link.icon }}</span>
              <h3 class="text-xl font-semibold group-hover:text-primary transition-colors">{{ link.title }}</h3>
              <p class="font-mono text-sm text-muted-foreground">{{ link.desc }}</p>
            </div>
            <ArrowRight class="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Disclaimer -->
    <section class="mt-16 animate-fade-in" style="animation-delay: 0.65s">
      <p class="font-mono text-center text-xs text-muted-foreground/50 italic">
        Personal blog.
      </p>
    </section>
  </div>
</template>

<style scoped lang="scss">
.hero-section {
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -20%;
    width: 60%;
    height: 200%;
    background: radial-gradient(ellipse, hsl(var(--primary) / 0.03) 0%, transparent 70%);
    pointer-events: none;
  }
}
</style>
