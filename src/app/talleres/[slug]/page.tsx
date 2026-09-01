import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  Award,
  CalendarDays,
  Check,
  ImagePlus,
  MessagesSquare,
  ShieldCheck,
} from "lucide-react";
import { submitLead } from "@/app/actions/submit-lead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImagenSlot } from "@/components/talleres/ImagenSlot";
import { TallerLeadForm, type LeadFormField } from "@/components/talleres/TallerLeadForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { talleres } from "@/data/talleres";
import { createPageMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/structured-data";
import { tallerFichaConfig } from "./taller-page-config";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return talleres.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const taller = talleres.find((item) => item.slug === slug);
  if (!taller) return {};
  return createPageMetadata({
    title: taller.seo.title.replace(new RegExp(`\\s*\\|\\s*${siteConfig.name}\\s*$`), ""),
    description: taller.seo.description,
    path: `/talleres/${taller.slug}`,
  });
}

function whatsappUrl(mensaje: string): string {
  return `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(mensaje)}`;
}

function minutosALegible(minutos: number): string {
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  if (resto === 0) return `${horas} h`;
  return `${horas} h ${resto} min`;
}

const leadFields: LeadFormField[] = [
  { name: "name", label: "Nombre", type: "text", required: true, autoComplete: "name" },
  { name: "company", label: "Empresa", type: "text", autoComplete: "organization" },
  { name: "email", label: "Correo", type: "email", required: true, autoComplete: "email" },
  { name: "whatsapp", label: "WhatsApp", type: "tel", autoComplete: "tel", placeholder: "+56 9" },
  {
    name: "description",
    label: "¿En qué te ayudamos?",
    type: "textarea",
    required: true,
    rows: 4,
    placeholder: "Ej.: dudas sobre el taller, fechas, precios, lo que necesites consultar.",
  },
];

