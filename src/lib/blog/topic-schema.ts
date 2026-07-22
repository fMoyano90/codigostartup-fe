import { z } from "zod";
import { blogCategorySlugs } from "../../config/blog-categories";
import { slugSchema, audienceValues, intentValues, funnelStageValues } from "./article-schema";

export const topicStatusValues = [
  "pending",
  "generated",
  "reviewed",
  "published",
  "discarded",
] as const;

export type TopicStatus = (typeof topicStatusValues)[number];

/**
 * A topic's `id` becomes the generated article's file slug and
 * `frontmatter.slug` — this is the convention that lets `blog:sync-topics`
 * match a topic to its article by filename.
 */
export const topicSchema = z.object({
  id: slugSchema,
  title: z.string().min(1, "title es obligatorio"),
  status: z.enum(topicStatusValues),
  intent: z.enum(intentValues),
  funnelStage: z.enum(funnelStageValues),
  audience: z.array(z.enum(audienceValues)).min(1, "audience no puede estar vacío"),
  objective: z.string().min(1, "objective es obligatorio"),
  notes: z.array(z.string()).default([]),
});

export type Topic = z.infer<typeof topicSchema>;

export const topicListSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.string().refine((value) => blogCategorySlugs.includes(value), {
    message: `category debe ser una de: ${blogCategorySlugs.join(", ")}`,
  }),
  topics: z.array(topicSchema).min(1, "topics no puede estar vacío"),
});

export type TopicList = z.infer<typeof topicListSchema>;

export function safeParseTopicList(data: unknown) {
  return topicListSchema.safeParse(data);
}
