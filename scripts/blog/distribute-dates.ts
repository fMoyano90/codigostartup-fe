import fs from "fs";
import path from "path";
import matter from "gray-matter";

function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

const START = new Date("2026-01-01");
const END = new Date("2026-07-21");

const dirs = [
  path.resolve("content/blog/published"),
  path.resolve("content/blog/drafts"),
];

let count = 0;

function processDir(dir: string) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  for (const file of files) {
    const filepath = path.join(dir, file);
    const raw = fs.readFileSync(filepath, "utf-8");
    const parsed = matter(raw);

    const createdAt = randomDate(START, END);
    const publishDelta = Math.floor(Math.random() * 5) + 1;
    const publishedAt = addDays(createdAt, publishDelta);
    const updatedAt = addDays(publishedAt, Math.floor(Math.random() * 3));

    parsed.data.createdAt = formatDate(createdAt);

    if (parsed.data.publishedAt) {
      parsed.data.publishedAt = formatDate(publishedAt);
    }

    if (parsed.data.approvedAt) {
      parsed.data.approvedAt = formatDate(publishedAt);
    }

    parsed.data.updatedAt = formatDate(updatedAt);

    const newContent = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filepath, newContent, "utf-8");
    count++;
    console.log(`  ${file} → createdAt: ${formatDate(createdAt)}`);
  }
}

console.log("Distributing blog article dates (Jan 2026 → Jul 2026)...\n");

for (const dir of dirs) {
  console.log(`Processing ${path.basename(dir)}/`);
  processDir(dir);
}

console.log(`\nDone! Updated ${count} articles.`);
