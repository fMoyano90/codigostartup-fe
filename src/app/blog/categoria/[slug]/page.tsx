import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { blogCategories, getCategoryBySlug } from "@/config/blog-categories";
import { siteConfig } from "@/config/site";
import { getAllPublishedArticles } from "@/lib/blog/article-loader";
import { getCategoriesWithCounts, filterArticlesByCategory } from "@/lib/blog/category-utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return blogCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} | Blog Código Startup`,
    description: category.description,
    alternates: { canonical: `${siteConfig.baseUrl}/blog/categoria/${slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const articles = getAllPublishedArticles();
  const categoryArticles = filterArticlesByCategory(articles, slug);
  const categories = getCategoriesWithCounts(articles);

  return (
    <main className="blog-category">
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: category.name },
        ]}
      />

      <header className="blog-hero">
        <h1 className="blog-hero-title">{category.name}</h1>
        <p className="blog-hero-desc">{category.description}</p>
      </header>

      <CategoryFilter categories={categories} activeSlug={slug} />

      {categoryArticles.length > 0 ? (
        <div className="article-grid">
          {categoryArticles.map((article) => (
            <ArticleCard key={article.fileSlug} article={article} />
          ))}
        </div>
      ) : (
        <p className="blog-empty-state">
          Todavía no hay artículos publicados en esta categoría.
        </p>
      )}
    </main>
  );
}
