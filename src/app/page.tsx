import type { CSSProperties } from "react";
import Link from "next/link";
import { BarChart3, Bot, Calendar, FileSearch, FileSpreadsheet, FileText, MessageCircle, MessageSquare, RefreshCw, Repeat2, SearchCheck, ShieldAlert, ShieldCheck, Wrench } from "lucide-react";
import HomeAnimationsLoader from "@/components/HomeAnimationsLoader";
import { SectionHeader } from "@/components/SectionHeader";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import {
  homeClientProjects,
  services,
  siteConfig,
} from "@/data/commercial";
import { getAllPublishedArticles } from "@/lib/blog/article-loader";
import type { ServiceSlug } from "@/lib/commercial/schema";

const WHATSAPP_MENSAJE =
  "Quiero información de los servicios de Código Startup para mi empresa u organización.";

function whatsappUrl(mensaje: string): string {
  return `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(mensaje)}`;
}

function requireService(slug: ServiceSlug) {
  const service = services.find((item) => item.slug === slug);
  if (!service) throw new Error(`No existe el servicio ${slug}`);
  return service;
}

const softwareService = requireService("software-a-medida");
const automationService = requireService("automatizacion-de-procesos");
const mvpService = requireService("desarrollo-mvp");
const auditService = requireService("auditoria-y-evolucion");

const hiddenServiceSlugs = [
  "sitios-web",
  "tiendas-online",
  "aplicaciones-web",
  "aplicaciones-moviles",
] as const satisfies ReadonlyArray<ServiceSlug>;

const engineeringServices = services.filter(
  ({ slug }) => !hiddenServiceSlugs.includes(slug as (typeof hiddenServiceSlugs)[number]),
);

const needs = [
  {
    eyebrow: "Capacitación & Talleres",
    title: "Quiero capacitar a mi equipo",
    description: "Talleres prácticos para que tu equipo implemente IA en sus procesos reales de trabajo.",
    links: [{ label: "Ver talleres corporativos", href: "#talleres" }],
  },
  {
    eyebrow: "Automatización e IA",
    title: "Quiero automatizar un proceso",
    description: automationService.shortDescription,
    links: [
      { label: "Automatización tradicional", href: `/soluciones/${automationService.slug}` },
      { label: "Automatización con IA", href: "/contacto" },
    ],
  },
  {
    eyebrow: "Software y productos",
    title: "Necesito software a medida",
    description: softwareService.shortDescription,
    links: [
      { label: softwareService.name, href: `/soluciones/${softwareService.slug}` },
      { label: mvpService.name, href: `/soluciones/${mvpService.slug}` },
    ],
  },
  {
    eyebrow: "Sistemas existentes",
    title: "Quiero revisar un sistema existente",
    description: auditService.shortDescription,
    links: [{ label: auditService.name, href: `/soluciones/${auditService.slug}` }],
  },
];

