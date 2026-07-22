import Link from "next/link";
import type { Service } from "@/lib/commercial/schema";

export function RelatedServices({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <section className="article-services" aria-labelledby="article-services-heading">
      <div className="section-tag">Soluciones relacionadas</div>
      <h2 id="article-services-heading">Lleva esta decisión a un proyecto concreto</h2>
      <div className="article-services-grid">
        {services.map((service) => (
          <article key={service.slug}>
            <span>{service.hero.eyebrow}</span>
            <h3><Link href={`/soluciones/${service.slug}`}>{service.name}</Link></h3>
            <p>{service.shortDescription}</p>
            <Link href={`/soluciones/${service.slug}`} className="article-service-link">
              Conocer la solución <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
