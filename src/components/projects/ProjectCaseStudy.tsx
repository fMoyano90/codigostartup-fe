import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { SectionHeader } from "@/components/SectionHeader";
import type { ArticleMetadata } from "@/lib/blog/article-loader";
import type { Project, Service } from "@/lib/commercial/schema";

type ProjectCaseStudyProps = {
  project: Project;
  relatedServices: Service[];
  relatedArticles: ArticleMetadata[];
};

function EditorialPlaceholder({ children }: { children: string }) {
  return (
    <aside className="project-editorial-placeholder">
      <span>Pendiente editorial</span>
      <p>{children}</p>
    </aside>
  );
}

function NarrativeBlock({
  index,
  title,
  value,
  placeholder,
}: {
  index: string;
  title: string;
  value: string | null;
  placeholder: string;
}) {
  return (
    <article className={`project-narrative-block${value ? "" : " project-narrative-block--pending"}`}>
      <span aria-hidden="true">{index}</span>
      <div>
        <h3>{title}</h3>
        {value ? <p>{value}</p> : <EditorialPlaceholder>{placeholder}</EditorialPlaceholder>}
      </div>
    </article>
  );
}

export function ProjectCaseStudy({ project, relatedServices, relatedArticles }: ProjectCaseStudyProps) {
  const { caseStudy } = project;

  return (
    <>
      <section className="project-case-overview">
        <div className="service-page-container project-case-overview-grid">
          <div className="project-case-identity">
            <span>{project.kind === "own-product" ? "Producto propio" : "Proyecto de cliente"}</span>
            <Image src={project.logo} alt={`Logo ${project.name}`} width={260} height={110} />
            <p>{project.hook}</p>
          </div>
          <div className="project-case-metrics" aria-label="Características verificadas del proyecto">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.val}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="project-case-section" aria-labelledby="project-story-heading">
        <div className="service-page-container project-case-split">
          <SectionHeader
            eyebrow="El caso"
            title="Del contexto a la solución"
            description="Esta página distingue la información verificada de los antecedentes que todavía deben validarse editorialmente."
            headingId="project-story-heading"
          />
          <div className="project-narrative-list">
            <NarrativeBlock index="01" title="Contexto" value={caseStudy.context} placeholder="Describir el contexto del cliente y del proyecto." />
            <NarrativeBlock index="02" title="Problema" value={caseStudy.problem} placeholder="Validar el problema original con el cliente." />
            <NarrativeBlock index="03" title="Situación anterior" value={caseStudy.previousState} placeholder="Documentar cómo se realizaba el proceso antes de la solución." />
            <NarrativeBlock index="04" title="Objetivo" value={caseStudy.objective} placeholder="Validar el objetivo inicial y sus criterios de éxito." />
            <NarrativeBlock index="05" title="Solución" value={caseStudy.solution} placeholder="Describir la solución implementada con alcance validado." />
          </div>
        </div>
      </section>

      <section className="project-case-section project-case-section--tinted" aria-labelledby="project-features-heading">
        <div className="service-page-container">
          <SectionHeader eyebrow="Funcionalidades" title="Qué incluye la solución" headingId="project-features-heading" />
          {caseStudy.features.length > 0 ? (
            <ol className="project-feature-grid">
              {caseStudy.features.map((feature, index) => (
                <li key={feature}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <p>{feature}</p>
                </li>
              ))}
            </ol>
          ) : (
            <EditorialPlaceholder>Agregar funcionalidades verificadas del proyecto.</EditorialPlaceholder>
          )}
        </div>
      </section>

      <section className="project-case-section" aria-labelledby="project-process-heading">
        <div className="service-page-container project-case-split">
          <SectionHeader eyebrow="Proceso" title="Cómo se construyó" headingId="project-process-heading" />
          {caseStudy.process.length > 0 ? (
            <ol className="project-process-list">
              {caseStudy.process.map((step, index) => (
                <li key={`${step.title}-${index}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{step.title}</h3><p>{step.description}</p></div>
                </li>
              ))}
            </ol>
          ) : (
            <EditorialPlaceholder>Documentar las etapas del proceso y la participación del cliente.</EditorialPlaceholder>
          )}
        </div>
      </section>

      <section className="project-case-section project-result-section" aria-labelledby="project-result-heading">
        <div className="service-page-container project-case-split">
          <SectionHeader eyebrow="Resultado" title="Qué se puede verificar" headingId="project-result-heading" />
          <div>
            {caseStudy.result ? <p className="project-result-copy">{caseStudy.result}</p> : (
              <EditorialPlaceholder>Agregar resultados verificables sin inventar métricas ni atribuciones.</EditorialPlaceholder>
            )}
            {project.testimonial ? (
              <blockquote className="project-case-testimonial">
                <p>“{project.testimonial.quote}”</p>
                <cite>{project.testimonial.author}</cite>
              </blockquote>
            ) : (
              <EditorialPlaceholder>Validar un testimonio o definir editorialmente si no corresponde.</EditorialPlaceholder>
            )}
          </div>
        </div>
      </section>

      <section className="project-case-section project-case-section--tinted" aria-labelledby="project-gallery-heading">
        <div className="service-page-container">
          <SectionHeader eyebrow="Galería" title="El producto en contexto" headingId="project-gallery-heading" />
          {caseStudy.gallery.length > 0 ? (
            <div className="project-gallery-grid">
              {caseStudy.gallery.map((image) => (
                <figure key={image.src}>
                  <div className="project-gallery-image-wrap">
                    <Image src={image.src} alt={image.alt} width={1200} height={900} className="project-gallery-image" />
                  </div>
                  {image.caption && <figcaption>{image.caption}</figcaption>}
                </figure>
              ))}
            </div>
          ) : (
            <EditorialPlaceholder>Agregar capturas o mockups validados del proyecto.</EditorialPlaceholder>
          )}
        </div>
      </section>

      <section className="project-case-section" aria-labelledby="project-services-heading">
        <div className="service-page-container">
          <SectionHeader eyebrow="Servicios relacionados" title="Capacidades aplicadas al proyecto" headingId="project-services-heading" />
          <div className="project-related-services">
            {relatedServices.map((service) => (
              <article key={service.slug}>
                <span>{service.hero.eyebrow}</span>
                <h3><Link href={`/soluciones/${service.slug}`} prefetch={false}>{service.name}</Link></h3>
                <p>{service.shortDescription}</p>
                <Link href={`/soluciones/${service.slug}`} prefetch={false}>Conocer solución →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <section className="project-case-section project-case-section--tinted" aria-labelledby="project-articles-heading">
          <div className="service-page-container">
            <SectionHeader eyebrow="Contenido relacionado" title="Más contexto para decidir" headingId="project-articles-heading" />
            <div className="article-grid">
              {relatedArticles.map((article) => <ArticleCard key={article.fileSlug} article={article} />)}
            </div>
          </div>
        </section>
      )}

      <section className="project-case-cta" aria-labelledby="project-cta-heading">
        <div className="project-case-cta-orbit" aria-hidden="true" />
        <div className="service-page-container project-case-cta-inner">
          <span>Siguiente proyecto</span>
          <h2 id="project-cta-heading">¿Necesitas construir algo similar?</h2>
          <p>Cuéntanos qué problema necesitas resolver y revisaremos qué tipo de solución tiene sentido para tu contexto.</p>
          <Link href={`/contacto?proyecto=${project.slug}`} prefetch={false} className="btn-dark">Evaluar mi proyecto →</Link>
        </div>
      </section>
    </>
  );
}
