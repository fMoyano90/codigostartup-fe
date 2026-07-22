import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ServiceCapabilities } from "@/components/services";
import { RouteHero } from "@/components/site/RouteHero";
import { capabilities, projects, services } from "@/data/commercial";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Soluciones digitales",
  description: "Encuentra la solución adecuada para atraer clientes, ordenar tu operación, lanzar un producto o evolucionar un sistema existente.",
  path: "/soluciones",
});

const needs = [
  {
    key: "presencia-digital",
    label: "Necesito atraer clientes",
    description: "Construye una presencia profesional que explique tus servicios, genere confianza y facilite el contacto.",
  },
  {
    key: "operacion",
    label: "Necesito ordenar mi operación",
    description: "Centraliza información, reemplaza tareas manuales y adapta la tecnología a la forma real en que trabaja tu empresa.",
  },
  {
    key: "productos-digitales",
    label: "Quiero lanzar un producto",
    description: "Convierte una idea en una primera versión funcional o construye la aplicación que necesitan tus usuarios.",
  },
  {
    key: "sistemas-existentes",
    label: "Mi sistema necesita mejorar",
    description: "Entiende los riesgos, prioridades y próximos pasos antes de seguir invirtiendo en un sistema difícil de mantener.",
  },
] as const;

export default function SolutionsIndexPage() {
  return (
    <main className="architecture-page solutions-index-page">
      <RouteHero
        eyebrow="Soluciones"
        title="Una solución distinta para cada etapa de tu negocio"
        description="Partimos por el problema y el momento de tu empresa, no por una tecnología predeterminada."
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Soluciones" }]}
        actions={
          <div className="solutions-hero-actions">
            <a href="#soluciones-por-necesidad" className="btn-primary">Encontrar una solución ↓</a>
            <Link href="/contacto?origen=soluciones" prefetch={false} className="solutions-hero-link">Evaluar mi situación</Link>
          </div>
        }
      />

      <div id="soluciones-por-necesidad" className="route-container route-needs">
        {needs.map((need, index) => {
          const matchingServices = services.filter(({ need: serviceNeed }) => serviceNeed === need.key);

          return (
            <section key={need.key} className="route-need-group" aria-labelledby={`need-${need.key}`}>
              <div className="route-need-heading">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2 id={`need-${need.key}`}>{need.label}</h2>
                <p>{need.description}</p>
              </div>
              <div className="route-card-grid">
                {matchingServices.map((service) => (
                  <article key={service.slug} className="route-card solutions-route-card">
                    <span className="solutions-route-card-category">{service.hero.eyebrow}</span>
                    <h3><Link href={`/soluciones/${service.slug}`} prefetch={false}>{service.name}</Link></h3>
                    <p>{service.shortDescription}</p>
                    <div className="solutions-route-situations">
                      <strong>Te sirve si</strong>
                      <ul>
                        {service.problems.slice(0, 3).map((problem) => <li key={problem}>{problem}</li>)}
                      </ul>
                    </div>
                    <div className="solutions-route-card-actions">
                      <Link href={`/soluciones/${service.slug}`} prefetch={false} className="route-card-link">
                        Ver detalle <span aria-hidden="true">→</span>
                      </Link>
                      <Link href={`/contacto?servicio=${service.slug}`} prefetch={false} className="solutions-contextual-cta">
                        {service.cta.label}
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <ServiceCapabilities capabilities={capabilities} />

      <section className="service-content-section service-content-section--tinted" aria-labelledby="solutions-projects-heading">
        <div className="service-page-container">
          <SectionHeader
            eyebrow="Proyectos relacionados"
            title="Productos construidos, lanzados y operando"
            description="Proyectos de clientes y un producto propio que conectan distintas necesidades con soluciones reales."
            headingId="solutions-projects-heading"
          />
          <div className="project-card-grid solutions-project-grid">
            {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
        </div>
      </section>

      <section className="service-cta solutions-evaluation-cta" aria-labelledby="solutions-cta-heading">
        <div className="service-cta-orbit" aria-hidden="true" />
        <div className="service-page-container service-cta-inner">
          <span className="service-cta-label">Evaluación inicial</span>
          <h2 id="solutions-cta-heading">No necesitas elegir la solución antes de conversar</h2>
          <p>Cuéntanos qué está ocurriendo en tu negocio. Partimos con un diagnóstico para definir la ruta, el alcance y el siguiente paso.</p>
          <Link href="/contacto?origen=soluciones" prefetch={false} className="btn-dark">
            Evaluar mi proyecto <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
