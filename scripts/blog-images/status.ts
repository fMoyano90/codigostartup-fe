import { parseArgs } from "node:util";
import { getClient } from "./lib/openai-client";
import { readBatchInfo, saveBatchInfo } from "./lib/storage";

/**
 * Etapa 5: consultar el estado del batch.
 * Muestra estado, solicitudes completadas/fallidas, errores y archivo de resultados.
 */
async function main(): Promise<void> {
  const { values } = parseArgs({
    options: {
      batch: { type: "string" },
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

  const client = getClient();
  const batch = await client.batches.retrieve(batchId);

  console.log(`=== Batch ${batch.id} ===`);
  console.log(`Estado: ${batch.status}`);
  console.log(`Endpoint: ${batch.endpoint ?? "(no especificado)"}`);
  console.log(`Creado: ${batch.created_at ? new Date(batch.created_at * 1000).toISOString() : "?"}`);

  const counts = batch.request_counts ?? { total: 0, completed: 0, failed: 0 };
  console.log(`\nSolicitudes:`);
  console.log(`  Total: ${counts.total}`);
  console.log(`  Completadas: ${counts.completed}`);
  console.log(`  Fallidas: ${counts.failed}`);

  const batchErrors = batch.errors?.data ?? [];
  if (batchErrors.length > 0) {
    console.log(`\nErrores del batch (${batchErrors.length}):`);
    for (const err of batchErrors.slice(0, 5)) {
      console.log(`  - [línea ${err.line ?? "?"}] ${err.message ?? "(sin detalle)"}`);
    }
  }

  if (batch.output_file_id) {
    console.log(`\nArchivo de resultados: ${batch.output_file_id}`);
    if (info && info.batchId === batchId) {
      saveBatchInfo({ ...info, status: batch.status, outputFileId: batch.output_file_id });
      console.log("ID de resultados guardado. Descarga con: npm run blog-images:download");
    }
  } else if (ACTIVE.has(batch.status)) {
    console.log("\nEl batch aún está procesando. Vuelve a consultar en unos minutos.");
  } else {
    console.log("\nEl batch terminó sin archivo de resultados (revisa los errores).");
  }
}

const ACTIVE = new Set(["validating", "queued", "in_progress", "processing"]);

main().catch((err) => {
  console.error("Error al consultar el estado:", err instanceof Error ? err.message : err);
  process.exit(1);
});
