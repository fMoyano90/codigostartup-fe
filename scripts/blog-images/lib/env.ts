import "dotenv/config";

/**
 * Devuelve la API key de OpenAI desde el entorno.
 * Nunca se imprime ni se registra el valor.
 */
export function getApiKey(): string {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) {
    console.error(
      "Falta OPENAI_API_KEY en el archivo .env. Agrega OPENAI_API_KEY=<tu-key> y reintenta."
    );
    process.exit(1);
  }
  return key;
}
