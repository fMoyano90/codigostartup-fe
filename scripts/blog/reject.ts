import { parseArgs } from "node:util";
import matter from "gray-matter";
import { readRaw, findArticleDir, moveArticle } from "./lib/fs-content";
import { applyRejection } from "./lib/transitions";
import { todayIsoDate } from "./lib/report";
import { safeParseArticleFrontmatter } from "@/lib/blog/article-schema";

const { positionals } = parseArgs({ allowPositionals: true });
const fileSlug = positionals[0];

if (!fileSlug) {
  console.error("Uso: npm run blog:reject -- <slug>");
  process.exit(1);
}

const dir = findArticleDir(fileSlug);
if (dir !== "drafts") {
  console.error(
    dir
      ? `"${fileSlug}" está en content/blog/${dir}/ — solo se rechazan borradores en drafts/.`
      : `No se encontró el artículo "${fileSlug}" en content/blog/drafts/.`
  );
  process.exit(1);
}

const raw = readRaw("drafts", fileSlug);
const { data, content } = matter(raw);
const parsed = safeParseArticleFrontmatter(data);

const today = todayIsoDate();
const updatedFrontmatter = parsed.success
  ? applyRejection(parsed.data, today)
  : { ...data, status: "rejected", updatedAt: today };

const updatedRaw = matter.stringify(content, updatedFrontmatter);
moveArticle("drafts", "rejected", fileSlug, updatedRaw);

console.log(`"${fileSlug}" movido a content/blog/rejected/. status: rejected, updatedAt: ${today}.`);
