<script setup lang="ts">
import GithubIcon from "~icons/mdi/github";
import InstagramIcon from "~icons/uim/instagram";
import FacebookIcon from "~icons/ic/baseline-facebook";
import LinkedinIcon from "~icons/ph/linkedin-logo-bold";
</script>

<template>
  <div class="flex max-h-screen h-screen">
    <aside class="flex flex-col align-items-end bg-muted max-w-[250px] min-w-[100px] p-6 border-r-[1px] border-r-[hsl(0,0%,22%)]">
      <header class="space-y-4 text-muted-foreground">
        <div class="rounded-full object-fill overflow-hidden max-w-[120px] border-2 border-slate-400">
          <img src="https://github.com/andreitere.png" class="hover:scale-110 transition-all duration-200" alt="Andrei Terecoasa">
        </div>
        <h1 class="text-2xl text-[#5E5D5D]" style="font-weight: 900;">Andrei Terecoasa</h1>
        <p class="italic text-xs">Passionated Senior Software Development Engineer @ IBM | FullStack JS, ML/Ops, Python</p>
      </header>
      <main>
        <Menu/>
      </main>
      <div class="flex-grow"></div>
      <footer>
        <div class="flex text-muted-foreground [&>*]:h-[24px] [&>*]:cursor-pointer [&>*]:flex gap-3 items-center">
          <a href="https://github.com/andreitere" target="_blank">
            <GithubIcon class="h-6 w-6"/>
          </a>
          <a href="https://www.instagram.com/andreiterecoasa/" target="_blank">
            <InstagramIcon class="h-6 w-6"/>
          </a>
          <a href="https://www.facebook.com/andreiterecoasa/" target="_blank">
            <FacebookIcon class="h-6 w-6"/>
          </a>
          <a href="https://www.linkedin.com/in/andrei-terecoasa" target="_blank">
            <LinkedinIcon class="h-6 w-6"/>
          </a>
          <a href="https://teamcoding.eu/" target="_blank" class="font-bold text-lg text-muted-foreground h-6 w-6">TC</a>
        </div>
      </footer>
    </aside>
    <main class="flex flex-col flex-grow">
      <div
          class="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16"
      >
        <div class="mx-auto max-w-4xl space-y-6">
          <slot/>
        </div>
        <div class="flex w-full items-center justify-center p-2 font-semibold">
          Andrei Terecoasa ©
          <ClientOnly>{{ $dayjs().year() }}</ClientOnly>
        </div>
      </div>
    </main>
  </div>


</template>

<style scoped></style>
