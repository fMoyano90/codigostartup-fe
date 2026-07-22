import type { Metadata } from "next";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { BookingCalendar } from "@/components/contact/BookingCalendar";
import { ContactLeadForm } from "@/components/contact/ContactLeadForm";
import { RouteHero } from "@/components/site/RouteHero";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { siteConfig } from "@/config/site";
import { projectSlugSchema, serviceSlugSchema } from "@/lib/commercial/schema";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Evaluar proyecto",
  description: "Cuéntanos qué necesitas construir, digitalizar o mejorar.",
  path: "/contacto",
});

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const query = await searchParams;
  const serviceResult = serviceSlugSchema.safeParse(firstValue(query.servicio));
  const projectResult = projectSlugSchema.safeParse(firstValue(query.proyecto));
  const origin = firstValue(query.origen)?.trim().slice(0, 100);

  return (
    <main className="architecture-page contact-page">
      <RouteHero
        eyebrow="Contacto"
        title="Cuéntanos qué necesitas resolver"
        description="Te responderemos con claridad sobre el siguiente paso, el alcance inicial y la mejor forma de abordar tu proyecto."
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]}
        actions={
          <div className="contact-hero-actions">
            <a href="#formulario" className="btn-primary">Contar mi proyecto ↓</a>
            <a href="#agendar" className="solutions-hero-link">Agendar una reunión</a>
          </div>
        }
      />

      <ContactLeadForm
        initialService={serviceResult.success ? serviceResult.data : undefined}
        project={projectResult.success ? projectResult.data : undefined}
        origin={origin}
      />

      <BookingCalendar />

      <section className="route-container contact-options" aria-label="Opciones de contacto">
        <TrackedLink
          href={siteConfig.contact.whatsappUrl}
          external
          target="_blank"
          rel="noreferrer"
          className="contact-option"
          event={ANALYTICS_EVENTS.clickWhatsapp}
          params={{ source: "contact-page" }}
        >
          <span>Respuesta directa</span>
          <h2>Continuar por WhatsApp</h2>
          <p>Conversemos sobre el problema, la etapa actual y lo que necesitas evaluar.</p>
          <strong>Iniciar conversación →</strong>
        </TrackedLink>
        <a href={`mailto:${siteConfig.contact.email}`} className="contact-option contact-option--violet">
          <span>Correo</span>
          <h2>{siteConfig.contact.email}</h2>
          <p>Ideal si ya tienes documentación, contexto o antecedentes que quieras compartir.</p>
          <strong>Escribir correo →</strong>
        </a>
      </section>
    </main>
  );
}
