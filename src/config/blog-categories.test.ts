import { describe, it, expect } from "vitest";
import { blogCategories, isValidCategorySlug, getCategoryBySlug } from "./blog-categories";

describe("blog-categories", () => {
  it("exposes the 12 categories defined in the editorial brief", () => {
    expect(blogCategories).toHaveLength(12);
  });

  it("accepts every configured category slug as valid", () => {
    for (const category of blogCategories) {
      expect(isValidCategorySlug(category.slug)).toBe(true);
    }
  });

  it("rejects a slug that isn't configured", () => {
    expect(isValidCategorySlug("categoria-inventada")).toBe(false);
  });

  it("returns undefined for an unknown category slug", () => {
    expect(getCategoryBySlug("categoria-inventada")).toBeUndefined();
  });

  it("returns the matching category for a known slug", () => {
    const category = getCategoryBySlug("software-para-empresas");
    expect(category?.name).toBe("Software para empresas");
  });
});
