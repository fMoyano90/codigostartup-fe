import {
  assertUniqueSlugs,
  projectSchema,
  type Project,
  type ProjectSlug,
} from "@/lib/commercial/schema";

const projectData: Project[] = [
  {
    slug: "subtech",
    kind: "client",
    sector: "Minería",
    name: "SubTech",
    description: "Monitoreo en tiempo real de maquinarias, vehículos y personas dentro de una mina, nivel por nivel. Visibilidad total de lo que ocurre bajo tierra.",
    hook: "En una emergencia, en segundos sabes exactamente quién y qué activos están en el interior.",
    metrics: [
      { val: "Real-time", label: "Monitoreo" },
      { val: "Industrial", label: "Escala" },
      { val: "Minería", label: "Sector" },
    ],
    logo: "/SS_LOGO_WHITE.png",
    externalUrl: null,
    homeCard: null,
    testimonial: {
      quote: "Estoy muy contento con el trabajo de Código tanto en desarrollo como su modalidad de trabajo; ágil, limpia y eficaz. El trabajo por parte de Código nos ha permitido validar nuestro MVP, paso crucial para el desarrollo profesional de nuestra Startup.",
      author: "Christian Solar, Gerente General",
    },
    relatedServices: ["software-a-medida"],
    editorialStatus: "draft",
    editorialNotes: ["Pendiente completar contexto, proceso y resultados verificables para la página de caso."],
  },
  {
    slug: "entrena",
    kind: "client",
    sector: "Fitness & Coaching",
    name: "Entrena",
    description: "Plataforma para coaches: gestión de alumnos, clases, seguimiento de progreso y evaluaciones de fuerza, movilidad y carga en un solo lugar.",
    hook: "Cada sesión queda registrada. El progreso del alumno siempre visible, para el coach y para el atleta.",
    metrics: [
      { val: "SaaS", label: "Modelo" },
      { val: "Multi-rol", label: "Coach + Alumno" },
      { val: "Fitness", label: "Industria" },
    ],
    logo: "/logo-entrena-vip.png",
    externalUrl: null,
    homeCard: null,
    testimonial: {
      quote: "Trabajar con los chicos de código startup ha Sido un gran avance en mi proyecto como coach de entrenamiento debido a que con ellos mejoramos mi sistema completo a través de una app móvil exclusiva para mis alumnos y clientes.",
      author: "Jaime Valero, Coach & Founder",
    },
    relatedServices: ["desarrollo-mvp", "aplicaciones-web", "aplicaciones-moviles"],
    editorialStatus: "draft",
    editorialNotes: ["Pendiente completar contexto, proceso y resultados verificables para la página de caso."],
  },
  {
    slug: "nextdrill",
    kind: "client",
    sector: "Finanzas",
    name: "NextDrill Admin",
    description: "Panel financiero para empresas con múltiples centros de costo: caja proyectada, facturación integrada con SII y visibilidad total del flujo.",
    hook: "Sabes exactamente cuánto entra, cuánto sale y cuánto tienes proyectado, sin una hoja de cálculo.",
    metrics: [
      { val: "Multi-CC", label: "Centros de costo" },
      { val: "Proyectada", label: "Caja" },
      { val: "ERP lite", label: "Tipo" },
    ],
    logo: "/logo-nextdrill.png",
    externalUrl: null,
    homeCard: null,
    testimonial: {
      quote: "Codigo Startup nos acompañó desde un simple MVP hasta una plataforma robusta integrada con SII. Su enfoque evolutivo nos permitió crecer paso a paso, y ahora estamos listos para el siguiente paso con inventarios y bodegas.",
      author: "Roberto Silva, Gerente General",
    },
    relatedServices: ["software-a-medida", "desarrollo-mvp", "aplicaciones-web"],
    editorialStatus: "draft",
    editorialNotes: ["Pendiente completar contexto, proceso y resultados verificables para la página de caso."],
  },
  {
    slug: "nucleo-gestor",
    kind: "own-product",
    sector: "Minería",
    name: "Núcleo Gestor",
    description: "Plataforma de gestión de liderazgo y cumplimiento normativo del DS44 para la industria minera. IA entrenada en normativa, app móvil 100% offline y firma electrónica simple según ley 19799.",
    hook: "Construir y operar una plataforma propia permite aplicar ese aprendizaje directamente en los proyectos de clientes.",
    metrics: [
      { val: "DS44", label: "Normativa" },
      { val: "100%", label: "Offline" },
      { val: "FES", label: "Ley 19799" },
    ],
    logo: "/logo-nucleo-gestor-blanco-naranjo.svg",
    externalUrl: "https://nucleogestor.com/landing",
    homeCard: {
      description: "Gestión de liderazgo y normativa DS44 para la industria minera.",
      ctaLabel: "Conocer Núcleo Gestor →",
    },
    testimonial: null,
    relatedServices: ["software-a-medida", "desarrollo-mvp", "aplicaciones-web", "aplicaciones-moviles"],
    editorialStatus: "draft",
    editorialNotes: ["Producto propio: debe distinguirse de los casos de clientes en todas las páginas."],
  },
];

export const projects = projectSchema.array().parse(projectData);
assertUniqueSlugs(projects, "proyectos");

export function getProjectBySlug(slug: ProjectSlug) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) {
    throw new Error(`No existe el proyecto ${slug}`);
  }
  return project;
}
