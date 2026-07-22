import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
  prefetch?: boolean;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol className="breadcrumbs-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="breadcrumbs-item">
              {item.href && !isLast ? (
                <Link href={item.href} prefetch={item.prefetch ?? (item.href === "/" ? false : undefined)}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
              )}
              {!isLast && <span className="breadcrumbs-separator" aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
