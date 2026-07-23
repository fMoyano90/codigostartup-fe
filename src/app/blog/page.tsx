import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { FeaturedHeroCard } from "@/components/blog/FeaturedArticle";
import { CategoryPillarGrid } from "@/components/blog/CategoryPillarGrid";
import BlogAnimationsLoader from "@/components/blog/BlogAnimationsLoader";
import { siteConfig } from "@/config/site";
import { getAllPublishedArticles, getFeaturedArticles } from "@/lib/blog/article-loader";
import { getCategoriesWithCounts } from "@/lib/blog/category-utils";

const TITLE = "Tecnología para tomar mejores decisiones";
const DESCRIPTION =
  "Guías y análisis para crear productos digitales, automatizar procesos y evaluar inversiones tecnológicas sin tomar decisiones a ciegas.";

const FEATURED_LIMIT = 3;
const RECENT_LIMIT = 6;

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
  const featured = getFeaturedArticles(articles).slice(0, FEATURED_LIMIT);
  const featuredSlugs = new Set(featured.map((article) => article.fileSlug));
  const recent = articles
    .filter((article) => !featuredSlugs.has(article.fileSlug))
    .slice(0, RECENT_LIMIT);
  const categories = getCategoriesWithCounts(articles);
  const [heroFeatured, ...secondaryFeatured] = featured;

  return (
    <main className="blog-index">
      <BlogAnimationsLoader />

      <header className="blog-hero">
        <div className="blog-hero-eyebrow">Blog</div>
        <h1 className="blog-hero-title">{TITLE}</h1>
        <p className="blog-hero-desc">{DESCRIPTION}</p>
      </header>

      {heroFeatured && (
        <section aria-labelledby="featured-heading" className="blog-featured">
          <h2 id="featured-heading" className="blog-section-title">
            Destacados
          </h2>
          <div className="featured-hero-grid">
            <FeaturedHeroCard article={heroFeatured} />
            {secondaryFeatured.length > 0 && (
              <div className="featured-secondary">
                {secondaryFeatured.map((article) => (
                  <ArticleCard key={article.fileSlug} article={article} />
                ))}
              </div>
            )}
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

      <section aria-labelledby="pillar-heading" className="blog-pillar" id="categorias">
        <h2 id="pillar-heading" className="blog-section-title">
          Explora por categoría
        </h2>
        <CategoryPillarGrid categories={categories} />
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