const workshops = [
  {
    slug: "videos-ugc-con-ia",
    category: "Emprendimiento",
    title: "Videos UGC con IA para emprendedores",
    audience: "Emprendedores y pequeñas empresas que quieran crear contenido para redes sociales sin experiencia previa en diseño, video o IA.",
    result: "Aprende a crear un video para promocionar tu negocio con herramientas de IA, desde la idea inicial hasta el video listo para publicar.",
  },
  {
    slug: "ia-para-productividad-administrativa",
    category: "Productividad Administrativa",
    title: "IA para Productividad Administrativa",
    audience: "Equipos administrativos, contabilidad, RR.HH., profesionales y jefaturas.",
    result: "Ordenar tu bandeja de correo, crear documentos y resumir reuniones con IA, liberando tiempo de tareas repetitivas. Incluye el módulo crítico de ciberseguridad: qué información NO poner en una IA pública.",
  },
  {
    slug: "automatizacion-de-procesos-con-ia",
    category: "Automatización e IA",
    title: "Automatización de Procesos con IA",
    audience: "Equipos operativos y jefaturas.",
    result: "Detectar tareas repetitivas, descubrir en qué gasta más tiempo tu equipo y diseñar automatizaciones que conecten correo, planillas, formularios y CRM, listas para implementar en tu operación. Con buenas prácticas de ciberseguridad incluidas.",
  },
  {
    slug: "ia-para-recursos-humanos",
    category: "Recursos Humanos",
    title: "IA para Recursos Humanos",
    audience: "Equipos de RR.HH. y People.",
    result: "Descripciones de cargo, guiones de entrevistas, comunicaciones internas, evaluación de currículums y apoyo a onboarding y capacitaciones con IA. Con buenas prácticas de ciberseguridad incluidas.",
  },
  {
    slug: "ia-para-equipos-comerciales",
    category: "Comercial y Ventas",
    title: "IA para Equipos Comerciales",
    audience: "Equipos de ventas y desarrollo comercial.",
    result: "Calificar prospectos, preparar reuniones y redactar correos y propuestas comerciales con IA: el mismo playbook que usamos en nuestro propio proceso comercial. Con buenas prácticas de ciberseguridad incluidas.",
  },
  {
    slug: "ia-para-marketing",
    category: "Marketing",
    title: "IA para Marketing",
    audience: "Equipos de marketing y creadores de contenido.",
    result: "Campañas de correo, anuncios, investigación de mercado y contenido para redes sociales, incluyendo videos UGC y videos animados generados con IA. Con buenas prácticas de ciberseguridad incluidas.",
  },
  {
    slug: "ia-para-lideres-y-jefaturas",
    category: "Liderazgo",
    title: "IA para Líderes y Jefaturas",
    audience: "Jefaturas, gerentes y líderes de equipo.",
    result: "Preparar reuniones, analizar información, delegar y dar seguimiento con asistentes de IA para tomar decisiones más informadas. Con buenas prácticas de ciberseguridad incluidas.",
  },
  {
    slug: "ia-para-gestion-de-proyectos",
    category: "Gestión de Proyectos",
    title: "IA para Gestión de Proyectos",
    audience: "PMO, product y equipos de proyecto.",
    result: "Planificar, gestionar riesgos, redactar historias de usuario y conectar con herramientas como Jira. Con buenas prácticas de ciberseguridad incluidas.",
  },
  {
    slug: "ia-para-operaciones-y-faenas",
    category: "Operaciones y Faenas",
    title: "IA para Operaciones y Faenas",
    audience: "Supervisores, jefaturas de operación, oficinas técnicas y equipos de faena en industrias y minería.",
    result: "Generar reportes de operación, documentar normativa DS44/ISO, preparar licitaciones y planificar mantención con IA, reduciendo trabajo manual en terreno y oficina técnica.",
  },
];

const talleresCard = {
  name: "Talleres de IA Corporativos",
  category: "Capacitación & Talleres",
  description: "Capacitación práctica para que tu equipo implemente IA en sus procesos reales: productividad administrativa, automatización, recursos humanos, comercial, marketing, liderazgo y gestión de proyectos.",
  href: "#talleres",
  ctaLabel: "Ver talleres",
  image: "/images/talleres-corporativos.jpg",
};

const agentesCard = {
  name: "Agentes de IA y Bases de Conocimiento",
  category: "Automatización e IA",
  description: "Asistentes internos entrenados con los manuales, procedimientos y contratos de tu empresa, con búsqueda semántica (RAG) sobre tu propia información.",
  href: "/contacto",
  ctaLabel: "Evaluar mi caso",
  image: "/images/agentes-ia.jpg",
};

const homeServiceCategories: Record<string, string> = {
  "automatizacion-de-procesos": "Automatización e IA",
  "software-a-medida": "Ingeniería y software",
  "desarrollo-mvp": "Productos y plataformas",
  "auditoria-y-evolucion": "Sistemas existentes",
};

const homeServiceCards: {
  name: string;
  category: string;
  description: string;
  href: string;
  ctaLabel: string;
  image?: string;
}[] = [
  talleresCard,
  ...engineeringServices.map((service) => ({
    name: service.name,
    category: homeServiceCategories[service.slug] ?? service.hero.eyebrow,
    description: service.shortDescription,
    href: `/soluciones/${service.slug}`,
    ctaLabel: "Ver solución",
    image:
      service.slug === "automatizacion-de-procesos"
        ? "/images/automatizacion-de-procesos.jpg"
        : service.slug === "software-a-medida"
          ? "/images/software-a-medida.jpg"
          : service.slug === "desarrollo-mvp"
            ? "/images/desarrollo-de-mvp.jpg"
            : service.slug === "auditoria-y-evolucion"
              ? "/images/auditoria.jpg"
              : undefined,
  })),
  agentesCard,
];

