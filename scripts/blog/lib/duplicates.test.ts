import { describe, it, expect } from "vitest";
import { findDuplicateSlugs } from "./duplicates";

describe("findDuplicateSlugs", () => {
  it("returns an empty array when every slug is unique", () => {
    const result = findDuplicateSlugs([
      { fileSlug: "a", dir: "drafts" },
      { fileSlug: "b", dir: "published" },
    ]);
    expect(result).toEqual([]);
  });

  it("flags a slug that appears in more than one status directory", () => {
    const result = findDuplicateSlugs([
      { fileSlug: "a", dir: "drafts" },
      { fileSlug: "a", dir: "published" },
      { fileSlug: "b", dir: "published" },
    ]);
    expect(result).toEqual([{ fileSlug: "a", dirs: ["drafts", "published"] }]);
  });

  it("flags duplicates within the same directory too", () => {
    const result = findDuplicateSlugs([
      { fileSlug: "a", dir: "drafts" },
      { fileSlug: "a", dir: "drafts" },
    ]);
    expect(result).toEqual([{ fileSlug: "a", dirs: ["drafts", "drafts"] }]);
  });
});
