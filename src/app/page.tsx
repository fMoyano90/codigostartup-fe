'use client'

import { useEffect } from 'react'

const stats = [
  { value: '30+', label: 'Proyectos entregados', note: 'Startups, tiendas online y empresas' },
  { value: '1', label: 'Producto propio en operación', note: 'De la idea al mercado, en producción real' },
  { value: 'Chrysalis', label: 'Incubadora PUCV', note: 'Núcleo Gestor, nuestro spin-off, incubado en la PUCV' },
  { value: 'Cuotas', label: 'Facilidades de pago', note: 'Transbank y cuotas para emprendedores' },
]

const services = [
  {
    number: '01',
    category: 'Desarrollo',
    name: 'Construimos',
    description: 'Tu primera tienda online, app web o sistema interno — código sólido, entregas semanales y un producto listo para crecer.',
    detail: 'Para cuando tienes la idea clara pero no el equipo que la ejecute.',
    cta: 'Quiero construir →',
  },
  {
    number: '02',
    category: 'Estrategia',
    name: 'Optimizamos',
    description: 'Revisamos lo que ya tienes, encontramos los cuellos de botella y te decimos qué mejorar antes de que cueste más caro.',
    detail: 'Para cuando algo ya funciona, pero el costo o la velocidad se están yendo de las manos.',
    cta: 'Quiero mejorar lo que tengo →',
  },
  {
    number: '03',
    category: 'Diseño y Marca',
    name: 'Comunicamos',
    description: 'UX/UI, identidad y piezas de comunicación para que tu producto se entienda solo. Sin que tengas que explicar qué hace cada vez que lo muestras.',
    detail: 'Para cuando el producto funciona pero todavía no se vende como debería.',
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
    name: 'SubTech Solutions',
    description: 'Monitoreo en tiempo real de maquinarias, vehículos y personas dentro de una mina, nivel por nivel. Visibilidad total de lo que ocurre bajo tierra.',
    hook: 'En una emergencia, en segundos sabes exactamente quién y qué activos están en el interior.',
    metrics: [
      { val: 'Real-time', label: 'Monitoreo' },
      { val: 'Industrial', label: 'Escala' },
      { val: 'Minería', label: 'Sector' },
    ],
    logo: '/SS_LOGO_WHITE_H.png',
    testimonial: {
      quote: 'Núcleo Gestor nació por la necesidad real de la minería. Con esta plataforma esperamos eliminar el 100% del papel en operaciones mineras, reducir costos operativos significativamente y transformar auditorías de semanas a horas, cuidando el medio ambiente desde el diseño inicial.',
      author: 'Christian Solar, Gerente General',
    },
  },
  {
    sector: 'Fitness & Coaching',
    name: 'Entrena.vip',
    description: 'Plataforma para coaches: gestión de alumnos, seguimiento de progreso y evaluaciones de fuerza, movilidad y carga en un solo lugar.',
    hook: 'Cada sesión queda registrada. El progreso del alumno siempre visible, para el coach y para el atleta.',
    metrics: [
      { val: 'SaaS', label: 'Modelo' },
      { val: 'Multi-rol', label: 'Coach + Alumno' },
      { val: 'Fitness', label: 'Industria' },
    ],
    logo: '/logo-entrena-blanco.png',
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

const marqItems = [
  'Desarrollo web', 'Tiendas online', 'PUCV', 'Núcleo Gestor',
  'Startups', 'Pago en cuotas', 'DevOps', 'UX / UI',
  'Código real', '30+ Proyectos', 'Estrategia', 'Producto digital',
]

export default function Home() {
  // Custom cursor
  useEffect(() => {
    const cursor = document.createElement('div')
    cursor.id = 'cs-cursor'
    document.body.appendChild(cursor)

    let raf: number
    let mx = -100, my = -100
    let cx = -100, cy = -100

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const tick = () => {
      cx += (mx - cx) * 0.14
      cy += (my - cy) * 0.14
      cursor.style.transform = `translate(${cx - 5}px, ${cy - 5}px)`
      raf = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)

    const onEnter = () => cursor.classList.add('hovered')
    const onLeave = () => cursor.classList.remove('hovered')

    // Re-query after render
    const t = setTimeout(() => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }, 100)

    return () => {
      clearTimeout(t)
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      if (document.body.contains(cursor)) document.body.removeChild(cursor)
    }
  }, [])

  // Nav scroll effect
  useEffect(() => {
    const nav = document.getElementById('main-nav')
    if (!nav) return
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const duped = [...marqItems, ...marqItems, ...marqItems]

  return (
    <main>

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
        <a href="#cta" className="nav-cta">Hablemos</a>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="hero-root">
        <span className="hero-watermark" aria-hidden="true">CS</span>

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
              De la primera línea de código al lanzamiento. Somos el
              equipo técnico que ejecuta contigo: desarrollo, estrategia
              y diseño para emprendedores, startups y empresas que
              necesitan avanzar.
            </p>
            <div className="hero-actions fadein fadein-d3">
              <a href="#cta" className="btn-primary">
                Cuéntanos tu proyecto →
              </a>
              <a href="#proceso" className="btn-ghost">
                Cómo trabajamos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        {stats.map((s) => (
          <div key={s.label} className="stat-item">
            <span className="stat-val">{s.value}</span>
            <span className="stat-label">{s.label}</span>
            <span className="stat-note">{s.note}</span>
          </div>
        ))}
      </div>

      {/* ── MARQUEE ── */}
      <div className="marquee-root" aria-hidden="true">
        <div className="marquee-track">
          {duped.map((item, i) => (
            <span key={i} className="marquee-item">{item}</span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="servicios" className="section-wrap">
        <div className="container">
          <div className="services-header">
            <div>
              <div className="section-tag">Servicios</div>
              <h2 className="section-title">
                DESARROLLO,<br />
                ESTRATEGIA<br />
                Y DISEÑO.
              </h2>
            </div>
            <p className="services-header-text">
              Tres servicios diseñados para momentos distintos.
              Cuéntanos dónde estás y te decimos exactamente cuál encaja.
            </p>
          </div>
        </div>
        <div className="service-grid" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {services.map((s) => (
            <article key={s.number} className="service-card">
              <span className="service-number">{s.number}</span>
              <div className="service-category">{s.category}</div>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-desc">{s.description}</p>
              <p className="service-detail">{s.detail}</p>
              <a href="#cta" className="service-link">{s.cta}</a>
            </article>
          ))}
        </div>
      </section>

      {/* ── NÚCLEO GESTOR CASE ── */}
      <section id="nucleo">
        <div
          className="case-root"
          style={{ maxWidth: '1280px', margin: '0 auto' }}
        >
          <div className="case-left">
            <span className="case-tag">Caso Insignia</span>
            <h2 className="case-title">
              NÚCLEO<br />GESTOR.
            </h2>
            <p className="case-desc">
              Plataforma de gestión de liderazgo y cumplimiento normativo
              del DS44 para la industria minera. IA entrenada en normativa,
              app móvil 100% offline para trabajadores en terreno y firma
              electrónica simple (FES) según ley 19799. Nació en Código
              Startup, hoy opera como empresa independiente incubada en
              Chrysalis PUCV.
            </p>
            <div className="case-metrics">
              <div className="case-metric">
                <span className="case-metric-val">DS44</span>
                <span className="case-metric-label">Cumplimiento normativo</span>
              </div>
              <div className="case-metric">
                <span className="case-metric-val">100% Offline</span>
                <span className="case-metric-label">App móvil en terreno</span>
              </div>
              <div className="case-metric">
                <span className="case-metric-val">FES</span>
                <span className="case-metric-label">Ley 19799</span>
              </div>
            </div>
          </div>

          <div className="case-right">
            <div>
              <div className="section-tag" style={{ marginBottom: '1.75rem' }}>
                Lo que demuestra
              </div>
              <ul className="case-proof-list">
                <li className="case-proof-item">
                  De cero a piloto activo: de la idea al producto con usuarios reales confirmando funciones críticas en terreno.
                </li>
                <li className="case-proof-item">
                  Con restricciones reales: normativa exigente, operación sin internet y usuarios que no perdonan fallas.
                </li>
                <li className="case-proof-item">
                  Respaldo institucional: incubado en Chrysalis PUCV, que valida la calidad de lo que construimos.
                </li>
              </ul>
            </div>

            <div className="case-narrative">
              <p className="case-narrative-text">
                CODIGO STARTUP ES LA FÁBRICA.
                NÚCLEO GESTOR ES LA EVIDENCIA DE QUE ESA
                FÁBRICA CONSTRUYE PRODUCTOS QUE OPERAN EN EL MUNDO REAL.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT CASES / PORTAFOLIO ── */}
      <section id="portafolio" className="section-wrap">
        <div className="container">
          <div className="portfolio-header">
            <div>
              <div className="section-tag">Casos de éxito</div>
              <h2 className="section-title">
                CONSTRUIDO.<br />
                LANZADO.<br />
                OPERANDO.
              </h2>
            </div>
            <p className="portfolio-header-text">
              Tres productos en producción real, con clientes activos
              que los usan todos los días.
            </p>
          </div>
          <div className="portfolio-grid">
            {clientCases.map((c) => (
              <article key={c.name} className="portfolio-card">
                <span className="portfolio-sector">{c.sector}</span>
                {c.logo && (
                  <img
                    src={c.logo}
                    alt={`Logo ${c.name}`}
                    className="portfolio-logo"
                  />
                )}
                <h3 className="portfolio-name">{c.name}</h3>
                <p className="portfolio-desc">{c.description}</p>
                <p className="portfolio-hook">{c.hook}</p>
                <div className="portfolio-metrics">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="portfolio-metric">
                      <span className="portfolio-metric-val">{m.val}</span>
                      <span className="portfolio-metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
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
      <section id="proceso" className="section-wrap">
        <div className="container">
          <div className="process-header">
            <div>
              <div className="section-tag">Proceso</div>
              <h2 className="section-title">
                CUATRO PASOS,<br />
                SIN CAJAS<br />
                NEGRAS.
              </h2>
            </div>
            <p className="process-desc-text">
              La mayor fricción no suele ser el precio: es no saber qué pasa
              después de decir que sí. Aquí siempre sabes en qué estamos,
              qué sigue y por qué.
            </p>
          </div>
          <div className="process-grid">
            {steps.map((s) => (
              <div key={s.n} className="process-step">
                <span className="process-n">{s.n}</span>
                <h3 className="process-title">{s.title}</h3>
                <p className="process-desc">{s.desc}</p>
              </div>
            ))}
          </div>
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
          <a
            href="mailto:hola@codigostartup.com?subject=Quiero%20agendar%20una%20reunion"
            className="btn-dark"
          >
            Agendar reunión →
          </a>
          <a
            href="mailto:hola@codigostartup.com"
            className="btn-dark-outline"
          >
            Escríbenos
          </a>
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
