import Image from "next/image";
import Link from "next/link";
import { BarChart3, Code2, Compass, FileQuestion, FileSpreadsheet, FileText, Layers, ListTodo, Lock, PenTool, RefreshCw, Repeat2, Rocket, Search, SearchCheck, ShieldCheck, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import HomeAnimationsLoader from "@/components/HomeAnimationsLoader";
import { SectionHeader } from "@/components/SectionHeader";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import {
  capabilities,
  homeClientProjects,
  homeOwnProduct,
  processSteps,
  services,
} from "@/data/commercial";
import { getAllPublishedArticles } from "@/lib/blog/article-loader";
import type { ServiceSlug } from "@/lib/commercial/schema";

function requireService(slug: ServiceSlug) {
  const service = services.find((item) => item.slug === slug);
  if (!service) throw new Error(`No existe el servicio ${slug}`);
  return service;
}

const websiteService = requireService("sitios-web");
const storeService = requireService("tiendas-online");
const softwareService = requireService("software-a-medida");
const automationService = requireService("automatizacion-de-procesos");
const mvpService = requireService("desarrollo-mvp");
const webAppService = requireService("aplicaciones-web");
const mobileAppService = requireService("aplicaciones-moviles");
const auditService = requireService("auditoria-y-evolucion");

const needs = [
  {
    eyebrow: "Presencia digital",
    title: "Necesito un sitio web",
    description: websiteService.shortDescription,
    links: [
      { label: websiteService.name, slug: websiteService.slug },
      { label: storeService.name, slug: storeService.slug },
    ],
  },
  {
    eyebrow: "Operación",
    title: "Quiero digitalizar un proceso",
    description: softwareService.shortDescription,
    links: [
      { label: softwareService.name, slug: softwareService.slug },
      { label: automationService.name, slug: automationService.slug },
    ],
  },
  {
    eyebrow: "Producto digital",
    title: "Quiero lanzar un producto",
    description: mvpService.shortDescription,
    links: [
      { label: mvpService.name, slug: mvpService.slug },
      { label: webAppService.name, slug: webAppService.slug },
      { label: mobileAppService.name, slug: mobileAppService.slug },
    ],
  },
  {
    eyebrow: "Sistema existente",
    title: "Necesito mejorar lo que ya tengo",
    description: auditService.shortDescription,
    links: [{ label: auditService.name, slug: auditService.slug }],
  },
];

const homeProblems = [
  { icon: FileQuestion, text: websiteService.problems[1] },
  { icon: RefreshCw, text: websiteService.problems[6] },
  { icon: FileSpreadsheet, text: softwareService.problems[0] },
  { icon: SearchCheck, text: softwareService.problems[4] },
  { icon: Repeat2, text: automationService.problems[0] },
  { icon: ListTodo, text: mvpService.problems[1] },
  { icon: Wrench, text: auditService.problems[0] },
  { icon: Lock, text: auditService.problems[5] },
];

const capabilityIcons: Record<string, LucideIcon> = {
  estrategia: Compass,
  "ux-ui": PenTool,
  desarrollo: Code2,
  contenido: FileText,
  seo: Search,
  analitica: BarChart3,
  arquitectura: Layers,
  seguridad: ShieldCheck,
  "lanzamiento-y-evolucion": Rocket,
};

const teamPrinciples = [
  { icon: SearchCheck, text: "Diagnóstico antes de construir" },
  { icon: RefreshCw, text: "Avances y entregas semanales" },
  { icon: ShieldCheck, text: "Alcance y precio claros" },
  { icon: FileText, text: "Documentación y traspaso" },
];

const homeFaq = [
  {
    question: "¿Qué pasa si todavía no sé qué solución necesito?",
    answer: "Partimos con un diagnóstico para entender el problema real. Desde ahí definimos una ruta, un alcance, tiempos y precio claros antes de construir.",
  },
  {
    question: "¿Cómo puedo seguir el avance del proyecto?",
    answer: "Trabajamos con avances y entregas semanales. Siempre sabes qué se construyó, qué viene y por qué se tomó cada decisión.",
  },
  {
    question: "¿Qué recibo al terminar?",
    answer: "Entregamos el producto acordado junto con la documentación y el traspaso necesarios para que pueda operar y evolucionar.",
  },
  {
    question: "¿Pueden revisar o continuar un sistema existente?",
    answer: "Sí. La línea de auditoría y evolución permite revisar deuda técnica, rendimiento, arquitectura, seguridad y capacidad de evolución antes de definir los próximos pasos.",
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
            <div className="hero-eyebrow fadein fadein-d1">Desarrollo · Estrategia · Diseño</div>
            <div className="hero-title-area">
              <h1 className="hero-title">
                <span className="reveal-wrap"><span className="reveal reveal-d1">CONSTRUIMOS</span></span>
                <span className="reveal-wrap"><span className="reveal reveal-d2">PRODUCTOS</span></span>
                <span className="reveal-wrap"><span className="reveal reveal-d3">QUE <span className="accent">PERDURAN.</span></span></span>
              </h1>
            </div>
            <p className="hero-desc fadein fadein-d2">
              Somos el equipo técnico que ejecuta contigo. Te ayudamos a construir presencia digital,
              ordenar tu operación, lanzar un producto o evolucionar un sistema existente.
            </p>
          </div>
          <div className="hero-actions fadein fadein-d3">
            <Link href="/contacto" className="btn-primary">Evaluar mi proyecto</Link>
            <Link href="/soluciones" className="home-text-link">Explorar soluciones</Link>
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
                <div className="home-need-topline">
                  <span>{need.eyebrow}</span>
                </div>
                <h3>{need.title}</h3>
                <p>{need.description}</p>
                <div className="home-need-links">
                  {need.links.map((link) => (
                    <Link key={link.slug} href={`/soluciones/${link.slug}`} prefetch={false}>
                      {link.label} <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="portafolio" className="home-distributor-section home-distributor-section--tinted" aria-labelledby="projects-heading">
        <div className="container">
          <SectionHeader
            eyebrow="Proyectos reales"
            title="Construido. Lanzado. Operando."
            description="Productos digitales que hoy apoyan operaciones, servicios y nuevos negocios."
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
            eyebrow="Problemas que resolvemos"
            title="La tecnología debe quitar fricción, no agregarla"
            description="Trabajamos sobre problemas concretos de comunicación, operación, producto y sistemas existentes."
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
            description="Ocho soluciones especializadas, conectadas por una misma forma de diagnosticar, construir y evolucionar."
            headingId="solutions-heading"
            align="center"
          />
          <div className="home-solutions-grid">
            {services.map((service) => (
              <article key={service.slug} className="service-card">
                <div className="service-category">{service.hero.eyebrow}</div>
                <h3 className="service-name">{service.name}</h3>
                <hr className="service-divider" />
                <p className="service-desc">{service.shortDescription}</p>
                <Link href={`/soluciones/${service.slug}`} prefetch={false} className="service-link service-link--outer">
                  Ver solución
                </Link>
              </article>
            ))}
          </div>
          <div className="home-section-action">
            <Link href="/soluciones" className="home-text-link">Comparar todas las soluciones →</Link>
          </div>
        </div>
      </section>

      <section className="home-capabilities-section" aria-labelledby="capabilities-heading">
        <div className="container">
          <SectionHeader
            eyebrow="Capacidades transversales"
            title="Todo lo necesario para construir y lanzar"
            description="No son servicios aislados. Son capacidades que combinamos según lo que cada solución realmente necesita."
            headingId="capabilities-heading"
            align="center"
          />
          <div className="service-capability-grid home-capability-grid">
            {capabilities.map((capability) => {
              const Icon = capabilityIcons[capability.slug];
              return (
                <article key={capability.slug} className="service-capability-item home-capability-card">
                  <div className="home-capability-head">
                    {Icon && (
                      <span className="home-capability-icon" aria-hidden="true">
                        <Icon size={20} strokeWidth={1.75} />
                      </span>
                    )}
                    <h3>{capability.name}</h3>
                  </div>
                  <p>{capability.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="nucleo" className="home-featured-case" aria-labelledby="featured-case-heading">
        <div className="container home-featured-case-grid">
          <div className="home-featured-case-copy">
            <div className="section-tag">Caso destacado · Producto propio</div>
            <h2 id="featured-case-heading" className="section-title">CONSTRUIMOS PORQUE TAMBIÉN EMPRENDEMOS<span className="accent">.</span></h2>
            <p>{homeOwnProduct.hook}</p>
            <Link href={`/proyectos/${homeOwnProduct.slug}`} prefetch={false} className="home-text-link">
              Ver el proyecto →
            </Link>
          </div>
          <article className="home-featured-case-card">
            <Image src={homeOwnProduct.logo} alt={homeOwnProduct.name} width={260} height={90} className="home-featured-case-logo" />
            <p>{homeOwnProduct.description}</p>
            <div className="home-featured-metrics">
              {homeOwnProduct.metrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.val}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="proceso" className="section-wrap process-section" aria-labelledby="process-heading">
        <div className="container">
          <div className="process-stage">
            <div className="process-header">
              <div className="section-tag">Proceso abierto</div>
              <h2 id="process-heading" className="section-title">SIN SECRETOS<span className="accent">:</span><br />ASÍ CONSTRUIMOS<span className="accent">.</span></h2>
              <p className="process-desc-text">Entregas semanales, alcance y precio claros, decisiones explicadas, documentación y traspaso.</p>
              <Link href="/proceso" className="home-text-link">Conocer el proceso completo →</Link>
            </div>
            <div className="process-grid">
              {processSteps.map((step) => (
                <article key={step.n} className="process-step">
                  <div className="process-step-header">
                    <span className="process-n">{step.n}</span>
                    <h3 className="process-title">{step.title}</h3>
                  </div>
                  <p className="process-desc">{step.desc}</p>
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
              eyebrow="Ideas para decidir mejor"
              title="Tecnología explicada desde el negocio"
              description="Guías para evaluar productos digitales, automatización, software y decisiones técnicas con mayor claridad."
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
        <h2 className="cta-title">CUÉNTANOS QUÉ<br />NECESITAS RESOLVER.</h2>
        <p className="cta-desc">Revisamos tu situación y te respondemos con una ruta clara, sin propuestas genéricas ni una solución definida de antemano.</p>
        <div className="cta-actions">
          <Link href="/contacto" className="btn-dark">Evaluar mi proyecto</Link>
        </div>
      </section>
    </main>
  );
}
