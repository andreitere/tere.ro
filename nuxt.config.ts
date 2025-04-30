// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-03-19",
  devtools: { enabled: true },
  ssr: true,
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/sitemap",
    "@nuxt/content",
    "@nuxtjs/google-fonts",
    "unplugin-icons/nuxt",
    "nuxt-og-image",
    "dayjs-nuxt",
    "nuxt-gtag",
    "@nuxt/image",
    "nuxt-umami",
  ],
  css: ["~/assets/css/main.scss"],
  dayjs: {
    plugins: ["calendar"],
    defaultLocale: "en",
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  site: {
    url: "https://tere.ro",
  },
  ogImage: {
    debug: true,
    fonts: [
      // will load the Noto Sans font from Google fonts
      "Fira+Code:600",
      "Fira+Code:700",
    ],
  },
  content: {
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: "github-dark",
      },
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  googleFonts: {
    families: {
      Sora: [400, 500, 600, 700],
      "JetBrains Mono": [400, 500, 600, 700],
    },
  },
  umami: {
    host: "https://analytics.swninja.dev",
    id: "3a271c5b-afdd-441c-ae5c-37347b0a4c7e",
    //customEndpoint: "/api/send",
    autoTrack: true,
    version: 2,
  },
});
