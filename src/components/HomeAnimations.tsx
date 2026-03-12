'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HomeAnimations() {
  // Service cards scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = document.querySelectorAll('.service-card')
      cards.forEach((card, i) => {
        gsap.set(card, { y: 50, autoAlpha: 0 })
        ScrollTrigger.create({
          trigger: card,
          start: 'top 88%',
          end: 'top 15%',
          onEnter: () => gsap.to(card, { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.1 }),
          onLeave: () => gsap.to(card, { y: -50, autoAlpha: 0, duration: 0.5, ease: 'power2.in' }),
          onEnterBack: () => gsap.to(card, { y: 0, autoAlpha: 1, duration: 0.55, ease: 'power3.out' }),
          onLeaveBack: () => gsap.to(card, { y: 50, autoAlpha: 0, duration: 0.5, ease: 'power2.in' }),
        })
      })
    })
    return () => ctx.revert()
  }, [])

  // Process cards scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = document.querySelectorAll('.process-step')
      cards.forEach((card, i) => {
        gsap.set(card, { y: 60, autoAlpha: 0 })
        ScrollTrigger.create({
          trigger: card,
          start: 'top 88%',
          end: 'top 15%',
          onEnter: () => gsap.to(card, { y: 0, autoAlpha: 1, duration: 0.65, ease: 'power3.out', delay: i * 0.06 }),
          onLeave: () => gsap.to(card, { y: -60, autoAlpha: 0, duration: 0.5, ease: 'power2.in' }),
          onEnterBack: () => gsap.to(card, { y: 0, autoAlpha: 1, duration: 0.55, ease: 'power3.out' }),
          onLeaveBack: () => gsap.to(card, { y: 60, autoAlpha: 0, duration: 0.5, ease: 'power2.in' }),
        })
      })
    })
    return () => ctx.revert()
  }, [])

  // Navbar transparent → glass on scroll
  useEffect(() => {
    const onScroll = () => {
      const nav = document.querySelector('.nav-root')
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 20)
      const mainNav = document.getElementById('main-nav')
      if (mainNav) mainNav.classList.toggle('scrolled', window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
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

  // Lab card flip on hover
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const wrap = document.querySelector('.lab-card-flip-wrap')
    const inner = document.querySelector<HTMLElement>('.lab-card-flip-inner')
    if (!wrap || !inner) return

    // Ensure GSAP preserves the 3D context on the inner container
    gsap.set(inner, { transformStyle: 'preserve-3d' })

    let tween: gsap.core.Tween | null = null

    const onEnter = () => {
      tween?.kill()
      tween = gsap.to(inner, { rotateY: 180, duration: 0.7, ease: 'power2.inOut', transformStyle: 'preserve-3d' })
    }
    const onLeave = () => {
      tween?.kill()
      tween = gsap.to(inner, { rotateY: 0, duration: 0.7, ease: 'power2.inOut', transformStyle: 'preserve-3d' })
    }

    wrap.addEventListener('mouseenter', onEnter)
    wrap.addEventListener('mouseleave', onLeave)

    return () => {
      tween?.kill()
      wrap.removeEventListener('mouseenter', onEnter)
      wrap.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  // EMPRENDEDORES typewriter rainbow animation
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const letters = document.querySelectorAll('.emp-letter')
      if (!letters.length) return

      if (prefersReduced) {
        gsap.set(letters, { autoAlpha: 1, color: '#fdc828' })
        return
      }

      const rainbowColors = [
        '#efc459', '#0a0a0a', '#7c3aed', '#fdc828',
        '#ede8df', '#0a0a0a', '#5b28a5', '#efc459',
        '#fdc828', '#7c3aed', '#0a0a0a', '#ede8df',
        '#efc459', '#fdc828',
      ]

      gsap.set(letters, { display: 'inline-block', autoAlpha: 0, y: 18, scale: 0.6 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.emp-animated',
          start: 'top 82%',
          once: true,
        },
      })

      letters.forEach((letter, i) => {
        tl.to(
          letter,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            color: rainbowColors[i % rainbowColors.length],
            duration: 0.13,
            ease: 'back.out(2.5)',
          },
          i * 0.07
        )
      })

      // All letters converge to volt yellow
      tl.to(
        letters,
        {
          color: '#fdc828',
          duration: 0.55,
          stagger: 0.025,
          ease: 'power2.inOut',
        },
        letters.length * 0.07 + 0.15
      )
    })
    return () => ctx.revert()
  }, [])

  // Services title word-by-word scrub animation
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(document.querySelectorAll('#servicios .section-title .title-word'), { autoAlpha: 1, y: 0 })
        return
      }

      const titleEl = document.querySelector('#servicios .section-title')
      const subEl = document.querySelector('#servicios .services-header-text')
      const words = titleEl?.querySelectorAll('.title-word')

      if (words?.length) {
        gsap.set(words, { autoAlpha: 0.08, y: 28 })
        const tl = gsap.timeline()
        tl.to(words, { autoAlpha: 1, y: 0, ease: 'power2.out', stagger: 0.5 })
        ScrollTrigger.create({
          trigger: titleEl,
          start: 'top 78%',
          end: 'bottom 60%',
          scrub: 1.2,
          animation: tl,
        })
      }

      if (subEl) {
        gsap.set(subEl, { autoAlpha: 0, y: 18 })
        const tlSub = gsap.timeline()
        tlSub.to(subEl, { autoAlpha: 1, y: 0, ease: 'power2.out' })
        ScrollTrigger.create({
          trigger: subEl,
          start: 'top 82%',
          end: 'bottom 65%',
          scrub: 1.2,
          animation: tlSub,
        })
      }
    })
    return () => ctx.revert()
  }, [])

  // Portfolio cards scroll reveal (same as service cards)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = document.querySelectorAll('.portfolio-card')
      cards.forEach((card, i) => {
        gsap.set(card, { y: 50, autoAlpha: 0 })
        ScrollTrigger.create({
          trigger: card,
          start: 'top 88%',
          end: 'top 15%',
          onEnter: () => gsap.to(card, { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.1 }),
          onLeave: () => gsap.to(card, { y: -50, autoAlpha: 0, duration: 0.5, ease: 'power2.in' }),
          onEnterBack: () => gsap.to(card, { y: 0, autoAlpha: 1, duration: 0.55, ease: 'power3.out' }),
          onLeaveBack: () => gsap.to(card, { y: 50, autoAlpha: 0, duration: 0.5, ease: 'power2.in' }),
        })
      })
    })
    return () => ctx.revert()
  }, [])

  // Portfolio title word-by-word scrub animation (same as services)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(document.querySelectorAll('#portafolio .section-title .title-word'), { autoAlpha: 1, y: 0 })
        return
      }

      const titleEl = document.querySelector('#portafolio .section-title')
      const subEl = document.querySelector('#portafolio .portfolio-header-text')
      const words = titleEl?.querySelectorAll('.title-word')

      if (words?.length) {
        gsap.set(words, { autoAlpha: 0.08, y: 28 })
        const tl = gsap.timeline()
        tl.to(words, { autoAlpha: 1, y: 0, ease: 'power2.out', stagger: 0.5 })
        ScrollTrigger.create({
          trigger: titleEl,
          start: 'top 78%',
          end: 'bottom 60%',
          scrub: 1.2,
          animation: tl,
        })
      }

      if (subEl) {
        gsap.set(subEl, { autoAlpha: 0, y: 18 })
        const tlSub = gsap.timeline()
        tlSub.to(subEl, { autoAlpha: 1, y: 0, ease: 'power2.out' })
        ScrollTrigger.create({
          trigger: subEl,
          start: 'top 82%',
          end: 'bottom 65%',
          scrub: 1.2,
          animation: tlSub,
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return null
}
