import type { ReactNode } from "react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/Breadcrumbs";

type RouteHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
};

export function RouteHero({ eyebrow, title, description, breadcrumbs, actions }: RouteHeroProps) {
  return (
    <header className="route-hero">
      <div className="route-hero-grid" aria-hidden="true" />
      <div className="route-container route-hero-inner">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <span className="route-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {actions && <div className="route-hero-actions">{actions}</div>}
      </div>
    </header>
  );
}

export function RouteStatus({ children }: { children: ReactNode }) {
  return (
    <aside className="route-status" aria-label="Estado de esta página">
      <span aria-hidden="true">◆</span>
      <div>
        <strong>Página en evolución</strong>
        <p>{children}</p>
      </div>
    </aside>
  );
}
