import type { TopicList } from "@/lib/blog/topic-schema";

export type TopicIssue = {
  level: "error" | "warning";
  message: string;
  file: string;
  topicId?: string;
};

/** Topic ids must be globally unique across every file — they become the article's file slug. */
export function findDuplicateTopicIds(
  entries: { file: string; topicList: TopicList }[]
): TopicIssue[] {
  const filesById = new Map<string, string[]>();

  for (const { file, topicList } of entries) {
    for (const topic of topicList.topics) {
      const files = filesById.get(topic.id) ?? [];
      files.push(file);
      filesById.set(topic.id, files);
    }
  }

  const issues: TopicIssue[] = [];
  for (const [id, files] of filesById) {
    if (files.length > 1) {
      issues.push({
        level: "error",
        message: `El id de tema "${id}" está duplicado en: ${files.join(", ")}.`,
        file: files[0],
        topicId: id,
      });
    }
  }
  return issues;
}

/** A topic past "pending" should have a matching article — otherwise the status is stale. */
export function checkGeneratedTopicsHaveArticle(
  file: string,
  topicList: TopicList,
  allArticleFileSlugs: string[]
): TopicIssue[] {
  const issues: TopicIssue[] = [];
  for (const topic of topicList.topics) {
    const pastGeneration = topic.status === "generated" || topic.status === "reviewed";
    if (pastGeneration && !allArticleFileSlugs.includes(topic.id)) {
      issues.push({
        level: "error",
        message: `El tema "${topic.id}" tiene status "${topic.status}" pero no existe ningún artículo con ese slug.`,
        file,
        topicId: topic.id,
      });
    }
  }
  return issues;
}

/** A "pending" topic whose id already matches an existing article is likely stale. */
export function checkPendingTopicsAgainstExistingSlugs(
  file: string,
  topicList: TopicList,
  allArticleFileSlugs: string[]
): TopicIssue[] {
  const issues: TopicIssue[] = [];
  for (const topic of topicList.topics) {
    if (topic.status === "pending" && allArticleFileSlugs.includes(topic.id)) {
      issues.push({
        level: "warning",
        message: `Ya existe un artículo con el slug "${topic.id}" — revisa si este tema sigue vigente como "pending".`,
        file,
        topicId: topic.id,
      });
    }
  }
  return issues;
}