const homeProblems = [
  { icon: FileSpreadsheet, text: "Horas procesando planillas a mano, con datos duplicados entre sistemas." },
  { icon: MessageSquare, text: "Procesos administrados por correo y WhatsApp, sin trazabilidad de aprobaciones." },
  { icon: BarChart3, text: "Reportes y seguimientos preparados manualmente cada semana." },
  { icon: Repeat2, text: "Sistemas que no se comunican entre sí: hay que copiar y pegar todo dos veces." },
  { icon: Wrench, text: "Herramientas genéricas que no se adaptan a la forma real de trabajar." },
  { icon: Bot, text: "Equipos que usan la IA solo como redactor de textos, sin conectarla a los procesos." },
  { icon: ShieldAlert, text: "Dudas sobre qué información se puede subir a una IA sin arriesgar la privacidad." },
  { icon: FileSearch, text: "Equipos ahogados en PDFs buscando cláusulas y preparando informes a mano." },
];

const teamPrinciples = [
  { icon: SearchCheck, text: "Diagnóstico antes de proponer" },
  { icon: RefreshCw, text: "Talleres 100% prácticos" },
  { icon: ShieldCheck, text: "Entregables claros y medibles" },
  { icon: FileText, text: "Seguridad de datos primero" },
];

const ideaSteps = [
  {
    n: "I",
    title: "Identificar",
    desc: "Talleres y sesiones estratégicas para mapear ineficiencias y priorizar oportunidades por impacto.",
  },
  {
    n: "D",
    title: "Diagnosticar",
    desc: "Levantamiento del proceso actual, medición de tiempos y diseño de la arquitectura técnica del proceso futuro.",
  },
  {
    n: "E",
    title: "Ejecutar",
    desc: "Desarrollo, integración de sistemas, entrenamiento de modelos de IA y puesta en producción.",
  },
  {
    n: "A",
    title: "Acompañar",
    desc: "Medición de horas ahorradas, soporte técnico continuo y escalamiento de la solución.",
  },
];

const homeFaq = [
  {
    question: "¿Cómo garantizan la seguridad de los datos corporativos al usar IA?",
    answer: "En nuestros talleres y desarrollos partimos por la gobernanza: enseñamos e implementamos arquitecturas privadas y protocolos claros de qué información puede procesarse. La información confidencial de tu empresa no se utiliza para entrenar modelos públicos.",
  },
  {
    question: "¿Los talleres son teóricos o prácticos?",
    answer: "Son 100% prácticos, manos a la obra. Los participantes trabajan con casos reales de su día a día y aplican soluciones desde el primer bloque.",
  },
  {
    question: "¿Qué pasa si después del taller necesitamos una solución más compleja?",
    answer: "Es una conversación que se da de forma natural si llega. Algunos equipos profundizan por su cuenta con lo aprendido; otros nos piden apoyo puntual para flujos que requieren integración técnica. Cuando llegue ese momento, lo conversamos sin compromiso.",
  },
  {
    question: "¿Tienen experiencia en industrias exigentes o reguladas?",
    answer: "Sí. Hemos desarrollado sistemas operacionales en terreno, plataformas de inspección geotécnica, control de perforación minera y software SaaS propio de gestión de proyectos.",
  },
];

