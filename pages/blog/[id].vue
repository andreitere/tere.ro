<script setup lang="ts">
const route = useRoute()
const {data} = await useAsyncData(`${route.path}`, () => queryContent(route.path).findOne())


const formatDate = (date: string) => {
  let _date = new Date(date)
  let year = _date.getFullYear();
  let month: string | number = _date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day: string | number = _date.getDate();
  day = day < 10 ? `0${day}` : day;
  return `${day}-${month}-${year}`
}
defineOgImageComponent('BlogImage', {
  headline: "Andrei Terecoasa",
  title: data.value?.title,
  description: data.value?.description,
  theme: '#ff0000',
  colorMode: 'dark',
})
</script>

<template>
  <div class="mx-auto max-w-2xl space-y-6">
    <div>
      <Menu/>
    </div>
    <header class="mb-8 flex flex-col space-y-2 border-b-[1px] border-solid border-gray-300 pb-2">
      <h1 class="mb-4 text-4xl font-bold">{{ data.title }}</h1>
      <p class="text-muted-foreground text-sm">{{ data.description }}</p>
      <div class="flex text-xs text-muted-foreground">
        <span class="italic">Published on: {{ $dayjs(data.date).format("DD-MM-YYYY") }}</span>
      </div>
    </header>
    <div class="prose">
      <ContentRenderer :value="data"/>
    </div>
  </div>
</template>

<style scoped>

</style>