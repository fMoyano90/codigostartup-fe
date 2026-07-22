import fs from "node:fs";
import path from "node:path";
import { describe, it, expect, afterEach } from "vitest";
import {
  writeRaw,
  readRaw,
  articleExists,
  moveArticle,
  findArticleDir,
} from "./fs-content";

// Unique per test run so parallel/repeated runs never collide with real content.
const TEST_SLUG = `__vitest-fs-content-${process.pid}`;

afterEach(() => {
  for (const dir of ["drafts", "published", "rejected"] as const) {
    const filePath = path.join(process.cwd(), "content", "blog", dir, `${TEST_SLUG}.mdx`);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
});

describe("fs-content", () => {
  it("writes and reads back raw article content", () => {
    writeRaw("drafts", TEST_SLUG, "contenido de prueba");
    expect(readRaw("drafts", TEST_SLUG)).toBe("contenido de prueba");
  });

  it("moves an article between status directories", () => {
    writeRaw("drafts", TEST_SLUG, "contenido a mover");
    moveArticle("drafts", "published", TEST_SLUG, "contenido a mover");

    expect(articleExists("drafts", TEST_SLUG)).toBe(false);
    expect(articleExists("published", TEST_SLUG)).toBe(true);
    expect(readRaw("published", TEST_SLUG)).toBe("contenido a mover");
  });

  it("finds which status directory currently holds a slug", () => {
    writeRaw("rejected", TEST_SLUG, "contenido rechazado");
    expect(findArticleDir(TEST_SLUG)).toBe("rejected");
  });

  it("refuses to overwrite an article that already exists at the destination", () => {
    writeRaw("drafts", TEST_SLUG, "original en drafts");
    writeRaw("published", TEST_SLUG, "ya existe en published");

    expect(() => moveArticle("drafts", "published", TEST_SLUG, "original en drafts")).toThrow();
    // the original must be left untouched after the failed move
    expect(readRaw("drafts", TEST_SLUG)).toBe("original en drafts");
    expect(readRaw("published", TEST_SLUG)).toBe("ya existe en published");
  });
});
