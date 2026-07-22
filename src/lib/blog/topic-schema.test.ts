import { describe, it, expect } from "vitest";
import { safeParseTopicList } from "./topic-schema";

function validTopic(overrides: Record<string, unknown> = {}) {
  return {
    id: "tema-de-prueba",
    title: "Tema de prueba",
    status: "pending",
    intent: "informational",
    funnelStage: "awareness",
    audience: ["founders"],
    objective: "Probar el esquema de topics.",
    ...overrides,
  };
}

function validTopicList(overrides: Record<string, unknown> = {}) {
  return {
    id: "lista-01",
    name: "Lista de prueba",
    category: "crear-productos-digitales",
    topics: [validTopic()],
    ...overrides,
  };
}

describe("topicListSchema", () => {
  it("accepts a valid topic list", () => {
    expect(safeParseTopicList(validTopicList()).success).toBe(true);
  });

  it("rejects a category outside the configured list", () => {
    const result = safeParseTopicList(validTopicList({ category: "no-existe" }));
    expect(result.success).toBe(false);
  });

  it("rejects a topic with an empty title", () => {
    const result = safeParseTopicList(
      validTopicList({ topics: [validTopic({ title: "" })] })
    );
    expect(result.success).toBe(false);
  });

  it("rejects a topic with an invalid status", () => {
    const result = safeParseTopicList(
      validTopicList({ topics: [validTopic({ status: "archived" })] })
    );
    expect(result.success).toBe(false);
  });

  it("rejects a topic with an invalid audience value", () => {
    const result = safeParseTopicList(
      validTopicList({ topics: [validTopic({ audience: ["clientes"] })] })
    );
    expect(result.success).toBe(false);
  });

  it("rejects a topic with an invalid intent", () => {
    const result = safeParseTopicList(
      validTopicList({ topics: [validTopic({ intent: "viral" })] })
    );
    expect(result.success).toBe(false);
  });

  it("rejects an empty topics array", () => {
    const result = safeParseTopicList(validTopicList({ topics: [] }));
    expect(result.success).toBe(false);
  });

  it("rejects an id that isn't kebab-case (it must double as the article slug)", () => {
    const result = safeParseTopicList(
      validTopicList({ topics: [validTopic({ id: "Tema Con Espacios" })] })
    );
    expect(result.success).toBe(false);
  });
});
