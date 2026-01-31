import { getDisplayName } from "~/lib/display-names";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

interface HowToData {
  name: string;
  description: string;
  image?: string;
  totalTime?: string; // ISO 8601 duration format, e.g., "PT30M" for 30 minutes
  estimatedCost?: {
    currency: string;
    value: string;
  };
  supply?: string[];
  tool?: string[];
  steps: HowToStep[];
}

/**
 * Generates BreadcrumbList structured data for SEO
 * Shows navigation path in Google search results like: Home > Blog > Category > Article
 */
export const useBreadcrumbs = (items: BreadcrumbItem[]) => {
  const baseUrl = "https://tere.ro";
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
    })),
  };

  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(breadcrumbSchema),
      },
    ],
  });

  return breadcrumbSchema;
};

/**
 * Helper to generate common breadcrumb patterns
 */
export const useBreadcrumbsForArticle = (
  category: string,
  articleTitle: string,
  articleSlug: string
) => {
  const categoryDisplayName = getDisplayName(category);
  
  return useBreadcrumbs([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: categoryDisplayName, url: `/${category}` },
    { name: articleTitle, url: `/${category}/${articleSlug}` },
  ]);
};

export const useBreadcrumbsForCategory = (category: string) => {
  const categoryDisplayName = getDisplayName(category);
  
  return useBreadcrumbs([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: categoryDisplayName, url: `/${category}` },
  ]);
};

export const useBreadcrumbsForBlog = () => {
  return useBreadcrumbs([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);
};

export const useBreadcrumbsForProjects = () => {
  return useBreadcrumbs([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
  ]);
};

export const useBreadcrumbsForProject = (projectName: string, projectSlug: string) => {
  return useBreadcrumbs([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: projectName, url: `/projects/${projectSlug}` },
  ]);
};

/**
 * Generates HowTo structured data for tutorial/guide articles
 * Shows step-by-step instructions directly in Google search results
 * 
 * Usage in article frontmatter:
 * ```yaml
 * howto:
 *   totalTime: PT30M
 *   steps:
 *     - name: Install dependencies
 *       text: Run npm install to install all required packages
 *     - name: Configure the project
 *       text: Create a config file with your settings
 * ```
 */
export const useHowToSchema = (data: HowToData, articleUrl: string) => {
  const baseUrl = "https://tere.ro";
  
  const howToSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: data.name,
    description: data.description,
    ...(data.image && { image: data.image.startsWith("http") ? data.image : `${baseUrl}${data.image}` }),
    ...(data.totalTime && { totalTime: data.totalTime }),
    ...(data.estimatedCost && {
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: data.estimatedCost.currency,
        value: data.estimatedCost.value,
      },
    }),
    ...(data.supply && {
      supply: data.supply.map((item) => ({
        "@type": "HowToSupply",
        name: item,
      })),
    }),
    ...(data.tool && {
      tool: data.tool.map((item) => ({
        "@type": "HowToTool",
        name: item,
      })),
    }),
    step: data.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { 
        image: step.image.startsWith("http") ? step.image : `${baseUrl}${step.image}` 
      }),
      url: `${baseUrl}${articleUrl}#step-${index + 1}`,
    })),
  };

  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(howToSchema),
      },
    ],
  });

  return howToSchema;
};

/**
 * Generates WebSite structured data with SearchAction
 * Enables sitelinks search box in Google search results
 */
export const useWebsiteSchema = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Andrei Terecoasa",
    alternateName: "tere.ro",
    url: "https://tere.ro",
    description: "Personal blog and portfolio of Andrei Terecoasa - Software Engineer",
    author: {
      "@type": "Person",
      name: "Andrei Terecoasa",
      url: "https://tere.ro",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://tere.ro/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(websiteSchema),
      },
    ],
  });

  return websiteSchema;
};
