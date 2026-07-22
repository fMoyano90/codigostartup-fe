import { SectionHeader } from "@/components/SectionHeader";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { siteConfig } from "@/config/site";

export function BookingCalendar() {
  return (
    <section id="agendar" className="booking-section" aria-labelledby="booking-heading">
      <div className="service-page-container">
        <div className="booking-section-header">
          <SectionHeader
            eyebrow="Reserva directa"
            title="Elige un horario disponible"
            description="Agenda una reunión de 30 minutos. El calendario muestra la disponibilidad en la zona horaria America/Santiago."
            headingId="booking-heading"
          />
          <TrackedLink
            href={siteConfig.contact.bookingUrl}
            external
            target="_blank"
            rel="noreferrer"
            className="lead-booking-link"
            event={ANALYTICS_EVENTS.scheduleMeeting}
            params={{ source: "contact-page", cta_position: "booking-open" }}
          >
            Abrir calendario en otra pestaña <span aria-hidden="true">↗</span>
          </TrackedLink>
        </div>
        <div className="booking-frame-wrap">
          <iframe
            src={siteConfig.contact.bookingEmbedUrl}
            title="Calendario para agendar una reunión con Código Startup"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  );
}
