import {
  assertUniqueSlugs,
  capabilitySchema,
  type Capability,
} from "@/lib/commercial/schema";

const capabilityData: Capability[] = [
  {
    slug: "estrategia",
    name: "Estrategia",
    description: "Definición de objetivos, prioridades y decisiones de producto antes y durante la construcción.",
  },
  {
    slug: "ux-ui",
    name: "UX/UI",
    description: "Diseño de experiencias e interfaces alineadas con las necesidades de las personas que usarán la solución.",
  },
  {
    slug: "desarrollo",
    name: "Desarrollo",
    description: "Construcción técnica de la solución y sus integraciones.",
  },
  {
    slug: "contenido",
    name: "Contenido",
    description: "Organización y producción del contenido necesario para explicar la solución con claridad.",
  },
  {
    slug: "seo",
    name: "SEO",
    description: "Fundamentos técnicos y editoriales para que el contenido pueda encontrarse en buscadores cuando corresponda.",
  },
  {
    slug: "analitica",
    name: "Analítica",
    description: "Medición del uso y de las acciones relevantes para orientar decisiones de evolución.",
  },
  {
    slug: "arquitectura",
    name: "Arquitectura",
    description: "Definición de una base técnica que permita operar, mantener y evolucionar la solución.",
  },
  {
    slug: "seguridad",
    name: "Seguridad",
    description: "Controles y prácticas acordes con los datos, usuarios y riesgos de cada solución.",
  },
  {
    slug: "lanzamiento-y-evolucion",
    name: "Lanzamiento y evolución",
    description: "Preparación de la salida a producción, seguimiento y mejoras posteriores.",
  },
];

export const capabilities = capabilitySchema.array().parse(capabilityData);
assertUniqueSlugs(capabilities, "capacidades");
