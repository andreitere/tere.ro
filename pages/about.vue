<template>
    <div class="space-y-8">
        <Menu centered />
        <header class="text-center space-y-4">
            <h1 class="text-4xl font-bold">{{ resume?.basics?.name }}</h1>
            <p class="text-md leading-relaxed text-muted-foreground max-w-3xl mx-auto">{{ resume?.basics?.summary }}</p>
            <div class="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <a v-if="resume?.basics?.email" :href="`mailto:${resume?.basics?.email}`"
                    class="hover:text-foreground transition-colors">
                    {{ resume?.basics?.email }}
                </a>
                <a v-if="resume?.basics?.location?.city" href="#" class="hover:text-foreground transition-colors">
                    {{ resume?.basics?.location?.city }}, {{ resume?.basics?.location?.country }}
                </a>
            </div>
            <div v-if="resume?.basics?.profiles?.length" class="flex flex-col md:flex-row items-center justify-center gap-4">
                <a v-for="profile in resume?.basics?.profiles" :key="profile.network" :href="profile.url"
                    target="_blank"
                    class="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                    <GithubIcon v-if="profile.network.toLowerCase() === 'github'" class="w-5 h-5" />
                    <InstagramIcon v-if="profile.network.toLowerCase() === 'instagram'" class="w-5 h-5" />
                    <FacebookIcon v-if="profile.network.toLowerCase() === 'facebook'" class="w-5 h-5" />
                    <LinkedinIcon v-if="profile.network.toLowerCase() === 'linkedin'" class="w-5 h-5" />
                    <XIcon v-if="profile.network.toLowerCase() === 'x'" class="w-5 h-5" />
                    <MaterialSymbolsGlobe
                        v-if="!['github', 'instagram', 'facebook', 'linkedin', 'x'].includes(profile.network.toLowerCase())"
                        class="w-5 h-5" />
                    {{ profile.username }}
                </a>
            </div>
        </header>
        <section class="section font-mono" id="download-cv">
            <div class="flex justify-center">
                <a
                    href="/Andrei_Terecoasa_Resume.pdf"
                    download
                    target="_blank"
                    class="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary dark:bg-secondary text-white font-semibold hover:bg-primary/80 transition-colors"
                >
                    <div class="flex items-center"><PdfIcon class="w-5 h-5 mr-2" /> version</div>
                    
                </a>
            </div>
        </section>
        <section class="section font-mono " id="work">
            <h2 class="flex justify-between items-center text-2xl font-bold mb-6">
                Work Experience
                <a href="#">
                    <ArrowUp class="text-foreground" />
                </a>
            </h2>
            <div class="space-y-12">
                <div v-for="(company, companyName) in groupedWork" :key="companyName" class="group relative" itemscope
                    itemtype="https://schema.org/Organization">
                    <!-- Company header -->
                    <div class="mb-6">
                        <h3 class="font-semibold text-xl group-hover:text-primary transition-colors">
                            <a target="_blank" :href="company.url" itemprop="url" class="flex items-center gap-2">
                                <span itemprop="name">{{ company.name }}</span>
                                <ExternalLink class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </h3>
                    </div>

                    <!-- Timeline container -->
                    <div class="relative">
                        <!-- Continuous timeline line -->
                        <div class="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-700/50"></div>

                        <!-- Positions -->
                        <div class="space-y-8">
                            <div v-for="(position, index) in company.positions" :key="index" class="relative" itemscope
                                itemtype="https://schema.org/WorkPosition">
                                <!-- Timeline dot -->
                                <div class="absolute left-0 top-0 w-3 h-3 rounded-full bg-primary -translate-x-[5px]">
                                </div>

                                <!-- Position content -->
                                <div class="ml-6 space-y-2">
                                    <div class="flex justify-between items-start">
                                        <div class="space-y-1">
                                            <span class="text-lg font-medium text-foreground" itemprop="jobTitle">{{
                                                position.position
                                            }}</span>
                                        </div>
                                        <span
                                            class="text-sm tabular-nums text-muted-foreground bg-slate-800/50 px-2 py-1 rounded-md">
                                            <meta itemprop="startDate" :content="position.startDate" />
                                            <meta itemprop="endDate" :content="position.endDate" />
                                            {{ getDurationLine(position) }}
                                        </span>
                                    </div>
                                    <p class="text-sm text-muted-foreground leading-relaxed" itemprop="description">{{
                                        position.summary }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section font-mono " id="education">
            <h2 class="flex items-center justify-between text-2xl font-bold mb-6">
                Education
                <a href="#">
                    <ArrowUp class="text-foreground" />
                </a>
            </h2>
            <div v-for="ed in resume?.education" class="flex space-y-2 flex-col mb-8 last:mb-0" itemscope
                itemtype="https://schema.org/EducationalOccupationalCredential">
                <div class="flex justify-between">
                    <h3 class="font-semibold text-lg text-balance flex-1 text-pretty" itemprop="educationalLevel">
                        {{ ed.institution }}
                    </h3>
                    <span class="text-sm tabular-nums text-muted-foreground break-normal">
                        <meta itemprop="startDate" :content="ed.startDate" />
                        <meta itemprop="endDate" :content="ed.endDate" />
                        {{ getDurationLine(ed) }}
                    </span>
                </div>
                <span class="text-base text-muted-foreground leading-none">
                    <span itemprop="credentialCategory">{{ ed.studyType }}</span> - <span itemprop="about">{{ ed.area
                    }}</span>
                </span>
            </div>
        </section>
        <section class="section font-mono " id="skills">
            <h2 class="flex items-center justify-between text-2xl font-bold mb-6">
                Skills
                <a href="#">
                    <ArrowUp class="text-foreground" />
                </a>
            </h2>
            <div class="grid grid-cols-1 gap-12">
                <div v-for="(skills, category) in groupedSkills" :key="category" class="space-y-4">
                    <h3 class="text-base font-semibold text-primary capitalize">{{ category }}</h3>
                    <div class="flex flex-wrap gap-3">
                        <div v-for="skill in skills" :key="skill.name" class="group relative px-4 py-2 rounded-md bg-slate-800/50 hover:bg-slate-700 
                     border border-slate-700/50 hover:border-slate-600 
                     transition-all duration-200" itemprop="knowsAbout">
                            <div class="flex items-center gap-2">
                                <span class="text-sm font-medium text-gray-300">{{ skill.name }}</span>
                            </div>
                            <span v-if="skill.keywords?.length" class="absolute left-1/2 -translate-x-1/2 -bottom-1 opacity-0 
                       group-hover:opacity-100 group-hover:-bottom-8 
                       bg-slate-800 text-sm px-3 py-1.5 rounded-md
                       border border-slate-700/50
                       transition-all duration-200 z-10
                       text-gray-400 whitespace-nowrap">
                                {{ skill.keywords.join(' · ') }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- <section class="section font-mono" id="projects">
      <h2 class="flex items-center justify-between text-2xl font-bold mb-6">
        Projects
        <a href="#">
          <ArrowUp class="text-foreground" />
        </a>
      </h2>
      <div class="-mx-3 grid grid-cols-1 gap-4 print:grid-cols-2 print:gap-3 md:grid-cols-2">
        <div v-for="project in resume.projects"
          class="group rounded-lg bg-card flex flex-col overflow- border border-muted p-4 space-y-2">
          <h3 class="font-semibold flex items-center tracking-tight text-lg mb-2">
            <DotDuotone title="Still active" v-if="project.active" class="inline text-green-300 w-6 h-6 mr-2" />
            <span>{{ project.name }}</span>
            <a v-if="project.external" :href="project.url" target="_blank"
              class="text-gray-300 group-hover:text-gray-500 transition pointer-events-auto ml-2">
              <ExternalLink />
            </a>
          </h3>
          <p class="text-muted-foreground text-sm">{{ project.summary }}</p>
          <p class="text-sm">
            <span v-if="project.active">Start date: {{ project.startDate.split("-")[0] }}</span>
          </p>
        </div>
      </div>
    </section> -->
        <section class="section font-mono " id="references">
            <h2 class="flex items-center justify-between text-2xl font-bold mb-6">
                References
                <a href="#">
                    <ArrowUp class="text-foreground" />
                </a>
            </h2>
            <div class="space-y-4">
                <div v-for="ref in resume?.references" :key="ref.name"
                    class="group relative overflow- rounded-xl shadow hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    <div class="absolute top-0 left-0 w-1 h-full transition-all duration-300  bg-primary"></div>
                    <div class="p-6 border border-gray-100 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900">
                        <div class="flex items-start justify-between mb-4">
                            <h3 class="text-lg font-semibold group-hover:text-primary transition-colors duration-200">
                                {{ ref.name }}
                            </h3>
                            <a :href="ref.url" target="_blank"
                                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                <ExternalLink class="w-4 h-4" />
                            </a>
                        </div>
                        <blockquote class="relative">
                            <div class="absolute -top-2 -left-2 text-4xl text-primary opacity-20">"</div>
                            <p class="text-muted-foreground text-sm leading-relaxed italic">
                                {{ ref.reference }}
                            </p>
                            <div class="absolute -bottom-2 -right-2 text-4xl text-primary opacity-20">"</div>
                        </blockquote>
                    </div>
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

const { data: { value: { meta: resume } } } = await useAsyncData("resume", () =>
    queryCollection("other").where("stem", "=", "other/resume").first()
);

// Use the consolidated SEO composable
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
    return `${startYear}-${endYear}`;
};

defineOgImageComponent("tere", {
    headline: "Andrei Terecoasa",
    title: resume?.basics.name,
    description: resume?.basics.summary,
    theme: "#E67B2E",
    colorMode: "dark",
});

useArticleMeta('resume', resume);

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