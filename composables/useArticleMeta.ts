import type { BlogCollectionItem } from "~/types/content";

type MetaType = "home" | "blog" | "article" | "resume";

interface ResumeData {
  basics?: {
    name?: string;
    label?: string;
    summary?: string;
    location?: {
      address?: string;
    };
  };
  work?: Array<{
    name: string;
    url: string;
  }>;
  education?: Array<{
    institution: string;
  }>;
  skills?: Array<{
    name: string;
  }>;
}

export const useArticleMeta = (
  type: MetaType = "blog",
  data?: BlogCollectionItem | ResumeData | null
) => {
  const config = useRuntimeConfig();
  const route = useRoute();

  const baseUrl = config.public.siteUrl || "https://tere.ro";
  const currentUrl = `${baseUrl}${route.path}`;
  const defaultImage = "https://avatars.githubusercontent.com/u/3197966?v=4";

  // Default meta that applies to all pages
  const defaultMeta = {
    ogUrl: currentUrl,
    twitterCard: "summary_large_image" as const,
    ogLocale: "en_US",
    language: "English",
    icon: "/favicon.ico",
    alternateLanguages: {
      "en-US": currentUrl
    }
  };

  // Common head settings for all pages
  useHead({
    htmlAttrs: {
      lang: 'en'
    },
    link: [
      { rel: 'icon', type: 'image/x-icon', href: defaultMeta.icon },
      { rel: 'canonical', href: currentUrl }
    ]
  });

  switch (type) {
    case "home":
      useSeoMeta({
        title: "Andrei Terecoasa - Software Engineer",
        ogTitle: "Andrei Terecoasa - Software Engineer",
        description:
          "Software Engineer specializing in web development and cloud solutions",
        ogDescription:
          "Software Engineer specializing in web development and cloud solutions",
        ...defaultMeta,
      });
      break;

    case "blog":
      if (!data || "basics" in data) {
        // Blog listing
        useSeoMeta({
          title: "Blog - Andrei Terecoasa",
          ogTitle: "Blog - Andrei Terecoasa",
          description:
            "Articles about software development, tech insights, and personal projects",
          ogDescription:
            "Articles about software development, tech insights, and personal projects",
          ...defaultMeta,
        });
      } else {
        // Article specific meta
        const article = data as BlogCollectionItem;
        const keywords = [
          ...(article.categories
            ? typeof article.categories === "string"
              ? article.categories.split(",")
              : article.categories
            : []),
          ...(article.tags || []),
        ].filter(Boolean);

        useSeoMeta({
          title: `${article.title} - Andrei Terecoasa`,
          ogTitle: article.title,
          description: article.description,
          ogDescription: article.description,
          keywords: keywords.join(", "),
          articlePublishedTime: article.date,
          articleModifiedTime: article.lastmod || article.date,
          articleTag: keywords,
          ogType: "article",
          ...defaultMeta,
          ...(article.image && {
            ogImage: `${baseUrl}${article.image}`,
            twitterImage: `${baseUrl}${article.image}`,
          }),
        });
      }
      break;

    case "resume":
      if (!data || !("basics" in data)) return;

      const resume = data as ResumeData;

      // Resume/Profile specific meta
      useSeoMeta({
        title: `${resume.basics?.name} - ${resume.basics?.label}`,
        ogTitle: `${resume.basics?.name} - ${resume.basics?.label}`,
        description: resume.basics?.summary,
        ogDescription: resume.basics?.summary,
        ogType: "profile",
        keywords: resume.skills?.map((skill) => skill.name).join(", "),
        ...defaultMeta,
      });

      // Add structured Person data
      useHead({
        meta: [
          { name: "author", content: resume.basics?.name },
          {
            property: "profile:first_name",
            content: resume.basics?.name?.split(" ")[0],
          },
          {
            property: "profile:last_name",
            content: resume.basics?.name?.split(" ")[1],
          },
          { property: "profile:username", content: "andreitere" },
          { name: "robots", content: "index, follow" },
        ],
        script: [
          {
            type: "application/ld+json",
            innerHTML: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: resume?.basics?.name,
              jobTitle: resume?.basics?.label,
              description: resume?.basics?.summary,
              image: "https://avatars.githubusercontent.com/u/3197966?v=4",
              url: "https://tere.ro",
              sameAs: [
                "https://github.com/andreitere",
                "https://www.instagram.com/andreiterecoasa/",
                "https://www.facebook.com/andreiterecoasa/",
                "https://www.linkedin.com/in/andrei-terecoasa",
                "https://teamcoding.eu/",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: resume?.basics?.location?.address,
              },
              worksFor: resume?.work?.map((job) => ({
                "@type": "Organization",
                name: job.name,
                url: job.url,
              })),
              alumniOf: resume?.education?.map((edu) => ({
                "@type": "EducationalOrganization",
                name: edu.institution,
              })),
              knowsAbout: resume?.skills?.map((skill) => skill.name),
            }),
          },
        ],
      });
      break;
  }
};
