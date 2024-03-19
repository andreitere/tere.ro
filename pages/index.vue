<script setup lang="ts">
import MaterialSymbolsGlobe from "~icons/material-symbols/globe";
import ExternalLink from "~icons/mingcute/external-link-line";
import DotDuotone from "~icons/ph/dot-fill";

const { data: resume } = await useAsyncData("resume", () =>
  queryContent("/resume").findOne()
);
const getDurationLine = (workItem) => {
  const { startDate, endDate } = workItem;
  const [startYear, ,] = startDate?.split("-") || [];
  const [endYear, ,] = endDate?.split("-") || [];
  if (!endYear || startYear == endYear) {
    return startYear;
  }
  return `${startYear}-${endYear}`;
};

useSeoMeta({
  title: "Andrei Terecoasa - Software Engineer",
  ogTitle: "Andrei Terecoasa - Software Engineer",
  description:
    "With over seven years of experience in production-ready environments, I have honed my skills in building robust, scalable, and efficient applications.\n\nIn recent years, I have taken on new challenges in the fields of Data Science, Machine Learning, and Content Intelligence.",
  ogDescription:
    "With over seven years of experience in production-ready environments, I have honed my skills in building robust, scalable, and efficient applications.\n\nIn recent years, I have taken on new challenges in the fields of Data Science, Machine Learning, and Content Intelligence.",
});
</script>

<template>
  <section class="section">
    <div class="flex items-center justify-between space-x-1">
      <div class="flex-grow space-y-2">
        <h1 class="text-2xl font-bold">{{ resume.basics.name }}</h1>
        <p class="text-pretty font-mono text-sm text-muted-foreground">
          {{ resume.basics.label }}
        </p>
        <p
          class="text-pretty font-mono text-xs leading-none text-muted-foreground flex items-center"
        >
          <MaterialSymbolsGlobe class="mr-2" />
          <span>{{ resume.basics.location.address }}</span>
        </p>
      </div>
      <div class="flex-shrink">
        <img
          src="https://avatars.githubusercontent.com/u/3197966?v=4"
          alt=""
          class="transition-all max-h-32 rounded-lg hover:rounded-2xl"
        />
      </div>
    </div>
    <div class="flex [&>*]:h-[24px] [&>*]:cursor-pointer [&>*]:flex gap-3 items-center">
      <a href="https://github.com/andreitere" target="_blank">
        <img src="https://api.iconify.design/uim:github.svg?color=%23FFFFFF" />
      </a>
      <a href="https://www.instagram.com/andreiterecoasa/" target="_blank">
        <img
          src="https://api.iconify.design/uim:instagram.svg?color=%23FFFFFF"
        />
      </a>
      <a href="https://www.facebook.com/andreiterecoasa/" target="_blank">
        <img
          src="https://api.iconify.design/uim:facebook-f.svg?color=%23FFFFFF"
        />
      </a>
      <a href="https://www.linkedin.com/in/andrei-terecoasa" target="_blank">
        <img
          src="https://api.iconify.design/uim:linkedin-alt.svg?color=%23FFFFFF"
        />
      </a>
      <a href="https://teamcoding.eu/" target="_blank" class="font-bold text-lg">TC</a>
    </div>
  </section>
  <Menu />
  <section class="section">
    <h2 class="text-xl font-bold">About</h2>
    <p
      class="text-muted-foreground font-mono text-pretty text-sm leading-relaxed"
    >
      {{ resume.basics.summary }}
    </p>
  </section>
  <section class="section font-mono" id="work">
    <h2 class="text-xl font-bold">Work Experience</h2>
    <div v-for="work in resume.work" class="flex space-y-1.5 flex-col">
      <div class="flex justify-between">
        <h3 class="font-semibold hover:underline">
          <a target="_blank" :href="work.url">{{ work.name }}</a>
        </h3>
        <span class="text-sm tabular-nums text-muted-foreground">{{
          getDurationLine(work)
        }}</span>
      </div>
      <span class="text-sm leading-none">{{ work.position }}</span>
      <p class="text-xs text-muted-foreground">{{ work.summary }}</p>
    </div>
  </section>
  <section class="section font-mono" id="education">
    <h2 class="text-xl font-bold">Education</h2>
    <div v-for="ed in resume.education" class="flex space-y-1.5 flex-col">
      <div class="flex justify-between">
        <h3 class="font-semibold text-balance flex-1 text-pretty">
          {{ ed.institution }}
        </h3>
        <span class="text-sm tabular-nums text-muted-foreground break-normal">{{
          getDurationLine(ed)
        }}</span>
      </div>
      <span class="text-sm text-muted-foreground leading-none"
        >{{ ed.studyType }} - {{ ed.area }}</span
      >
    </div>
  </section>
  <section class="section font-mono" id="skills">
    <h2 class="text-xl font-bold">Skills</h2>
    <div class="flex flex-wrap font-semibold text-gray-200">
      <div
        v-for="skill in resume.skills"
        class="text-xs py-1 px-1.5 rounded bg-slate-700 transition hover:bg-slate-500 mr-1 mb-1 text-pretty cursor-pointer"
      >
        {{ skill.name }}
      </div>
    </div>
  </section>
  <section class="section font-mono" id="projects">
    <h2 class="text-xl font-bold">Projects</h2>
    <div
      class="-mx-3 grid grid-cols-1 gap-3 print:grid-cols-2 print:gap-2 md:grid-cols-2"
    >
      <div
        v-for="project in resume.projects"
        class="group rounded-lg bg-card flex flex-col overflow-hidden border border-muted p-3 space-y-1"
      >
        <h3
          class="font-semibold flex items-center tracking-tight text-base mb-2"
        >
          <DotDuotone
            title="Still active"
            v-if="project.active"
            class="inline text-green-300 w-6 h-6"
          />
          <span class="mr-2">{{ project.name }}</span>
          <a
            v-if="project.external"
            :href="project.url"
            target="_blank"
            class="text-gray-300 group-hover:text-gray-500 transition pointer-events-auto"
          >
            <ExternalLink />
          </a>
        </h3>
        <p class="text-muted-foreground text-xs">{{ project.summary }}</p>
        <p class="text-xs">
          <span v-if="project.active"
            >Start date: {{ project.startDate.split("-")[0] }}</span
          >
        </p>
      </div>
    </div>
  </section>
  <section class="section font-mono" id="references">
    <h2 class="text-xl font-bold">References</h2>
    <div
      v-for="ref in resume.references"
      class="group flex space-y-1.5 flex-col border border-muted rounded-lg p-3 -mx-3"
    >
      <div class="flex flex-col space-y-2 justify-between">
        <h3
          class="flex items-center space-x-2 font-semibold flex-1 text-pretty"
        >
          <span>{{ ref.name }}</span>
          <a
            :href="ref.url"
            target="_blank"
            class="text-gray-300 group-hover:text-gray-500 transition pointer-events-auto"
          >
            <ExternalLink />
          </a>
        </h3>
        <p class="italic text-pretty text-muted-foreground text-xs">
          {{ ref.reference }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section {
  @apply w-full space-y-4 print:space-y-6 py-2;
}
</style>
