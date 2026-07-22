export type BlogCategory = {
  slug: string;
  name: string;
  description: string;
};

export const blogCategories: BlogCategory[] = [
  {
    slug: "crear-productos-digitales",
    name: "Crear productos digitales",
    description:
      "Cómo pasar de una idea a un producto digital real: alcance, prioridades y primeras decisiones técnicas.",
  },
  {
    slug: "software-para-empresas",
    name: "Software para empresas",
    description:
      "Software a medida, sistemas internos y herramientas que reemplazan procesos manuales en tu empresa.",
  },
  {
    slug: "automatizacion-e-ia",
    name: "Automatización e inteligencia artificial",
    description:
      "Dónde automatizar primero, qué puede hacer la IA hoy en tu operación y qué riesgos conlleva.",
  },
  {
    slug: "costos-y-presupuestos",
    name: "Costos y presupuestos",
    description:
      "Cómo estimar, comparar y justificar una inversión en tecnología frente a otras prioridades del negocio.",
  },
  {
    slug: "proveedores-tecnologicos",
    name: "Proveedores tecnológicos",
    description:
      "Cómo evaluar, elegir y trabajar con equipos de desarrollo, agencias y freelancers.",
  },
  {
    slug: "escalabilidad-y-crecimiento",
    name: "Escalabilidad y crecimiento",
    description:
      "Qué preparar en tu producto y tu equipo técnico antes de que el crecimiento se convierta en un problema.",
  },
  {
    slug: "seguridad-y-riesgos",
    name: "Seguridad y riesgos tecnológicos",
    description:
      "Riesgos técnicos y de negocio que suelen pasar desapercibidos hasta que generan una pérdida.",
  },
  {
    slug: "casos-de-exito",
    name: "Casos de éxito",
    description:
      "Proyectos reales, decisiones tomadas y resultados obtenidos por empresas que ya pasaron por esto.",
  },
];

export const blogCategorySlugs = blogCategories.map((c) => c.slug);

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return blogCategories.find((c) => c.slug === slug);
}

export function isValidCategorySlug(slug: string): boolean {
  return blogCategorySlugs.includes(slug);
}
