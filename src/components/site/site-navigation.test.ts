import { describe, expect, it } from "vitest";
import { services } from "@/data/services";
import { buildSolutionNavGroups, isRouteActive } from "./site-navigation";

describe("site navigation", () => {
  it("groups the seven services according to the target navigation", () => {
    const groups = buildSolutionNavGroups(services);

    expect(groups.map(({ label }) => label)).toEqual([
      "Presencia digital",
      "Operación",
      "Productos digitales",
      "Sistemas existentes",
    ]);
    expect(groups.flatMap(({ items }) => items)).toHaveLength(7);
  });

  it("never exposes marketing as an independent solution", () => {
    const labels = buildSolutionNavGroups(services)
      .flatMap(({ items }) => items)
      .map(({ label }) => label.toLowerCase());

    expect(labels).not.toContain("marketing");
  });

  it("marks an exact route and its descendants as active", () => {
    expect(isRouteActive("/proyectos", "/proyectos")).toBe(true);
    expect(isRouteActive("/proyectos/subtech", "/proyectos")).toBe(true);
    expect(isRouteActive("/proyecto", "/proyectos")).toBe(false);
    expect(isRouteActive("/", "/proyectos")).toBe(false);
  });
});
