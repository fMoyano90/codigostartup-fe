/** Tipos compartidos del pipeline de generación de imágenes de blog. */

/** Parámetros fijos de generación (OpenAI Images API, gpt-image-1-mini). */
export const IMAGE_MODEL = "gpt-image-1-mini" as const;
export const IMAGE_SIZE = "1536x1024" as const;
export const IMAGE_QUALITY = "medium" as const;
export const IMAGE_FORMAT = "webp" as const;
export const IMAGE_COMPRESSION = 80 as const;
export const BATCH_ENDPOINT = "/v1/images/generations" as const;
export const BATCH_WINDOW = "24h" as const;

/** Una imagen de portada referenciada desde el frontmatter de un artículo. */
export interface ArticleImage {
  src: string;
  alt: string;
}

/** Datos mínimos de un artículo de blog, extraídos de su frontmatter. */
export interface ArticleInfo {
  filePath: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  /** Imagen actual en frontmatter (si existe). */
  currentImage: ArticleImage | null;
  /** Ruta absoluta del archivo de imagen actual (si existe en disco). */
  currentImageFile: string | null;
}

/** Solicitud individual del JSONL de OpenAI Batch API. */
export interface BatchRequest {
  custom_id: string;
  method: "POST";
  url: string;
  body: {
    model: string;
    prompt: string;
    size: string;
    quality: string;
    output_format: string;
    output_compression: number;
    n: number;
  };
}

/** Entrada del manifiesto local: relaciona custom_id con el artículo. */
export interface ManifestEntry {
  customId: string;
  slug: string;
  articlePath: string;
  prompt: string;
  /** Ruta final esperada de la imagen (relativa a la raíz del proyecto). */
  outputPath: string;
}

/** Manifiesto completo de un run de preparación. */
export interface Manifest {
  runId: string;
  createdAt: string;
  model: string;
  size: string;
  total: number;
  entries: ManifestEntry[];
}

/** Info persistida de un batch enviado. */
export interface BatchInfo {
  batchId: string;
  inputFileId: string;
  runId: string;
  endpoint: string;
  createdAt: string;
  status: string;
  outputFileId: string | null;
}

/** Respuesta de una línea del archivo de resultados del batch. */
export interface BatchResultLine {
  id: string;
  custom_id: string;
  response?: {
    status_code: number;
    body?: {
      data?: Array<{ b64_json?: string; url?: string }>;
    };
  };
  error?: { message?: string } | null;
}
