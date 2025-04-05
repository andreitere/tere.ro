export const categories = {
  vue: "Vue.js",
  tinkering: "Tinkering",
  random: "Random",
  trips: "Travel",
  travel: "Travel",
  talks: "Talks",
  tech: "Technology",
  software: "Software",
  homelab: "HomeLab",
  development: "Development",
  blog: "Blog",
};

export const tag_display_names = {
  javascript: "JavaScript",
  node: "Node.js",
  fastify: "Fastify",
  tailwind: "Tailwind CSS",
  astrobuild: "Astro",
  gitlab: "GitLab",
  ci: "CI/CD",
  telegram: "Telegram",
  firebase: "Firebase",
  fcm: "FCM",
  notifications: "Notifications",
  web: "Web",
  vitejs: "Vite.js",
  vuejs: "Vue.js",
  vue3: "Vue 3",
  pinia: "Pinia",
  android: "Android",
  login: "Login",
  facebook: "Facebook",
  "app signing": "App Signing",
  coolify: "Coolify",
  reverse: "Reverse Proxy",
  proxy: "Proxy",
  nginx: "Nginx",
  python: "Python",
  flutter: "Flutter",
  ai: "AI",
  gemini: "Gemini",
};

export const getDisplayName = (key: string) => {
  if (key in tag_display_names) {
    return tag_display_names[key as keyof typeof tag_display_names];
  }
  if (key in categories) {
    return categories[key as keyof typeof categories];
  }
  return key;
};
