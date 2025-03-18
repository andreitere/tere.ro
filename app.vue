<script setup lang="ts">
import {useColorMode} from "@vueuse/core";
import {Switch} from "~/components/ui/switch";
import LightMode from "~icons/material-symbols/wb-sunny-outline"
import DarkMode from "~icons/material-symbols/dark-mode-rounded"
const colorMode = useColorMode()
const toggleColorMode = () => {
  colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <NuxtLayout>
    <ClientOnly>
      <button @click="toggleColorMode" class="fixed top-0 right-0 p-2">
        <LightMode class="h-8 w-8" v-show="colorMode == 'dark'"/>
        <DarkMode class="h-8 w-8" v-show="colorMode == 'light'"/>
      </button>
    </ClientOnly>
    <NuxtPage/>
  </NuxtLayout>
</template>
