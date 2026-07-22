import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrackView } from "@/components/analytics/TrackView";
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";
import { JsonLd } from "@/components/seo/JsonLd";
import { RouteHero } from "@/components/site/RouteHero";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { getArticleMetadataBySlug } from "@/lib/blog/article-loader";
import { buildBreadcrumbSchema } from "@/lib/seo/structured-data";
import { createPageMetadata } from "@/lib/metadata";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return createPageMetadata({
    title: project.name,
    description: project.description,
    path: `/proyectos/${project.slug}`,
  });
}

export default async function ProjectRoutePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const relatedServices = project.relatedServices.flatMap((serviceSlug) => {
    const service = services.find((item) => item.slug === serviceSlug);
    return service ? [service] : [];
  });
  const relatedArticles = project.caseStudy.relatedArticles.flatMap((articleSlug) => {
    const article = getArticleMetadataBySlug(articleSlug);
    return article ? [article] : [];
  });

  const breadcrumb = buildBreadcrumbSchema([
    { name: "Inicio", url: siteConfig.baseUrl },
    { name: "Proyectos", url: `${siteConfig.baseUrl}/proyectos` },
    { name: project.name, url: `${siteConfig.baseUrl}/proyectos/${project.slug}` },
  ]);

  return (
    <main className="architecture-page project-case-page">
      <TrackView event={ANALYTICS_EVENTS.viewProject} params={{ project: project.slug }} />
      <JsonLd data={breadcrumb} />
      <RouteHero
        eyebrow={project.kind === "own-product" ? "Producto propio" : project.sector}
        title={project.name}
        description={project.description}
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Proyectos", href: "/proyectos" },
          { label: project.name },
        ]}
        actions={project.externalUrl ? (
          <a href={project.externalUrl} target="_blank" rel="noreferrer" className="btn-primary">
            Visitar producto <span aria-hidden="true">→</span>
          </a>
        ) : undefined}
      />
      <ProjectCaseStudy project={project} relatedServices={relatedServices} relatedArticles={relatedArticles} />
    </main>
  );
}
