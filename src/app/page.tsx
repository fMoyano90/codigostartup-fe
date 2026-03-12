import LogoLoop from '@/components/LogoLoop'
import Magnet from '@/components/Magnet'
import HomeAnimations from '@/components/HomeAnimations'

const techLogos = [
  { src: '/logos/github.png', alt: 'GitHub' },
  { src: '/logos/react.png', alt: 'React' },
  { src: '/logos/nextjs.png', alt: 'Next.js' },
  { src: '/logos/typescript.png', alt: 'TypeScript' },
  { src: '/logos/vercel.svg', alt: 'Vercel' },
  { src: '/logos/NestJS.svg', alt: 'NestJS' },
  { src: '/logos/docker.png', alt: 'Docker' },
  { src: '/logos/supabase.png', alt: 'Supabase' },
  { src: '/logos/figma.png', alt: 'Figma' },
  { src: '/logos/claude-color.png', alt: 'Claude AI' },
]

const services = [
  {
    category: 'Desarrollo',
    name: 'Construimos',
    description: 'Creamos soluciones digitales a tu medida, con código sólido, entregas semanales y un producto listo para crecer.',
    tags: ['Sitios web', 'Landing page', 'Tiendas Online', 'Apps web', 'Apps móviles', 'Software a medida', 'Prototipos'],
    cta: 'Quiero construir →',
  },
  {
    category: 'Estrategia',
    name: 'Optimizamos',
    description: 'Revisamos lo que ya tienes, encontramos los cuellos de botella y te decimos qué mejorar antes de que cueste más caro.',
    tags: ['Auditoría', 'Arquitectura', 'Seguridad', 'Asesorías/Consultorias Técnicas', 'Mejora de procesos', 'Roadmap'],
    cta: 'Quiero mejorar lo que tengo →',
  },
  {
    category: 'Diseño y Marca',
    name: 'Comunicamos',
    description: 'Diseñamos marcas y productos, unimos identidad y estrategia para que tu mensaje sea profesional y conecte con tus usuarios.',
    tags: ['Experiencia de Usuario', 'Identidad visual', 'Animación digital', 'Brochure y Graficas', 'Marketing y publicidad digital'],
    cta: 'Quiero comunicar mejor →',
  },
]

const steps = [
  {
    n: '01',
    title: 'Diagnóstico',
    desc: 'Escuchamos, preguntamos y entendemos dónde está el problema real antes de proponer cualquier solución.',
  },
  {
    n: '02',
    title: 'Ruta clara',
    desc: 'Alcance definido, tiempos reales y precio claro. Sin cotizaciones que dicen todo y no comprometen nada.',
  },
  {
    n: '03',
    title: 'Construcción',
    desc: 'Avances semanales, código real y decisiones explicadas. Siempre sabes qué se construyó, qué viene y por qué.',
  },
  {
    n: '04',
    title: 'Iteración',
    desc: 'Medimos, ajustamos y entregamos un producto que funciona en producción — con documentación y traspaso completo.',
  },
]

