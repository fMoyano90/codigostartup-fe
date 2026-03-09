'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LogoLoop from '@/components/LogoLoop'
import Galaxy from '@/components/Galaxy'

gsap.registerPlugin(ScrollTrigger)

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
    tags: ['Experiencia de Usuario', 'Identidad visual', 'Animación digital',  'Brochure y Graficas', 'Marketing y publicidad digital'],
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
    logo: '/SS_LOGO_WHITE.png',
    testimonial: {
      quote: 'Estoy muy contento con el trabajo de Código tanto en desarrollo como su modalidad de trabajo; ágil, limpia y eficaz. El trabajo por parte de Código nos ha permitido validar nuestro MVP, paso crucial para el desarrollo profesional de nuestra Startup.',
      author: 'Christian Solar, Gerente General',
    },
  },
  {
    sector: 'Fitness & Coaching',
    name: 'Entrena',
    description: 'Plataforma para coaches: gestión de alumnos, seguimiento de progreso y evaluaciones de fuerza, movilidad y carga en un solo lugar.',
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

const leftPhrases = [
  'Desarrollo web', 'Tiendas online', 'Pago en cuotas', 'DevOps', 'Estrategia', 'Producto digital',
]

const rightPhrases = [
  'PUCV', 'Núcleo Gestor', 'Startups', 'UX / UI', 'Código real', '30+ Proyectos',
]

export default function Home() {
  const phraseLeftRef = useRef<HTMLDivElement>(null)
  const phraseRightRef = useRef<HTMLDivElement>(null)
  const servicesTitleRef = useRef<HTMLHeadingElement>(null)
  const servicesSubRef = useRef<HTMLParagraphElement>(null)

  // Phrase scroll-driven animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const left = phraseLeftRef.current
      const right = phraseRightRef.current
      if (!left || !right) return

      // Set initial hidden state
      gsap.set(left, { x: -420, autoAlpha: 0 })
      gsap.set(right, { x: 420, autoAlpha: 0 })

      // Entry animation: fire once when phrase section enters viewport
      ScrollTrigger.create({
        trigger: '#phrase-root',
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(left, {
            x: 0,
            autoAlpha: 1,
            duration: 1.2,
            ease: 'power3.out',
          })
          gsap.to(right, {
            x: 0,
            autoAlpha: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.12,
          })
        },
      })

      // Continuous parallax: rows drift in opposite directions as user scrolls
      gsap.fromTo(
        left,
        { xPercent: 0 },
        {
          xPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: '#servicios',
            start: 'top bottom',
            end: 'top top',
            scrub: 2,
          },
        }
      )
      gsap.fromTo(
        right,
        { xPercent: 0 },
        {
          xPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: '#servicios',
            start: 'top bottom',
            end: 'top top',
            scrub: 2,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

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

  // Services title: word-by-word scrub animation
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(servicesTitleRef.current?.querySelectorAll('.title-word') ?? [], { autoAlpha: 1, y: 0 })
        return
      }

      const words = servicesTitleRef.current?.querySelectorAll('.title-word')
      if (words?.length) {
        // Set initial state hidden
        gsap.set(words, { autoAlpha: 0.08, y: 28 })

        const tl = gsap.timeline()
        tl.to(words, {
          autoAlpha: 1,
          y: 0,
          ease: 'power2.out',
          stagger: 0.5,
        })

        ScrollTrigger.create({
          trigger: servicesTitleRef.current,
          start: 'top 78%',
          end: 'bottom 60%',
          scrub: 1.2,
          animation: tl,
        })
      }

      // Subtitle: scrub fade-up
      if (servicesSubRef.current) {
        gsap.set(servicesSubRef.current, { autoAlpha: 0, y: 18 })
        const tlSub = gsap.timeline()
        tlSub.to(servicesSubRef.current, { autoAlpha: 1, y: 0, ease: 'power2.out' })
        ScrollTrigger.create({
          trigger: servicesSubRef.current,
          start: 'top 82%',
          end: 'bottom 65%',
          scrub: 1.2,
          animation: tlSub,
        })
      }
    })
    return () => ctx.revert()
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
        <div className="hero-galaxy">
          <Galaxy
            mouseRepulsion
            mouseInteraction
            density={1.2}
            glowIntensity={0.2}
            saturation={0.8}
            hueShift={42}
            twinkleIntensity={0.5}
            rotationSpeed={0.03}
            repulsionStrength={1.5}
            speed={0.8}
            transparent
          />
        </div>
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

      {/* ── PHRASE BANDS ── (hidden) */}

      {/* ── SERVICES ── */}
      <section id="servicios" className="section-wrap">
        <div className="container">
          <div className="services-header">
            <div className="services-header-left">
              <div className="section-tag">Servicios</div>
              <h2 className="section-title" ref={servicesTitleRef}>
                <span className="title-word">DESARROLLO,</span><br />
                <span className="title-word">ESTRATEGIA</span><br />
                <span className="title-word">Y</span>{' '}
                <span className="title-word">DISEÑO.</span>
              </h2>
              <p className="services-header-text" ref={servicesSubRef}>
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
              <p className="service-desc">{s.description}</p>
              <div className="service-tags">
                {s.tags.map((tag) => (
                  <span key={tag} className="service-tag">{tag}</span>
                ))}
              </div>
              <a
                href="#cta"
                className={`service-link ${i === 1 ? 'service-link--center' : 'service-link--outer'}`}
              >{s.cta}</a>
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
            <div className="case-title-row">
              <img
                src="/isotipo-nucleo.svg"
                alt="Núcleo Gestor"
                className="case-title-isotipo"
              />
              <h2 className="case-title">
                NÚCLEO<br />GESTOR.
              </h2>
            </div>
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

            <div className="case-chrysalis">
              <img
                src="/chrysalis-logo.png"
                alt="Chrysalis — Incubadora de negocios PUCV"
                className="case-chrysalis-logo"
              />
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
            <div className="portfolio-header-left">
              <div className="section-tag">Casos de éxito</div>
              <h2 className="section-title">
                CONSTRUIDO.<br />
                LANZADO.<br />
                OPERANDO.
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
