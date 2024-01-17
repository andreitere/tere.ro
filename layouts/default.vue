<script setup lang="ts">

</script>

<template>
  <div class="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
    <slot/>
  </div>
  <div class="flex w-full items-center justify-center p-2 font-semibold">Andrei Terecoasa © <ClientOnly>{{$dayjs().year()}}</ClientOnly></div>
</template>

<style scoped>

</style>
