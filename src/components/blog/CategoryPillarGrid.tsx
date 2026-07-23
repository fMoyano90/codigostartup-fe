import Link from "next/link";
import type { CategoryWithCount } from "@/lib/blog/category-utils";

export function CategoryPillarGrid({ categories }: { categories: CategoryWithCount[] }) {
  return (
    <div className="cat-pillar-grid">
      {categories.map((category, index) => (
        <Link
          key={category.slug}
          href={`/blog/categoria/${category.slug}`}
          className="cat-pillar-card"
        >
          <span className="cat-pillar-index">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="cat-pillar-name">{category.name}</h3>
          <p className="cat-pillar-desc">{category.description}</p>
          <div className="cat-pillar-footer">
            <span className="cat-pillar-count">
              <strong>{category.articleCount}</strong>
              {category.articleCount === 1 ? "artículo" : "artículos"}
            </span>
            <span className="cat-pillar-link">Ver artículos →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
