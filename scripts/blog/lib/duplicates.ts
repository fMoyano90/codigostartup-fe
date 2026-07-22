import type { ArticleStatusDir } from "./fs-content";

export type DuplicateSlug = {
  fileSlug: string;
  dirs: ArticleStatusDir[];
};

/** Finds slugs that appear in more than one status directory. */
export function findDuplicateSlugs(
  entries: { fileSlug: string; dir: ArticleStatusDir }[]
): DuplicateSlug[] {
  const byFileSlug = new Map<string, ArticleStatusDir[]>();

  for (const entry of entries) {
    const dirs = byFileSlug.get(entry.fileSlug) ?? [];
    dirs.push(entry.dir);
    byFileSlug.set(entry.fileSlug, dirs);
  }

  return [...byFileSlug.entries()]
    .filter(([, dirs]) => dirs.length > 1)
    .map(([fileSlug, dirs]) => ({ fileSlug, dirs }));
}
