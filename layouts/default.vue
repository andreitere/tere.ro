<script setup lang="ts"></script>

<template>
  <div
    class="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-8"
  >
    <div class="mx-auto max-w-6xl space-y-6">
      <slot />
    </div>
  </div>
  <div class="flex w-full items-center justify-center p-4 font-semibold">
    Andrei Terecoasa © <ClientOnly>{{ $dayjs().year() }}</ClientOnly>
  </div>
</template>

<style scoped></style>
