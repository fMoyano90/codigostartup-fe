import { describe, it, expect } from "vitest";
import {
  findDuplicateTopicIds,
  checkGeneratedTopicsHaveArticle,
  checkPendingTopicsAgainstExistingSlugs,
} from "./validate-topics";
import type { Topic, TopicList } from "@/lib/blog/topic-schema";

function topic(overrides: Partial<Topic> & { id: string }): Topic {
  return {
    title: "Título",
    status: "pending",
    intent: "informational",
    funnelStage: "awareness",
    audience: ["founders"],
    objective: "Objetivo",
    notes: [],
    ...overrides,
  };
}

function topicList(topics: Topic[], overrides: Partial<TopicList> = {}): TopicList {
  return {
    id: "lista-01",
    name: "Lista",
    category: "crear-productos-digitales",
    topics,
    ...overrides,
  };
}

describe("findDuplicateTopicIds", () => {
  it("returns nothing when every id is unique across files", () => {
    const entries = [
      { file: "a.yml", topicList: topicList([topic({ id: "uno" })]) },
      { file: "b.yml", topicList: topicList([topic({ id: "dos" })]) },
    ];
    expect(findDuplicateTopicIds(entries)).toEqual([]);
  });

  it("flags an id duplicated across two files", () => {
    const entries = [
      { file: "a.yml", topicList: topicList([topic({ id: "repetido" })]) },
      { file: "b.yml", topicList: topicList([topic({ id: "repetido" })]) },
    ];
    const result = findDuplicateTopicIds(entries);
    expect(result).toHaveLength(1);
    expect(result[0].topicId).toBe("repetido");
  });

  it("flags an id duplicated within the same file", () => {
    const entries = [
      {
        file: "a.yml",
        topicList: topicList([topic({ id: "repetido" }), topic({ id: "repetido" })]),
      },
    ];
    expect(findDuplicateTopicIds(entries)).toHaveLength(1);
  });
});

describe("checkGeneratedTopicsHaveArticle", () => {
  it("flags a 'generated' topic with no matching article anywhere", () => {
    const list = topicList([topic({ id: "sin-articulo", status: "generated" })]);
    const issues = checkGeneratedTopicsHaveArticle("a.yml", list, []);
    expect(issues).toHaveLength(1);
    expect(issues[0].level).toBe("error");
  });

  it("does not flag a 'generated' topic that has a matching article", () => {
    const list = topicList([topic({ id: "con-articulo", status: "generated" })]);
    const issues = checkGeneratedTopicsHaveArticle("a.yml", list, ["con-articulo"]);
    expect(issues).toHaveLength(0);
  });

  it("does not flag a 'pending' topic even without a matching article", () => {
    const list = topicList([topic({ id: "pendiente", status: "pending" })]);
    const issues = checkGeneratedTopicsHaveArticle("a.yml", list, []);
    expect(issues).toHaveLength(0);
  });
});

describe("checkPendingTopicsAgainstExistingSlugs", () => {
  it("warns when a pending topic's id already matches an existing article", () => {
    const list = topicList([topic({ id: "ya-existe", status: "pending" })]);
    const issues = checkPendingTopicsAgainstExistingSlugs("a.yml", list, ["ya-existe"]);
    expect(issues).toHaveLength(1);
    expect(issues[0].level).toBe("warning");
  });

  it("does not warn when the pending topic's id is not yet used", () => {
    const list = topicList([topic({ id: "nuevo", status: "pending" })]);
    const issues = checkPendingTopicsAgainstExistingSlugs("a.yml", list, ["otro-articulo"]);
    expect(issues).toHaveLength(0);
  });
});
