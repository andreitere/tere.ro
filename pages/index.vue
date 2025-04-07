<script setup lang="ts">
import MaterialSymbolsGlobe from "~icons/material-symbols/globe";
import ExternalLink from "~icons/mingcute/external-link-line";
import DotDuotone from "~icons/ph/dot-fill";
import ArrowUp from "~icons/material-symbols/arrow-warm-up";
import GithubIcon from "~icons/mdi/github";
import InstagramIcon from "~icons/uim/instagram";
import FacebookIcon from "~icons/ic/baseline-facebook";
import LinkedinIcon from "~icons/ph/linkedin-logo-bold";



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


</script>

<template>
  <div itemscope itemtype="https://schema.org/Person"
    class="max-w-6xl mx-auto px-3 flex-grow place-content-center">
    <section class="section">
      <div class="flex items-center justify-between space-x-8">
        <div class="flex-grow space-y-4">
          <h1 class="text-3xl font-bold" itemprop="name">{{ resume?.basics.name }}</h1>
          <p class="text-pretty font-mono text-base text-muted-foreground" itemprop="jobTitle">
            {{ resume?.basics.label }}
          </p>
          <p class="text-pretty font-mono text-sm leading-none text-muted-foreground flex items-center">
            <MaterialSymbolsGlobe class="mr-2" />
            <span itemprop="address">{{ resume?.basics.location.address }}</span>
          </p>
        </div>
        <div class="flex-shrink">
          <img src="https://avatars.githubusercontent.com/u/3197966?v=4" alt="Andrei Terecoasa"
            class="transition-all max-h-40 rounded-lg hover:rounded-2xl" itemprop="image" />
        </div>
      </div>
      <div class="flex [&>*]:h-[28px] [&>*]:cursor-pointer [&>*]:flex gap-4 items-center mt-6">
        <a href="https://github.com/andreitere" target="_blank" itemprop="sameAs">
          <GithubIcon class="h-7 w-7" />
        </a>
        <a href="https://www.instagram.com/andreiterecoasa/" target="_blank" itemprop="sameAs">
          <InstagramIcon class="h-7 w-7" />
        </a>
        <a href="https://www.facebook.com/andreiterecoasa/" target="_blank" itemprop="sameAs">
          <FacebookIcon class="h-7 w-7" />
        </a>
        <a href="https://www.linkedin.com/in/andrei-terecoasa" target="_blank" itemprop="sameAs">
          <LinkedinIcon class="h-7 w-7" />
        </a>
        <a href="https://teamcoding.eu/" target="_blank" itemprop="sameAs"
          class="font-bold text-xl text-foreground h-7 w-7">TC</a>
      </div>
    </section>
    <Menu />
    <section class="section">
      <h2 class="text-2xl font-bold mb-4">hey</h2>
      <p class=" font-mono text-base leading-relaxed" itemprop="description">


        I'm a passionate software engineer with a soft spot for clean code, clever hacks, and building things that
        (hopefully) make life easier. Most of my work revolves around JavaScript and Python, but I'm always
        experimenting with new tech and ideas.
      </p>
      <p class="font-mono text-base leading-relaxed">
        This blog is a mix of technical deep dives, quick tips I don’t want to forget, and the occasional story from my
        travels or side projects. Hope you find something useful, or at least interesting.
      </p>
      <p class="font-mono text-base leading-relaxed">
        Outside of coding, I dabble in photography (very much amateur level) and follow Formula 1 a bit too obsessively.
      </p>
    </section>

    <section class="section font-mono text-center text-sm text-muted-foreground/70 italic">
      <p>Views and opinions expressed here are my own and do not reflect those of my employer.</p>
    </section>
  </div>
</template>

<style scoped lang="scss">
.section {
  @apply w-full space-y-6 print:space-y-8 py-6;
}
</style>
