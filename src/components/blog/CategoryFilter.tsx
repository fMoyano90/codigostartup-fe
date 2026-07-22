import Link from "next/link";
import type { CategoryWithCount } from "@/lib/blog/category-utils";

export function CategoryFilter({
  categories,
  activeSlug,
}: {
  categories: CategoryWithCount[];
  activeSlug?: string;
}) {
  return (
    <nav aria-label="Categorías del blog" className="category-filter">
      <Link
        href="/blog"
        className={`category-chip ${!activeSlug ? "category-chip--active" : ""}`}
      >
        Todos
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/blog/categoria/${category.slug}`}
          className={`category-chip ${
            activeSlug === category.slug ? "category-chip--active" : ""
          }`}
        >
          {category.name}
          <span className="category-chip-count">{category.articleCount}</span>
        </Link>
      ))}
    </nav>
  );
}
