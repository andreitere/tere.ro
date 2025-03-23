import { defineContentConfig, defineCollection } from "@nuxt/content";
import { z } from "zod";
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
      }),
    }),
    other: defineCollection({
      source: "other/*.json",
      type: "data",
      schema: z.object({}),
    }),
  },
});
