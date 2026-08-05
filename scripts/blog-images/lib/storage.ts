import fs from "node:fs";
import path from "node:path";
import type { BatchInfo, Manifest } from "./types";

/** Directorio raíz de artefactos temporales del pipeline (ignorado en git). */
export const DATA_DIR = path.join(process.cwd(), ".blog-images");

/** Último run preparado (señala el jsonl/manifiesto vigente). */
export const LATEST_FILE = path.join(DATA_DIR, "latest.json");

/** Batch actualmente en curso o último procesado. */
export const CURRENT_BATCH_FILE = path.join(DATA_DIR, "current-batch.json");

export interface LatestInfo {
  runId: string;
  inputJsonl: string;
  manifestJson: string;
  total: number;
  createdAt: string;
}

export function runsDir(): string {
  return path.join(DATA_DIR, "runs");
}

export function runDir(runId: string): string {
  return path.join(runsDir(), runId);
}

export function runInputJsonl(runId: string): string {
  return path.join(runDir(runId), "input.jsonl");
}

export function runManifestJson(runId: string): string {
  return path.join(runDir(runId), "manifest.json");
}

export function resultsDir(): string {
  return path.join(DATA_DIR, "results");
}

export function batchResultsFile(batchId: string): string {
  return path.join(resultsDir(), `${batchId}.jsonl`);
}

export function failuresFile(batchId: string): string {
  return path.join(DATA_DIR, "failures", `${batchId}.jsonl`);
}

export function ensureDataDirs(): void {
  fs.mkdirSync(runsDir(), { recursive: true });
  fs.mkdirSync(resultsDir(), { recursive: true });
  fs.mkdirSync(path.join(DATA_DIR, "failures"), { recursive: true });
}

export function writeJson(filePath: string, data: unknown): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function readJson<T>(filePath: string): T | null {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
  } catch {
    return null;
  }
}

export function saveLatest(info: LatestInfo): void {
  writeJson(LATEST_FILE, info);
}

export function readLatest(): LatestInfo | null {
  return readJson<LatestInfo>(LATEST_FILE);
}

export function saveBatchInfo(info: BatchInfo): void {
  writeJson(CURRENT_BATCH_FILE, info);
}

export function readBatchInfo(): BatchInfo | null {
  return readJson<BatchInfo>(CURRENT_BATCH_FILE);
}

export function readManifest(runId: string): Manifest | null {
  return readJson<Manifest>(runManifestJson(runId));
}
