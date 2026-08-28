import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";

const whatsappUrl = `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(
  "Hola Código Startup, quiero conversar sobre un proyecto.",
)}`;

const companyLinks = [
  { label: "Proyectos", href: "/proyectos" },
  { label: "Blog", href: "/blog" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Proceso", href: "/proceso" },
  { label: "Contacto", href: "/contacto" },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <div className="site-footer-brand">
          <Link href="/" prefetch={false} aria-label="Código Startup, inicio">
            <Image src="/isotipo.svg" alt="Código Startup" width={48} height={43} />
          </Link>
          <p>Construimos productos digitales que perduran.</p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="site-footer-evaluate">
            Hablemos
          </a>
        </div>

        <nav className="site-footer-column" aria-label="Soluciones en el footer">
          <span className="site-footer-heading">Soluciones</span>
          {services.map((service) => (
            <Link key={service.slug} href={`/soluciones/${service.slug}`}>{service.name}</Link>
          ))}
        </nav>

        <nav className="site-footer-column" aria-label="Empresa en el footer">
          <span className="site-footer-heading">Empresa</span>
          {companyLinks.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </nav>

        <div className="site-footer-column site-footer-contact">
          <span className="site-footer-heading">Contacto</span>
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          <TrackedLink
            href={siteConfig.contact.whatsappUrl}
            external
            target="_blank"
            rel="noreferrer"
            event={ANALYTICS_EVENTS.clickWhatsapp}
            params={{ source: "footer" }}
          >
            WhatsApp
          </TrackedLink>
          {siteConfig.social.linkedin && (
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
          {siteConfig.social.instagram && (
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          )}
        </div>
      </div>

      <div className="site-footer-bottom">
        <span>© {new Date().getFullYear()} Código Startup</span>
        <span>Desarrollo · Estrategia · Diseño</span>
      </div>
    </footer>
  );
}
