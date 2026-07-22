import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import {
  parseArticleFrontmatter,
  type BlogArticleFrontmatter,
} from "@/lib/blog/article-schema";
import { calculateReadingTime, countWords } from "@/lib/blog/article-utils";
import { mdxComponents } from "@/components/blog/mdx-components";
import type { ReactElement } from "react";

const CONTENT_ROOT = path.join(process.cwd(), "content", "blog");

export type ArticleStatusDir = "drafts" | "published" | "rejected";

export type ArticleMetadata = BlogArticleFrontmatter & {
  /** Filename (without extension) — the source of truth for routing. */
  fileSlug: string;
  readingTime: number;
  wordCount: number;
};

export type Article = {
  metadata: ArticleMetadata;
  content: ReactElement;
};

function statusDirPath(dir: ArticleStatusDir): string {
  return path.join(CONTENT_ROOT, dir);
}

function listMdxFiles(dir: ArticleStatusDir): string[] {
  const dirPath = statusDirPath(dir);
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function readRawArticle(dir: ArticleStatusDir, fileSlug: string): string {
  const filePath = path.join(statusDirPath(dir), `${fileSlug}.mdx`);
  return fs.readFileSync(filePath, "utf-8");
}

function parseArticleMetadata(dir: ArticleStatusDir, fileSlug: string): {
  metadata: ArticleMetadata;
  body: string;
} {
  const raw = readRawArticle(dir, fileSlug);
  const { data, content: body } = matter(raw);

  let frontmatter: BlogArticleFrontmatter;
  try {
    frontmatter = parseArticleFrontmatter(data);
  } catch (error) {
    throw new Error(
      `Frontmatter inválido en content/blog/${dir}/${fileSlug}.mdx: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }

  return {
    metadata: {
      ...frontmatter,
      fileSlug,
      readingTime: calculateReadingTime(body),
      wordCount: countWords(body),
    },
    body,
  };
}

function sortByPublishedDateDesc(articles: ArticleMetadata[]): ArticleMetadata[] {
  return [...articles].sort((a, b) => {
    const dateA = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const dateB = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return dateB - dateA;
  });
}

export function getPublishedSlugs(): string[] {
  return listMdxFiles("published");
}

export function getAllPublishedArticles(): ArticleMetadata[] {
  const articles = getPublishedSlugs().map(
    (fileSlug) => parseArticleMetadata("published", fileSlug).metadata
  );
  return sortByPublishedDateDesc(articles);
}

export function getFeaturedArticles(
  articles: ArticleMetadata[] = getAllPublishedArticles()
): ArticleMetadata[] {
  return articles.filter((article) => article.featured);
}

export function getArticleMetadataBySlug(
  fileSlug: string,
  dir: ArticleStatusDir = "published"
): ArticleMetadata | null {
  if (!listMdxFiles(dir).includes(fileSlug)) return null;
  return parseArticleMetadata(dir, fileSlug).metadata;
}

const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
};

export async function getArticleBySlug(
  fileSlug: string,
  dir: ArticleStatusDir = "published"
): Promise<Article | null> {
  if (!listMdxFiles(dir).includes(fileSlug)) return null;

  const { metadata, body } = parseArticleMetadata(dir, fileSlug);

  const { content } = await compileMDX({
    source: body,
    components: mdxComponents,
    options: { mdxOptions },
  });

  return { metadata, content };
}
