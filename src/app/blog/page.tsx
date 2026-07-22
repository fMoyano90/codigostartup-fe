import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { siteConfig } from "@/config/site";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { getAllPublishedArticles, getFeaturedArticles } from "@/lib/blog/article-loader";
import { getCategoriesWithCounts } from "@/lib/blog/category-utils";

const TITLE = "Tecnología para tomar mejores decisiones";
const DESCRIPTION =
  "Guías y análisis para crear productos digitales, automatizar procesos y evaluar inversiones tecnológicas sin tomar decisiones a ciegas.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | ${siteConfig.name}` },
  description: DESCRIPTION,
  alternates: {
    canonical: `${siteConfig.baseUrl}/blog`,
    types: { "application/rss+xml": `${siteConfig.baseUrl}/rss.xml` },
  },
  openGraph: {
    title: `${TITLE} | ${siteConfig.name}`,
    description: DESCRIPTION,
    url: `${siteConfig.baseUrl}/blog`,
    type: "website",
    siteName: siteConfig.name,
    locale: "es_CL",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ${siteConfig.name}`,
    description: DESCRIPTION,
  },
};

export default function BlogIndexPage() {
  const articles = getAllPublishedArticles();
  const featured = getFeaturedArticles(articles);
  const recent = articles.filter((article) => !article.featured);
  const categories = getCategoriesWithCounts(articles);

  return (
    <main className="blog-index">
      <header className="blog-hero">
        <h1 className="blog-hero-title">{TITLE}</h1>
        <p className="blog-hero-desc">{DESCRIPTION}</p>
      </header>

      <CategoryFilter categories={categories} />

      {featured.length > 0 && (
        <section aria-labelledby="featured-heading" className="blog-section">
          <h2 id="featured-heading" className="blog-section-title">
            Destacados
          </h2>
          <div className="article-grid">
            {featured.map((article) => (
              <ArticleCard key={article.fileSlug} article={article} />
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="recent-heading" className="blog-section">
        <h2 id="recent-heading" className="blog-section-title">
          Artículos recientes
        </h2>
        {recent.length > 0 ? (
          <div className="article-grid">
            {recent.map((article) => (
              <ArticleCard key={article.fileSlug} article={article} />
            ))}
          </div>
        ) : (
          <p className="blog-empty-state">Todavía no hay artículos publicados.</p>
        )}
      </section>

      <section className="blog-cta">
        <p>¿Tienes un proyecto en mente y quieres evaluar cómo abordarlo?</p>
        <Link href="/contacto?origen=blog" className="btn-primary">
          Cuéntanos tu proyecto →
        </Link>
      </section>
    </main>
  );
}
