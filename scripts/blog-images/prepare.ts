import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import {
  listArticles,
  isSafeSlug,
  imageOutputPath,
  imagePublicUrl,
  articleExists,
} from "./lib/articles";
import { buildPrompt } from "./lib/prompts";
import {
  BATCH_ENDPOINT,
  IMAGE_COMPRESSION,
  IMAGE_FORMAT,
  IMAGE_MODEL,
  IMAGE_QUALITY,
  IMAGE_SIZE,
  type BatchRequest,
  type Manifest,
  type ManifestEntry,
} from "./lib/types";
import {
  ensureDataDirs,
  runInputJsonl,
  runManifestJson,
  runDir,
  saveLatest,
} from "./lib/storage";

const SAMPLE_SIZE = 12;

/**
 * Etapas 2-3: construir prompts y preparar el JSONL del batch + manifiesto.
 * No envía nada a OpenAI.
 */
function main(): void {
  const { values } = parseArgs({
    options: {
      limit: { type: "string" },
      category: { type: "string" },
      slug: { type: "string" },
      force: { type: "boolean", default: false },
      sample: { type: "boolean", default: false },
      run: { type: "string" },
      dry: { type: "boolean", default: false },
    },
  });

  let articles = listArticles();

  if (values.slug) {
    const slug = values.slug;
    if (!isSafeSlug(slug)) {
      console.error(`Slug inválido: "${slug}". Debe ser kebab-case.`);
      process.exit(1);
    }
    if (!articleExists(slug)) {
      console.error(`No existe el artículo "${slug}" en content/blog/published/.`);
      process.exit(1);
    }
    articles = articles.filter((a) => a.slug === slug);
  }
  if (values.category) {
    const before = articles.length;
    articles = articles.filter((a) => a.category === values.category);
    console.log(`Categoría "${values.category}": ${before} → ${articles.length} artículos.`);
  }

  if (values.sample) {
    // Muestra variada: 1 artículo por categoría hasta completar SAMPLE_SIZE.
    const byCategory = new Map<string, typeof articles>();
    for (const a of articles) {
      if (!byCategory.has(a.category)) byCategory.set(a.category, []);
      byCategory.get(a.category)!.push(a);
    }
    const sampled: typeof articles = [];
    const buckets = [...byCategory.values()];
    let i = 0;
    while (sampled.length < SAMPLE_SIZE && buckets.some((b) => b.length > 0)) {
      const bucket = buckets[i % buckets.length];
      if (bucket.length > 0) {
        sampled.push(bucket.shift()!);
      }
      i++;
    }
    articles = sampled;
  }

  if (values.limit) {
    const n = Number(values.limit);
    if (!Number.isInteger(n) || n < 0) {
      console.error(`--limit debe ser un entero >= 0, recibido: "${values.limit}"`);
      process.exit(1);
    }
    articles = articles.slice(0, n);
  }

  // Omitir artículos cuya imagen ya fue generada, salvo --force.
  const skipped: string[] = [];
  const toGenerate: typeof articles = [];
  for (const a of articles) {
    if (!values.force && fs.existsSync(imageOutputPath(a.slug))) {
      skipped.push(a.slug);
    } else {
      toGenerate.push(a);
    }
  }

  // ---- Validaciones ----
  const errors: string[] = [];
  const seenIds = new Set<string>();
  const entries: ManifestEntry[] = [];
  for (const a of toGenerate) {
    if (!a.title.trim()) errors.push(`${a.slug}: título vacío`);
    if (!isSafeSlug(a.slug)) errors.push(`${a.slug}: slug inválido`);
    const outPath = imageOutputPath(a.slug);
    const resolved = path.resolve(outPath);
    if (!resolved.startsWith(path.resolve(path.join(process.cwd(), "public")))) {
      errors.push(`${a.slug}: la ruta de salida escapa de public/`);
    }
    if (seenIds.has(a.slug)) errors.push(`${a.slug}: custom_id duplicado`);
    seenIds.add(a.slug);

    const prompt = buildPrompt(a);
    if (!prompt.trim()) errors.push(`${a.slug}: prompt vacío`);
    entries.push({
      customId: a.slug,
      slug: a.slug,
      articlePath: a.filePath,
      prompt,
      outputPath: imagePublicUrl(a.slug),
    });
  }

  if (errors.length > 0) {
    console.error(`\nValidación fallida (${errors.length} error(es)):`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }

  if (entries.length === 0) {
    console.log("No hay artículos que generar (todos ya tienen imagen generada). Usa --force para regenerar.");
    return;
  }

  // ---- Escribir JSONL + manifiesto ----
  const runId =
    values.run ??
    `run-${new Date().toISOString().replace(/[:.]/g, "-")}`;
  const runIdSafe = runId.replace(/[^a-zA-Z0-9-_]/g, "-");

  const requests: BatchRequest[] = entries.map((e) => ({
    custom_id: e.customId,
    method: "POST",
    url: BATCH_ENDPOINT,
    body: {
      model: IMAGE_MODEL,
      prompt: e.prompt,
      size: IMAGE_SIZE,
      quality: IMAGE_QUALITY,
      output_format: IMAGE_FORMAT,
      output_compression: IMAGE_COMPRESSION,
      n: 1,
    },
  }));

  const manifest: Manifest = {
    runId: runIdSafe,
    createdAt: new Date().toISOString(),
    model: IMAGE_MODEL,
    size: IMAGE_SIZE,
    total: entries.length,
    entries,
  };

  ensureDataDirs();
  fs.mkdirSync(runDir(runIdSafe), { recursive: true });
  const jsonlPath = runInputJsonl(runIdSafe);
  const manifestPath = runManifestJson(runIdSafe);
  fs.writeFileSync(jsonlPath, requests.map((r) => JSON.stringify(r)).join("\n") + "\n", "utf-8");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");

  saveLatest({
    runId: runIdSafe,
    inputJsonl: jsonlPath,
    manifestJson: manifestPath,
    total: entries.length,
    createdAt: manifest.createdAt,
  });

  console.log(`\n=== Preparación lista ===`);
  console.log(`Run: ${runIdSafe}`);
  console.log(`Artículos a generar: ${entries.length}`);
  console.log(`Omitidos (imagen existente): ${skipped.length}`);
  console.log(`JSONL: ${jsonlPath}`);
  console.log(`Manifiesto: ${manifestPath}`);
  console.log(`Costo estimado: ${entries.length} imágenes gpt-image-1-mini (1536x1024, medium).`);

  if (!values.dry) {
    console.log(`\nPrimeros prompts:`);
    for (const r of requests.slice(0, 3)) {
      console.log(`\n[${r.custom_id}]`);
      console.log(r.body.prompt.slice(0, 220) + (r.body.prompt.length > 220 ? "…" : ""));
    }
  }
  console.log(`\nRevisa el JSONL antes de enviar. Luego: npm run blog-images:submit`);
}

main();