export default async function TallerRoutePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const taller = talleres.find((item) => item.slug === slug);
  if (!taller) notFound();

  const config = tallerFichaConfig[taller.slug];
  const esBorrador = taller.estado === "borrador";
  const minutosTotales = taller.modulos.reduce((acc, modulo) => acc + modulo.minutos, 0);
  const whatsappMensaje = `Quiero información del taller "${taller.titulo}".`;
  const sectionId = `${taller.slug}-solicitar-info`;

  const breadcrumb = buildBreadcrumbSchema([
    { name: "Inicio", url: siteConfig.baseUrl },
    { name: "Talleres de IA Aplicada", url: `${siteConfig.baseUrl}/talleres` },
    { name: taller.titulo, url: `${siteConfig.baseUrl}/talleres/${taller.slug}` },
  ]);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: taller.titulo,
    description: taller.resumen,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.baseUrl,
    },
    offers: {
      "@type": "Offer",
      category: "Capacitación in-company",
      availability: "https://schema.org/InStock",
    },
  };

  const chips = [
    { label: "Duración", value: `${taller.duracionHoras} h` },
    { label: "Nivel", value: "Inicial" },
    { label: "Modalidad", value: "Presencial · Online" },
    { label: "Certificado", value: "Por participante" },
  ];

  const stats = taller.modulos.length > 0
    ? [
        { num: String(taller.modulos.length), lab: "Bloques de programa" },
        { num: String(minutosTotales), lab: "Minutos de práctica guiada" },
        { num: String(taller.resultados.length), lab: "Resultados concretos" },
        { num: "1", lab: "Video listo para publicar" },
      ]
    : [];

  const breadcrumbNav = (
    <Breadcrumbs
      items={[
        { label: "Inicio", href: "/" },
        { label: "Talleres", href: "/talleres" },
        { label: taller.titulo },
      ]}
    />
  );

  return (
    <main className="talleres-page talleres-ficha">
      <JsonLd data={breadcrumb} />
      <JsonLd data={courseSchema} />

      {/* HERO: banner ancho + título + CTA (formato UANDES) */}
      {config.heroImage ? (
        <section className="talleres-ficha-hero talleres-ficha-hero--dark" aria-labelledby="ficha-titulo">
          <Image
            src={config.heroImage}
            alt=""
            fill
            sizes="100vw"
            priority
            className="talleres-ficha-hero-img"
          />
          {breadcrumbNav}
          <div className="talleres-ficha-hero-inner">
            <p className="talleres-eyebrow talleres-eyebrow--center">{config.heroEyebrow}</p>
            <h1 id="ficha-titulo" className="talleres-ficha-title">
              {taller.titulo}
            </h1>
            <p className="talleres-ficha-lead">
              <strong>{taller.resumen}</strong>
            </p>
            <div className="talleres-ficha-actions">
              <a className="talleres-cta talleres-cta--violet" href={whatsappUrl(whatsappMensaje)} target="_blank" rel="noopener noreferrer">
                <MessagesSquare size={16} />
                Hablar por WhatsApp
              </a>
              <a className="talleres-cta" href={siteConfig.contact.bookingUrl} target="_blank" rel="noopener noreferrer">
                <CalendarDays size={16} />
                Agendar reunión
              </a>
            </div>
            <div className="talleres-ficha-chips">
              <div className="talleres-chips">
                {chips.map((chip) => (
                  <div key={chip.label} className="talleres-chip">
                    <span className="talleres-chip-label">{chip.label}</span>
                    <span className="talleres-chip-value">{chip.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {breadcrumbNav}
          <section className="talleres-ficha-banner" aria-label="Imagen del taller">
            <ImagenSlot archivo={`${taller.slug}.jpg`} ratio="21/9" />
          </section>

          <section className="talleres-ficha-hero" aria-labelledby="ficha-titulo">
            <p className="talleres-eyebrow talleres-eyebrow--center">{config.heroEyebrow}</p>
            <h1 id="ficha-titulo" className="talleres-ficha-title">
              {taller.titulo}
            </h1>
            <p className="talleres-ficha-lead">
              <strong>{taller.resumen}</strong>
            </p>
            <div className="talleres-ficha-actions">
              <a className="talleres-cta talleres-cta--violet" href={whatsappUrl(whatsappMensaje)} target="_blank" rel="noopener noreferrer">
                <MessagesSquare size={16} />
                Hablar por WhatsApp
              </a>
              <a className="talleres-cta" href={siteConfig.contact.bookingUrl} target="_blank" rel="noopener noreferrer">
                <CalendarDays size={16} />
                Agendar reunión
              </a>
            </div>

            <div className="talleres-ficha-chips">
              <div className="talleres-chips">
                {chips.map((chip) => (
                  <div key={chip.label} className="talleres-chip">
                    <span className="talleres-chip-label">{chip.label}</span>
                    <span className="talleres-chip-value">{chip.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ASÍ SE APRENDE */}
      <section className="talleres-section talleres-section--soft" aria-labelledby="ficha-pilares-title">
        <div className="talleres-section-inner">
          <header className="talleres-section-head">
            <p className="talleres-eyebrow talleres-eyebrow--center">Tu desarrollo</p>
            <h2 id="ficha-pilares-title" className="talleres-section-title">
              Así se aprende <span className="accent">en el taller</span>
            </h2>
          </header>
          <div className="talleres-grid-3">
            {config.pilares.map((pilar, index) => (
              <article key={pilar.title} className="talleres-card">
                <span className={`talleres-card-icon ${index % 2 === 1 ? "talleres-card-icon--volt" : ""}`}>
                  <pilar.icon />
                </span>
                <h3>{pilar.title}</h3>
                <p>{pilar.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DESCRIPCIÓN */}
      <section className="talleres-section" aria-labelledby="ficha-descripcion-title">
        <div className="talleres-section-inner talleres-split">
          <div className="talleres-split-copy">
            <p className="talleres-eyebrow">Talleres de IA Aplicada</p>
            <h2 id="ficha-descripcion-title" className="talleres-section-title">
              Sobre <span className="accent">el taller</span>
            </h2>
            <p>{taller.descripcion}</p>
            <p>
              <strong>Objetivo:</strong> {taller.objetivoGeneral}
            </p>
          </div>
          <div className="talleres-split-media">
            <Image
              src="/talleres/sobre-el-taller.jpg"
              alt="Participante trabajando en el taller de IA aplicada"
              width={800}
              height={600}
              className="talleres-img"
            />
          </div>
        </div>
      </section>

      {/* EL PROGRAMA EN NÚMEROS + PROGRAMA */}
      {taller.modulos.length > 0 && (
        <section className="talleres-section talleres-section--soft" aria-labelledby="ficha-programa-title">
          <div className="talleres-section-inner">
            <header className="talleres-section-head">
              <p className="talleres-eyebrow talleres-eyebrow--center">El programa en números</p>
              <h2 id="ficha-programa-title" className="talleres-section-title">
                Una ruta clara en <span className="accent">{minutosALegible(minutosTotales)}</span>
              </h2>
              <p className="talleres-section-lead">
                La metodología utiliza un solo proyecto transversal: cada participante parte con una idea comercial y la
                lleva hasta el video terminado.
              </p>
            </header>

            <div className="talleres-stats">
              {stats.map((stat) => (
                <div key={stat.lab} className="talleres-stat">
                  <span className="num">{stat.num}</span>
                  <span className="lab">{stat.lab}</span>
                </div>
              ))}
            </div>

            <div className="talleres-table-wrap" style={{ marginTop: "2rem" }}>
              <table>
                <thead>
                  <tr>
                    <th>Bloque</th>
                    <th>Contenido</th>
                    <th>Duración</th>
                  </tr>
                </thead>
                <tbody>
                  {taller.modulos.map((modulo, index) => (
                    <tr key={modulo.titulo}>
                      <td>
                        <b>
                          {index + 1}. {modulo.titulo}
                        </b>
                      </td>
                      <td>{modulo.contenido?.join(" · ") ?? ""}</td>
                      <td>{modulo.minutos} min</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="talleres-modulos talleres-modulos--mobile">
              {taller.modulos.map((modulo, index) => (
                <div key={modulo.titulo} className="talleres-modulo">
                  <div className="talleres-modulo-head">
                    <b>{index + 1}. {modulo.titulo}</b>
                    <span className="min">{modulo.minutos} min</span>
                  </div>
                  <ol>
                    {modulo.contenido?.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ¿QUÉ NOS DESTACA? (solo talleres aprobados) */}
      {config.razones.length > 0 && (
        <section className="talleres-section" aria-labelledby="ficha-razones-title">
          <div className="talleres-section-inner">
            <header className="talleres-section-head">
              <p className="talleres-eyebrow talleres-eyebrow--center">¿Qué nos destaca?</p>
              <h2 id="ficha-razones-title" className="talleres-section-title">
                Por qué elegir este <span className="accent">taller</span>
              </h2>
            </header>
            <div className="talleres-grid-3">
              {config.razones.map((razon, index) => (
                <article key={razon.title} className="talleres-card">
                  <span className={`talleres-card-icon ${index % 2 === 1 ? "talleres-card-icon--volt" : ""}`}>
                    <razon.icon />
                  </span>
                  <div className="talleres-card-body">
                    <h3>{razon.title}</h3>
                    <p>{razon.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ASÍ SE VIVE EL TALLER */}
      <section className="talleres-section talleres-section--soft" aria-labelledby="ficha-vivencia-title">
        <div className="talleres-section-inner talleres-split talleres-split--reverse">
          <div className="talleres-split-copy">
            <p className="talleres-eyebrow">La experiencia</p>
            <h2 id="ficha-vivencia-title" className="talleres-section-title">
              Cómo funciona <span className="accent">el taller</span>
            </h2>
            <p>
              <strong>Metodología:</strong> {taller.metodologia}
            </p>
            <p>
              <strong>Evaluación:</strong> {taller.evaluacion}
            </p>
            <ul className="talleres-check-list">
              <li>
                <span className="tick"><Check /></span>
                <span><b>Entregable:</b> {taller.entregable}</span>
              </li>
              <li>
                <span className="tick"><ShieldCheck /></span>
                <span><b>Ciberseguridad:</b> módulo de qué información NO poner en una IA pública</span>
              </li>
              <li>
                <span className="tick"><Award /></span>
                <span><b>Certificado:</b> de participación por cada participante</span>
              </li>
            </ul>
          </div>
          <div className="talleres-split-media">
            {taller.slug === "videos-ugc-con-ia" ? (
              <Image
                src="/images/nuestro-metodo.jpg"
                alt="Recorrido del taller: de la idea comercial al video listo para publicar"
                width={1448}
                height={1086}
                className="talleres-img talleres-img--flat"
              />
            ) : (
              <ImagenSlot archivo={`${taller.slug}-sesion.jpg`} ratio="4/3" />
            )}
          </div>
        </div>
      </section>

      {/* RESULTADOS CONCRETOS */}
      {taller.resultados.length > 0 && (
        <section className="talleres-section" aria-labelledby="ficha-resultados-title">
          <div className="talleres-section-inner">
            <header className="talleres-section-head">
              <p className="talleres-eyebrow talleres-eyebrow--center">Resultados concretos</p>
              <h2 id="ficha-resultados-title" className="talleres-section-title">
                Sales con <span className="accent">algo hecho</span>
              </h2>
            </header>
            <ul className="talleres-results-pills">
              {taller.resultados.map((resultado) => (
                <li key={resultado}>
                  <span className="talleres-results-pills-check"><Check /></span>
                  {resultado}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* REQUISITOS Y HERRAMIENTAS */}
      <section className="talleres-section talleres-section--soft" aria-labelledby="ficha-datos-title">
        <div className="talleres-section-inner">
          <header className="talleres-section-head">
            <p className="talleres-eyebrow talleres-eyebrow--center">Antes de empezar</p>
            <h2 id="ficha-datos-title" className="talleres-section-title">
              Requisitos y <span className="accent">herramientas</span>
            </h2>
          </header>
          <div className="talleres-datos">
            <article className="talleres-dato talleres-dato--col">
              <h3>¿Para quién?</h3>
              <p>{taller.publico}</p>
            </article>
            <article className="talleres-dato talleres-dato--col">
              <h3>Requisitos</h3>
              <p>{taller.requisitos}</p>
            </article>
            <article className="talleres-dato talleres-dato--side">
              <h3>Herramientas por etapa</h3>
              <p>Se priorizan herramientas simples, de acceso gratuito o de bajo costo.</p>
              {taller.herramientas && taller.herramientas.length > 0 ? (
                <ul className="talleres-ficha-list">
                  {taller.herramientas.map((herramienta) => (
                    <li key={herramienta}>{herramienta}</li>
                  ))}
                </ul>
              ) : (
                <ul className="talleres-ficha-list">
                  <li>Las herramientas específicas se ajustan al rubro y a los procesos del taller.</li>
                </ul>
              )}
            </article>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS (solo talleres aprobados) */}
      {!esBorrador && (
        <section className="talleres-section" aria-labelledby="ficha-testimonios-title">
          <div className="talleres-section-inner">
            <header className="talleres-section-head">
              <p className="talleres-eyebrow talleres-eyebrow--center">Resultados que se ven</p>
              <h2 id="ficha-testimonios-title" className="talleres-section-title">
                Lo que dicen los <span className="accent">participantes</span>
              </h2>
              <p className="talleres-section-lead">Pronto compartiremos experiencias reales de participantes y empresas.</p>
            </header>
            <div className="talleres-testimonios-grid">
              {[1, 2, 3].map((n) => (
                <article key={n} className="talleres-testimonio">
                  <span className="talleres-testimonio-foto">
                    <ImagePlus />
                  </span>
                  <blockquote>[Pendiente: testimonio real de un participante]</blockquote>
                  <span className="talleres-testimonio-author">[Pendiente: nombre y cargo]</span>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* AVISO EN PREPARACIÓN (borradores) */}
      {esBorrador && (
        <section className="talleres-section">
          <div className="talleres-section-inner">
            <div className="talleres-pendiente">
              <AlertTriangle size={20} />
              <p>
                <b>Ficha en preparación.</b> El detalle completo del programa estará disponible próximamente. Para conocer
                el contenido y los ejercicios de este taller, escríbenos por WhatsApp o a {siteConfig.contact.email}.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* FORMULARIO DE LEADS */}
      <TallerLeadForm
        taller={taller}
        fields={leadFields}
        action={submitLead}
        idPrefix={taller.slug}
        sectionId={sectionId}
        title="¿En qué te ayudamos?"
        description="Cuéntanos tu consulta o lo que necesitas, sobre este taller o cualquier otro tema: te respondemos con la información que necesitas."
      />

      {/* CTA FINAL */}
      <section className="cta-root">
        <p className="cta-label">Talleres de IA Aplicada · Código Startup</p>
        <h2 className="cta-title">
          Agendemos una
          <br />
          reunión
        </h2>
        <p className="cta-desc">
          Cuéntanos el contexto de tu organización y armamos una propuesta a tu medida: modalidad, formato, fechas y
          contenido adaptado a tu rubro.
        </p>
        <div className="cta-actions">
          <a className="btn-primary" href={siteConfig.contact.bookingUrl} target="_blank" rel="noopener noreferrer">
            <CalendarDays size={16} />
            Agendar reunión
          </a>
          <a className="btn-dark" href={whatsappUrl(whatsappMensaje)} target="_blank" rel="noopener noreferrer">
            <MessagesSquare size={16} />
            Hablar por WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}