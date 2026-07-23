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

export type Founder = {
  name: string;
  role: string;
  bio: string;
  location: string;
  image: { src: string; alt: string };
};

export const founders: Founder[] = [
  {
    name: "Andres Rojas",
    role: "Product Manager · UX/UI Designer",
    bio: "Publicidad y Adm de empresas · +15 años de experiencia integrando estrategia de negocio, diseño de experiencia y arquitectura de datos.",
    location: "Chile",
    image: { src: "/founders/andres-rojas.png", alt: "Andres Rojas, cofundador de Código Startup" },
  },
  {
    name: "Felipe Moyano",
    role: "Software Engineer & AI Solutions Architect",
    bio: "+10 años diseñando y construyendo soluciones tecnológicas para minería, aeronáutica, retail y transformación digital empresarial.",
    location: "Chile",
    image: { src: "/founders/felipe-moyano.png", alt: "Felipe Moyano, cofundador de Código Startup" },
  },
];

export const teamGallery = [
  { src: "/nosotros/gallery-2.jpeg", alt: "Dos integrantes de Código Startup en una actividad exterior" },
  { src: "/nosotros/gallery-4.jpeg", alt: "Integrantes de Código Startup en un encuentro de emprendimiento" },
  { src: "/nosotros/gallery-5.jpeg", alt: "Dos integrantes de Código Startup en una actividad empresarial" },
  { src: "/nosotros/gallery-6.jpeg", alt: "Integrantes de Código Startup durante una sesión de trabajo con un computador portátil" },
  { src: "/nosotros/gallery-3.jpeg", alt: "Stand de Clima Digital en una feria de emprendimiento al aire libre" },
  { src: "/nosotros/gallery-7.jpeg", alt: "Integrante de Código Startup siendo entrevistado en un stand de Entel Empresas" },
  { src: "/nosotros/gallery-8.jpg", alt: "Integrantes de Código Startup revisando código en un taller de trabajo" },
  { src: "/nosotros/gallery-9.jpg", alt: "Notebooks con código y una terminal abiertos en un espacio de trabajo" },
  { src: "/nosotros/gallery-10.jpg", alt: "Robot cuadrúpedo exhibido en una feria tecnológica" },
  { src: "/nosotros/gallery-12.jpg", alt: "Stand de Clima Digital para Codelco con visitantes en una feria industrial" },
  { src: "/nosotros/gallery-13.jpg", alt: "Estación de herramientas y notebooks en un stand de feria industrial" },
  { src: "/nosotros/gallery-14.jpg", alt: "Integrante de Código Startup conversando con una visitante en una feria tecnológica" },
  { src: "/nosotros/gallery-17.jpg", alt: "Integrante de Código Startup en un stand sobre inteligencia artificial aplicada a la minería" },
  { src: "/nosotros/gallery-19.jpg", alt: "Integrante de Código Startup en la salida de la feria Expomin" },
  { src: "/nosotros/gallery-20.jpg", alt: "Integrante de Código Startup presentando en el evento TIM" },
  { src: "/nosotros/gallery-21.jpg", alt: "Asistentes conversando en el espacio de networking de un evento" },
  { src: "/nosotros/gallery-22.jpg", alt: "Sala de estar de un evento corporativo con asistentes conversando al fondo" },
  { src: "/nosotros/gallery-23.jpg", alt: "Auditorio de una charla del encuentro Ecosistema" },
  { src: "/nosotros/gallery-24.jpg", alt: "Charla del Programa Chrysalis Connect ante una audiencia" },
  { src: "/nosotros/gallery-25.jpg", alt: "Equipo recibiendo un certificado en la premiación Valparaíso Despega" },
  { src: "/nosotros/gallery-26.jpeg", alt: "Panel de conversación en un evento de Kibernum IT Academy" },
  { src: "/nosotros/gallery-27.jpeg", alt: "Stand de Microsoft en una feria de tecnología con asistentes recorriendo el lugar" },
  { src: "/nosotros/gallery-28.jpeg", alt: "Integrante de Código Startup con casco y lentes de seguridad en una visita industrial" },
  { src: "/nosotros/gallery-29.jpeg", alt: "Integrante de Código Startup en una feria de emprendimiento al aire libre" },
  { src: "/nosotros/gallery-30.jpeg", alt: "Panel de charlas del encuentro EtMday ante una audiencia al aire libre" },
  { src: "/nosotros/gallery-31.jpeg", alt: "Panel de conversación en un evento de Centros de Negocios Sercotec Aconcagua" },
  { src: "/nosotros/gallery-32.jpeg", alt: "Integrante de Código Startup trabajando con notebook en un café" },
  { src: "/nosotros/gallery-33.jpeg", alt: "Robots cuadrúpedos exhibidos en el stand de Sigdo Koppers en Expomin" },
  { src: "/nosotros/gallery-34.jpeg", alt: "Integrante de Código Startup en la salida de la feria Expomin 2025" },
  { src: "/nosotros/gallery-35.jpeg", alt: "Dos integrantes de Código Startup en la salida de la feria Expomin 2025" },
  { src: "/nosotros/gallery-36.jpeg", alt: "Equipo trabajando en la Jornada de Formulación TIM de Chrysalis" },
  { src: "/nosotros/gallery-37.jpeg", alt: "Equipo recibiendo mochilas de premiación en el evento TIM" },
  { src: "/nosotros/gallery-38.jpeg", alt: "Sesión de trabajo sobre definición de clientes en un taller de emprendimiento" },
  { src: "/nosotros/gallery-39.jpeg", alt: "Taller de emprendimiento con presentación sobre gestión de riesgo" },
  { src: "/nosotros/gallery-40.jpeg", alt: "Cuaderno del Centro Nacional de Pilotaje sobre validación de tecnologías para la minería" },
  { src: "/nosotros/gallery-41.jpeg", alt: "Premiación del encuentro de innovación Innovapolinav ante cadetes de la Armada" },
  { src: "/nosotros/gallery-42.jpeg", alt: "Stands al aire libre de DuocUC en un encuentro de innovación" },
  { src: "/nosotros/gallery-43.jpeg", alt: "Integrantes de Código Startup en el evento Networking Connect" },
  { src: "/nosotros/gallery-44.jpeg", alt: "Presentación sobre Claude Code en el evento Claude Impact Lab" },
];
