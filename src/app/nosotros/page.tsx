import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { RouteHero } from "@/components/site/RouteHero";
import { aboutValues, founders, teamGallery } from "@/data/institutional";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Nosotros",
  description: "Conoce por qué existe Código Startup, cómo trabaja el equipo y qué productos digitales ha construido.",
  path: "/nosotros",
});

export default function AboutPage() {
  const clientProjects = projects.filter(({ kind }) => kind === "client");
  const ownProduct = projects.find(({ kind }) => kind === "own-product");

  if (!ownProduct) throw new Error("La página Nosotros requiere un producto propio configurado");

  return (
    <main className="architecture-page about-page">
      <RouteHero
        eyebrow="Nosotros"
        title="Construimos porque también somos emprendedores"
        description="Somos el equipo técnico que ejecuta contigo: desarrollo, estrategia y diseño para emprendedores, startups y empresas que necesitan avanzar."
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Nosotros" }]}
        actions={<a href="#quienes-somos" className="btn-primary">Conocer Código Startup ↓</a>}
      />

      <section id="quienes-somos" className="about-intro" aria-labelledby="about-intro-heading">
        <div className="service-page-container about-intro-grid">
          <div>
            <span className="about-statement-index">01 / QUIÉNES SOMOS</span>
            <h2 id="about-intro-heading">Estrategia y ejecución en el mismo equipo.</h2>
          </div>
          <div className="about-intro-copy">
            <p>Código Startup es un equipo técnico que acompaña decisiones de producto y las lleva a una solución funcional. El trabajo no termina en una recomendación: diseñamos, construimos, lanzamos y ayudamos a definir cómo continuar.</p>
            <p>Existimos para reducir la distancia entre una necesidad del negocio y un producto digital que las personas puedan usar. Por eso partimos por entender el problema antes de elegir una tecnología o fijar una solución.</p>
          </div>
        </div>
      </section>

      <section className="service-content-section service-content-section--tinted" aria-labelledby="about-problems-heading">
        <div className="service-page-container">
          <SectionHeader
            eyebrow="Qué resolvemos"
            title="Problemas distintos requieren rutas distintas"
            description="Trabajamos desde la necesidad y la etapa del negocio para definir qué conviene construir, automatizar o mejorar."
            headingId="about-problems-heading"
          />
          <div className="about-needs-grid">
            <Link href="/soluciones#soluciones-por-necesidad" className="about-need-card">
              <span>01</span><h3>Atraer clientes</h3><p>Presencia digital profesional para explicar servicios, generar confianza y facilitar el contacto.</p>
            </Link>
            <Link href="/soluciones#soluciones-por-necesidad" className="about-need-card">
              <span>02</span><h3>Ordenar la operación</h3><p>Software y automatización para centralizar información y reemplazar tareas manuales.</p>
            </Link>
            <Link href="/soluciones#soluciones-por-necesidad" className="about-need-card">
              <span>03</span><h3>Lanzar un producto</h3><p>Una primera versión funcional o una aplicación preparada para sus usuarios.</p>
            </Link>
            <Link href="/soluciones#soluciones-por-necesidad" className="about-need-card">
              <span>04</span><h3>Evolucionar un sistema</h3><p>Diagnóstico y mejoras para sistemas que necesitan seguridad, claridad o una base más mantenible.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="about-team-section" aria-labelledby="about-team-heading">
        <div className="service-page-container">
          <SectionHeader
            eyebrow="El equipo"
            title="Personas que conectan negocio, experiencia y tecnología"
            description="El trabajo combina estrategia, UX/UI, contenido, desarrollo, arquitectura, seguridad y evolución de producto según lo que cada proyecto necesita."
            headingId="about-team-heading"
          />
          <div className="founders-grid">
            {founders.map((founder) => (
              <div key={founder.name} className="founder-card">
                <div className="founder-photo">
                  <Image src={founder.image.src} alt={founder.image.alt} fill sizes="64px" />
                </div>
                <div className="founder-info">
                  <span className="founder-name">{founder.name}</span>
                  <span className="founder-role">{founder.role}</span>
                  <p className="founder-bio">{founder.bio}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="about-team-gallery">
            {teamGallery.map((image, index) => (
              <figure
                key={image.src}
                className={`about-team-photo about-team-photo--${(index % 8) + 1}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 680px) 45vw, (max-width: 1080px) 30vw, 18vw"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="service-content-section" aria-labelledby="about-experience-heading">
        <div className="service-page-container">
          <SectionHeader
            eyebrow="Experiencia relevante"
            title="Productos construidos para necesidades reales"
            description="La experiencia publicada se presenta mediante los proyectos disponibles, sin agregar cifras ni resultados que no estén verificados."
            headingId="about-experience-heading"
          />
          <div className="project-card-grid">
            {clientProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
        </div>
      </section>

      <section className="about-process-section" aria-labelledby="about-process-heading">
        <div className="service-page-container about-process-grid">
          <div>
            <SectionHeader
              eyebrow="Forma de trabajar"
              title="Sin caja negra entre el problema y el producto"
              description="Diagnóstico antes de construir, alcance y precio claros, entregas semanales, decisiones explicadas, documentación y traspaso."
              headingId="about-process-heading"
            />
            <Link href="/proceso" className="home-text-link">Conocer el proceso completo →</Link>
          </div>
          <ol className="about-principles-list">
            <li><span>01</span><strong>Diagnóstico antes de construir</strong></li>
            <li><span>02</span><strong>Alcance y responsabilidades claras</strong></li>
            <li><span>03</span><strong>Avances y entregas semanales</strong></li>
            <li><span>04</span><strong>Documentación y traspaso</strong></li>
          </ol>
        </div>
      </section>

      <section className="about-product-section" aria-labelledby="about-product-heading">
        <div className="service-page-container about-product-grid">
          <div>
            <SectionHeader
              eyebrow="Producto propio"
              title="También aprendemos construyendo y operando"
              description="Núcleo Gestor se presenta como producto propio, no como un proyecto de cliente. Construir una plataforma propia permite aplicar ese aprendizaje directamente en otros productos digitales."
              headingId="about-product-heading"
            />
          </div>
          <ProjectCard project={ownProduct} colorLogo />
        </div>
      </section>

      <section className="service-content-section" aria-labelledby="about-values-heading">
        <div className="service-page-container">
          <SectionHeader eyebrow="Valores" title="Principios que se ven en el proceso" headingId="about-values-heading" />
          <div className="service-editorial-grid about-values-grid">
            {aboutValues.map((value, index) => (
              <article key={value.title} className="service-editorial-card">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-cta" aria-labelledby="about-cta-heading">
        <div className="service-cta-orbit" aria-hidden="true" />
        <div className="service-page-container service-cta-inner">
          <span className="service-cta-label">Conversemos</span>
          <h2 id="about-cta-heading">Cuéntanos qué proyecto necesitas resolver</h2>
          <p>Revisamos tu situación para definir una ruta clara antes de proponer qué construir.</p>
          <Link href="/contacto?origen=nosotros" prefetch={false} className="btn-dark">Evaluar mi proyecto <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
