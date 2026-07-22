import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { RouteHero } from "@/components/site/RouteHero";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Proyectos",
  description: "Productos digitales construidos, lanzados y operando.",
  path: "/proyectos",
});

export default function ProjectsIndexPage() {
  const clientProjects = projects.filter(({ kind }) => kind === "client");
  const ownProducts = projects.filter(({ kind }) => kind === "own-product");

  return (
    <main className="architecture-page projects-index-page">
      <RouteHero
        eyebrow="Proyectos"
        title="Construido. Lanzado. Operando."
        description="Proyectos reales de clientes y productos propios desarrollados por Código Startup. Cada caso separa la información verificada de los antecedentes editoriales pendientes."
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Proyectos" }]}
        actions={<a href="#casos-clientes" className="btn-primary">Explorar proyectos ↓</a>}
      />

      <section id="casos-clientes" className="projects-index-section" aria-labelledby="client-projects-heading">
        <div className="service-page-container">
          <SectionHeader
            eyebrow="Proyectos de clientes"
            title="Soluciones construidas para operaciones reales"
            description="Los testimonios y funcionalidades publicados provienen de la información disponible en el repositorio. Los vacíos permanecen identificados dentro de cada caso."
            headingId="client-projects-heading"
          />
          <div className="project-card-grid">
            {clientProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
        </div>
      </section>

      <section className="projects-index-section projects-index-section--own" aria-labelledby="own-products-heading">
        <div className="service-page-container projects-own-layout">
          <div>
            <SectionHeader
              eyebrow="Laboratorio propio"
              title="También construimos y operamos nuestros productos"
              description="Un producto propio no se presenta como caso de cliente. Se distingue para explicar el aprendizaje que surge de construir, lanzar y evolucionar una plataforma propia."
              headingId="own-products-heading"
            />
            <Link href="/nosotros" className="home-text-link">Conocer más sobre Código Startup →</Link>
          </div>
          <div className="project-card-grid projects-own-grid">
            {ownProducts.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
