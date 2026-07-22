import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { Service } from "@/lib/commercial/schema";

type ServiceHeroProps = {
  service: Service;
  ctaHref?: string;
};

export function ServiceHero({ service, ctaHref }: ServiceHeroProps) {
  const href = ctaHref ?? `/contacto?servicio=${service.slug}`;

  return (
    <section className="service-page-hero" data-service={service.slug}>
      <div className="service-page-hero-grid" aria-hidden="true" />
      <div className="service-page-container service-page-hero-inner">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Soluciones", href: "/soluciones", prefetch: false },
            { label: service.name },
          ]}
        />
        <div className="service-page-hero-content">
          <div className="service-page-hero-copy">
            <div className="service-page-eyebrow">{service.hero.eyebrow ?? service.name}</div>
            <h1 className="service-page-title">{service.hero.title}</h1>
            <p className="service-page-intro">{service.hero.description}</p>
            <Link href={href} prefetch={false} className="btn-primary">
              {service.cta.label} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <aside className="service-page-audience" aria-label="Para quién es este servicio">
            <span className="service-page-audience-label">Pensado para</span>
            <ul>
              {service.audience.map((audience) => <li key={audience}>{audience}</li>)}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
