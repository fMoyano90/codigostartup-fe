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

  return null
}
