import { readAllTopicFiles, writeTopicFile } from "./lib/topics-fs";
import { listAllSlugs, type ArticleStatusDir } from "./lib/fs-content";
import { syncTopicStatus } from "./lib/sync-topics";

const articleDirBySlug = new Map<string, ArticleStatusDir>();
for (const { fileSlug, dir } of listAllSlugs()) {
  if (!articleDirBySlug.has(fileSlug)) articleDirBySlug.set(fileSlug, dir);
}

let anyChanges = false;
let anyErrors = false;

for (const result of readAllTopicFiles()) {
  if (!result.ok) {
    console.error(`${result.file}: ${result.error}`);
    anyErrors = true;
    continue;
  }

  let fileChanged = false;
  const updatedTopics = result.topicList.topics.map((topic) => {
    const dir = articleDirBySlug.get(topic.id) ?? null;
    const sync = syncTopicStatus(topic, dir);

    if (sync.issue) {
      console.log(`[${sync.issue.level.toUpperCase()}] ${result.file}: ${sync.issue.message}`);
      if (sync.issue.level === "error") anyErrors = true;
    }

    if (sync.changed) {
      console.log(`${result.file}: "${topic.id}" ${sync.previousStatus} → ${sync.newStatus}`);
      fileChanged = true;
      anyChanges = true;
      return { ...topic, status: sync.newStatus };
    }

    return topic;
  });

  if (fileChanged) {
    writeTopicFile(result.file, { ...result.topicList, topics: updatedTopics });
  }
}

if (!anyChanges) {
  console.log("Sin cambios de estado.");
}

if (anyErrors) {
  process.exitCode = 1;
}
