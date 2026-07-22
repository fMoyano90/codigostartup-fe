import { blogCategories, type BlogCategory } from "@/config/blog-categories";
import type { ArticleMetadata } from "@/lib/blog/article-loader";

export type CategoryWithCount = BlogCategory & { articleCount: number };

export function getCategoriesWithCounts(
  articles: ArticleMetadata[]
): CategoryWithCount[] {
  return blogCategories.map((category) => ({
    ...category,
    articleCount: articles.filter((article) => article.category === category.slug)
      .length,
  }));
}

export function filterArticlesByCategory(
  articles: ArticleMetadata[],
  categorySlug: string
): ArticleMetadata[] {
  return articles.filter((article) => article.category === categorySlug);
}
