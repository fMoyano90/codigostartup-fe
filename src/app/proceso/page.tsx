import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { RouteHero } from "@/components/site/RouteHero";
import { capabilities } from "@/data/capabilities";
import { processCapabilitySlugs, processPhases } from "@/data/institutional";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Proceso de trabajo",
  description: "Conoce cómo diagnosticamos, definimos, diseñamos, construimos, probamos, lanzamos y evolucionamos productos digitales.",
  path: "/proceso",
});

export default function ProcessPage() {
  const transversalCapabilities = processCapabilitySlugs.map((slug) => {
    const capability = capabilities.find((item) => item.slug === slug);
    if (!capability) throw new Error(`No existe la capacidad transversal ${slug}`);
    return capability;
  });

  return (
    <main className="architecture-page process-page">
      <RouteHero
        eyebrow="Proceso"
        title="Sin secretos: así construimos"
        description="Trabajamos con las puertas abiertas para que siempre sepas qué se construyó, qué sigue y por qué."
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Proceso" }]}
        actions={<a href="#etapas" className="btn-primary">Ver las etapas ↓</a>}
      />

      <section className="process-control-strip" aria-label="Principios de control del proyecto">
        <div className="service-page-container process-control-grid">
          <div><span>01</span><strong>Alcance y precio claros</strong></div>
          <div><span>02</span><strong>Entregas semanales</strong></div>
          <div><span>03</span><strong>Decisiones explicadas</strong></div>
          <div><span>04</span><strong>Documentación y traspaso</strong></div>
        </div>
      </section>

      <section id="etapas" className="service-content-section process-phases-section" aria-labelledby="process-phases-heading">
        <div className="service-page-container">
          <SectionHeader
            eyebrow="Ocho etapas"
            title="Del problema a un producto que puede continuar"
            description="La intensidad de cada etapa cambia según el proyecto, pero la visibilidad del avance, las decisiones y los entregables se mantiene."
            headingId="process-phases-heading"
          />
          <ol className="process-phase-list">
            {processPhases.map((phase) => (
              <li key={phase.n} className="process-phase-card">
                <div className="process-phase-heading">
                  <span>{phase.n}</span>
                  <div><h3>{phase.title}</h3><p>{phase.description}</p></div>
                </div>
                <div className="process-phase-detail">
                  <div>
                    <strong>Cómo participa el cliente</strong>
                    <p>{phase.clientParticipation}</p>
                  </div>
                  <div>
                    <strong>Qué recibe</strong>
                    <ul>{phase.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}</ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="service-content-section service-capabilities" aria-labelledby="process-capabilities-heading">
        <div className="service-page-container">
          <SectionHeader
            eyebrow="Trabajo transversal"
            title="Capacidades que acompañan las etapas"
            description="No son pasos aislados ni servicios agregados al final. Se incorporan cuando ayudan a tomar mejores decisiones y sostener el producto."
            headingId="process-capabilities-heading"
          />
          <div className="service-capability-grid process-capability-grid">
            {transversalCapabilities.map((capability, index) => (
              <article key={capability.slug} className="service-capability-item">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{capability.name}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
            <article className="service-capability-item process-documentation-card">
              <span>09</span>
              <h3>Documentación y traspaso</h3>
              <p>Registro de lo acordado y conocimiento necesario para operar, mantener o continuar el producto después de la entrega.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="process-visibility-section" aria-labelledby="process-visibility-heading">
        <div className="service-page-container process-visibility-grid">
          <SectionHeader
            eyebrow="Control del avance"
            title="Revisar, decidir y continuar sin esperar al final"
            description="El cliente participa validando prioridades, reglas y entregas. Cada revisión deja visible qué se completó, qué decisión falta y cuál es el siguiente avance."
            headingId="process-visibility-heading"
          />
          <div className="process-visibility-flow" aria-label="Ciclo de control del avance">
            <div><span>01</span><strong>Avance demostrable</strong></div>
            <div><span>02</span><strong>Revisión conjunta</strong></div>
            <div><span>03</span><strong>Feedback y decisiones</strong></div>
            <div><span>04</span><strong>Siguiente entrega</strong></div>
          </div>
        </div>
      </section>

      <section className="service-cta" aria-labelledby="process-cta-heading">
        <div className="service-cta-orbit" aria-hidden="true" />
        <div className="service-page-container service-cta-inner">
          <span className="service-cta-label">Primer paso</span>
          <h2 id="process-cta-heading">Partamos por entender el problema</h2>
          <p>No necesitas llegar con una solución definida. El diagnóstico permite ordenar el contexto, las prioridades y la ruta posible.</p>
          <Link href="/contacto?origen=proceso" prefetch={false} className="btn-dark">Evaluar mi proyecto <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
