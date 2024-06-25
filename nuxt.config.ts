// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},

  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/content",
    "@nuxtjs/google-fonts",
    "unplugin-icons/nuxt",
    "nuxt-og-image",
    "dayjs-nuxt",
    "nuxt-gtag",
    "@nuxtjs/sitemap",
    "@nuxt/image"
  ],
  extends: ["nuxt-umami"],
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
    families: ["Fira Code", "Roboto Slab", "Space Mono"],
  },
  gtag: {
    id: "G-KBKD6E08Y4",
  },
  appConfig: {
    umami: {
      host: "https://analytics.cloudcrafts.club",
      id: "b9f4ffc4-3bcb-44b5-a2f6-9672d68a4761",
      //customEndpoint: "/api/send",
      version: 2,
    },
  }
});