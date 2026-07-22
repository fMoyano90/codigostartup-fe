import { SectionHeader } from "@/components/SectionHeader";
import type { Service } from "@/lib/commercial/schema";

export function ServiceFAQ({ faq }: Pick<Service, "faq">) {
  if (faq.length === 0) return null;

  return (
    <section className="service-content-section">
      <div className="service-page-container service-split-layout">
        <SectionHeader
          eyebrow="Preguntas frecuentes"
          title="Lo que conviene aclarar antes de comenzar"
        />
        <div className="service-faq-list">
          {faq.map((item) => (
            <details key={item.question} className="service-faq-item">
              <summary>
                <span>{item.question}</span>
                <span className="service-faq-icon" aria-hidden="true">+</span>
              </summary>
              <div className="service-faq-answer"><p>{item.answer}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
