/**
 * FUENTE LOCAL TEMPORAL DEL KIT COMERCIAL — SCRUM-614
 *
 * AVISO IMPORTANTE (migración): cuando SCRUM-615 (src/data/talleres.ts) esté
 * implementada con las 9 fichas aprobadas, este módulo debe reemplazarse por
 * un import de esa fuente maestra. Este archivo NO es la fuente maestra del
 * catálogo web: es una copia de trabajo del kit comercial.
 *
 * Estado de los datos:
 * - Videos UGC con IA para emprendedores → APROBADO. Fuente: documento
 *   "Taller_Videos_UGC_con_IA_Contenido_Detallado (1).docx" adjunto en
 *   SCRUM-619 (archivado en ./fuente-aprobada/). Ficha pública = sección 12.
 * - Los otros 8 talleres → PROVISIONAL. Resúmenes del home público vigente +
 *   duración 8 h definida por producto (SCRUM-615/624). Deben reemplazarse
 *   por las fichas aprobadas de SCRUM-632 a SCRUM-639 cuando estén listas.
 *
 * Campos internos (estado, fuente) NO se exponen en el HTML compartible.
 */

export interface Taller {
  slug: string;
  categoria: string;
  titulo: string;
  duracionHoras: number;
  resumen: string;
  publico: string;
  requisitos?: string;
  modulos?: string[];
  entregable?: string;
  /** "aprobado" = contenido aprobado por Contenido/Talleres; "provisional" = pendiente de ficha SCRUM-632→639 */
  estado: "aprobado" | "provisional";
  /** Referencia a la fuente de la que deriva el contenido público */
  fuente: string;
}

export const talleres: Taller[] = [
  {
    slug: "videos-ugc-con-ia",
    categoria: "Emprendimiento",
    titulo: "Videos UGC con IA para emprendedores",
    duracionHoras: 4,
    resumen:
      "Aprende a crear un video para promocionar tu negocio utilizando herramientas de inteligencia artificial, desde la idea inicial hasta el video listo para publicar.",
    publico:
      "Emprendedores y pequeñas empresas que quieran crear contenido para redes sociales sin necesitar experiencia previa en diseño, video o inteligencia artificial.",
    requisitos:
      "Computador con conexión a Internet, cuenta Google y teléfono celular. No se requieren conocimientos previos.",
    modulos: [
      "Estrategia y guion",
      "Producción con IA",
      "Edición en CapCut",
      "Revisión y publicación",
    ],
    entregable:
      "Cada participante termina el taller con un video vertical completo y listo para publicar en sus redes sociales.",
    estado: "aprobado",
    fuente:
      "SCRUM-619 aprobado · adjunto 'Taller_Videos_UGC_con_IA_Contenido_Detallado (1).docx' (sección 12, ficha pública)",
  },
  {
    slug: "ia-para-productividad-administrativa",
    categoria: "Productividad",
    titulo: "IA para Productividad Administrativa",
    duracionHoras: 8,
    resumen:
      "Ordenar tu bandeja de correo, crear documentos y resumir reuniones con IA, liberando tiempo de tareas repetitivas. Incluye el módulo crítico de ciberseguridad: qué información NO poner en una IA pública.",
    publico: "Equipos administrativos, contabilidad, RR.HH., profesionales y jefaturas.",
    estado: "provisional",
    fuente: "Home público (sección talleres) · ficha pendiente SCRUM-632",
  },
  {
    slug: "automatizacion-de-procesos-con-ia",
    categoria: "Automatización e IA",
    titulo: "Automatización de Procesos con IA",
    duracionHoras: 8,
    resumen:
      "Detectar tareas repetitivas, descubrir en qué gasta más tiempo tu equipo y diseñar automatizaciones que conecten correo, planillas, formularios y CRM, listas para implementar en tu operación. Con buenas prácticas de ciberseguridad incluidas.",
    publico: "Equipos operativos y jefaturas.",
    estado: "provisional",
    fuente: "Home público (sección talleres) · ficha pendiente SCRUM-633",
  },
  {
    slug: "ia-para-recursos-humanos",
    categoria: "Recursos Humanos",
    titulo: "IA para Recursos Humanos",
    duracionHoras: 8,
    resumen:
      "Descripciones de cargo, guiones de entrevistas, comunicaciones internas, evaluación de currículums y apoyo a onboarding y capacitaciones con IA. Con buenas prácticas de ciberseguridad incluidas.",
    publico: "Equipos de RR.HH. y People.",
    estado: "provisional",
    fuente: "Home público (sección talleres) · ficha pendiente SCRUM-634",
  },
  {
    slug: "ia-para-equipos-comerciales",
    categoria: "Comercial y Ventas",
    titulo: "IA para Equipos Comerciales",
    duracionHoras: 8,
    resumen:
      "Calificar prospectos, preparar reuniones y redactar correos y propuestas comerciales con IA: el mismo playbook que usamos en nuestro propio proceso comercial. Con buenas prácticas de ciberseguridad incluidas.",
    publico: "Equipos de ventas y desarrollo comercial.",
    estado: "provisional",
    fuente: "Home público (sección talleres) · ficha pendiente SCRUM-635",
  },
  {
    slug: "ia-para-marketing",
    categoria: "Marketing",
    titulo: "IA para Marketing",
    duracionHoras: 8,
    resumen:
      "Campañas de correo, anuncios, investigación de mercado y contenido para redes sociales, incluyendo videos UGC y videos animados generados con IA. Con buenas prácticas de ciberseguridad incluidas.",
    publico: "Equipos de marketing y creadores de contenido.",
    estado: "provisional",
    fuente: "Home público (sección talleres) · ficha pendiente SCRUM-636",
  },
  {
    slug: "ia-para-lideres-y-jefaturas",
    categoria: "Liderazgo",
    titulo: "IA para Líderes y Jefaturas",
    duracionHoras: 8,
    resumen:
      "Preparar reuniones, analizar información, delegar y dar seguimiento con asistentes de IA para tomar decisiones más informadas. Con buenas prácticas de ciberseguridad incluidas.",
    publico: "Jefaturas, gerentes y líderes de equipo.",
    estado: "provisional",
    fuente: "Home público (sección talleres) · ficha pendiente SCRUM-637",
  },
  {
    slug: "ia-para-gestion-de-proyectos",
    categoria: "Gestión de Proyectos",
    titulo: "IA para Gestión de Proyectos",
    duracionHoras: 8,
    resumen:
      "Planificar, gestionar riesgos, redactar historias de usuario y conectar con herramientas como Jira. Con buenas prácticas de ciberseguridad incluidas.",
    publico: "PMO, product y equipos de proyecto.",
    estado: "provisional",
    fuente: "Home público (sección talleres) · ficha pendiente SCRUM-638",
  },
  {
    slug: "ia-para-operaciones-y-faenas",
    categoria: "Operaciones y Faenas",
    titulo: "IA para Operaciones y Faenas",
    duracionHoras: 8,
    resumen:
      "Generar reportes de operación, documentar normativa DS44/ISO, preparar licitaciones y planificar mantención con IA, reduciendo trabajo manual en terreno y oficina técnica. Con buenas prácticas de ciberseguridad incluidas.",
    publico: "Supervisores, jefaturas de operación, oficinas técnicas y equipos de faena en industrias y minería.",
    estado: "provisional",
    fuente: "Spec SCRUM-639 (reportes, DS44/ISO, licitaciones, mantención) · ficha pendiente SCRUM-639",
  },
];

export function totalHoras(talleresList: Taller[]): number {
  return talleresList.reduce((acc, taller) => acc + taller.duracionHoras, 0);
}