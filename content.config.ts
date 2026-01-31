import { defineContentConfig, defineCollection } from "@nuxt/content";
import { z } from "zod";

// HowTo step schema for rich results
const howToStepSchema = z.object({
  name: z.string(),
  text: z.string(),
  image: z.string().optional(),
});

// HowTo schema for tutorial articles (Google rich results)
const howToSchema = z.object({
  totalTime: z.string().optional(), // ISO 8601 duration, e.g., "PT30M"
  estimatedCost: z.object({
    currency: z.string(),
    value: z.string(),
  }).optional(),
  supply: z.array(z.string()).optional(),
  tool: z.array(z.string()).optional(),
  steps: z.array(howToStepSchema),
});

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/*.{md,mdx}",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        category: z.string(),
        draft: z.boolean().default(false),
        meta: z.object({}).default({}),
        image: z.string().optional(),
        tags: z.array(z.string()).optional(),
        // HowTo schema for tutorial articles - enables step-by-step rich results in Google
        howto: howToSchema.optional(),
      }),
    }),
    projects: defineCollection({
      type: "page",
      source: "projects/*.{md,mdx}",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        endDate: z.string().optional(),
        active: z.boolean().optional(),
        external: z.boolean().optional(),
        externalUrl: z.string().optional(),
        githubUrl: z.string().optional(),
        tags: z.array(z.string()),
      }),
    }),
    other: defineCollection({
      source: "other/*.json",
      type: "data",
      schema: z.object({}),
    }),
  },
});
