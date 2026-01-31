<template>
    <div class="max-w-4xl mx-auto px-4 py-8 space-y-12">
        <Menu centered />
        
        <!-- Header -->
        <header class="text-center space-y-4 animate-fade-in">
            <span class="font-mono text-xs tracking-widest text-primary uppercase">// Resume</span>
            <h1 class="text-4xl md:text-5xl font-bold tracking-tight">{{ resume?.basics?.name }}</h1>
            <p class="font-mono text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {{ resume?.basics?.summary }}
            </p>
            
            <!-- Contact info -->
            <div class="flex flex-wrap items-center justify-center gap-4 font-mono text-xs text-muted-foreground pt-2">
                <a v-if="resume?.basics?.email" :href="`mailto:${resume?.basics?.email}`"
                    class="hover:text-primary transition-colors">
                    {{ resume?.basics?.email }}
                </a>
                <span class="text-border">|</span>
                <span v-if="resume?.basics?.location?.city">
                    {{ resume?.basics?.location?.city }}, {{ resume?.basics?.location?.country }}
                </span>
            </div>
            
            <!-- Social links -->
            <div v-if="resume?.basics?.profiles?.length" class="flex flex-wrap items-center justify-center gap-3 pt-4">
                <a v-for="profile in resume?.basics?.profiles" :key="profile.network" :href="profile.url"
                    target="_blank"
                    class="p-2 rounded-lg bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 glow-hover">
                    <GithubIcon v-if="profile.network.toLowerCase() === 'github'" class="w-5 h-5 text-muted-foreground hover:text-primary" />
                    <InstagramIcon v-if="profile.network.toLowerCase() === 'instagram'" class="w-5 h-5 text-muted-foreground hover:text-primary" />
                    <FacebookIcon v-if="profile.network.toLowerCase() === 'facebook'" class="w-5 h-5 text-muted-foreground hover:text-primary" />
                    <LinkedinIcon v-if="profile.network.toLowerCase() === 'linkedin'" class="w-5 h-5 text-muted-foreground hover:text-primary" />
                    <XIcon v-if="profile.network.toLowerCase() === 'x'" class="w-5 h-5 text-muted-foreground hover:text-primary" />
                    <MaterialSymbolsGlobe
                        v-if="!['github', 'instagram', 'facebook', 'linkedin', 'x'].includes(profile.network.toLowerCase())"
                        class="w-5 h-5 text-muted-foreground hover:text-primary" />
                </a>
            </div>
        </header>

        <!-- Download CV -->
        <section class="flex justify-center animate-fade-in" style="animation-delay: 0.1s">
            <a
                href="/Andrei_Terecoasa_Resume.pdf"
                download
                target="_blank"
                class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-mono text-sm font-medium hover:bg-primary/90 transition-all duration-300 glow-hover"
            >
                <PdfIcon class="w-5 h-5" />
                Download Resume
            </a>
        </section>

        <!-- Work Experience -->
        <section class="animate-fade-in" style="animation-delay: 0.15s">
            <div class="flex items-center gap-4 mb-8">
                <span class="font-mono text-xs tracking-widest text-primary uppercase">// Work</span>
                <div class="flex-grow h-px bg-gradient-to-r from-primary/50 to-transparent"></div>
                <a href="#" class="text-muted-foreground hover:text-primary transition-colors">
                    <ArrowUp class="w-4 h-4" />
                </a>
            </div>
            
            <div class="space-y-10">
                <div v-for="(company, companyName) in groupedWork" :key="companyName" class="group">
                    <!-- Company header -->
                    <div class="mb-4">
                        <h3 class="font-semibold text-xl group-hover:text-primary transition-colors">
                            <a target="_blank" :href="company.url" class="inline-flex items-center gap-2">
                                <span>{{ company.name }}</span>
                                <ExternalLink class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </h3>
                    </div>

                    <!-- Timeline -->
                    <div class="relative ml-2">
                        <!-- Vertical line -->
                        <div class="absolute left-[5px] top-2 bottom-2 w-0.5 bg-border"></div>
                        
                        <div v-for="(position, index) in company.positions" :key="index" class="relative pb-6 last:pb-0 pl-8">
                            <!-- Dot -->
                            <div class="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-primary"></div>
                            
                            <!-- Content -->
                            <div class="space-y-2">
                                <div class="flex flex-wrap items-center justify-between gap-2">
                                    <span class="font-medium text-foreground">{{ position.position }}</span>
                                    <span class="font-mono text-xs text-muted-foreground px-2 py-1 rounded-md bg-muted">
                                        {{ getDurationLine(position) }}
                                    </span>
                                </div>
                                <p class="font-mono text-sm text-muted-foreground leading-relaxed">
                                    {{ position.summary }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Education -->
        <section class="animate-fade-in" style="animation-delay: 0.2s">
            <div class="flex items-center gap-4 mb-8">
                <span class="font-mono text-xs tracking-widest text-primary uppercase">// Education</span>
                <div class="flex-grow h-px bg-gradient-to-r from-primary/50 to-transparent"></div>
                <a href="#" class="text-muted-foreground hover:text-primary transition-colors">
                    <ArrowUp class="w-4 h-4" />
                </a>
            </div>
            
            <div class="space-y-6">
                <div v-for="ed in resume?.education" :key="ed.institution" class="p-5 rounded-xl bg-card border border-border">
                    <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h3 class="font-semibold text-lg">{{ ed.institution }}</h3>
                        <span class="font-mono text-xs text-muted-foreground px-2 py-1 rounded-md bg-muted">
                            {{ getDurationLine(ed) }}
                        </span>
                    </div>
                    <p class="font-mono text-sm text-muted-foreground">
                        {{ ed.studyType }} — {{ ed.area }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Skills -->
        <section class="animate-fade-in" style="animation-delay: 0.25s">
            <div class="flex items-center gap-4 mb-8">
                <span class="font-mono text-xs tracking-widest text-primary uppercase">// Skills</span>
                <div class="flex-grow h-px bg-gradient-to-r from-primary/50 to-transparent"></div>
                <a href="#" class="text-muted-foreground hover:text-primary transition-colors">
                    <ArrowUp class="w-4 h-4" />
                </a>
            </div>
            
            <div class="space-y-8">
                <div v-for="(skills, category) in groupedSkills" :key="category" class="space-y-3">
                    <h3 class="font-mono text-sm font-medium text-primary capitalize">{{ category }}</h3>
                    <div class="flex flex-wrap gap-2">
                        <div 
                            v-for="skill in skills" 
                            :key="skill.name" 
                            class="group/skill relative font-mono text-sm px-3 py-1.5 rounded-md bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                        >
                            {{ skill.name }}
                            <!-- Tooltip for keywords -->
                            <span 
                                v-if="skill.keywords?.length" 
                                class="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full opacity-0 group-hover/skill:opacity-100 
                                       bg-card border border-border px-3 py-2 rounded-lg shadow-lg
                                       font-mono text-xs text-muted-foreground whitespace-nowrap z-10
                                       transition-all duration-200 pointer-events-none"
                            >
                                {{ skill.keywords.join(' · ') }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- References -->
        <section v-if="resume?.references?.length" class="animate-fade-in" style="animation-delay: 0.3s">
            <div class="flex items-center gap-4 mb-8">
                <span class="font-mono text-xs tracking-widest text-primary uppercase">// References</span>
                <div class="flex-grow h-px bg-gradient-to-r from-primary/50 to-transparent"></div>
                <a href="#" class="text-muted-foreground hover:text-primary transition-colors">
                    <ArrowUp class="w-4 h-4" />
                </a>
            </div>
            
            <div class="grid gap-6 md:grid-cols-2">
                <div v-for="ref in resume?.references" :key="ref.name"
                    class="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300">
                    <div class="flex items-start justify-between mb-4">
                        <h3 class="font-semibold group-hover:text-primary transition-colors">
                            {{ ref.name }}
                        </h3>
                        <a :href="ref.url" target="_blank" class="text-muted-foreground hover:text-primary transition-colors">
                            <ExternalLink class="w-4 h-4" />
                        </a>
                    </div>
                    <blockquote class="relative font-mono text-sm text-muted-foreground leading-relaxed italic pl-4 border-l-2 border-primary/30">
                        "{{ ref.reference }}"
                    </blockquote>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import Menu from '~/components/Menu.vue';
import GithubIcon from "~icons/mdi/github";
import InstagramIcon from "~icons/uim/instagram";
import FacebookIcon from "~icons/ic/baseline-facebook";
import LinkedinIcon from "~icons/ph/linkedin-logo-bold";
import PdfIcon from "~icons/tabler/pdf";
import XIcon from "~icons/ph/x-bold";
import MaterialSymbolsGlobe from "~icons/material-symbols/globe";
import ExternalLink from "~icons/mingcute/external-link-line";
import ArrowUp from "~icons/material-symbols/arrow-warm-up";

const { data: { value: { meta: resume } } } = await useAsyncData("resume", () =>
    queryCollection("other").where("stem", "=", "other/resume").first()
);

useArticleMeta('resume', resume);

interface WorkItem {
    startDate?: string;
    endDate?: string;
}

const getDurationLine = (workItem: WorkItem) => {
    const { startDate, endDate } = workItem;
    const [startYear, ,] = startDate?.split("-") || [];
    const [endYear, ,] = endDate?.split("-") || [];
    if (!endYear || startYear == endYear) {
        return startYear;
    }
    return `${startYear} - ${endYear}`;
};

defineOgImageComponent("tere", {
    headline: "Andrei Terecoasa",
    title: resume?.basics.name,
    description: resume?.basics.summary,
    theme: "#E67B2E",
    colorMode: "dark",
});

// Prepare grouped skills
const groupedSkills = computed(() => {
    const groups = {};
    resume?.skills.forEach(skill => {
        const category = skill.category || 'Other';
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(skill);
    });
    return groups;
});

// Add this computed property after groupedSkills
const groupedWork = computed(() => {
    const groups = {};
    resume?.work.forEach(job => {
        if (!groups[job.name]) {
            groups[job.name] = {
                name: job.name,
                url: job.url,
                positions: []
            };
        }
        groups[job.name].positions.push(job);
    });
    return groups;
});
</script>