export default function Home() {
  const recentArticles = getAllPublishedArticles().slice(0, 3);

  return (
    <main className="home">
      <HomeAnimationsLoader />

      <section id="hero" className="hero-root">
        <video className="hero-video" autoPlay muted loop playsInline aria-hidden="true">
          <source src="/video-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-eyebrow fadein fadein-d1">Automatización · Inteligencia Artificial · Capacitación</div>
            <div className="hero-title-area">
              <h1 className="hero-title">
                <span className="reveal-wrap"><span className="reveal reveal-d1">OPTIMIZAMOS EL TRABAJO MANUAL</span></span>
                <span className="reveal-wrap"><span className="reveal reveal-d2">DE TU OPERACIÓN CON IA <span className="accent">APLICADA.</span></span></span>
              </h1>
            </div>
            <div className="hero-sub">
              <p className="hero-desc fadein fadein-d2">
                De la teoría a procesos funcionando. Capacitamos a tu equipo y desarrollamos soluciones
                a medida para reducir tiempos, eliminar errores y liberar a tu personal de las tareas
                administrativas repetitivas.
              </p>
              <div className="hero-actions fadein fadein-d3">
                <Link href="#talleres" className="btn-primary">Ver talleres corporativos</Link>
                <Link href="/contacto" className="home-text-link">Agendar diagnóstico</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-distributor-section" aria-labelledby="needs-heading">
        <div className="container">
          <SectionHeader
            eyebrow="Elige tu punto de partida"
            title="¿Qué necesitas resolver?"
            description="No necesitas llegar con la solución definida. Empieza por la situación que más se parece a la tuya."
            headingId="needs-heading"
            align="center"
          />
          <div className="home-needs-grid">
            {needs.map((need) => (
              <article key={need.title} className="home-need-card">
                <span className="workshop-badge workshop-badge--violet">{need.eyebrow}</span>
                <h3>{need.title}</h3>
                <p>{need.description}</p>
                <div className="home-need-links">
                  {need.links.map((link) => (
                    <Link key={link.href} href={link.href} prefetch={false}>
                      {link.label} <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="talleres" className="home-distributor-section home-workshops-section" aria-labelledby="workshops-heading">
        <div className="container">
          <SectionHeader
            eyebrow="Talleres corporativos"
            title="Talleres de IA Aplicada: capacitación práctica en procesos reales"
            description="Formaciones in-company 'manos a la obra' donde tu equipo resuelve tareas diarias con IA y detecta oportunidades de automatización."
            headingId="workshops-heading"
            align="center"
          />
          <div className="home-workshop-grid">
            {workshops.map((workshop) => (
              <article key={workshop.slug} className="workshop-card">
                <Link href={`/talleres/${workshop.slug}`} className="workshop-card-link">
                  <span className="workshop-badge">{workshop.category}</span>
                  <h3>{workshop.title}</h3>
                  <span className="workshop-card-go">
                    ver taller
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </article>
            ))}
            <div className="workshop-banner">
              <span className="workshop-badge">Programas In-Company a medida</span>
              <h3>Capacitaciones adaptadas a tu sector</h3>
              <span className="workshop-card-go">
                Diseñamos talleres a medida
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="portafolio" className="home-distributor-section home-distributor-section--tinted" aria-labelledby="projects-heading">
        <div className="container">
          <SectionHeader
            eyebrow="Proyectos reales"
            title="Construido. Lanzado. Operando."
            description="Sistemas y plataformas operando en industrias reales."
            headingId="projects-heading"
            align="center"
          />
          <div className="project-card-grid">
            {homeClientProjects.map((project) => <ProjectCard key={project.slug} project={project} hideTitle />)}
          </div>
          <div className="home-section-action">
            <Link href="/proyectos" className="home-text-link">Ver todos los proyectos →</Link>
          </div>
        </div>
      </section>

      <section className="home-distributor-section home-problems-section" aria-labelledby="problems-heading">
        <div className="container home-problems-layout">
          <SectionHeader
            eyebrow="La realidad operativa"
            title="Los bloqueos operativos que frenan la productividad de tu empresa"
            description="Trabajamos sobre los problemas concretos que generan trabajo manual, errores y demoras en la operación."
            headingId="problems-heading"
          />
          <ul className="service-problem-list">
            {homeProblems.map(({ icon: Icon, text }) => (
              <li key={text}>
                <span className="service-problem-icon" aria-hidden="true">
                  <Icon size={28} strokeWidth={2} />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="servicios" className="home-distributor-section home-distributor-section--tinted" aria-labelledby="solutions-heading">
        <div className="container">
          <SectionHeader
            eyebrow="Soluciones"
            title="Una ruta para cada etapa"
            description="Capacitación, automatización e ingeniería para transformar los procesos de tu empresa."
            headingId="solutions-heading"
            align="center"
          />
          <div className="home-solutions-grid">
            {homeServiceCards.map((card) => (
              <article
                key={card.name}
                className={`service-card${card.image ? " service-card--image" : ""}`}
                style={card.image ? ({ "--card-bg": `url("${card.image}")` } as CSSProperties) : undefined}
              >
                {card.image && <div className="service-card-bg" aria-hidden="true" />}
                <div className="service-category">{card.category}</div>
                <h3 className="service-name">{card.name}</h3>
                <hr className="service-divider" />
                <p className="service-desc">{card.description}</p>
                <Link href={card.href} prefetch={false} className="service-link service-link--outer">
                  {card.ctaLabel}
                </Link>
              </article>
            ))}
          </div>
          <div className="home-section-action">
            <Link href="/soluciones" className="home-text-link">Comparar todas las soluciones →</Link>
          </div>
        </div>
      </section>

      <section id="proceso" className="section-wrap process-section" aria-labelledby="process-heading">
        <div className="container">
          <div className="process-stage">
            <div className="process-header">
              <div className="section-tag">Metodología</div>
              <h2 id="process-heading" className="section-title">CÓMO TRABAJAMOS<span className="accent">:</span><br />EL MÉTODO IDEA<span className="accent">.</span></h2>
              <p className="process-desc-text">Capacitamos, diagnosticamos, ejecutamos y acompañamos: cada etapa tiene entregables claros y medibles.</p>
            </div>
            <div className="process-grid">
              {ideaSteps.map((step) => (
                <article key={step.n} className="process-step">
                  <span className="process-n" aria-hidden="true">{step.n}</span>
                  <div className="process-step-content">
                    <h3 className="process-title">{step.title}</h3>
                    <p className="process-desc">{step.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {recentArticles.length > 0 && (
        <section className="home-distributor-section home-distributor-section--tinted" aria-labelledby="articles-heading">
          <div className="container">
            <SectionHeader
              align="center"
              eyebrow="Nuestro blog"
              title="Información, conocimiento y opinión"
              description="Un espacio donde compartimos artículos, análisis y criterio propio para evaluar automatización, IA y software con mayor claridad."
              headingId="articles-heading"
            />
            <div className="article-grid home-article-grid">
              {recentArticles.map((article) => <ArticleCard key={article.fileSlug} article={article} />)}
            </div>
            <div className="home-section-action">
              <Link href="/blog" className="home-text-link">Explorar el blog →</Link>
            </div>
          </div>
        </section>
      )}

      <section className="home-team-section" aria-labelledby="team-heading">
        <div className="container home-team-grid">
          <div>
            <SectionHeader
              eyebrow="El equipo"
              title="El equipo técnico que ejecuta contigo"
              description="Combinamos estrategia, diseño y desarrollo para convertir decisiones de negocio en productos que puedan operar y evolucionar."
              headingId="team-heading"
            />
            <Link href="/nosotros" className="home-text-link">Conocer cómo trabajamos →</Link>
          </div>
          <ul className="home-team-principles">
            {teamPrinciples.map(({ icon: Icon, text }) => (
              <li key={text}>
                <span className="home-team-principle-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <strong>{text}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-distributor-section" aria-labelledby="faq-heading">
        <div className="container service-split-layout">
          <SectionHeader eyebrow="Preguntas frecuentes" title="Antes de dar el siguiente paso" headingId="faq-heading" />
          <div className="service-faq-list">
            {homeFaq.map((item) => (
              <details key={item.question} className="service-faq-item">
                <summary>
                  <span>{item.question}</span>
                  <span className="service-faq-icon" aria-hidden="true">+</span>
                </summary>
                <div className="service-faq-answer"><p>{item.answer}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="cta-root">
        <div className="cta-label">Siguiente paso</div>
        <h2 className="cta-title">LLEVAMOS LA EFICIENCIA<br />OPERACIONAL A TU EMPRESA.</h2>
        <p className="cta-desc">Conversemos sobre los procesos que hoy ralentizan a tu equipo y diseñemos la mejor ruta para automatizarlos.</p>
        <div className="cta-actions">
          <a href={siteConfig.contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <Calendar size={16} />
            Agendar reunión
          </a>
          <a href={whatsappUrl(WHATSAPP_MENSAJE)} target="_blank" rel="noopener noreferrer" className="btn-dark">
            <MessageCircle size={16} />
            Hablar por WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
