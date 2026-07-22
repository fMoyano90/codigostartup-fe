import type {
  LeadFormField,
  ServiceEditorialSectionData,
} from "@/components/services";
import type { ServiceSlug } from "@/lib/commercial/schema";

type ServicePageConfig = {
  editorialSections: ServiceEditorialSectionData[];
  lead: {
    title: string;
    description: string;
    fields: LeadFormField[];
  };
};

const commonFields: LeadFormField[] = [
  { name: "name", label: "Nombre", type: "text", required: true, autoComplete: "name" },
  { name: "company", label: "Empresa", type: "text", autoComplete: "organization" },
  { name: "email", label: "Correo", type: "email", required: true, autoComplete: "email" },
];

export const servicePageConfig: Record<ServiceSlug, ServicePageConfig> = {
  "sitios-web": {
    editorialSections: [],
    lead: {
      title: "Cuéntanos qué debería lograr tu sitio web",
      description: "El objetivo, el contenido y la forma de administrarlo nos ayudan a proponer el alcance correcto.",
      fields: [
        ...commonFields,
        { name: "currentWebsite", label: "¿Tienes un sitio web actual?", type: "url", placeholder: "https://" },
        { name: "websiteGoal", label: "¿Qué quieres conseguir con el sitio?", type: "textarea", required: true },
        { name: "servicesToShow", label: "¿Qué servicios o productos necesitas mostrar?", type: "textarea" },
        {
          name: "contentManagement",
          label: "¿Necesitas administrar el contenido?",
          type: "select",
          options: [
            { label: "Sí", value: "si" },
            { label: "No", value: "no" },
            { label: "No lo sé todavía", value: "por-definir" },
          ],
        },
      ],
    },
  },
  "software-a-medida": {
    editorialSections: [
      {
        eyebrow: "Integraciones",
        title: "Conectar herramientas exige revisar lo que realmente permiten",
        description: "No asumimos que una integración es viable. La validamos antes de incorporarla al alcance.",
        tone: "tinted",
        items: [
          {
            title: "Sistemas involucrados",
            description: "Identificamos qué herramientas deben intercambiar información y qué función cumple cada una dentro del proceso.",
          },
          {
            title: "Accesos y documentación",
            description: "Revisamos si existen APIs, credenciales, documentación y permisos suficientes para realizar la conexión.",
          },
          {
            title: "Alcance verificable",
            description: "Definimos qué datos se intercambian, en qué dirección y cómo se controlan errores antes de estimar la implementación.",
          },
        ],
      },
    ],
    lead: {
      title: "Describe el proceso que necesitas digitalizar",
      description: "Entender cómo funciona hoy, quién participa y qué sistemas intervienen permite evaluar si necesitas software nuevo, integración o automatización.",
      fields: [
        ...commonFields,
        { name: "process", label: "¿Qué proceso quieres digitalizar?", type: "textarea", required: true },
        { name: "currentMethod", label: "¿Cómo lo realizan hoy?", type: "textarea", required: true },
        {
          name: "participants",
          label: "¿Cuántas personas participan?",
          type: "select",
          options: [
            { label: "1 a 5", value: "1-5" },
            { label: "6 a 20", value: "6-20" },
            { label: "Más de 20", value: "21+" },
            { label: "No lo sé todavía", value: "por-definir" },
          ],
        },
        { name: "systems", label: "¿Qué sistemas necesitan conectar?", type: "textarea" },
      ],
    },
  },
  "desarrollo-mvp": {
    editorialSections: [
      {
        eyebrow: "Definir antes de construir",
        title: "Idea, prototipo, MVP y producto no son lo mismo",
        description: "Cada etapa responde una pregunta distinta y evita construir más de lo necesario antes de tiempo.",
        items: [
          {
            title: "Idea",
            description: "Una propuesta sobre un problema, una persona usuaria y una forma posible de resolverlo que todavía necesita evidencia.",
          },
          {
            title: "Prototipo",
            description: "Una representación de la experiencia que permite revisar flujos y decisiones sin construir todavía el producto funcional.",
          },
          {
            title: "MVP",
            description: "Una primera versión funcional con el alcance mínimo necesario para probar hipótesis con usuarios reales.",
          },
          {
            title: "Producto",
            description: "Una solución que evoluciona a partir del uso, la evidencia y las necesidades operacionales posteriores a la validación.",
          },
        ],
      },
      {
        eyebrow: "Priorización",
        title: "Menos funciones, más capacidad de aprender",
        description: "El alcance se decide por lo que necesitamos validar, no por la cantidad de ideas disponibles.",
        tone: "tinted",
        items: [
          {
            title: "Hipótesis",
            description: "Definimos qué supuesto sobre el problema, el usuario o la solución necesita evidencia primero.",
          },
          {
            title: "Experiencia principal",
            description: "Priorizamos el recorrido mínimo que permite a una persona obtener el valor central del producto.",
          },
          {
            title: "Evidencia",
            description: "Incorporamos la medición necesaria para decidir qué ajustar o construir después del lanzamiento.",
          },
        ],
      },
    ],
    lead: {
      title: "Cuéntanos qué necesitas validar con tu primera versión",
      description: "El problema, las personas usuarias y la evidencia que buscas definen un MVP mucho mejor que una lista extensa de funcionalidades.",
      fields: [
        ...commonFields,
        { name: "problem", label: "¿Qué problema resuelve?", type: "textarea", required: true },
        { name: "audience", label: "¿Quién lo utilizará?", type: "textarea", required: true },
        {
          name: "prototype",
          label: "¿Tienes un prototipo?",
          type: "select",
          options: [
            { label: "Sí", value: "si" },
            { label: "No", value: "no" },
            { label: "Está en desarrollo", value: "en-desarrollo" },
          ],
        },
        { name: "validationGoal", label: "¿Qué necesitas validar?", type: "textarea", required: true },
      ],
    },
  },
  "automatizacion-de-procesos": {
    editorialSections: [
      {
        eyebrow: "Priorizar la automatización",
        title: "Automatizar primero donde existe claridad y repetición",
        description: "No toda tarea manual debe automatizarse. Buscamos un punto de partida que pueda controlarse y comprobarse.",
        tone: "tinted",
        items: [
          {
            title: "Repetición",
            description: "La tarea ocurre con suficiente frecuencia como para justificar el diseño, implementación y mantenimiento del flujo.",
          },
          {
            title: "Reglas claras",
            description: "Las entradas, decisiones, excepciones y resultados pueden explicarse antes de trasladarlos a una automatización.",
          },
          {
            title: "Control",
            description: "El proceso permite detectar errores, supervisar resultados y mantener una alternativa cuando una herramienta no está disponible.",
          },
        ],
      },
    ],
    lead: {
      title: "Cuéntanos qué tareas quieres dejar de hacer manualmente",
      description: "La frecuencia, las reglas y las herramientas involucradas permiten identificar si el flujo es un buen candidato para automatización.",
      fields: [
        ...commonFields,
        { name: "repetitiveTasks", label: "¿Qué tareas se repiten?", type: "textarea", required: true },
        { name: "tools", label: "¿Qué herramientas participan?", type: "textarea", required: true },
        {
          name: "frequency",
          label: "¿Con qué frecuencia ocurre?",
          type: "select",
          options: [
            { label: "Varias veces al día", value: "varias-al-dia" },
            { label: "Diariamente", value: "diaria" },
            { label: "Semanalmente", value: "semanal" },
            { label: "Mensualmente", value: "mensual" },
            { label: "Otra", value: "otra" },
          ],
        },
        { name: "desiredResult", label: "¿Qué resultado debería producir?", type: "textarea" },
      ],
    },
  },
  "aplicaciones-web": {
    editorialSections: [],
    lead: {
      title: "Describe la aplicación web que necesitas evaluar",
      description: "Las personas usuarias, el problema y la etapa actual ayudan a definir si necesitas un MVP, una plataforma completa o una evolución por etapas.",
      fields: [
        ...commonFields,
        { name: "appProblem", label: "¿Qué problema resolverá la aplicación?", type: "textarea", required: true },
        { name: "appUsers", label: "¿Quiénes la utilizarán?", type: "textarea", required: true },
        {
          name: "appStage",
          label: "¿En qué etapa está?",
          type: "select",
          options: [
            { label: "Idea", value: "idea" },
            { label: "Prototipo", value: "prototipo" },
            { label: "Aplicación existente", value: "existente" },
            { label: "No lo sé todavía", value: "por-definir" },
          ],
        },
        { name: "coreFunctions", label: "¿Qué funciones principales imaginas?", type: "textarea" },
      ],
    },
  },
  "aplicaciones-moviles": {
    editorialSections: [
      {
        eyebrow: "Contexto móvil",
        title: "La aplicación debe responder al lugar donde se utiliza",
        description: "Las condiciones reales de uso definen qué capacidades móviles aportan valor y cuáles no hacen falta.",
        items: [
          {
            title: "En terreno",
            description: "Diseñamos recorridos y captura de información considerando movilidad, tiempos de atención y condiciones operacionales.",
          },
          {
            title: "Sin conexión",
            description: "Definimos qué datos y funciones deben continuar disponibles offline y cómo se sincronizarán posteriormente.",
          },
          {
            title: "Notificaciones",
            description: "Incorporamos avisos cuando existe un evento relevante, una acción concreta y una razón clara para interrumpir al usuario.",
          },
        ],
      },
    ],
    lead: {
      title: "Cuéntanos cómo y dónde se utilizará la aplicación",
      description: "El contexto, la conectividad y las tareas principales permiten evaluar qué experiencia móvil necesita el proyecto.",
      fields: [
        ...commonFields,
        { name: "mobileUsers", label: "¿Quiénes utilizarán la aplicación?", type: "textarea", required: true },
        { name: "useContext", label: "¿Dónde y para qué la utilizarán?", type: "textarea", required: true },
        {
          name: "connectivity",
          label: "¿Cómo es la conectividad en ese contexto?",
          type: "select",
          options: [
            { label: "Estable", value: "estable" },
            { label: "Intermitente", value: "intermitente" },
            { label: "Sin conexión en algunos lugares", value: "offline-parcial" },
            { label: "No lo sé todavía", value: "por-definir" },
          ],
        },
        { name: "mobileFunctions", label: "¿Qué acciones principales debe permitir?", type: "textarea" },
      ],
    },
  },
  "auditoria-y-evolucion": {
    editorialSections: [],
    lead: {
      title: "Describe qué está ocurriendo con tu sistema",
      description: "El problema observable, las tecnologías y los accesos disponibles permiten definir el alcance inicial de la revisión.",
      fields: [
        ...commonFields,
        { name: "systemProblem", label: "¿Qué problema presenta el sistema?", type: "textarea", required: true },
        { name: "technologies", label: "¿Qué tecnologías utiliza?", type: "textarea" },
        {
          name: "codeAccess",
          label: "¿Tienes acceso al código?",
          type: "select",
          options: [
            { label: "Sí", value: "si" },
            { label: "No", value: "no" },
            { label: "No lo sé", value: "por-definir" },
          ],
        },
        {
          name: "documentation",
          label: "¿Existe documentación?",
          type: "select",
          options: [
            { label: "Sí", value: "si" },
            { label: "Parcial", value: "parcial" },
            { label: "No", value: "no" },
            { label: "No lo sé", value: "por-definir" },
          ],
        },
      ],
    },
  },
};
