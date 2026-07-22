import { parseArgs } from "node:util";
import { readAllTopicFiles } from "./lib/topics-fs";
import {
  findDuplicateTopicIds,
  checkGeneratedTopicsHaveArticle,
  checkPendingTopicsAgainstExistingSlugs,
} from "./lib/validate-topics";
import { listAllSlugs } from "./lib/fs-content";
import type { TopicList } from "@/lib/blog/topic-schema";

const { values } = parseArgs({
  options: {
    file: { type: "string" },
    status: { type: "string" },
  },
});

const allResults = readAllTopicFiles();
const results = values.file ? allResults.filter((r) => r.file === values.file) : allResults;

for (const result of results) {
  if (!result.ok) console.error(`${result.file}: ${result.error}`);
}

const validResults = results.filter(
  (r): r is { file: string; ok: true; topicList: TopicList } => r.ok
);

const allArticleFileSlugs = listAllSlugs().map((entry) => entry.fileSlug);
const duplicateIssues = findDuplicateTopicIds(
  validResults.map((r) => ({ file: r.file, topicList: r.topicList }))
);

for (const result of validResults) {
  const counts = { pending: 0, generated: 0, reviewed: 0, published: 0, discarded: 0 };
  for (const topic of result.topicList.topics) counts[topic.status] += 1;

  console.log(`\n${result.file}`);
  console.log(`  Categoría: ${result.topicList.category}`);
  console.log(`  Total de temas: ${result.topicList.topics.length}`);
  console.log(`  Pendientes: ${counts.pending}`);
  console.log(`  Generados: ${counts.generated}`);
  console.log(`  Revisados: ${counts.reviewed}`);
  console.log(`  Publicados: ${counts.published}`);
  console.log(`  Descartados: ${counts.discarded}`);

  const issues = [
    ...duplicateIssues.filter((issue) => issue.file === result.file),
    ...checkGeneratedTopicsHaveArticle(result.file, result.topicList, allArticleFileSlugs),
    ...checkPendingTopicsAgainstExistingSlugs(result.file, result.topicList, allArticleFileSlugs),
  ];

  if (issues.length > 0) {
    console.log("  Inconsistencias:");
    for (const issue of issues) {
      console.log(`    [${issue.level.toUpperCase()}] ${issue.message}`);
    }
  }

  if (values.status) {
    const filtered = result.topicList.topics.filter((topic) => topic.status === values.status);
    if (filtered.length > 0) {
      console.log(`  Temas con status "${values.status}":`);
      for (const topic of filtered) {
        console.log(`    - ${topic.id}: ${topic.title}`);
      }
    }
  }
}

if (validResults.length === 0) {
  console.log("No hay listados de temas en content/sources/topics/.");
}
