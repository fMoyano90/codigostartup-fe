import type { ValidationIssue } from "./validate-article";

export function formatIssue(issue: ValidationIssue): string {
  const tag =
    issue.level === "error" ? "[ERROR]" : issue.level === "warning" ? "[WARN] " : "[INFO] ";
  return `    ${tag} ${issue.message}`;
}

export function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}
