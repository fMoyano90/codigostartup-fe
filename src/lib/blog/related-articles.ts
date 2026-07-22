import {
  getAllPublishedArticles,
  type ArticleMetadata,
} from "@/lib/blog/article-loader";

export function getRelatedArticles(
  metadata: ArticleMetadata,
  allPublished: ArticleMetadata[] = getAllPublishedArticles()
): ArticleMetadata[] {
  return metadata.relatedArticles
    .map((slug) => allPublished.find((article) => article.fileSlug === slug))
    .filter((article): article is ArticleMetadata => Boolean(article));
}
