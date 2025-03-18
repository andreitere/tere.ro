<script setup lang="ts">
const { data: trips } = await useAsyncData("trips", () =>
  queryContent("/trips").find()
);
</script>

<template>
  <div class="max-w-6xl mx-auto px-4">
    <section class="section">
      <div class="flex items-center justify-between space-x-8">
        <div class="flex-grow space-y-4">
          <h1 class="text-3xl font-bold">Trips</h1>
          <p class="text-pretty font-mono text-base text-muted-foreground">
            A collection of my travel experiences
          </p>
        </div>
      </div>
    </section>
    <Menu :centered="true" />
    <section class="section">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div v-for="trip in trips" :key="trip._path" class="group rounded-lg bg-card flex flex-col overflow-hidden border border-muted p-4 space-y-2">
          <h3 class="font-semibold text-lg">{{ trip.title }}</h3>
          <p class="text-muted-foreground text-sm">{{ trip.description }}</p>
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{{ trip.date }}</span>
            <span v-if="trip.location">· {{ trip.location }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.section {
  @apply w-full space-y-6 print:space-y-8 py-6;
}
</style> 