const clientCases = [
  {
    sector: 'Minería',
    name: 'SubTech',
    description: 'Monitoreo en tiempo real de maquinarias, vehículos y personas dentro de una mina, nivel por nivel. Visibilidad total de lo que ocurre bajo tierra.',
    hook: 'En una emergencia, en segundos sabes exactamente quién y qué activos están en el interior.',
    metrics: [
      { val: 'Real-time', label: 'Monitoreo' },
      { val: 'Industrial', label: 'Escala' },
      { val: 'Minería', label: 'Sector' },
    ],
    logo: '/SS_LOGO_WHITE.png',
    testimonial: {
      quote: 'Estoy muy contento con el trabajo de Código tanto en desarrollo como su modalidad de trabajo; ágil, limpia y eficaz. El trabajo por parte de Código nos ha permitido validar nuestro MVP, paso crucial para el desarrollo profesional de nuestra Startup.',
      author: 'Christian Solar, Gerente General',
    },
  },
  {
    sector: 'Fitness & Coaching',
    name: 'Entrena',
    description: 'Plataforma para coaches: gestión de alumnos, clases, seguimiento de progreso y evaluaciones de fuerza, movilidad y carga en un solo lugar.',
    hook: 'Cada sesión queda registrada. El progreso del alumno siempre visible, para el coach y para el atleta.',
    metrics: [
      { val: 'SaaS', label: 'Modelo' },
      { val: 'Multi-rol', label: 'Coach + Alumno' },
      { val: 'Fitness', label: 'Industria' },
    ],
    logo: '/logo-entrena-vip.png',
    testimonial: {
      quote: 'Trabajar con los chicos de código startup ha Sido un gran avance en mi proyecto como coach de entrenamiento debido a que con ellos mejoramos mi sistema completo a través de una app móvil exclusiva para mis alumnos y clientes.',
      author: 'Jaime Valero, Coach & Founder',
    },
  },
  {
    sector: 'Finanzas',
    name: 'NextDrill Admin',
    description: 'Panel financiero para empresas con múltiples centros de costo: caja proyectada, facturación integrada con SII y visibilidad total del flujo.',
    hook: 'Sabes exactamente cuánto entra, cuánto sale y cuánto tienes proyectado — sin una hoja de cálculo.',
    metrics: [
      { val: 'Multi-CC', label: 'Centros de costo' },
      { val: 'Proyectada', label: 'Caja' },
      { val: 'ERP lite', label: 'Tipo' },
    ],
    logo: '/logo-nextdrill.png',
    testimonial: {
      quote: 'Codigo Startup nos acompañó desde un simple MVP hasta una plataforma robusta integrada con SII. Su enfoque evolutivo nos permitió crecer paso a paso, y ahora estamos listos para el siguiente paso con inventarios y bodegas.',
      author: 'Roberto Silva, Gerente General',
    },
  },
]

export default function Home() {
  return (
    <main>
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
        <a href="https://wa.me/56966073259" target="_blank" rel="noreferrer" className="nav-cta">Hablemos</a>
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
              <a href="https://wa.me/56966073259" target="_blank" rel="noreferrer" className="btn-primary">
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
                Tres servicios diseñados para momentos distintos.
                Cuéntanos dónde estás y te decimos exactamente cuál encaja.
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
                href="https://wa.me/56966073259"
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
                CONSTRUIMOS PORQUE<br />
                SOMOS COMO TÚ:<br />
                <span className="accent emp-animated">
                  {'EMPRENDEDORES.'.split('').map((letter, i) => (
                    <span key={i} className="emp-letter">{letter}</span>
                  ))}
                </span>
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
                    <img src="/logo-nucleo-gestor-blanco-naranjo.svg" alt="Núcleo Gestor" className="lab-card-logo-oficial" />
                  </div>
                  <p className="lab-card-desc">
                    Plataforma de gestión de liderazgo y cumplimiento normativo del DS44 para la
                    industria minera. IA entrenada en normativa, app móvil 100% offline y firma
                    electrónica simple según ley 19799.
                  </p>
                  <div className="lab-card-metrics">
                    <div className="lab-card-metric">
                      <span className="lab-card-metric-val">DS44</span>
                      <span className="lab-card-metric-label">Normativa</span>
                    </div>
                    <div className="lab-card-metric">
                      <span className="lab-card-metric-val">100%</span>
                      <span className="lab-card-metric-label">Offline</span>
                    </div>
                    <div className="lab-card-metric">
                      <span className="lab-card-metric-val">FES</span>
                      <span className="lab-card-metric-label">Ley 19799</span>
                    </div>
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
                      <img src="/logo-nucleo-gestor-blanco-naranjo.svg" alt="Núcleo Gestor" className="lab-card-logo-oficial" />
                    </div>
                    <p className="lab-card-back-sub">Gestión de liderazgo y normativa DS44 para la industria minera.</p>
                    <a href="https://nucleogestor.com/landing" target="_blank" rel="noreferrer" className="lab-card-back-cta">
                      Conocer Núcleo Gestor →
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
                Tres productos en producción real, con clientes activos
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
              href="https://wa.me/56966073259"
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
          href="mailto:hola@codigostartup.com"
          className="footer-email"
        >
          hola@codigostartup.com
        </a>
      </footer>

    </main>
  )
}
