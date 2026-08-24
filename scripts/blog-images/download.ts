import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { parseArgs } from "node:util";
import { getClient } from "./lib/openai-client";
import type { BatchResultLine } from "./lib/types";
import {
  ensureDataDirs,
  readBatchInfo,
  readManifest,
  readLatest,
  batchResultsFile,
  failuresFile,
} from "./lib/storage";
import { imageOutputPath, imagePublicUrl, PUBLISHED_DIR } from "./lib/articles";

/**
 * Etapas 6-7: descargar resultados del batch, guardar .webp y actualizar
 * el frontmatter de cada artículo (image.src + image.alt).
 * Solo actualiza artículos cuya imagen se descargó correctamente.
 */
async function main(): Promise<void> {
  const { values } = parseArgs({
    options: {
      batch: { type: "string" },
      "no-prune": { type: "boolean", default: false },
      force: { type: "boolean", default: false },
    },
  });

  const info = readBatchInfo();
  const batchId = values.batch ?? info?.batchId;
  if (!batchId) {
    console.error(
      "No hay un batch registrado. Ejecuta primero: npm run blog-images:submit (o usa --batch=<ID>)."
    );
    process.exit(1);
  }
  if (!info?.outputFileId && !values.batch) {
    console.error(
      "El batch aún no tiene archivo de resultados. Consulta el estado: npm run blog-images:status"
    );
    process.exit(1);
  }

  // Manifiesto: relaciona custom_id → slug → artículo → prompt.
  const latest = readLatest();
  const manifest = latest ? readManifest(latest.runId) : null;
  const entryByCustomId = new Map(
    (manifest?.entries ?? []).map((e) => [e.customId, e])
  );

  // ---- 1. Descargar el archivo de resultados (cacheado) ----
  const resultsPath = batchResultsFile(batchId);
  if (!fs.existsSync(resultsPath)) {
    console.log(`Descargando resultados del batch ${batchId}...`);
    const client = getClient();
    const content = await client.files.content(info!.outputFileId!);
    const text = await content.text();
    ensureDataDirs();
    fs.writeFileSync(resultsPath, text, "utf-8");
    console.log(`Resultados guardados en ${resultsPath}`);
  } else {
    console.log(`Usando resultados cacheados: ${resultsPath}`);
  }

  // ---- 2. Procesar líneas ----
  const lines = fs
    .readFileSync(resultsPath, "utf-8")
    .split("\n")
    .filter((l) => l.trim());
  console.log(`Líneas de resultado: ${lines.length}`);

  let saved = 0;
  let updated = 0;
  let pruned = 0;
  let skipped = 0;
  const failed: Array<{ customId: string; reason: string }> = [];
  const failureLines: string[] = [];

  for (const line of lines) {
    let parsed: BatchResultLine;
    try {
      parsed = JSON.parse(line) as BatchResultLine;
    } catch {
      failed.push({ customId: "?", reason: "línea JSON inválida" });
      failureLines.push(line);
      continue;
    }

    const customId = parsed.custom_id;
    const entry = entryByCustomId.get(customId);

    if (parsed.error) {
      failed.push({ customId, reason: parsed.error.message ?? "error de la API" });
      failureLines.push(line);
      continue;
    }
    const statusCode = parsed.response?.status_code ?? 0;
    const b64 = parsed.response?.body?.data?.[0]?.b64_json;
    if (statusCode !== 200 || !b64) {
      failed.push({ customId, reason: `status_code ${statusCode} sin b64_json` });
      failureLines.push(line);
      continue;
    }
    if (!entry) {
      failed.push({ customId, reason: "custom_id sin entrada en el manifiesto" });
      continue;
    }

    // ---- 3. Guardar .webp ----
    const outPath = imageOutputPath(entry.slug);
    if (!values.force && fs.existsSync(outPath)) {
      skipped++;
      continue;
    }
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, Buffer.from(b64, "base64"));
    saved++;

    // ---- 4. Actualizar frontmatter (solo si la imagen se guardó) ----
    const articlePath = path.join(PUBLISHED_DIR, `${entry.slug}.mdx`);
    if (fs.existsSync(articlePath)) {
      const raw = fs.readFileSync(articlePath, "utf-8");
      const parsed = matter(raw);
      const prevSrc =
        parsed.data.image && typeof parsed.data.image === "object"
          ? (parsed.data.image as { src?: unknown }).src
          : null;

      parsed.data.image = {
        src: imagePublicUrl(entry.slug),
        alt: describeAlt(entry.slug, entry.prompt),
      };
      fs.writeFileSync(articlePath, matter.stringify(parsed.content, parsed.data), "utf-8");
      updated++;

      // Eliminar la imagen anterior (reemplazo), salvo --no-prune.
      if (
        !values["no-prune"] &&
        typeof prevSrc === "string" &&
        prevSrc !== imagePublicUrl(entry.slug)
      ) {
        const prevPath = path.join(process.cwd(), "public", prevSrc.replace(/^\//, ""));
        if (fs.existsSync(prevPath)) {
          fs.rmSync(prevPath);
          pruned++;
        }
      }
    } else {
      failed.push({ customId, reason: "artículo no encontrado al actualizar" });
    }
  }

  if (failureLines.length > 0) {
    ensureDataDirs();
    fs.writeFileSync(failuresFile(batchId), failureLines.join("\n") + "\n", "utf-8");
  }

  console.log(`\n=== Resumen de descarga ===`);
  console.log(`Imágenes guardadas: ${saved}`);
  console.log(`Frontmatters actualizados: ${updated}`);
  console.log(`Imágenes anteriores eliminadas: ${pruned}`);
  console.log(`Omitidas (ya existían): ${skipped}`);
  console.log(`Fallidas: ${failed.length}`);
  for (const f of failed.slice(0, 20)) {
    console.log(`  - ${f.customId}: ${f.reason}`);
  }
  if (failureLines.length > 0) {
    console.log(`\nFallos registrados en ${failuresFile(batchId)} para reintentar.`);
  }
}

/** Genera un texto alternativo descriptivo a partir del prompt. */
function describeAlt(slug: string, prompt: string): string {
  const theme = prompt
    .split("Tema de la portada:")[1]
    ?.split(" Contexto del artículo:")[0]
    ?.trim();
  return `Portada del artículo ${slug}${theme ? `: ${theme}` : ""}`;
}

main().catch((err) => {
  console.error("Error al descargar:", err instanceof Error ? err.message : err);
  process.exit(1);
});
