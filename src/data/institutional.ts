import type { CapabilitySlug } from "@/lib/commercial/schema";

export type ProcessPhase = {
  n: string;
  title: string;
  description: string;
  clientParticipation: string;
  deliverables: string[];
};

export const processPhases: ProcessPhase[] = [
  {
    n: "01",
    title: "Diagnóstico",
    description: "Entendemos el problema, el proceso actual, las personas usuarias y las restricciones antes de proponer una solución.",
    clientParticipation: "Compartir contexto, antecedentes, accesos disponibles y las principales dificultades del proceso actual.",
    deliverables: ["Diagnóstico inicial", "Problema y contexto definidos", "Supuestos por validar"],
  },
  {
    n: "02",
    title: "Definición de alcance",
    description: "Priorizamos lo necesario y dejamos explícito qué se construirá, qué queda fuera y bajo qué condiciones.",
    clientParticipation: "Validar prioridades, responsables, restricciones y decisiones que afectan el alcance.",
    deliverables: ["Alcance acordado", "Tiempos y precio claros", "Ruta de trabajo"],
  },
  {
    n: "03",
    title: "Diseño y prototipo",
    description: "Definimos flujos, contenido e interfaces antes de invertir en la construcción completa cuando el proyecto lo requiere.",
    clientParticipation: "Revisar recorridos, contenido, reglas del negocio y decisiones de experiencia.",
    deliverables: ["Flujos principales", "Diseño UX/UI", "Prototipo cuando corresponda"],
  },
  {
    n: "04",
    title: "Construcción",
    description: "Implementamos la solución, sus reglas e integraciones acordadas sobre una base preparada para operar y evolucionar.",
    clientParticipation: "Resolver dudas de negocio, facilitar accesos y validar decisiones durante la implementación.",
    deliverables: ["Código funcional", "Integraciones acordadas", "Avance demostrable"],
  },
  {
    n: "05",
    title: "Entregas semanales",
    description: "Mostramos avances reales para mantener visibilidad, detectar desvíos y ajustar con información concreta.",
    clientParticipation: "Revisar cada entrega, entregar feedback y confirmar prioridades para el siguiente avance.",
    deliverables: ["Incrementos revisables", "Decisiones registradas", "Siguiente avance definido"],
  },
  {
    n: "06",
    title: "Pruebas",
    description: "Verificamos los recorridos, reglas e integraciones antes del lanzamiento y corregimos los problemas detectados.",
    clientParticipation: "Validar el uso real, aportar datos de prueba y confirmar que la solución responde al proceso acordado.",
    deliverables: ["Pruebas del alcance", "Correcciones priorizadas", "Validación para lanzamiento"],
  },
  {
    n: "07",
    title: "Lanzamiento",
    description: "Preparamos la salida a producción, los accesos y la documentación necesaria para comenzar a operar.",
    clientParticipation: "Coordinar responsables, accesos, contenido y condiciones operacionales para la puesta en marcha.",
    deliverables: ["Producto en producción", "Documentación acordada", "Traspaso inicial"],
  },
  {
    n: "08",
    title: "Evolución",
    description: "Revisamos uso, feedback y nuevas prioridades para decidir qué conviene mejorar después del lanzamiento.",
    clientParticipation: "Compartir evidencia de uso, problemas observados y cambios del negocio que deban considerarse.",
    deliverables: ["Hallazgos posteriores", "Prioridades de mejora", "Próxima ruta de evolución"],
  },
];

export const processCapabilitySlugs: CapabilitySlug[] = [
  "estrategia",
  "ux-ui",
  "contenido",
  "seo",
  "analitica",
  "arquitectura",
  "seguridad",
  "lanzamiento-y-evolucion",
];

export const aboutValues = [
  {
    title: "Claridad",
    description: "Alcance, tiempos, precio y responsabilidades explícitas antes de construir.",
  },
  {
    title: "Transparencia",
    description: "Avances visibles, entregas semanales y decisiones explicadas durante el proyecto.",
  },
  {
    title: "Propiedad y traspaso",
    description: "Código, documentación y conocimiento preparados para que el producto pueda continuar.",
  },
  {
    title: "Evolución",
    description: "Medir, aprender y ajustar después del lanzamiento en lugar de asumir que la primera versión es definitiva.",
  },
];

export const teamGallery = [
  { src: "/nosotros/gallery-2.jpeg", alt: "Dos integrantes de Código Startup en una actividad exterior" },
  { src: "/nosotros/gallery-4.jpeg", alt: "Integrantes de Código Startup en un encuentro de emprendimiento" },
  { src: "/nosotros/gallery-5.jpeg", alt: "Dos integrantes de Código Startup en una actividad empresarial" },
  { src: "/nosotros/gallery-6.jpeg", alt: "Integrantes de Código Startup durante una sesión de trabajo con un computador portátil" },
];
