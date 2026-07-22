import type { Topic, TopicStatus } from "@/lib/blog/topic-schema";
import type { ArticleStatusDir } from "./fs-content";

export type SyncOutcome = {
  topicId: string;
  previousStatus: TopicStatus;
  newStatus: TopicStatus;
  changed: boolean;
  issue?: { level: "warning" | "error"; message: string };
};

/**
 * Pure sync rule for a single topic, given where (if anywhere) its matching
 * article currently lives. Never touches the filesystem — the CLI wrapper
 * does that. Implements exactly the four cases from the Fase 5 spec:
 *   pending + draft existente        → generated
 *   generated + artículo publicado   → published
 *   generated sin artículo           → warning (no status change)
 *   published sin artículo publicado → error (no status change)
 */
export function syncTopicStatus(topic: Topic, articleDir: ArticleStatusDir | null): SyncOutcome {
  if (topic.status === "pending" && articleDir === "drafts") {
    return { topicId: topic.id, previousStatus: "pending", newStatus: "generated", changed: true };
  }

  if (topic.status === "generated" && articleDir === "published") {
    return { topicId: topic.id, previousStatus: "generated", newStatus: "published", changed: true };
  }

  if (topic.status === "generated" && articleDir === null) {
    return {
      topicId: topic.id,
      previousStatus: "generated",
      newStatus: "generated",
      changed: false,
      issue: {
        level: "warning",
        message: `El tema "${topic.id}" está marcado como "generated" pero no existe ningún artículo con ese slug.`,
      },
    };
  }

  if (topic.status === "published" && articleDir !== "published") {
    return {
      topicId: topic.id,
      previousStatus: "published",
      newStatus: "published",
      changed: false,
      issue: {
        level: "error",
        message: `El tema "${topic.id}" está marcado como "published" pero no existe ese artículo en content/blog/published/.`,
      },
    };
  }

  return { topicId: topic.id, previousStatus: topic.status, newStatus: topic.status, changed: false };
}
