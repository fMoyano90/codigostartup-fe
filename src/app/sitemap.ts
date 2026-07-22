import type { MetadataRoute } from "next";
import { blogCategories } from "@/config/blog-categories";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { getAllPublishedArticles } from "@/lib/blog/article-loader";
import { getArticleCanonicalUrl, isInternalCanonicalUrl } from "@/lib/blog/article-urls";

const BASE_URL = siteConfig.baseUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllPublishedArticles();

  const articleEntries: MetadataRoute.Sitemap = articles.flatMap((article) => {
    const canonicalUrl = getArticleCanonicalUrl(article);
    return isInternalCanonicalUrl(canonicalUrl) ? [{
      url: canonicalUrl,
      lastModified: article.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }] : [];
  });

  const categoryEntries: MetadataRoute.Sitemap = blogCategories.map((category) => ({
    url: `${BASE_URL}/blog/categoria/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${BASE_URL}/soluciones/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/proyectos/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
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
    ...["soluciones", "proyectos", "nosotros", "proceso", "contacto"].map((path) => ({
      url: `${BASE_URL}/${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "soluciones" || path === "proyectos" ? 0.9 : 0.7,
    })),
    ...serviceEntries,
    ...projectEntries,
    ...categoryEntries,
    ...articleEntries,
  ];
}
