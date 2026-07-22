import { ArticleCard } from "@/components/blog/ArticleCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import type { ArticleMetadata } from "@/lib/blog/article-loader";
import type { Project } from "@/lib/commercial/schema";

export function ServiceCaseStudies({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="service-content-section service-content-section--tinted">
      <div className="service-page-container">
        <SectionHeader
          eyebrow="Proyectos relacionados"
          title="Productos construidos, lanzados y operando"
        />
        <div className="project-card-grid">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </div>
    </section>
  );
}

export function ServiceArticles({ articles }: { articles: ArticleMetadata[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="service-content-section">
      <div className="service-page-container">
        <SectionHeader
          eyebrow="Contenido relacionado"
          title="Decide con más contexto antes de construir"
        />
        <div className="article-grid">
          {articles.map((article) => <ArticleCard key={article.fileSlug} article={article} />)}
        </div>
      </div>
    </section>
  );
}
