/**
 * FUENTE MAESTRA DE TALLERES — SCRUM-614/615
 *
 * Alimenta la landing /talleres, las fichas /talleres/[slug] y, cuando se
 * migre, el kit comercial (talleres/kit-comercial/datos-talleres.ts debe
 * reemplazarse por un import de este módulo).
 *
 * Estado de los datos:
 * - Videos UGC con IA para emprendedores → aprobado (SCRUM-619). Fuente:
 *   "Taller_Videos_UGC_con_IA_Contenido_Detallado.docx" archivado en
 *   talleres/kit-comercial/fuente-aprobada/.
 * - Los otros 8 talleres → borrador. Resúmenes y públicos del kit comercial
 *   vigente; módulos, objetivos y resultados detallados pendientes de las
 *   fichas SCRUM-632 → SCRUM-639.
 *
 * Regla: no inventar contenido. Lo que no está aprobado se declara en
 * `pendiente` y se renderiza como estado "en preparación".
 */

import { tallerSchema } from "@/lib/commercial/schema";

export const talleres = tallerSchema.array().parse([
  {
    slug: "videos-ugc-con-ia",
    categoria: "Emprendimiento",
    titulo: "Videos UGC con IA para emprendedores",
    duracionHoras: 4,
    resumen:
      "Aprende a crear un video para promocionar tu negocio utilizando herramientas de inteligencia artificial, desde la idea inicial hasta el video listo para publicar.",
    descripcion:
      "Un taller práctico de cuatro horas orientado a personas emprendedoras y pequeñas empresas que necesitan producir contenido para redes sociales sin depender de conocimientos avanzados de diseño, producción audiovisual o inteligencia artificial. La metodología utiliza un solo proyecto transversal: cada participante parte con una idea comercial y, a través de los cuatro bloques, construye el guion, el storyboard, los recursos visuales, los clips, el audio, la edición y la exportación del mismo video.",
    publico:
      "Emprendedores y pequeñas empresas que quieran crear contenido para redes sociales sin necesitar experiencia previa en diseño, video o inteligencia artificial.",
    requisitos:
      "Computador con conexión a Internet, cuenta Google y teléfono celular. No se requieren conocimientos previos.",
    nivel: "Inicial · sin conocimientos previos",
    modalidades: ["Presencial in-company", "Online en vivo"],
    modulos: [
      {
        titulo: "Estrategia y guion",
        minutos: 70,
        contenido: [
          "Qué es UGC y ejemplos aplicados a pequeños negocios",
          "Definir producto, público, problema y objetivo",
          "Hooks y estructura de un video corto",
          "Crear guion con IA",
          "Transformar guion en storyboard",
        ],
      },
      {
        titulo: "Producción con IA",
        minutos: 80,
        contenido: [
          "Cómo dar buenas instrucciones a una IA",
          "Crear imagen, personaje o producto de referencia",
          "Generar clips desde imagen o texto",
          "Crear o grabar voz",
          "Seleccionar y ordenar recursos finales",
        ],
      },
      {
        titulo: "Montaje en CapCut",
        minutos: 75,
        contenido: [
          "Crear proyecto vertical e importar material",
          "Ordenar clips según storyboard",
          "Incorporar y sincronizar voz o audio",
          "Textos, subtítulos y llamada a la acción",
          "Ritmo, cortes, música y correcciones",
          "Exportar primera versión",
        ],
      },
      {
        titulo: "Cierre y sprint final",
        minutos: 15,
        contenido: [
          "Revisión con checklist",
          "Correcciones finales",
          "Exportación definitiva y preparación para publicación",
        ],
      },
    ],
    objetivoGeneral:
      "Que cada participante sea capaz de transformar una idea comercial en un video UGC utilizando herramientas de IA para guion, imagen, video y voz, y completar su montaje y exportación en CapCut.",
    resultados: [
      "Una idea y ángulo de comunicación definidos.",
      "Un guion terminado de 20 a 40 segundos.",
      "Un storyboard de 4 a 6 escenas.",
      "Una imagen o personaje/producto de referencia.",
      "Entre 2 y 4 clips utilizables.",
      "Una pista de voz grabada o generada.",
      "Un video vertical editado.",
      "Un archivo MP4 listo para publicación.",
    ],
    metodologia:
      "Un solo proyecto transversal durante todo el taller: cada participante parte con una idea comercial real y la lleva hasta el video terminado. Ejercicios guiados en vivo con herramientas de acceso gratuito o de bajo costo.",
    evaluacion:
      "Revisión final con checklist objetivo del video, corrección de lo indispensable y exportación definitiva en formato MP4.",
    entregable:
      "Cada participante termina el taller con un video vertical de 20 a 40 segundos, exportado en MP4 y listo para publicar en sus redes sociales.",
    ciberseguridad: true,
    herramientas: [
      "Gemini (estrategia, guion e imagen)",
      "Google Flow / Veo (generación de video)",
      "CapCut (montaje y edición)",
      "Alternativas de respaldo: ChatGPT, Pika, Higgsfield",
    ],
    seo: {
      title: "Taller Videos UGC con IA para emprendedores | Código Startup",
      description:
        "Taller práctico de 4 horas para crear un video UGC con IA desde la idea hasta el archivo listo para publicar. Presencial in-company u online en vivo.",
    },
    estado: "aprobado",
    pendiente: [],
  },
  {
    slug: "ia-para-productividad-administrativa",
    categoria: "Productividad",
    titulo: "IA para Productividad Administrativa",
    duracionHoras: 8,
    resumen:
      "Ordenar tu bandeja de correo, crear documentos y resumir reuniones con IA, liberando tiempo de tareas repetitivas. Incluye el módulo crítico de ciberseguridad: qué información NO poner en una IA pública.",
    descripcion:
      "Un taller práctico para equipos administrativos que quieren recuperar horas de tareas repetitivas: redacción y resumen de documentos, gestión de correo, minutas y preparación de reuniones con asistentes de IA, trabajando sobre los procesos reales de la organización.",
    publico:
      "Equipos administrativos, contabilidad, RR.HH., profesionales y jefaturas.",
    requisitos:
      "Computador con conexión a Internet y, en modalidad online, cámara y micrófono. No se requieren conocimientos previos de IA.",
    nivel: "Inicial · sin conocimientos previos",
    modalidades: ["Presencial in-company", "Online en vivo"],
    modulos: [],
    objetivoGeneral:
      "Capacitar al equipo en el uso práctico de IA para tareas administrativas, sobre procesos reales de la organización.",
    resultados: [],
    metodologia:
      "Taller 100% práctico con ejercicios guiados sobre los procesos reales del cliente. No es una capacitación genérica: los ejemplos se preparan con el contexto de la organización.",
    evaluacion:
      "Cada participante completa ejercicios prácticos verificables durante la sesión y un entregable final según el taller.",
    entregable: "[Pendiente: definir entregable específico del taller]",
    ciberseguridad: true,
    seo: {
      title: "Taller IA para Productividad Administrativa | Código Startup",
      description:
        "Taller de 8 horas para liberar tiempo de tareas repetitivas con IA: correo, documentos y reuniones. Presencial in-company u online en vivo.",
    },
    estado: "borrador",
    pendiente: [
      "Ficha detallada pendiente (SCRUM-632): módulos, objetivos específicos, resultados y entregable.",
    ],
  },
  {
    slug: "automatizacion-de-procesos-con-ia",
    categoria: "Automatización e IA",
    titulo: "Automatización de Procesos con IA",
    duracionHoras: 8,
    resumen:
      "Detectar tareas repetitivas, descubrir en qué gasta más tiempo tu equipo y diseñar automatizaciones que conecten correo, planillas, formularios y CRM, listas para implementar en tu operación. Con buenas prácticas de ciberseguridad incluidas.",
    descripcion:
      "Un taller orientado a equipos operativos para identificar dónde pierden tiempo, priorizar procesos automatizables y diseñar automatizaciones concretas con correo, planillas, formularios y CRM, aplicando el criterio de elegir la tecnología más simple que resuelve el problema.",
    publico: "Equipos operativos y jefaturas.",
    requisitos:
      "Computador con conexión a Internet y, en modalidad online, cámara y micrófono. No se requieren conocimientos previos de IA.",
    nivel: "Inicial · sin conocimientos previos",
    modalidades: ["Presencial in-company", "Online en vivo"],
    modulos: [],
    objetivoGeneral:
      "Que el equipo detecte tareas repetitivas y diseñe oportunidades de automatización con IA sobre sus propios procesos.",
    resultados: [],
    metodologia:
      "Taller 100% práctico con ejercicios guiados sobre los procesos reales del cliente. No es una capacitación genérica: los ejemplos se preparan con el contexto de la organización.",
    evaluacion:
      "Cada participante completa ejercicios prácticos verificables durante la sesión y un entregable final según el taller.",
    entregable: "[Pendiente: definir entregable específico del taller]",
    ciberseguridad: true,
    seo: {
      title: "Taller Automatización de Procesos con IA | Código Startup",
      description:
        "Taller de 8 horas para detectar tareas repetitivas y diseñar automatizaciones con IA sobre correo, planillas, formularios y CRM.",
    },
    estado: "borrador",
    pendiente: [
      "Ficha detallada pendiente (SCRUM-633): módulos, objetivos específicos, resultados y entregable.",
    ],
  },
  {
    slug: "ia-para-recursos-humanos",
    categoria: "Recursos Humanos",
    titulo: "IA para Recursos Humanos",
    duracionHoras: 8,
    resumen:
      "Descripciones de cargo, guiones de entrevistas, comunicaciones internas, evaluación de currículums y apoyo a onboarding y capacitaciones con IA. Con buenas prácticas de ciberseguridad incluidas.",
    descripcion:
      "Un taller para equipos de RR.HH. y People que quieren acelerar las tareas administrativas y de comunicación del área: redacción asistida, apoyo a procesos de selección y onboarding, y comunicaciones internas con IA, siempre con foco en las personas.",
    publico: "Equipos de RR.HH. y People.",
    requisitos:
      "Computador con conexión a Internet y, en modalidad online, cámara y micrófono. No se requieren conocimientos previos de IA.",
    nivel: "Inicial · sin conocimientos previos",
    modalidades: ["Presencial in-company", "Online en vivo"],
    modulos: [],
    objetivoGeneral:
      "Que el equipo de RR.HH. aplique IA a sus tareas recurrentes con criterio, cuidando la información sensible de personas.",
    resultados: [],
    metodologia:
      "Taller 100% práctico con ejercicios guiados sobre los procesos reales del cliente. No es una capacitación genérica: los ejemplos se preparan con el contexto de la organización.",
    evaluacion:
      "Cada participante completa ejercicios prácticos verificables durante la sesión y un entregable final según el taller.",
    entregable: "[Pendiente: definir entregable específico del taller]",
    ciberseguridad: true,
    seo: {
      title: "Taller IA para Recursos Humanos | Código Startup",
      description:
        "Taller de 8 horas para aplicar IA en RR.HH.: descripciones de cargo, entrevistas, comunicaciones y onboarding.",
    },
    estado: "borrador",
    pendiente: [
      "Ficha detallada pendiente (SCRUM-634): módulos, objetivos específicos, resultados y entregable.",
    ],
  },
  {
    slug: "ia-para-equipos-comerciales",
    categoria: "Comercial y Ventas",
    titulo: "IA para Equipos Comerciales",
    duracionHoras: 8,
    resumen:
      "Calificar prospectos, preparar reuniones y redactar correos y propuestas comerciales con IA: el mismo playbook que usamos en nuestro propio proceso comercial. Con buenas prácticas de ciberseguridad incluidas.",
    descripcion:
      "Un taller para equipos de ventas y desarrollo comercial basado en el playbook real que Código Startup usa en su propio proceso comercial: preparación de visitas, calificación de prospectos, correos y propuestas con IA, sin perder el contacto humano con el cliente.",
    publico: "Equipos de ventas y desarrollo comercial.",
    requisitos:
      "Computador con conexión a Internet y, en modalidad online, cámara y micrófono. No se requieren conocimientos previos de IA.",
    nivel: "Inicial · sin conocimientos previos",
    modalidades: ["Presencial in-company", "Online en vivo"],
    modulos: [],
    objetivoGeneral:
      "Que el equipo comercial acelere la preparación de reuniones, correos y propuestas con IA, manteniendo la calidad del vínculo con el cliente.",
    resultados: [],
    metodologia:
      "Taller 100% práctico con ejercicios guiados sobre los procesos reales del cliente. No es una capacitación genérica: los ejemplos se preparan con el contexto de la organización.",
    evaluacion:
      "Cada participante completa ejercicios prácticos verificables durante la sesión y un entregable final según el taller.",
    entregable: "[Pendiente: definir entregable específico del taller]",
    ciberseguridad: true,
    seo: {
      title: "Taller IA para Equipos Comerciales | Código Startup",
      description:
        "Taller de 8 horas para calificar prospectos, preparar reuniones y redactar propuestas con IA. Presencial in-company u online.",
    },
    estado: "borrador",
    pendiente: [
      "Ficha detallada pendiente (SCRUM-635): módulos, objetivos específicos, resultados y entregable.",
    ],
  },
  {
    slug: "ia-para-marketing",
    categoria: "Marketing",
    titulo: "IA para Marketing",
    duracionHoras: 8,
    resumen:
      "Campañas de correo, anuncios, investigación de mercado y contenido para redes sociales, incluyendo videos UGC y videos animados generados con IA. Con buenas prácticas de ciberseguridad incluidas.",
    descripcion:
      "Un taller para equipos de marketing y creadores de contenido que quieren producir campañas, anuncios e investigación de mercado con IA, incluyendo videos UGC y animados, manteniendo la identidad de marca y el criterio estratégico.",
    publico: "Equipos de marketing y creadores de contenido.",
    requisitos:
      "Computador con conexión a Internet y, en modalidad online, cámara y micrófono. No se requieren conocimientos previos de IA.",
    nivel: "Inicial · sin conocimientos previos",
    modalidades: ["Presencial in-company", "Online en vivo"],
    modulos: [],
    objetivoGeneral:
      "Que el equipo de marketing produzca contenido y campañas con IA con mayor velocidad, manteniendo la coherencia de marca.",
    resultados: [],
    metodologia:
      "Taller 100% práctico con ejercicios guiados sobre los procesos reales del cliente. No es una capacitación genérica: los ejemplos se preparan con el contexto de la organización.",
    evaluacion:
      "Cada participante completa ejercicios prácticos verificables durante la sesión y un entregable final según el taller.",
    entregable: "[Pendiente: definir entregable específico del taller]",
    ciberseguridad: true,
    seo: {
      title: "Taller IA para Marketing | Código Startup",
      description:
        "Taller de 8 horas para producir campañas, anuncios y contenido para redes con IA, incluyendo videos UGC. Presencial in-company u online.",
    },
    estado: "borrador",
    pendiente: [
      "Ficha detallada pendiente (SCRUM-636): módulos, objetivos específicos, resultados y entregable.",
    ],
  },
  {
    slug: "ia-para-lideres-y-jefaturas",
    categoria: "Liderazgo",
    titulo: "IA para Líderes y Jefaturas",
    duracionHoras: 8,
    resumen:
      "Preparar reuniones, analizar información, delegar y dar seguimiento con asistentes de IA para tomar decisiones más informadas. Con buenas prácticas de ciberseguridad incluidas.",
    descripcion:
      "Un taller para jefaturas y gerentes que quieren usar IA como asistente de gestión: preparación de reuniones, análisis de información, delegación y seguimiento, para tomar decisiones más informadas sin perder el criterio de liderazgo.",
    publico: "Jefaturas, gerentes y líderes de equipo.",
    requisitos:
      "Computador con conexión a Internet y, en modalidad online, cámara y micrófono. No se requieren conocimientos previos de IA.",
    nivel: "Inicial · sin conocimientos previos",
    modalidades: ["Presencial in-company", "Online en vivo"],
    modulos: [],
    objetivoGeneral:
      "Que líderes y jefaturas integren asistentes de IA a su gestión diaria para decidir con mejor información.",
    resultados: [],
    metodologia:
      "Taller 100% práctico con ejercicios guiados sobre los procesos reales del cliente. No es una capacitación genérica: los ejemplos se preparan con el contexto de la organización.",
    evaluacion:
      "Cada participante completa ejercicios prácticos verificables durante la sesión y un entregable final según el taller.",
    entregable: "[Pendiente: definir entregable específico del taller]",
    ciberseguridad: true,
    seo: {
      title: "Taller IA para Líderes y Jefaturas | Código Startup",
      description:
        "Taller de 8 horas para preparar reuniones, analizar información y delegar con asistentes de IA. Presencial in-company u online.",
    },
    estado: "borrador",
    pendiente: [
      "Ficha detallada pendiente (SCRUM-637): módulos, objetivos específicos, resultados y entregable.",
    ],
  },
  {
    slug: "ia-para-gestion-de-proyectos",
    categoria: "Gestión de Proyectos",
    titulo: "IA para Gestión de Proyectos",
    duracionHoras: 8,
    resumen:
      "Planificar, gestionar riesgos, redactar historias de usuario y conectar con herramientas como Jira. Con buenas prácticas de ciberseguridad incluidas.",
    descripcion:
      "Un taller para PMO, product y equipos de proyecto que quieren acelerar la planificación, la gestión de riesgos y la redacción de historias de usuario con IA, conectando el trabajo con herramientas como Jira.",
    publico: "PMO, product y equipos de proyecto.",
    requisitos:
      "Computador con conexión a Internet y, en modalidad online, cámara y micrófono. No se requieren conocimientos previos de IA.",
    nivel: "Inicial · sin conocimientos previos",
    modalidades: ["Presencial in-company", "Online en vivo"],
    modulos: [],
    objetivoGeneral:
      "Que los equipos de proyecto planifiquen y den seguimiento con IA, reduciendo trabajo manual de gestión.",
    resultados: [],
    metodologia:
      "Taller 100% práctico con ejercicios guiados sobre los procesos reales del cliente. No es una capacitación genérica: los ejemplos se preparan con el contexto de la organización.",
    evaluacion:
      "Cada participante completa ejercicios prácticos verificables durante la sesión y un entregable final según el taller.",
    entregable: "[Pendiente: definir entregable específico del taller]",
    ciberseguridad: true,
    seo: {
      title: "Taller IA para Gestión de Proyectos | Código Startup",
      description:
        "Taller de 8 horas para planificar, gestionar riesgos y redactar historias de usuario con IA y Jira. Presencial in-company u online.",
    },
    estado: "borrador",
    pendiente: [
      "Ficha detallada pendiente (SCRUM-638): módulos, objetivos específicos, resultados y entregable.",
    ],
  },
  {
    slug: "ia-para-operaciones-y-faenas",
    categoria: "Operaciones y Faenas",
    titulo: "IA para Operaciones y Faenas",
    duracionHoras: 8,
    resumen:
      "Generar reportes de operación, documentar normativa DS44/ISO, preparar licitaciones y planificar mantención con IA, reduciendo trabajo manual en terreno y oficina técnica. Con buenas prácticas de ciberseguridad incluidas.",
    descripcion:
      "Un taller para industrias y minería que reduce el trabajo manual de oficinas técnicas y terreno: reportes de operación, documentación de normativa DS44/ISO, preparación de licitaciones y planificación de mantención con IA.",
    publico:
      "Supervisores, jefaturas de operación, oficinas técnicas y equipos de faena en industrias y minería.",
    requisitos:
      "Computador con conexión a Internet y, en modalidad online, cámara y micrófono. No se requieren conocimientos previos de IA.",
    nivel: "Inicial · sin conocimientos previos",
    modalidades: ["Presencial in-company", "Online en vivo"],
    modulos: [],
    objetivoGeneral:
      "Que los equipos de operación reduzcan trabajo manual en reportes, documentación normativa, licitaciones y mantención con IA.",
    resultados: [],
    metodologia:
      "Taller 100% práctico con ejercicios guiados sobre los procesos reales del cliente. No es una capacitación genérica: los ejemplos se preparan con el contexto de la organización.",
    evaluacion:
      "Cada participante completa ejercicios prácticos verificables durante la sesión y un entregable final según el taller.",
    entregable: "[Pendiente: definir entregable específico del taller]",
    ciberseguridad: true,
    seo: {
      title: "Taller IA para Operaciones y Faenas | Código Startup",
      description:
        "Taller de 8 horas para reportes de operación, normativa DS44/ISO, licitaciones y mantención con IA. Presencial in-company u online.",
    },
    estado: "borrador",
    pendiente: [
      "Ficha detallada pendiente (SCRUM-639): módulos, objetivos específicos, resultados y entregable.",
    ],
  },
]);

export function totalHorasTalleres(lista: typeof talleres): number {
  return lista.reduce((acc, taller) => acc + taller.duracionHoras, 0);
}