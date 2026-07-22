import { describe, it, expect } from "vitest";
import { syncTopicStatus } from "./sync-topics";
import type { Topic } from "@/lib/blog/topic-schema";

function topic(overrides: Partial<Topic> & { id: string; status: Topic["status"] }): Topic {
  return {
    title: "Título",
    intent: "informational",
    funnelStage: "awareness",
    audience: ["founders"],
    objective: "Objetivo",
    notes: [],
    ...overrides,
  };
}

describe("syncTopicStatus", () => {
  it("moves pending → generated when a draft exists", () => {
    const result = syncTopicStatus(topic({ id: "t1", status: "pending" }), "drafts");
    expect(result).toMatchObject({ changed: true, newStatus: "generated" });
  });

  it("leaves pending unchanged when no article exists yet", () => {
    const result = syncTopicStatus(topic({ id: "t1", status: "pending" }), null);
    expect(result.changed).toBe(false);
    expect(result.issue).toBeUndefined();
  });

  it("moves generated → published when the article is published", () => {
    const result = syncTopicStatus(topic({ id: "t1", status: "generated" }), "published");
    expect(result).toMatchObject({ changed: true, newStatus: "published" });
  });

  it("warns (without changing status) when generated has no article anywhere", () => {
    const result = syncTopicStatus(topic({ id: "t1", status: "generated" }), null);
    expect(result.changed).toBe(false);
    expect(result.issue?.level).toBe("warning");
  });

  it("errors (without changing status) when published has no published article", () => {
    const result = syncTopicStatus(topic({ id: "t1", status: "published" }), null);
    expect(result.changed).toBe(false);
    expect(result.issue?.level).toBe("error");
  });

  it("errors when published points to a draft instead of a published article", () => {
    const result = syncTopicStatus(topic({ id: "t1", status: "published" }), "drafts");
    expect(result.issue?.level).toBe("error");
  });

  it("leaves discarded topics untouched regardless of article state", () => {
    const result = syncTopicStatus(topic({ id: "t1", status: "discarded" }), null);
    expect(result.changed).toBe(false);
    expect(result.issue).toBeUndefined();
  });
});
