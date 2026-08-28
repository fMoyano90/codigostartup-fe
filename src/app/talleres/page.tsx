import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  Laptop,
  Mail,
  MessageCircle,
} from "lucide-react";
import { TalleresCatalogo } from "@/components/talleres/TalleresCatalogo";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { talleres } from "@/data/talleres";
import { createPageMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/seo/structured-data";

const META = {
  title: "Talleres de IA Aplicada para empresas",
  description:
    "Nueve talleres 100% prácticos para llevar la inteligencia artificial a los procesos reales de tu organización. Presencial in-company u online en vivo, con certificado por participante.",
};

export const metadata: Metadata = createPageMetadata({
  title: META.title,
  description: META.description,
  path: "/talleres",
});

function whatsappUrl(mensaje: string): string {
  return `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(mensaje)}`;
}

const WHATSAPP_MENSAJE =
  "Hola Código Startup, quiero información de los Talleres de IA Aplicada para mi empresa u organización.";

const formatos = [
  { formato: "Jornada completa", distribucion: "1 día · 8 h con pausas" },
  { formato: "Doble media jornada", distribucion: "2 × 4 h" },
  { formato: "Sesiones semanales", distribucion: "4 × 2 h" },
  { formato: "Videos UGC (4 h)", distribucion: "1 × 4 h · media jornada" },
];

const faqs = [
  {
    question: "¿Qué alcance tiene cada taller?",
    answer:
      "Cada taller es 100% práctico y se adapta a los procesos reales de la organización: los ejemplos y ejercicios se preparan con el contexto del cliente (industria, minería, comercio, servicios). No se comparte ni procesa información sensible de la empresa fuera de los acuerdos de confidencialidad que se establezcan.",
  },
  {
    question: "¿Qué requisitos deben cumplir los participantes?",
    answer:
      "Computador con conexión a internet y, en modalidad online, cámara y micrófono. No se requieren conocimientos previos de inteligencia artificial: los talleres parten desde cero y avanzan con ejercicios guiados.",
  },
  {
    question: "¿Cuánto duran los talleres?",
    answer:
      "Videos UGC con IA para emprendedores dura 4 horas. Los otros 8 talleres duran 8 horas cada uno, y pueden organizarse en jornada completa, doble media jornada o sesiones semanales según la operación del cliente.",
  },
  {
    question: "¿En qué modalidad se dictan?",
    answer:
      "Presencial in-company (el relator se traslada a las instalaciones del cliente, ideal para faenas e industrias) u online en vivo por videoconferencia con ejercicios en tiempo real.",
  },
  {
    question: "¿Cómo se evalúa a los participantes?",
    answer:
      "Cada participante completa ejercicios prácticos verificables durante la sesión y un entregable final según el taller (por ejemplo, un video listo para publicar o una automatización diseñada).",
  },
  {
    question: "¿Entregan certificación?",
    answer:
      "Sí. Cada participante que complete la evaluación recibe un certificado de participación de Código Startup con el nombre del taller, las horas y la fecha.",
  },
  {
    question: "¿Cómo solicitamos más información?",
    answer:
      "Escríbenos por WhatsApp al +56 9 6607 3259 o a hola@codigostartup.com. Coordinamos una reunión breve para definir talleres, modalidad, fechas y resolver dudas.",
  },
];

export default function TalleresPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Inicio", url: siteConfig.baseUrl },
    { name: "Talleres de IA Aplicada", url: `${siteConfig.baseUrl}/talleres` },
  ]);

  return (
    <main className="talleres-page">
      <JsonLd data={breadcrumb} />
      <JsonLd data={buildFaqPageSchema(faqs)} />

      {/* HERO */}
      <section className="talleres-hero" aria-labelledby="talleres-hero-title">
        <Image
          src="/images/imagen-hero-talleres.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
          className="talleres-hero-img"
        />
        <div className="talleres-hero-inner">
          <div className="talleres-hero-copy">
            <h1 id="talleres-hero-title" className="talleres-hero-title">
              Capacita a tu equipo
              <br />
              con <span className="accent">IA</span>{" "}
              <span className="accent--volt">aplicada</span>
            </h1>
            <p className="talleres-hero-lead">
              Nueve talleres <strong>100% prácticos</strong> para llevar la inteligencia artificial a los procesos
              reales de tu organización. Presencial in-company u online en vivo, con certificado por participante.
            </p>
            <div className="talleres-hero-actions">
              <a className="btn-primary" href={whatsappUrl(WHATSAPP_MENSAJE)} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={16} />
                Solicitar información
              </a>
              <a className="talleres-cta talleres-cta--ghost" href="#catalogo">
                Explorar los talleres
                <ArrowRight size={16} />
              </a>
            </div>
            <p className="talleres-hero-note">
              Para empresas · Cupos de 8 a 20 participantes · Sin conocimientos previos
            </p>
          </div>
        </div>
      </section>

      {/* CATÁLOGO CON FILTRO */}
      <section id="catalogo" className="talleres-section talleres-section--soft" aria-labelledby="catalogo-title">
        <div className="talleres-section-inner">
          <header className="talleres-section-head">
            <p className="talleres-eyebrow talleres-eyebrow--center">Catálogo</p>
            <h2 id="catalogo-title" className="talleres-section-title">
              Nueve talleres, una <span className="accent">metodología</span>
            </h2>
            <p className="talleres-section-lead">
              Elige el área que quieres fortalecer. Cada taller se adapta al rubro, los procesos y el nivel de tu
              equipo.
            </p>
          </header>
          <TalleresCatalogo talleres={talleres} />
        </div>
      </section>

      {/* MODALIDADES Y FORMATOS */}
      <section className="talleres-section" aria-labelledby="modalidades-title">
        <div className="talleres-section-inner">
          <header className="talleres-section-head">
            <p className="talleres-eyebrow talleres-eyebrow--center">Modalidades y formatos</p>
            <h2 id="modalidades-title" className="talleres-section-title">
              Como trabaja tu equipo, <span className="accent">así lo dictamos</span>
            </h2>
            <p className="talleres-section-lead">
              Dos modalidades de dictación y tres formatos de jornada para los talleres de 8 horas, más un formato
              estándar para el taller de videos con IA.
            </p>
          </header>
          <div className="talleres-mods-grid">
            <article className="talleres-mod-card">
              <span className="talleres-card-icon">
                <Building2 />
              </span>
              <h3>Presencial in-company</h3>
              <p>
                El relator se traslada a las instalaciones del cliente. Requiere sala con proyector o pantalla,
                internet y un computador por participante (o uno cada dos). Ideal para faenas e industrias.
              </p>
            </article>
            <article className="talleres-mod-card">
              <span className="talleres-card-icon talleres-card-icon--volt">
                <Laptop />
              </span>
              <h3>Online en vivo</h3>
              <p>
                Sesión por videoconferencia con ejercicios en tiempo real. Requiere computador con internet, cámara y
                micrófono. Incluye seguimiento práctico durante la sesión.
              </p>
            </article>
          </div>
          <div className="talleres-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Formato</th>
                  <th>Distribución</th>
                </tr>
              </thead>
              <tbody>
                {formatos.map((fila) => (
                  <tr key={fila.formato}>
                    <td>
                      <b>{fila.formato}</b>
                    </td>
                    <td>{fila.distribucion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="talleres-section" aria-labelledby="faq-title">
        <div className="talleres-section-inner">
          <header className="talleres-section-head">
            <p className="talleres-eyebrow talleres-eyebrow--center">Preguntas frecuentes</p>
            <h2 id="faq-title" className="talleres-section-title">
              Resolvemos tus <span className="accent">dudas</span>
            </h2>
          </header>
          <div className="talleres-faq-list">
            {faqs.map((faq) => (
              <details key={faq.question} className="talleres-faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-root">
        <p className="cta-label">Talleres de IA Aplicada · Código Startup</p>
        <h2 className="cta-title">
          Llevemos la IA aplicada
          <br />
          a tu equipo
        </h2>
        <p className="cta-desc">
          Cuéntanos el contexto de tu organización y armamos una propuesta de talleres a tu medida: modalidad,
          formato, fechas y contenido adaptado a tu rubro.
        </p>
        <div className="cta-actions">
          <a className="btn-dark" href={whatsappUrl(WHATSAPP_MENSAJE)} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={16} />
            Escribir por WhatsApp
          </a>
          <a className="btn-ghost" href={`mailto:${siteConfig.contact.email}`}>
            <Mail size={16} />
            {siteConfig.contact.email}
          </a>
        </div>
      </section>
    </main>
  );
}