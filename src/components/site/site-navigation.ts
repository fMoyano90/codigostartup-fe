import type { Service } from "@/lib/commercial/schema";

export type SolutionNavItem = {
  label: string;
  href: string;
};

export type SolutionNavGroup = {
  label: string;
  items: SolutionNavItem[];
};

const groupDefinitions = [
  { need: "operacion", label: "Operación" },
  { need: "productos-digitales", label: "Productos digitales" },
  { need: "sistemas-existentes", label: "Sistemas existentes" },
] as const satisfies ReadonlyArray<{ need: Service["need"]; label: string }>;

export function buildSolutionNavGroups(services: Service[]): SolutionNavGroup[] {
  return groupDefinitions.map((group) => ({
    label: group.label,
    items: services
      .filter(({ need }) => need === group.need)
      .map(({ name, slug }) => ({ label: name, href: `/soluciones/${slug}` })),
  }));
}

export function isRouteActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
