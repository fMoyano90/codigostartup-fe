import matter from "gray-matter";
import { safeParseArticleFrontmatter } from "@/lib/blog/article-schema";
import { editorialRules } from "@/config/editorial-rules";
import type { ArticleStatusDir } from "./fs-content";

export type IssueLevel = "error" | "warning" | "info";

export type ValidationIssue = {
  level: IssueLevel;
  message: string;
};

export type ValidationOutcome = {
  fileSlug: string;
  dir: ArticleStatusDir;
  title: string | null;
  wordCount: number;
  issues: ValidationIssue[];
};

function countWords(body: string): number {
  return body.split(/\s+/).filter(Boolean).length;
}

function hasH1(body: string): boolean {
  return /^#\s+.+/m.test(body);
}

function countInternalLinks(body: string): number {
  return (body.match(/\]\(\/blog\//g) ?? []).length;
}

function findEmptyAltImages(body: string): number {
  return (body.match(/!\[\s*\]\([^)]*\)/g) ?? []).length;
}

function findBlockedExpressions(haystack: string): string[] {
  const lowerHaystack = haystack.toLowerCase();
  return editorialRules.blockedExpressions.filter((expression) =>
    lowerHaystack.includes(expression.toLowerCase())
  );
}

/**
 * Validates a single article's raw MDX content (frontmatter + body).
 * Pure function: no filesystem access, so it can be unit tested directly
 * with in-memory fixtures. `allFileSlugs` is the full set of known slugs
 * across drafts/published/rejected, used to check `relatedArticles`.
 */
export function validateArticleContent(
  raw: string,
  fileSlug: string,
  dir: ArticleStatusDir,
  allFileSlugs: string[]
): ValidationOutcome {
  const issues: ValidationIssue[] = [];

  let data: Record<string, unknown>;
  let body: string;
  try {
    const parsed = matter(raw);
    data = parsed.data;
    body = parsed.content;
  } catch (error) {
    return {
      fileSlug,
      dir,
      title: null,
      wordCount: 0,
      issues: [
        {
          level: "error",
          message: `Frontmatter/MDX inválido: ${
            error instanceof Error ? error.message : String(error)
          }`,
        },
      ],
    };
  }

  for (const field of editorialRules.requiredFrontmatterFields) {
    const value = data[field];
    if (value === undefined || value === null || value === "") {
      issues.push({ level: "error", message: `Falta el campo obligatorio "${field}".` });
    }
  }

  const parsedFrontmatter = safeParseArticleFrontmatter(data);
  if (!parsedFrontmatter.success) {
    for (const issue of parsedFrontmatter.error.issues) {
      issues.push({
        level: "error",
        message: `${issue.path.join(".") || "(raíz)"}: ${issue.message}`,
      });
    }
  } else if (parsedFrontmatter.data.slug !== fileSlug) {
    issues.push({
      level: "error",
      message: `El slug del frontmatter ("${parsedFrontmatter.data.slug}") no coincide con el nombre de archivo ("${fileSlug}").`,
    });
  }

  if (parsedFrontmatter.success) {
    const allowedStatuses: Record<ArticleStatusDir, string[]> = {
      drafts: ["draft", "approved"],
      published: ["published"],
      rejected: ["rejected"],
    };
    if (!allowedStatuses[dir].includes(parsedFrontmatter.data.status)) {
      issues.push({
        level: "error",
        message: `El estado "${parsedFrontmatter.data.status}" no corresponde a la carpeta content/blog/${dir}/.`,
      });
    }
  }

  const wordCount = countWords(body);
  if (wordCount < editorialRules.minimumWords) {
    issues.push({
      level: "error",
      message: `El artículo tiene ${wordCount} palabras, menos que el mínimo (${editorialRules.minimumWords}).`,
    });
  }
  if (wordCount > editorialRules.maximumWords) {
    issues.push({
      level: "error",
      message: `El artículo tiene ${wordCount} palabras, más que el máximo (${editorialRules.maximumWords}).`,
    });
  }

  if (hasH1(body)) {
    issues.push({
      level: "error",
      message:
        "El cuerpo del MDX no debe incluir un encabezado H1 (`# Título`) — el H1 ya se renderiza desde el frontmatter.",
    });
  }

  if (/<Callout[^>\n]*$/m.test(body)) {
    issues.push({
      level: "error",
      message:
        "Etiqueta <Callout ...> malformada: la etiqueta de apertura debe cerrarse con '>' en la misma línea.",
    });
  }

  const internalLinks = countInternalLinks(body);
  if (internalLinks < editorialRules.minimumInternalLinks) {
    issues.push({
      level: "error",
      message: `El artículo tiene ${internalLinks} enlace(s) interno(s), menos que el mínimo (${editorialRules.minimumInternalLinks}).`,
    });
  }

  const emptyAltImages = findEmptyAltImages(body);
  if (emptyAltImages > 0) {
    issues.push({
      level: "error",
      message: `Hay ${emptyAltImages} imagen(es) sin texto alternativo (alt).`,
    });
  }

  if (parsedFrontmatter.success) {
    for (const relatedSlug of parsedFrontmatter.data.relatedArticles) {
      if (!allFileSlugs.includes(relatedSlug)) {
        issues.push({
          level: "error",
          message: `El artículo relacionado "${relatedSlug}" no existe.`,
        });
      }
    }
  }

  const blocked = findBlockedExpressions(
    [String(data.title ?? ""), String(data.description ?? ""), body].join("\n")
  );
  for (const expression of blocked) {
    issues.push({
      level: "warning",
      message: `Contiene una expresión desaconsejada: "${expression}".`,
    });
  }

  return {
    fileSlug,
    dir,
    title: typeof data.title === "string" ? data.title : null,
    wordCount,
    issues,
  };
}

export function hasBlockingErrors(outcome: ValidationOutcome): boolean {
  return outcome.issues.some((issue) => issue.level === "error");
}
