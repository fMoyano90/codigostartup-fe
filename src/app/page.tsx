import LogoLoop from '@/components/LogoLoop'
import Magnet from '@/components/Magnet'
import HomeAnimations from '@/components/HomeAnimations'
import {
  homeClientProjects as clientCases,
  homeOwnProduct,
  homeServiceGroups as services,
  processSteps as steps,
  siteConfig,
  techLogos,
} from '@/data/commercial'

export default function Home() {
  return (
    <main className="home">
      <HomeAnimations />

      {/* ── NAV ── */}
      <nav id="main-nav" className="nav-root">
        <a href="#hero" className="nav-logo">
          <img src="/logo.svg" alt="Codigo Startup" className="nav-logo-img" />
        </a>
        <div className="nav-links">
          <a href="#servicios" className="nav-link">Servicios</a>
          <a href="#portafolio" className="nav-link">Portafolio</a>
          <a href="#proceso" className="nav-link">Proceso</a>
        </div>
        <a href={siteConfig.contact.whatsappUrl} target="_blank" rel="noreferrer" className="nav-cta">Hablemos</a>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="hero-root">
        <img src="/isotipo-blanco.svg" className="hero-watermark" aria-hidden="true" alt="" />

        <div className="hero-inner">
          <div className="hero-eyebrow fadein fadein-d1">
            Desarrollo · Estrategia · Diseño
          </div>

          <div className="hero-title-area">
            <h1 className="hero-title">
              <span className="reveal-wrap">
                <span className="reveal reveal-d1">CONSTRUIMOS</span>
              </span>
              <span className="reveal-wrap">
                <span className="reveal reveal-d2">PRODUCTOS</span>
              </span>
              <span className="reveal-wrap">
                <span className="reveal reveal-d3">
                  QUE <span className="accent">PERDURAN.</span>
                </span>
              </span>
            </h1>
          </div>

          <div className="hero-bottom">
            <p className="hero-desc fadein fadein-d2">
              Somos el
              equipo técnico que ejecuta contigo: desarrollo, estrategia
              y diseño para emprendedores, startups y empresas que
              necesitan avanzar.
            </p>
            <div className="hero-actions fadein fadein-d3">
              <a href={siteConfig.contact.whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary">
                Cuéntanos tu proyecto →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="servicios" className="section-wrap">
        <div className="container">
          <div className="services-header">
            <div className="services-header-left">
              <div className="section-tag">Servicios</div>
              <h2 className="section-title">
                <span className="title-word">DESARROLLO<span className="accent">,</span></span><br />
                <span className="title-word">ESTRATEGIA</span><br />
                <span className="title-word">Y</span>{' '}
                <span className="title-word">DISEÑO<span className="accent">.</span></span>
              </h2>
              <p className="services-header-text">
                Tres líneas de servicio pensadas para ayudarte a
                avanzar con foco, criterio y soluciones que aporten valor a tu negocio.
              </p>
            </div>
            <div className="tech-loop-wrap">
              <LogoLoop
                logos={techLogos}
                direction="left"
                speed={55}
                logoHeight={52}
                gap={56}
                hoverSpeed={0}
                fadeOut
                fadeOutColor="#0a0a0a"
                ariaLabel="Tecnologías que usamos"
              />
            </div>
          </div>
        </div>
        <div className="service-grid" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {services.map((s, i) => (
            <article key={s.name} className="service-card">
              <div className="service-category text-[#efc459]">{s.category}</div>
              <h3 className="service-name">{s.name}</h3>
              <hr className="service-divider" />
              <p className="service-desc">{s.description}</p>
              <div className="service-tags">
                {s.tags.map((tag) => (
                  <span key={tag} className="service-tag">{tag}</span>
                ))}
              </div>
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className={`service-link ${i === 1 ? 'service-link--center' : 'service-link--outer'}`}
              >{s.cta}</a>
            </article>
          ))}
        </div>
      </section>

      {/* ── LABORATORIO DE IDEAS ── */}
      <section id="nucleo" className="lab-root">
        <div className="lab-inner">
          <div className="lab-content">
            <div className="lab-text">
              <div className="section-tag">Laboratorio de Ideas</div>
              <h2 className="lab-title">
                <span className="title-word">CONSTRUIMOS PORQUE</span><br />
                <span className="title-word">SOMOS COMO TÚ<span className="accent">:</span></span><br />
                <span className="title-word">EMPRENDEDORES<span className="accent">.</span></span>
              </h2>
              <p className="lab-desc">
                Construir y operar nuestra propia plataformas SAAS nos permite entender tu camino.
                Todo lo aprendido en casa se traduce en beneficios directos para que tu proyecto
                sea seguro y sólido desde el primer día.
              </p>
            </div>

            <div className="lab-card-flip-wrap">
              <div className="lab-card-flip-inner">

                {/* ── FRONT ── */}
                <div className="lab-card lab-card-front">
                  <div className="lab-card-title-row">
                    <img src={homeOwnProduct.logo} alt={homeOwnProduct.name} className="lab-card-logo-oficial" />
                  </div>
                  <p className="lab-card-desc">
                    {homeOwnProduct.description}
                  </p>
                  <div className="lab-card-metrics">
                    {homeOwnProduct.metrics.map((metric) => (
                      <div key={metric.label} className="lab-card-metric">
                        <span className="lab-card-metric-val">{metric.val}</span>
                        <span className="lab-card-metric-label">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="lab-card-footer">
                    <img src="/chrysalis-logo.png" alt="Chrysalis PUCV" className="lab-card-chrysalis" />
                  </div>
                </div>

                {/* ── BACK ── */}
                <div className="lab-card lab-card-back">
                  <div className="lab-card-back-clip">
                    <img src="/Adobe Express - file (21).png" alt="Mockup Núcleo Gestor" className="lab-card-back-img" />
                    <div className="lab-card-back-overlay" />
                  </div>
                  <div className="lab-card-back-body">
                    <div className="lab-card-back-header">
                      <img src={homeOwnProduct.logo} alt={homeOwnProduct.name} className="lab-card-logo-oficial" />
                    </div>
                    <p className="lab-card-back-sub">{homeOwnProduct.homeCard.description}</p>
                    <a href={homeOwnProduct.externalUrl} target="_blank" rel="noreferrer" className="lab-card-back-cta">
                      {homeOwnProduct.homeCard.ctaLabel}
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT CASES / PORTAFOLIO ── */}
      <section id="portafolio" className="section-wrap">
        <div className="container">
          <div className="portfolio-header">
            <div className="portfolio-header-left">
              <div className="section-tag">Casos de éxito</div>
              <h2 className="section-title">
                <span className="title-word">CONSTRUIDO<span className="accent">.</span></span><br />
                <span className="title-word">LANZADO<span className="accent">.</span></span><br />
                <span className="title-word">OPERANDO<span className="accent">.</span></span>
              </h2>
              <p className="portfolio-header-text">
                Tres productos reales en producción, con clientes activos
                que los usan todos los días.
              </p>
            </div>
            <div className="portfolio-client-logos">
              {clientCases.map((c) => c.logo && (
                <img
                  key={c.name}
                  src={c.logo}
                  alt={`Logo ${c.name}`}
                  className="portfolio-client-logo w-44 h-auto"
                />
              ))}
            </div>
          </div>
          <div className="portfolio-grid">
            {clientCases.map((c) => (
              <article key={c.name} className="portfolio-card">
                <span className="portfolio-sector">{c.sector}</span>
                <h3 className="portfolio-name">{c.name}</h3>
                <p className="portfolio-desc">{c.description}</p>
                <div className="portfolio-testimonial">
                  <p className="portfolio-testimonial-quote">{c.testimonial.quote}</p>
                  <span className="portfolio-testimonial-author">{c.testimonial.author}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="proceso" className="section-wrap process-section">
        <div className="container">
          <div className="process-header">
            <div className="section-tag">Proceso</div>
            <h2 className="section-title">
              SIN SECRETOS<span className="accent">:</span><br />
              ASÍ CONSTRUIMOS<span className="accent">.</span>
            </h2>
            <p className="process-desc-text">
              Aquí trabajamos con las puertas abiertas para que siempre sepas en qué estamos, qué sigue y por qué.
            </p>
          </div>
        </div>
        <div className="process-grid">
          {steps.map((s) => (
            <div key={s.n} className="process-step">
              <div className="process-step-header">
                <span className="process-n">{s.n}</span>
                <h3 className="process-title">{s.title}</h3>
              </div>
              <p className="process-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" className="cta-root">
        <div className="cta-label">Siguiente paso</div>
        <h2 className="cta-title">
          HABLEMOS.<br />EL RESTO LO<br />RESOLVEMOS.
        </h2>
        <p className="cta-desc">
          Cuéntanos qué necesitas y te respondemos con claridad: qué
          haríamos, en cuánto tiempo y a qué precio. Sin propuestas
          genéricas ni reuniones que no llevan a nada. Aceptamos
          Transbank y tenemos facilidades de pago.
        </p>
        <div className="cta-actions">
          <Magnet padding={60} magnetStrength={4}>
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-dark"
            >
              Agendar reunión →
            </a>
          </Magnet>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer-root">
        <p className="footer-text">
          © 2026 Codigo Startup — Desarrollo, estrategia y diseño para
          emprendedores, startups y empresas.
        </p>
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="footer-email"
        >
          {siteConfig.contact.email}
        </a>
      </footer>

    </main>
  )
}
