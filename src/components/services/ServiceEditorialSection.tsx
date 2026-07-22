import { SectionHeader } from "@/components/SectionHeader";

export type ServiceEditorialSectionData = {
  eyebrow: string;
  title: string;
  description?: string;
  items: Array<{
    title: string;
    description: string;
  }>;
  tone?: "default" | "tinted";
};

export function ServiceEditorialSection({
  eyebrow,
  title,
  description,
  items,
  tone = "default",
}: ServiceEditorialSectionData) {
  if (items.length === 0) return null;

  return (
    <section className={`service-content-section${tone === "tinted" ? " service-content-section--tinted" : ""}`}>
      <div className="service-page-container">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <div className="service-editorial-grid">
          {items.map((item, index) => (
            <article key={item.title} className="service-editorial-card">
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
