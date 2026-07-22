import { processSteps } from "@/data/process";
import {
  assertUniqueSlugs,
  serviceSchema,
  type Service,
  type ServiceSlug,
} from "@/lib/commercial/schema";

const standardProcess = processSteps.map(({ title, desc }) => ({
  title,
  description: desc,
}));

const serviceData: Service[] = [
  {
    slug: "sitios-web",
    name: "Sitios web",
    need: "presencia-digital",
    shortDescription: "Presencia digital profesional para explicar servicios, generar confianza y convertir visitas en oportunidades.",
    hero: {
      eyebrow: "Presencia digital",
      title: "Un sitio web que explique con claridad lo que haces",
      description: "Para empresas que necesitan una presencia profesional, generar confianza y convertir visitas en oportunidades.",
    },
    audience: ["Empresas", "Emprendedores", "Startups"],
    problems: [
      "El negocio depende solamente de redes sociales.",
      "La web no explica claramente los servicios.",
      "Recibe visitas, pero no genera contactos.",
      "Se ve poco profesional.",
      "No aparece correctamente en buscadores.",
      "No permite medir resultados.",
      "Es difícil de actualizar.",
    ],
    solutionTypes: [
      { title: "Sitio corporativo", description: "Presentación clara de la empresa, sus servicios y formas de contacto." },
      { title: "Landing page", description: "Página enfocada en una propuesta, campaña o acción específica." },
      { title: "Catálogo de servicios", description: "Estructura para explicar y relacionar servicios independientes." },
      { title: "Web con blog", description: "Sitio preparado para publicar contenido y conectarlo con la oferta comercial." },
      { title: "Rediseño web", description: "Evolución de una presencia existente sin perder lo que todavía funciona." },
      { title: "Integraciones", description: "Conexión con WhatsApp, formularios, agenda o CRM cuando corresponda." },
    ],
    deliverables: [
      "Definición de estructura y contenidos.",
      "Diseño UX/UI responsive.",
      "Desarrollo e implementación.",
      "Fundamentos de SEO técnico.",
      "Analítica para acciones relevantes.",
      "Documentación y traspaso.",
    ],
    capabilities: ["estrategia", "ux-ui", "desarrollo", "contenido", "seo", "analitica", "lanzamiento-y-evolucion"],
    process: standardProcess,
    relatedProjects: [],
    faq: [
      {
        question: "¿Cuánto demora construir un sitio web?",
        answer: "Depende del alcance, la cantidad de contenido y las integraciones. Después del diagnóstico definimos tiempos, entregas y responsabilidades antes de comenzar.",
      },
      {
        question: "¿También pueden ayudarnos con el contenido?",
        answer: "Sí, cuando el proyecto lo necesita. Podemos organizar y producir el contenido necesario para explicar la solución con claridad, definiendo desde el inicio qué aporta cada parte.",
      },
      {
        question: "¿El sitio quedará preparado para SEO?",
        answer: "Incluimos fundamentos técnicos y editoriales de SEO cuando corresponda. Esto prepara el sitio para ser encontrado, pero no implica promesas de posiciones o resultados garantizados.",
      },
      {
        question: "¿Podremos actualizar el sitio después?",
        answer: "La forma de administrar contenido se define según las necesidades del proyecto. La entrega considera documentación y traspaso para que el sitio pueda operar y evolucionar.",
      },
    ],
    cta: {
      title: "Conversemos sobre tu presencia digital",
      description: "Cuéntanos qué necesitas comunicar y qué debería lograr tu sitio.",
      label: "Cotizar mi sitio web",
      formType: "sitios-web",
    },
    seo: {
      title: "Desarrollo de sitios web | Código Startup",
      description: "Diseño y desarrollo de sitios web profesionales para empresas, emprendedores y startups.",
    },
    editorialStatus: "ready",
    editorialNotes: [],
  },
  {
    slug: "tiendas-online",
    name: "Tiendas online",
    need: "presencia-digital",
    shortDescription: "Tiendas online a medida para vender productos, gestionar catálogo, pagos e inventario, y convertir visitas en ventas.",
    hero: {
      eyebrow: "Presencia digital",
      title: "Una tienda online construida para vender, no solo para mostrar",
      description: "Para marcas y empresas que necesitan un canal de venta propio, con catálogo, checkout y pagos pensados para su forma de operar.",
    },
    audience: ["Empresas", "Emprendedores", "Marcas con catálogo de productos"],
    problems: [
      "El negocio depende solamente de marketplaces o redes sociales para vender.",
      "El checkout es confuso y las ventas se pierden antes de pagar.",
      "El catálogo es difícil de mantener actualizado.",
      "El inventario no está sincronizado entre canales.",
      "Faltan los medios de pago que los clientes realmente usan.",
      "No hay visibilidad clara de ventas ni de comportamiento de compra.",
      "La plataforma actual no se adapta al negocio y limita el crecimiento.",
    ],
    solutionTypes: [
      { title: "Tienda a medida", description: "Tienda construida según el catálogo, el proceso de venta y la operación real del negocio." },
      { title: "Catálogo de productos", description: "Estructura de categorías, variantes y fichas de producto pensada para navegar y comparar." },
      { title: "Checkout y pagos", description: "Flujo de compra claro, con los medios de pago que corresponden al mercado del negocio." },
      { title: "Gestión de inventario", description: "Control de stock y disponibilidad conectado con el catálogo y las ventas." },
      { title: "Integraciones logísticas", description: "Conexión con despacho, retiro en tienda o sistemas de gestión cuando corresponda." },
      { title: "Migración o evolución", description: "Traspaso o mejora de una tienda existente sin perder lo que ya funciona." },
    ],
    deliverables: [
      "Definición de catálogo y flujo de compra.",
      "Diseño UX/UI responsive.",
      "Desarrollo del checkout e integraciones de pago.",
      "Panel administrativo para catálogo, pedidos e inventario.",
      "Fundamentos de SEO técnico.",
      "Analítica de ventas y comportamiento de compra.",
      "Documentación y traspaso.",
    ],
    capabilities: ["estrategia", "ux-ui", "desarrollo", "contenido", "seo", "analitica", "arquitectura", "seguridad", "lanzamiento-y-evolucion"],
    process: standardProcess,
    relatedProjects: [],
    faq: [
      {
        question: "¿Cuánto demora construir una tienda online?",
        answer: "Depende del tamaño del catálogo, los medios de pago y las integraciones necesarias. Después del diagnóstico definimos alcance, tiempos y entregas antes de comenzar.",
      },
      {
        question: "¿Qué medios de pago pueden integrar?",
        answer: "Evaluamos los medios de pago relevantes para el mercado y el modelo del negocio, y validamos su factibilidad técnica antes de incorporarlos al alcance.",
      },
      {
        question: "¿Pueden migrar una tienda que ya tenemos?",
        answer: "Sí. Revisamos el catálogo, los pedidos históricos y las integraciones actuales para definir qué se traspasa y qué conviene reconstruir.",
      },
      {
        question: "¿Podremos administrar el catálogo y los pedidos después?",
        answer: "La entrega incluye un panel administrativo y documentación para que el equipo pueda operar el catálogo, los pedidos y el inventario sin depender de nosotros para tareas del día a día.",
      },
    ],
    cta: {
      title: "Conversemos sobre tu tienda online",
      description: "Cuéntanos qué quieres vender, cómo opera tu negocio y qué necesita tu tienda para lograrlo.",
      label: "Cotizar mi tienda online",
      formType: "tiendas-online",
    },
    seo: {
      title: "Desarrollo de tiendas online | Código Startup",
      description: "Diseño y desarrollo de tiendas online a medida, con catálogo, checkout, pagos e inventario adaptados al negocio.",
    },
    editorialStatus: "ready",
    editorialNotes: [],
  },
  {
    slug: "software-a-medida",
    name: "Software a medida",
    need: "operacion",
    shortDescription: "Sistemas adaptados a la operación real para centralizar información, reducir errores y reemplazar tareas manuales.",
    hero: {
      eyebrow: "Operación",
      title: "Software construido alrededor de tu operación",
      description: "Para empresas que necesitan reemplazar planillas, centralizar información, reducir errores y adaptar la tecnología a su forma de trabajar.",
    },
    audience: ["Empresas", "Gerencias", "Equipos operacionales"],
    problems: [
      "Demasiadas planillas.",
      "Información duplicada.",
      "Procesos administrados por WhatsApp.",
      "Tareas manuales.",
      "Falta de trazabilidad.",
      "Sistemas que no se comunican.",
      "Reportes manuales.",
      "Herramientas genéricas que no se adaptan.",
    ],
    solutionTypes: [
      { title: "Sistemas internos", description: "Herramientas para centralizar y administrar procesos de la organización." },
      { title: "Plataformas de gestión", description: "Flujos, datos y responsabilidades reunidos en un solo sistema." },
      { title: "Paneles administrativos", description: "Control de usuarios, información y configuraciones operacionales." },
      { title: "Portales de clientes", description: "Acceso contextual a información, solicitudes y seguimiento." },
      { title: "Control operacional", description: "Registro y trazabilidad de actividades relevantes para la operación." },
      { title: "Gestión documental", description: "Organización de documentos, estados, responsables y respaldos." },
      { title: "Flujos de aprobación", description: "Etapas y responsables claros para revisar y aprobar solicitudes." },
      { title: "Reportabilidad e integraciones", description: "Información consolidada y conexión con herramientas existentes cuando corresponda." },
    ],
    deliverables: [
      "Diagnóstico del proceso actual.",
      "Definición de alcance y prioridades.",
      "Diseño UX/UI.",
      "Desarrollo e integraciones acordadas.",
      "Pruebas, documentación y traspaso.",
    ],
    capabilities: ["estrategia", "ux-ui", "desarrollo", "analitica", "arquitectura", "seguridad", "lanzamiento-y-evolucion"],
    process: standardProcess,
    relatedProjects: ["subtech", "nextdrill", "nucleo-gestor"],
    faq: [
      {
        question: "¿Cuándo conviene construir software a medida?",
        answer: "Cuando las herramientas existentes no se adaptan al proceso, la información está fragmentada o las tareas manuales generan errores y falta de trazabilidad. El diagnóstico permite comprobarlo antes de construir.",
      },
      {
        question: "¿Pueden integrar los sistemas que ya usamos?",
        answer: "Evaluamos cada integración según los accesos, la documentación y las capacidades reales de los sistemas involucrados. Solo se incorpora al alcance después de validar su factibilidad.",
      },
      {
        question: "¿Cómo se define el alcance y el precio?",
        answer: "Primero revisamos el proceso actual, sus usuarios y prioridades. Con esa información proponemos un alcance, tiempos y precio claros antes de comenzar la construcción.",
      },
      {
        question: "¿Qué recibimos al finalizar?",
        answer: "Además del sistema acordado, la entrega considera pruebas, documentación y traspaso para reducir la dependencia y facilitar su operación y evolución.",
      },
    ],
    cta: {
      title: "Revisemos el proceso que necesitas digitalizar",
      description: "Cuéntanos cómo funciona hoy, quiénes participan y dónde están los principales problemas.",
      label: "Evaluar mi proceso",
      formType: "software-a-medida",
    },
    seo: {
      title: "Desarrollo de software a medida | Código Startup",
      description: "Software a medida para centralizar información, reducir tareas manuales y adaptar la tecnología a la operación real.",
    },
    editorialStatus: "ready",
    editorialNotes: [],
  },
  {
    slug: "automatizacion-de-procesos",
    name: "Automatización de procesos",
    need: "operacion",
    shortDescription: "Automatización de tareas manuales y conexión de herramientas existentes.",
    hero: {
      eyebrow: "Operación",
      title: "Reduce tareas manuales sin perder control",
      description: "Automatizamos documentos, notificaciones, reportes y flujos, conectando herramientas existentes cuando corresponde.",
    },
    audience: ["Empresas", "Gerencias", "Equipos administrativos y operacionales"],
    problems: [
      "Tareas repetitivas que consumen tiempo.",
      "Información que debe copiarse entre herramientas.",
      "Documentos y reportes preparados manualmente.",
      "Notificaciones y seguimientos que dependen de una persona.",
    ],
    solutionTypes: [
      { title: "Automatización documental", description: "Generación, clasificación o distribución de documentos." },
      { title: "Notificaciones", description: "Avisos activados por estados o eventos del proceso." },
      { title: "Reportes", description: "Preparación y distribución periódica de información." },
      { title: "Flujos", description: "Secuencias de tareas y decisiones conectadas entre herramientas." },
      { title: "Integraciones", description: "Intercambio de información entre sistemas existentes." },
    ],
    deliverables: ["Diagnóstico de tareas automatizables.", "Diseño del flujo.", "Implementación y pruebas.", "Documentación del proceso."],
    capabilities: ["estrategia", "desarrollo", "analitica", "arquitectura", "seguridad", "lanzamiento-y-evolucion"],
    process: standardProcess,
    relatedProjects: [],
    faq: [
      {
        question: "¿Qué tareas conviene automatizar primero?",
        answer: "Conviene comenzar por tareas repetitivas, con reglas claras y suficiente volumen. El diagnóstico también revisa excepciones, riesgos y dependencias antes de elegir el primer flujo.",
      },
      {
        question: "¿Pueden conectar las herramientas que ya usamos?",
        answer: "Evaluamos cada conexión según los accesos, APIs y documentación disponibles. Solo proponemos una integración después de validar que sea técnicamente viable.",
      },
      {
        question: "¿Cómo sé si necesito automatización o software a medida?",
        answer: "La automatización suele servir cuando el proceso ya está definido y necesita conectar tareas o herramientas. Si la operación requiere reglas, usuarios y datos propios, puede convenir software a medida.",
      },
      {
        question: "¿Qué ocurre si una automatización falla?",
        answer: "El diseño debe considerar validaciones, manejo de errores y una forma clara de supervisar el flujo. Esos controles se definen según el riesgo de cada proceso.",
      },
    ],
    cta: {
      title: "Identifiquemos qué conviene automatizar",
      description: "Describe las tareas repetitivas, herramientas y personas involucradas.",
      label: "Detectar tareas automatizables",
      formType: "automatizacion",
    },
    seo: {
      title: "Automatización de procesos | Código Startup",
      description: "Automatización de tareas, documentos, reportes, notificaciones e integraciones para empresas.",
    },
    editorialStatus: "ready",
    editorialNotes: [],
  },
  {
    slug: "desarrollo-mvp",
    name: "Desarrollo de MVP",
    need: "productos-digitales",
    shortDescription: "Primera versión funcional para probar una idea con usuarios reales y validar hipótesis.",
    hero: {
      eyebrow: "Productos digitales",
      title: "Convierte una idea en una primera versión funcional",
      description: "Para founders y empresas que necesitan probar una propuesta con usuarios reales antes de construir todas las funcionalidades imaginadas.",
    },
    audience: ["Founders", "Emprendedores", "Empresas que exploran nuevos productos"],
    problems: [
      "La idea todavía no ha sido probada con usuarios reales.",
      "Todas las funcionalidades parecen prioritarias.",
      "No está claro qué hipótesis debe validar el producto.",
      "Se necesita una base que pueda evolucionar después de la validación.",
    ],
    solutionTypes: [
      { title: "Definición de hipótesis", description: "Claridad sobre qué se necesita aprender o validar." },
      { title: "Priorización", description: "Selección de las funcionalidades mínimas necesarias para la prueba." },
      { title: "Prototipo", description: "Representación de la experiencia antes de construir cuando sea necesario." },
      { title: "MVP funcional", description: "Primera versión utilizable, preparada para obtener evidencia real." },
      { title: "Plan de evolución", description: "Decisiones posteriores basadas en el uso y el aprendizaje obtenido." },
    ],
    deliverables: [
      "Definición del problema y las hipótesis.",
      "Alcance priorizado.",
      "Diseño UX/UI.",
      "Primera versión funcional.",
      "Analítica acordada.",
      "Documentación y próximos pasos.",
    ],
    capabilities: ["estrategia", "ux-ui", "desarrollo", "analitica", "arquitectura", "lanzamiento-y-evolucion"],
    process: standardProcess,
    relatedProjects: ["entrena", "nextdrill", "nucleo-gestor"],
    faq: [
      {
        question: "¿Cuál es la diferencia entre un prototipo y un MVP?",
        answer: "Un prototipo permite representar y revisar una experiencia. Un MVP es una primera versión funcional que usuarios reales pueden utilizar para validar hipótesis.",
      },
      {
        question: "¿Un MVP es un producto construido de forma provisoria?",
        answer: "No. Tiene un alcance reducido, pero debe estar bien construido para cumplir su objetivo y poder evolucionar si la validación entrega evidencia favorable.",
      },
      {
        question: "¿Cómo se decide qué funcionalidades incluir?",
        answer: "Priorizamos las funciones necesarias para completar la experiencia principal, validar las hipótesis definidas y aprender del uso real. Lo demás se deja para etapas posteriores.",
      },
      {
        question: "¿Qué ocurre después del lanzamiento?",
        answer: "Revisamos el uso y la evidencia obtenida para decidir si conviene ajustar, ampliar, mantener o cambiar la dirección del producto.",
      },
    ],
    cta: {
      title: "Evaluemos la idea y lo que necesitas validar",
      description: "Cuéntanos qué problema resuelve, quién lo utilizará y qué necesitas aprender con la primera versión.",
      label: "Evaluar mi idea",
      formType: "mvp",
    },
    seo: {
      title: "Desarrollo de MVP | Código Startup",
      description: "Diseño y desarrollo de una primera versión funcional para validar una idea con usuarios reales.",
    },
    editorialStatus: "ready",
    editorialNotes: [],
  },
  {
    slug: "aplicaciones-web",
    name: "Aplicaciones web",
    need: "productos-digitales",
    shortDescription: "Aplicaciones accesibles desde el navegador para operar servicios y productos digitales.",
    hero: {
      eyebrow: "Productos digitales",
      title: "Aplicaciones web para operar y hacer crecer un producto",
      description: "Construimos SaaS, plataformas B2B, portales, reservas, paneles y sistemas de membresía.",
    },
    audience: ["Founders", "Empresas", "Equipos de producto"],
    problems: ["Se necesita ofrecer un servicio desde el navegador.", "Distintos tipos de usuario necesitan acceder a funciones y datos.", "El producto debe administrar procesos, pagos, reservas o membresías."],
    solutionTypes: [
      { title: "SaaS", description: "Productos digitales ofrecidos como servicio." },
      { title: "Plataformas B2B", description: "Herramientas para relaciones y operaciones entre empresas." },
      { title: "Portales", description: "Acceso segmentado a información y funcionalidades." },
      { title: "Reservas", description: "Disponibilidad, solicitudes y gestión de agenda." },
      { title: "Paneles", description: "Visualización y administración de información." },
      { title: "Membresías", description: "Acceso a contenidos o funciones según plan o estado." },
    ],
    deliverables: ["Definición de alcance.", "Diseño UX/UI.", "Desarrollo de la aplicación.", "Pruebas, documentación y lanzamiento."],
    capabilities: ["estrategia", "ux-ui", "desarrollo", "analitica", "arquitectura", "seguridad", "lanzamiento-y-evolucion"],
    process: standardProcess,
    relatedProjects: ["entrena", "nextdrill", "nucleo-gestor"],
    faq: [
      {
        question: "¿Cuándo conviene una aplicación web?",
        answer: "Cuando distintos usuarios necesitan acceder desde el navegador a funciones, datos o procesos centralizados sin instalar una aplicación en cada dispositivo.",
      },
      {
        question: "¿Una aplicación web puede tener distintos roles?",
        answer: "Sí. Los permisos y experiencias se definen según las responsabilidades reales de cada tipo de usuario y los datos que necesita consultar o modificar.",
      },
      {
        question: "¿Pueden construir una plataforma SaaS?",
        answer: "Sí, SaaS es uno de los tipos de aplicación web contemplados. El alcance depende del modelo, los usuarios, la administración y las funciones que necesita la primera etapa.",
      },
      {
        question: "¿La aplicación podrá evolucionar después?",
        answer: "La arquitectura, documentación y plan de lanzamiento se definen para el alcance acordado y consideran la evolución esperada, sin construir anticipadamente funciones que todavía no se necesitan.",
      },
    ],
    cta: {
      title: "Conversemos sobre tu aplicación web",
      description: "Cuéntanos quién la usará, qué proceso resolverá y en qué etapa se encuentra.",
      label: "Evaluar mi aplicación web",
      formType: "aplicaciones-web",
    },
    seo: {
      title: "Desarrollo de aplicaciones web | Código Startup",
      description: "Desarrollo de SaaS, plataformas B2B, portales, reservas, paneles y aplicaciones web.",
    },
    editorialStatus: "ready",
    editorialNotes: [],
  },
  {
    slug: "aplicaciones-moviles",
    name: "Aplicaciones móviles",
    need: "productos-digitales",
    shortDescription: "Aplicaciones para clientes, trabajadores y operaciones en terreno.",
    hero: {
      eyebrow: "Productos digitales",
      title: "Aplicaciones móviles para usuarios y operaciones en terreno",
      description: "Soluciones con captura de información, notificaciones y funcionamiento offline cuando corresponda.",
    },
    audience: ["Empresas", "Founders", "Equipos con operación en terreno"],
    problems: ["El usuario necesita acceder desde su teléfono.", "La operación ocurre fuera de una oficina.", "Se necesita capturar información en terreno.", "La conectividad puede ser limitada."],
    solutionTypes: [
      { title: "Aplicaciones para clientes", description: "Acceso móvil a servicios, información y acciones." },
      { title: "Aplicaciones para trabajadores", description: "Herramientas de apoyo para tareas y procesos internos." },
      { title: "Operación en terreno", description: "Registro y consulta de información fuera de la oficina." },
      { title: "Funcionamiento offline", description: "Continuidad de funciones definidas cuando no existe conexión." },
      { title: "Notificaciones", description: "Avisos relevantes para el usuario según eventos del producto." },
    ],
    deliverables: ["Definición de alcance.", "Diseño UX/UI móvil.", "Desarrollo de la aplicación.", "Pruebas, documentación y lanzamiento."],
    capabilities: ["estrategia", "ux-ui", "desarrollo", "analitica", "arquitectura", "seguridad", "lanzamiento-y-evolucion"],
    process: standardProcess,
    relatedProjects: ["entrena", "nucleo-gestor"],
    faq: [
      {
        question: "¿Cuándo conviene una aplicación móvil en lugar de una web?",
        answer: "Cuando la experiencia depende del teléfono, la operación ocurre en terreno o se necesitan capacidades como captura móvil, notificaciones o funcionamiento offline dentro del alcance definido.",
      },
      {
        question: "¿La aplicación puede funcionar sin conexión?",
        answer: "Sí, cuando el caso lo requiere. Primero definimos qué funciones y datos deben estar disponibles offline y cómo se sincronizarán cuando vuelva la conectividad.",
      },
      {
        question: "¿Puede enviar notificaciones?",
        answer: "Las notificaciones pueden incorporarse cuando existe un evento relevante y una acción clara para la persona usuaria. Su alcance se define junto con el flujo del producto.",
      },
      {
        question: "¿También diseñan la experiencia móvil?",
        answer: "Sí. El servicio contempla diseño UX/UI móvil alineado con el contexto, las tareas y las condiciones reales en que se utilizará la aplicación.",
      },
    ],
    cta: {
      title: "Evaluemos tu aplicación móvil",
      description: "Cuéntanos quién la utilizará, dónde y qué información necesita administrar.",
      label: "Evaluar mi aplicación móvil",
      formType: "aplicaciones-moviles",
    },
    seo: {
      title: "Desarrollo de aplicaciones móviles | Código Startup",
      description: "Aplicaciones móviles para clientes, trabajadores y operaciones en terreno.",
    },
    editorialStatus: "ready",
    editorialNotes: [],
  },
  {
    slug: "auditoria-y-evolucion",
    name: "Auditoría y evolución",
    need: "sistemas-existentes",
    shortDescription: "Revisión técnica y plan de evolución para sistemas que presentan riesgos o son difíciles de mantener.",
    hero: {
      eyebrow: "Sistemas existentes",
      title: "Entiende qué está frenando a tu sistema",
      description: "Revisamos deuda técnica, rendimiento, arquitectura, seguridad, documentación y capacidad de evolución.",
    },
    audience: ["Empresas con sistemas existentes", "Gerencias", "Equipos técnicos y de producto"],
    problems: ["Deuda técnica.", "Problemas de rendimiento.", "Arquitectura difícil de evolucionar.", "Riesgos de seguridad.", "Falta de documentación.", "Sistemas difíciles de modificar."],
    solutionTypes: [
      { title: "Revisión técnica", description: "Análisis del estado actual del sistema y su código cuando esté disponible." },
      { title: "Arquitectura", description: "Evaluación de estructura, dependencias y capacidad de evolución." },
      { title: "Seguridad", description: "Identificación de riesgos técnicos dentro del alcance acordado." },
      { title: "Rendimiento", description: "Revisión de problemas y cuellos de botella observables." },
      { title: "Plan de evolución", description: "Priorización de acciones y próximos pasos." },
    ],
    deliverables: ["Diagnóstico técnico.", "Hallazgos priorizados.", "Riesgos y dependencias.", "Recomendaciones y roadmap de evolución."],
    capabilities: ["estrategia", "arquitectura", "seguridad", "analitica", "desarrollo", "lanzamiento-y-evolucion"],
    process: standardProcess,
    relatedProjects: [],
    faq: [
      {
        question: "¿Necesitan acceso al código fuente?",
        answer: "El acceso al código permite una revisión más profunda. Si no está disponible, podemos definir un alcance limitado a la información, documentación y comportamiento observable del sistema.",
      },
      {
        question: "¿Qué entrega una auditoría técnica?",
        answer: "Entregamos un diagnóstico, hallazgos priorizados, riesgos, dependencias y recomendaciones para construir un roadmap de evolución.",
      },
      {
        question: "¿La auditoría incluye corregir los problemas encontrados?",
        answer: "La auditoría identifica y prioriza. Las correcciones o la evolución posterior se estiman como un alcance separado después de comprender los hallazgos.",
      },
      {
        question: "¿Cuánto demora una revisión?",
        answer: "Depende del tamaño del sistema, la documentación, los accesos disponibles y las áreas que deban revisarse. El alcance y los tiempos se definen antes de comenzar.",
      },
    ],
    cta: {
      title: "Revisemos el estado de tu sistema",
      description: "Cuéntanos qué problema presenta, qué tecnologías utiliza y qué acceso o documentación existe.",
      label: "Solicitar revisión técnica",
      formType: "auditoria",
    },
    seo: {
      title: "Auditoría y evolución de software | Código Startup",
      description: "Revisión de deuda técnica, arquitectura, seguridad, rendimiento y capacidad de evolución de sistemas existentes.",
    },
    editorialStatus: "ready",
    editorialNotes: [],
  },
];

export const services = serviceSchema.array().parse(serviceData);
assertUniqueSlugs(services, "servicios");

export function getServiceBySlug(slug: ServiceSlug) {
  return services.find((service) => service.slug === slug);
}
