<script setup lang="ts">
import Giscus from "@giscus/vue";
definePageMeta({
  alias: "/:category()/:id()",
});
const route = useRoute();

const article = route.path.split("/").at(-1);
const { data } = await useAsyncData(`blog/${article}`, () =>
  queryContent(`blog/${article}`).findOne()
);

const category = route.params.category;

useSeoMeta({
  title: data.value?.title,
  ogTitle: data.value?.title,
  description: data.value?.description,
  ogDescription: data.value?.description,
});

defineOgImageComponent("BlogImage", {
  headline: "Andrei Terecoasa",
  title: data.value?.title,
  description: data.value?.description,
  theme: "#ff0000",
  colorMode: "dark",
});


</script>

<template>
  <div class="mx-auto max-w-2xl space-y-6">
    <header class="mb-8 flex flex-col space-y-2 border-b-[1px] border-solid border-gray-300 pb-2">
      <h1 class="mb-4 text-4xl font-bold">{{ data?.title }}</h1>
      <p class="text-muted-foreground text-sm">{{ data?.description }}</p>
      <div class="flex text-xs text-muted-foreground">
        <span class="italic">Published on: {{ $dayjs(data?.date).format("DD-MM-YYYY") }}</span>
      </div>
    </header>
    <div class="prose">
      <ContentRenderer :value="data" />
    </div>

    <Giscus id="comments" repo="andreitere/tere.ro" repoId="R_kgDOLF-PkA" category="Announcements"
      categoryId="DIC_kwDOLF-PkM4CeBWs" mapping="url" reactionsEnabled="1" emitMetadata="0" inputPosition="top"
      theme="preferred_color_scheme" lang="en" loading="lazy" />
  </div>
</template>

<style scoped></style>
