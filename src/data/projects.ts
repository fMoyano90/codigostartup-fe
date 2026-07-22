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
    caseStudy: {
      context: "Proyecto para una operación minera que requiere monitorear maquinarias, vehículos y personas dentro de la mina, nivel por nivel.",
      problem: "En una emergencia, el equipo necesita saber exactamente quién y qué activos están en el interior.",
      previousState: null,
      objective: "Dar visibilidad total de lo que ocurre bajo tierra mediante monitoreo en tiempo real.",
      solution: "Una solución de monitoreo en tiempo real de maquinarias, vehículos y personas dentro de una mina.",
      features: [
        "Monitoreo en tiempo real de maquinarias.",
        "Monitoreo de vehículos y personas.",
        "Visibilidad por nivel dentro de la mina.",
      ],
      process: [],
      result: "El testimonio del cliente confirma que el trabajo permitió validar el MVP de SubTech.",
      gallery: [],
      relatedArticles: [],
    },
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
    caseStudy: {
      context: "Plataforma digital para coaches y sus alumnos, orientada a organizar clases, seguimiento y evaluaciones.",
      problem: null,
      previousState: null,
      objective: "Mantener cada sesión registrada y hacer visible el progreso para el coach y el atleta.",
      solution: "Una plataforma para gestionar alumnos, clases, progreso y evaluaciones de fuerza, movilidad y carga.",
      features: [
        "Gestión de alumnos y clases.",
        "Seguimiento del progreso.",
        "Evaluaciones de fuerza, movilidad y carga.",
        "Experiencias diferenciadas para coach y alumno.",
      ],
      process: [],
      result: null,
      gallery: [
        {
          src: "/app-mobile-entrena-cel.png",
          alt: "Vista móvil de la plataforma Entrena",
          caption: "Vista móvil del seguimiento de entrenamiento disponible en los activos del proyecto.",
        },
      ],
      relatedArticles: [],
    },
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
    caseStudy: {
      context: "Panel financiero para empresas que operan con múltiples centros de costo.",
      problem: null,
      previousState: null,
      objective: "Dar visibilidad sobre cuánto entra, cuánto sale y cuánto está proyectado, sin depender de una hoja de cálculo.",
      solution: "Una plataforma con caja proyectada, facturación integrada con SII y visibilidad del flujo financiero.",
      features: [
        "Administración de múltiples centros de costo.",
        "Caja proyectada.",
        "Facturación integrada con SII.",
        "Visibilidad consolidada del flujo financiero.",
      ],
      process: [],
      result: "El testimonio del cliente confirma la evolución desde un MVP hasta una plataforma integrada con SII.",
      gallery: [
        {
          src: "/macbookpro-nexdrill.png",
          alt: "Panel administrativo de NextDrill en un computador portátil",
          caption: "Vista del panel administrativo disponible en los activos del proyecto.",
        },
      ],
      relatedArticles: [],
    },
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
    logo: "/logo-nucleo.svg",
    externalUrl: "https://nucleogestor.com/landing",
    homeCard: {
      description: "Gestión de liderazgo y normativa DS44 para la industria minera.",
      ctaLabel: "Conocer Núcleo Gestor →",
    },
    testimonial: null,
    relatedServices: ["software-a-medida", "desarrollo-mvp", "aplicaciones-web", "aplicaciones-moviles"],
    caseStudy: {
      context: "Producto propio para gestión de liderazgo y cumplimiento normativo del DS44 en la industria minera.",
      problem: null,
      previousState: null,
      objective: null,
      solution: "Una plataforma con IA entrenada en normativa, aplicación móvil offline y firma electrónica simple.",
      features: [
        "Gestión de liderazgo y cumplimiento del DS44.",
        "IA entrenada en normativa.",
        "Aplicación móvil con funcionamiento 100% offline.",
        "Firma electrónica simple según la Ley 19.799.",
      ],
      process: [],
      result: null,
      gallery: [
        {
          src: "/mockup-nucleo-gestor.png",
          alt: "Mockup de la plataforma Núcleo Gestor",
          caption: "Mockup disponible del producto propio Núcleo Gestor.",
        },
      ],
      relatedArticles: [],
    },
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
