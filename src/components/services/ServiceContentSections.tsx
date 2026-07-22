import { SectionHeader } from "@/components/SectionHeader";
import type { Capability, Service } from "@/lib/commercial/schema";

type ServiceProblemsProps = Pick<Service, "problems"> & {
  title?: string;
  description?: string;
};

export function ServiceProblemList({
  problems,
  title = "Señales de que este servicio puede ayudarte",
  description,
}: ServiceProblemsProps) {
  if (problems.length === 0) return null;

  return (
    <section className="service-content-section">
      <div className="service-page-container">
        <SectionHeader
          eyebrow="Problemas que resolvemos"
          title={title}
          description={description}
        />
        <ol className="service-problem-list">
          {problems.map((problem, index) => (
            <li key={problem}>
              <span className="service-problem-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{problem}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ServiceSolutionTypes({ solutionTypes }: Pick<Service, "solutionTypes">) {
  if (solutionTypes.length === 0) return null;

  return (
    <section className="service-content-section service-content-section--tinted">
      <div className="service-page-container">
        <SectionHeader
          eyebrow="Tipos de solución"
          title="Construimos solamente lo que el problema necesita"
        />
        <div className="service-solution-grid">
          {solutionTypes.map((solution) => (
            <article key={solution.title} className="service-solution-card">
              <h3>{solution.title}</h3>
              <p>{solution.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceDeliverables({ deliverables }: Pick<Service, "deliverables">) {
  if (deliverables.length === 0) return null;

  return (
    <section className="service-content-section">
      <div className="service-page-container service-split-layout">
        <SectionHeader
          eyebrow="Qué incluye"
          title="Una entrega clara, no una caja negra"
        />
        <ul className="service-deliverable-list">
          {deliverables.map((deliverable) => (
            <li key={deliverable}>
              <span aria-hidden="true">◆</span>
              {deliverable}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServiceCapabilities({ capabilities }: { capabilities: Capability[] }) {
  if (capabilities.length === 0) return null;

  return (
    <section className="service-content-section service-capabilities">
      <div className="service-page-container">
        <SectionHeader
          eyebrow="Capacidades transversales"
          title="Todo lo necesario para construir y lanzar"
          description="No son servicios aislados: se incorporan cuando ayudan a resolver mejor el problema."
        />
        <div className="service-capability-grid">
          {capabilities.map((capability, index) => (
            <article key={capability.slug} className="service-capability-item">
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{capability.name}</h3>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceProcess({ process }: Pick<Service, "process">) {
  if (process.length === 0) return null;

  return (
    <section className="service-content-section">
      <div className="service-page-container">
        <SectionHeader
          eyebrow="Proceso"
          title="Avances visibles, decisiones explicadas"
        />
        <ol className="service-process-list">
          {process.map((step, index) => (
            <li key={`${step.title}-${index}`}>
              <span className="service-process-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
