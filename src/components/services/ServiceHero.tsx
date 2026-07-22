import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
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
            <TrackedLink
              href={href}
              prefetch={false}
              className="btn-primary"
              event={ANALYTICS_EVENTS.clickServiceCta}
              params={{ service: service.slug, cta_position: "hero" }}
            >
              {service.cta.label} <span aria-hidden="true">→</span>
            </TrackedLink>
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
