import fs from "node:fs";
import { getClient } from "./lib/openai-client";
import {
  BATCH_ENDPOINT,
  BATCH_WINDOW,
  type BatchInfo,
} from "./lib/types";
import {
  ensureDataDirs,
  readLatest,
  readBatchInfo,
  saveBatchInfo,
  batchResultsFile,
} from "./lib/storage";

/** Estados en los que el batch todavía está activo y no debe duplicarse. */
const ACTIVE_STATUSES = new Set(["validating", "queued", "in_progress", "processing"]);

/**
 * Etapa 4: subir el JSONL y crear el batch.
 * Idempotente: si ya existe un batch activo para este run, no crea otro.
 */
async function main(): Promise<void> {
  const latest = readLatest();
  if (!latest) {
    console.error(
      "No hay un run preparado. Ejecuta primero: npm run blog-images:prepare (o :sample)."
    );
    process.exit(1);
  }

  const jsonlPath = latest.inputJsonl;
  if (!fs.existsSync(jsonlPath)) {
    console.error(`No existe el JSONL del run "${latest.runId}": ${jsonlPath}`);
    process.exit(1);
  }

  // Protección anti-duplicados: batch activo para el mismo run.
  const existing = readBatchInfo();
  if (existing && ACTIVE_STATUSES.has(existing.status) && existing.runId === latest.runId) {
    console.log(
      `Ya hay un batch activo para el run "${latest.runId}": ${existing.batchId} (estado: ${existing.status}).`
    );
    console.log("Consulta el progreso con: npm run blog-images:status");
    console.log("Si el batch falló o terminó, elimina .blog-images/current-batch.json y reintenta.");
    process.exit(0);
  }

  const client = getClient();
  const lineCount = fs
    .readFileSync(jsonlPath, "utf-8")
    .split("\n")
    .filter((l) => l.trim()).length;
  console.log(`Subiendo ${lineCount} solicitudes desde ${jsonlPath}...`);

  const uploaded = await client.files.create({
    file: fs.createReadStream(jsonlPath),
    purpose: "batch",
  });
  console.log(`Archivo subido: ${uploaded.id}`);

  const batch = await client.batches.create({
    input_file_id: uploaded.id,
    endpoint: BATCH_ENDPOINT,
    completion_window: BATCH_WINDOW,
  });

  const info: BatchInfo = {
    batchId: batch.id,
    inputFileId: uploaded.id,
    runId: latest.runId,
    endpoint: BATCH_ENDPOINT,
    createdAt: new Date().toISOString(),
    status: batch.status,
    outputFileId: null,
  };
  saveBatchInfo(info);
  ensureDataDirs();
  // Marcar el archivo de resultados esperado (aún no existe).
  const resultsPath = batchResultsFile(batch.id);
  fs.writeFileSync(`${resultsPath}.pending`, "pending", "utf-8");

  console.log(`\n=== Batch creado ===`);
  console.log(`Batch ID: ${batch.id}`);
  console.log(`Solicitudes: ${lineCount}`);
  console.log(`Ventana: ${BATCH_WINDOW}`);
  console.log(`Estado inicial: ${batch.status}`);
  console.log(`\nConsulta con: npm run blog-images:status`);
}

main().catch((err) => {
  console.error("Error al enviar el batch:", err instanceof Error ? err.message : err);
  process.exit(1);
});
