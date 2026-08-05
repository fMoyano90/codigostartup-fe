import OpenAI from "openai";
import { getApiKey } from "./env";

let client: OpenAI | null = null;

/** Cliente OpenAI lazy. Requiere OPENAI_API_KEY en .env. */
export function getClient(): OpenAI {
  if (!client) {
    client = new OpenAI({ apiKey: getApiKey() });
  }
  return client;
}
