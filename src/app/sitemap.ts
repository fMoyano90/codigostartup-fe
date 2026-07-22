import type { MetadataRoute } from "next";
import { blogCategories } from "@/config/blog-categories";
import { siteConfig } from "@/config/site";
import { getAllPublishedArticles } from "@/lib/blog/article-loader";

const BASE_URL = siteConfig.baseUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllPublishedArticles();

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/blog/${article.fileSlug}`,
    lastModified: article.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryEntries: MetadataRoute.Sitemap = blogCategories.map((category) => ({
    url: `${BASE_URL}/blog/categoria/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...categoryEntries,
    ...articleEntries,
  ];
}
