<template>
  <div
    id="image-preview"
    class="flex items-center justify-center"
    v-if="selectedImg"
  >
    <img :src="selectedImg" class="object-contain max-h-[400px] h-[400px]" />
  </div>
  <div class="image-grid grid gap-2">
    <div
      @click="selected = img"
      v-for="img in props.items"
      class="flex rounded-lg overflow-hidden m-0! not-prose object-fit max-h-[150px]"
    >
      <img :src="img" alt="" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: [],
  gridCols: Number,
});
const selected = ref(null);
const selectedImg = computed(() => {
  return selected.value || props.items[0];
});
const cols = computed(() => {
  return props.gridCols || props.items.length;
});
</script>

<style lang="scss" scoped>
.image-grid {
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(v-bind(cols), 1fr);
}
</style>
