const WORDS_PER_MINUTE = 200;

export function calculateReadingTime(mdxBody: string): number {
  const plainText = mdxBody
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/[#>*_\-[\]()]/g, " ");

  const words = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function countWords(mdxBody: string): number {
  return mdxBody.split(/\s+/).filter(Boolean).length;
}

export function formatArticleDate(dateString: string): string {
  // Frontmatter dates are calendar dates (e.g. "2026-07-21"), not instants.
  // Formatting in UTC avoids an off-by-one day shift on servers with a
  // negative UTC offset (Date("2026-07-21") is midnight UTC).
  return new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(dateString));
}
