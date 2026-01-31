<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Main content -->
    <main class="flex-grow container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-8">
      <div class="mx-auto max-w-6xl space-y-6 flex-grow flex flex-col">
        <slot />
      </div>
    </main>
    
    <!-- Footer -->
    <footer class="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div class="max-w-5xl mx-auto px-4 py-6">
        <p class="font-mono text-xs text-muted-foreground text-center">
          <span class="text-primary">©</span> <ClientOnly>{{ $dayjs().year() }}</ClientOnly> Andrei Terecoasa. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped></style>
