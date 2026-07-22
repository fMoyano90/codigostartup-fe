import Link from "next/link";
import type { Service } from "@/lib/commercial/schema";

type ServiceCTAProps = Pick<Service, "slug" | "cta"> & {
  href?: string;
};

export function ServiceCTA({ slug, cta, href }: ServiceCTAProps) {
  return (
    <section className="service-cta">
      <div className="service-cta-orbit" aria-hidden="true" />
      <div className="service-page-container service-cta-inner">
        <span className="service-cta-label">Siguiente paso</span>
        <h2>{cta.title}</h2>
        <p>{cta.description}</p>
        <Link href={href ?? `/contacto?servicio=${slug}`} prefetch={false} className="btn-dark">
          {cta.label} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
