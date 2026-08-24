import { parseArgs } from "node:util";
import { listArticles } from "./lib/articles";
import { isSafeSlug } from "./lib/articles";

/**
 * Etapa 1: analizar los artículos del blog.
 * Imprime ruta, título, descripción, categoría, slug e imagen actual.
 */
function main(): void {
  const { values } = parseArgs({
    options: {
      limit: { type: "string" },
      category: { type: "string" },
      slug: { type: "string" },
      json: { type: "boolean", default: false },
    },
  });

  let articles = listArticles();

  if (values.slug) {
    const slug = values.slug;
    if (!isSafeSlug(slug)) {
      console.error(`Slug inválido: "${slug}". Debe ser kebab-case.`);
      process.exit(1);
    }
    articles = articles.filter((a) => a.slug === slug);
  }
  if (values.category) {
    articles = articles.filter((a) => a.category === values.category);
  }
  if (values.limit) {
    const n = Number(values.limit);
    if (!Number.isInteger(n) || n < 0) {
      console.error(`--limit debe ser un entero >= 0, recibido: "${values.limit}"`);
      process.exit(1);
    }
    articles = articles.slice(0, n);
  }

  if (values.json) {
    console.log(JSON.stringify(articles, null, 2));
    return;
  }

  console.log(`Artículos: ${articles.length}\n`);
  for (const a of articles) {
    console.log(`- ${a.slug}`);
    console.log(`  título: ${a.title}`);
    console.log(`  categoría: ${a.category}`);
    console.log(`  descripción: ${a.description.slice(0, 120)}${a.description.length > 120 ? "…" : ""}`);
    console.log(`  archivo: ${a.filePath}`);
    console.log(`  imagen actual: ${a.currentImage?.src ?? "(sin imagen)"}`);
    console.log("");
  }
}

main();
