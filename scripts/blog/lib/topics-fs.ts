import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import { safeParseTopicList, type TopicList } from "@/lib/blog/topic-schema";

const TOPICS_DIR = path.join(process.cwd(), "content", "sources", "topics");

export type TopicFileResult =
  | { file: string; ok: true; topicList: TopicList }
  | { file: string; ok: false; error: string };

export function listTopicFiles(): string[] {
  if (!fs.existsSync(TOPICS_DIR)) return [];
  return fs
    .readdirSync(TOPICS_DIR)
    .filter((file) => file.endsWith(".yml") || file.endsWith(".yaml"))
    .sort();
}

export function readTopicFile(file: string): TopicFileResult {
  const filePath = path.join(TOPICS_DIR, file);
  let raw: string;
  try {
    raw = fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    return { file, ok: false, error: `No se pudo leer el archivo: ${error instanceof Error ? error.message : String(error)}` };
  }

  let data: unknown;
  try {
    data = YAML.parse(raw);
  } catch (error) {
    return { file, ok: false, error: `YAML inválido: ${error instanceof Error ? error.message : String(error)}` };
  }

  const parsed = safeParseTopicList(data);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return {
      file,
      ok: false,
      error: `Esquema inválido: ${firstIssue?.path.join(".") || "(raíz)"}: ${firstIssue?.message}`,
    };
  }

  return { file, ok: true, topicList: parsed.data };
}

export function readAllTopicFiles(): TopicFileResult[] {
  return listTopicFiles().map(readTopicFile);
}

export function writeTopicFile(file: string, topicList: TopicList): void {
  const filePath = path.join(TOPICS_DIR, file);
  fs.writeFileSync(filePath, YAML.stringify(topicList), "utf-8");
}
