type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  headingId?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  headingId,
}: SectionHeaderProps) {
  return (
    <header className={`content-section-header content-section-header--${align}`}>
      <div className="section-tag">{eyebrow}</div>
      <h2 id={headingId} className="content-section-title">{title}</h2>
      {description && <p className="content-section-description">{description}</p>}
    </header>
  );
}
