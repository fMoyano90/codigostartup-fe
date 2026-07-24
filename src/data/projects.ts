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
      photo: { src: "/testimonios/subtech.jpg", alt: "Christian Solar, Gerente General de SubTech" },
    },
    relatedServices: ["software-a-medida"],
    caseStudy: {
      context: "Proyecto para una operación minera que requiere monitorear maquinarias, vehículos y personas dentro de la mina, nivel por nivel.",
      problem: "En una emergencia, el equipo necesita saber exactamente quién y qué activos están en el interior.",
      previousState: "Cada supervisor debía revisar manualmente quiénes estaban a su cargo y en qué posición se encontraban para recién así tener una idea de quién podía estar bajo tierra. Sin visibilidad centralizada, el proceso era prácticamente a ciegas.",
      objective: "Dar visibilidad total de lo que ocurre bajo tierra mediante monitoreo en tiempo real.",
      solution: "Una solución de monitoreo en tiempo real de maquinarias, vehículos y personas dentro de una mina.",
      features: [
        "Monitoreo en tiempo real de maquinarias.",
        "Monitoreo de vehículos y personas.",
        "Visibilidad por nivel dentro de la mina.",
      ],
      process: [
        {
          title: "Infraestructura de localización",
          description: "El cliente instaló redes wifi al interior de la mina y pórticos detectores de ubicación, y nos dio acceso a los datos que estos generaban.",
        },
        {
          title: "Plataforma de consumo y limpieza de datos",
          description: "Construimos una plataforma que consulta esa información cada cierta cantidad de segundos, la limpia y extrae los datos útiles para el monitoreo.",
        },
        {
          title: "Sensores en los activos",
          description: "Se instalaron sensores en camionetas, maquinarias y cascos de los trabajadores, lo que permite saber en qué sector se encuentra cada activo.",
        },
        {
          title: "Dashboard en tiempo real",
          description: "El dashboard funciona en tiempo real, con mapas referenciales y un plano de la mina, para que la gerencia pueda ver todo desde su computador.",
        },
        {
          title: "Evolución continua",
          description: "El proyecto se sigue mejorando hasta la fecha.",
        },
      ],
      result: "El testimonio del cliente confirma que el trabajo permitió validar el MVP de SubTech.",
      demoVideo: {
        src: "/subtech-demo.mp4",
        caption: "Demo del dashboard de monitoreo en tiempo real de SubTech.",
      },
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
      photo: { src: "/testimonios/entrena.png", alt: "Jaime Valero, Coach & Founder de Entrena" },
    },
    relatedServices: ["desarrollo-mvp", "aplicaciones-web", "aplicaciones-moviles"],
    caseStudy: {
      context: "Plataforma digital para coaches y sus alumnos, orientada a organizar clases, seguimiento y evaluaciones. Se construyó como SaaS, pensando también en ofrecerla a otros coaches para potenciar sus propios servicios.",
      problem: "El coach no podía saber con anticipación quiénes asistirían a cada clase: a veces llegaba mucha gente y no alcanzaban los recursos para entrenar a todos, otras veces llegaba poca. Todo se coordinaba por WhatsApp, sin métricas, evaluaciones ni forma de que el alumno viera su progreso diario.",
      previousState: "Todo funcionaba por WhatsApp y planillas de Excel: los alumnos no podían medir su progreso y el coach no sabía cuántos asistirían a cada clase, lo que dificultaba planificarlas.",
      objective: "Mantener cada sesión registrada y hacer visible el progreso para el coach y el atleta.",
      solution: "Una plataforma para gestionar alumnos, clases, progreso y evaluaciones de fuerza, movilidad y carga.",
      features: [
        "Gestión de alumnos y clases.",
        "Seguimiento del progreso.",
        "Evaluaciones de fuerza, movilidad y carga.",
        "Experiencias diferenciadas para coach y alumno.",
      ],
      process: [
        {
          title: "Del concepto al MVP",
          description: "El cliente llegó con muchas ideas y quería una aplicación grande. Lo guiamos para bajar esa idea a un MVP enfocado en lo esencial.",
        },
        {
          title: "Iteración con feedback real",
          description: "Con el MVP construido, pudo solicitar feedback muy rápidamente, lo que permitió lograr una app más pulida y adaptada a las verdaderas necesidades de los alumnos y del coach.",
        },
        {
          title: "Herramienta indispensable",
          description: "Hoy es una herramienta indispensable en su operación: todos los alumnos la usan y se ha seguido mejorando con el tiempo. Llevamos dos años trabajando con Jaime.",
        },
      ],
      result: "El coach puede ver las métricas de sus alumnos sin perder información y armar mejores planes para su progreso.",
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
      photo: { src: "/testimonios/nextdrill.jpg", alt: "Roberto Silva, Gerente General de NextDrill Admin" },
    },
    relatedServices: ["software-a-medida", "desarrollo-mvp", "aplicaciones-web"],
    caseStudy: {
      context: "Panel financiero para empresas que operan con múltiples centros de costo.",
      problem: "Toda la operación financiera se manejaba en una planilla Excel compartida en Drive: al ser editada por muchas personas, generaba inconsistencias constantes. Tampoco existía forma de notificar el vencimiento de facturas por pagar o por cobrar, por lo que seguir operando desde Excel ya era inviable.",
      previousState: "Todos los gastos y ventas se registraban en una planilla Excel alojada en la nube (Drive), a la que tenía acceso todo el equipo financiero y también el agente de bodega. Con tantas personas editando el mismo documento, coordinar la operación dependía de Excel y de mensajes por WhatsApp.",
      objective: "Dar visibilidad sobre cuánto entra, cuánto sale y cuánto está proyectado, sin depender de una hoja de cálculo.",
      solution: "Una plataforma con caja proyectada, facturación integrada con SII y visibilidad del flujo financiero.",
      features: [
        "Administración de múltiples centros de costo.",
        "Caja proyectada.",
        "Facturación integrada con SII.",
        "Visibilidad consolidada del flujo financiero.",
      ],
      process: [
        {
          title: "Construcción con sprints planificados",
          description: "El desarrollo se hizo muy de la mano con el cliente, con sprints planificados.",
        },
        {
          title: "MVP primero",
          description: "Se desarrolló primero un MVP que se puso en práctica muy rápido.",
        },
        {
          title: "Iteración con feedback de los operadores",
          description: "A partir del uso de los propios operadores financieros se fue obteniendo feedback, se añadieron nuevos módulos y se automatizaron ciertos procesos.",
        },
        {
          title: "Pulido hasta la funcionalidad actual",
          description: "El producto se fue puliendo hasta llegar a una plataforma funcional.",
        },
      ],
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
      context: "Núcleo Gestor lleva cerca de dos años en desarrollo. El proyecto fue incubado por Chrysalis, la incubadora de negocios de la Pontificia Universidad Católica de Valparaíso, para la gestión de liderazgo y cumplimiento normativo del DS44 y las principales ISO en la industria minera.",
      problem: "La gestión de liderazgo y cumplimiento del DS44 dependía de procesos manuales y en papel: documentos que se pierden o dañan, auditorías que consumen horas por la desorganización y decisiones que se toman sin datos en tiempo real.",
      previousState: "Los formularios y registros se completaban y archivaban en papel, sin trazabilidad digital. Encontrar un documento para una auditoría implicaba revisar archivos físicos desorganizados, y la gerencia no contaba con información actualizada para tomar decisiones.",
      objective: "Reemplazar la gestión en papel por una plataforma digital con control total, datos en tiempo real y cero papel, que reduzca el tiempo de gestión, agilice las auditorías y mejore el cumplimiento normativo.",
      solution: "Una plataforma con IA entrenada en normativa, aplicación móvil offline y firma electrónica simple.",
      features: [
        "Gestión de liderazgo y cumplimiento del DS44.",
        "IA entrenada en normativa.",
        "Aplicación móvil con funcionamiento 100% offline.",
        "Firma electrónica simple según la Ley 19.799.",
      ],
      process: [
        {
          title: "Incubación en Chrysalis (PUCV)",
          description: "El proyecto fue incubado con una beca de Chrysalis, la incubadora de negocios de la Pontificia Universidad Católica de Valparaíso, recorriendo el camino del emprendedor para mirar el negocio desde una perspectiva más profesional.",
        },
        {
          title: "Validación con el sector minero",
          description: "La idea y los módulos de Núcleo Gestor se validaron con jefes de seguridad, jefes de operaciones, gerentes y expertos del área minera, quienes aportaron a su definición.",
        },
        {
          title: "Mentorías especializadas",
          description: "El equipo recibió mentorías en finanzas, producto digital, tecnología y marketing, además de mentores con startups propias ya en funcionamiento y generando ingresos.",
        },
        {
          title: "Pilotaje activo en minería",
          description: "El producto se encuentra en pilotaje activo en la industria minera y se sigue perfeccionando con la retroalimentación de los usuarios.",
        },
      ],
      result: "Los usuarios en pilotaje reportan que pueden acceder a información en terreno sin conexión a internet, generar reportes más rápido, capturar evidencia en el lugar y planificar mejor las tareas de cada persona, dejando atrás el papel.",
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
