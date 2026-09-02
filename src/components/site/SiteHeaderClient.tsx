"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrainCircuit, Home, MessagesSquare } from "lucide-react";
import { siteConfig } from "@/config/site";
import { talleres } from "@/data/talleres";
import { isRouteActive, type SolutionNavGroup } from "./site-navigation";

const primaryLinks = [
  { label: "Proyectos", href: "/proyectos" },
  { label: "Blog", href: "/blog" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
] as const;

const whatsappUrl = `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(
  "Hola Código Startup, quiero conversar sobre un proyecto.",
)}`;

export function SiteHeaderClient({ solutionGroups }: { solutionGroups: SolutionNavGroup[] }) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const solutionsButtonRef = useRef<HTMLButtonElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

  const mouseLeaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current);
      mouseLeaveTimeoutRef.current = null;
    }
    setSolutionsOpen(true);
  };

  const handleMouseLeave = () => {
    mouseLeaveTimeoutRef.current = setTimeout(() => {
      setSolutionsOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (mouseLeaveTimeoutRef.current) clearTimeout(mouseLeaveTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setSolutionsOpen(false);
    setMobileOpen(false);
    setMobileSolutionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!solutionsOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setSolutionsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSolutionsOpen(false);
        solutionsButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [solutionsOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1081px)");
    const closeMobileMenu = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) {
        setMobileOpen(false);
        setMobileSolutionsOpen(false);
      }
    };

    desktop.addEventListener("change", closeMobileMenu);
    closeMobileMenu(desktop);
    return () => desktop.removeEventListener("change", closeMobileMenu);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setMobileSolutionsOpen(false);
        requestAnimationFrame(() => mobileToggleRef.current?.focus());
        return;
      }

      if (event.key !== "Tab" || !headerRef.current) return;
      const focusable = Array.from(
        headerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const solutionsActive = isRouteActive(pathname, "/soluciones");
  const isTalleres = pathname.startsWith("/talleres");

  return (
    <header
      ref={headerRef}
      className={`site-header${isScrolled || pathname !== "/" ? " site-header--solid" : ""}${isTalleres ? " site-header--violet" : ""}${mobileOpen ? " site-header--menu-open" : ""}`}
    >
      <div className="site-header-bar">
        <Link href="/" prefetch={false} className="site-header-logo" aria-label="Código Startup, inicio">
          <Image src="/logo.svg" alt="" width={140} height={24} priority />
        </Link>

        <nav className="site-nav-desktop" aria-label="Navegación principal">
          <div
            className="site-nav-solutions"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setSolutionsOpen(false);
            }}
          >
            <button
              ref={solutionsButtonRef}
              type="button"
              className={`site-nav-link site-nav-link--button${solutionsActive ? " is-active" : ""}`}
              aria-expanded={solutionsOpen}
              aria-controls="solutions-menu"
              onClick={() => setSolutionsOpen((open) => !open)}
            >
              Soluciones
              <span className="site-nav-chevron" aria-hidden="true">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 4.5L6 8L9.5 4.5" />
                </svg>
              </span>
            </button>
            <div id="solutions-menu" className="site-solutions-menu" hidden={!solutionsOpen}>
              <div className="site-solutions-intro">
                <span>Soluciones</span>
                <strong>Una ruta distinta para cada etapa.</strong>
                <Link href="/soluciones" onClick={() => setSolutionsOpen(false)}>
                  Ver todas <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="site-solutions-groups">
                {solutionGroups.map((group) => (
                  <div key={group.label} className="site-solutions-group">
                    <span>{group.label}</span>
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={isRouteActive(pathname, item.href) ? "is-active" : undefined}
                        onClick={() => setSolutionsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`site-nav-link${isRouteActive(pathname, link.href) ? " is-active" : ""}`}
              aria-current={isRouteActive(pathname, link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}

          <div className="site-header-actions">
            <Link href="/talleres" className="site-header-cta site-header-cta--volt">
              <BrainCircuit size={14} />
              Talleres
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="site-header-cta site-header-cta--violet">
              <MessagesSquare size={14} />
              Hablemos
            </a>
          </div>
        </nav>

        <button
          ref={mobileToggleRef}
          type="button"
          className="site-menu-toggle"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>

      {mobileOpen && (
        <div
          className="site-nav-scrim"
          aria-hidden="true"
          onClick={() => { setMobileOpen(false); setMobileSolutionsOpen(false); }}
        />
      )}
      <nav id="mobile-navigation" className="site-nav-mobile" aria-label="Navegación móvil" hidden={!mobileOpen}>
        {isTalleres ? (
          <>
            {pathname !== "/talleres" && (
              <Link href="/talleres" className="site-mobile-link">
                <span className="site-mobile-arrow" aria-hidden="true">→</span>
                Todos los talleres
              </Link>
            )}
            {talleres.map((taller, index) => (
              <Link
                key={taller.slug}
                href={`/talleres/${taller.slug}`}
                className={`site-mobile-link${pathname === `/talleres/${taller.slug}` ? " is-active" : ""}`}
                aria-current={pathname === `/talleres/${taller.slug}` ? "page" : undefined}
              >
                <span className="site-mobile-arrow" aria-hidden="true">→</span>
                {taller.titulo}
              </Link>
            ))}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="site-mobile-cta site-mobile-cta--violet">
              <MessagesSquare size={20} />
              Hablemos
            </a>
            <Link href="/" className="site-mobile-cta site-mobile-cta--volt">
              <Home size={20} />
              Inicio
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              className={`site-mobile-link site-mobile-solutions-trigger${solutionsActive ? " is-active" : ""}`}
              aria-expanded={mobileSolutionsOpen}
              aria-controls="mobile-solutions-menu"
              onClick={() => setMobileSolutionsOpen((open) => !open)}
            >
              <span>Soluciones</span>
              <span aria-hidden="true">{mobileSolutionsOpen ? "−" : "+"}</span>
            </button>

            <div id="mobile-solutions-menu" className="site-mobile-solutions" hidden={!mobileSolutionsOpen}>
              <Link
                href="/soluciones"
                className={`site-mobile-all-solutions${pathname === "/soluciones" ? " is-active" : ""}`}
                aria-current={pathname === "/soluciones" ? "page" : undefined}
              >
                Ver todas las soluciones
              </Link>
              {solutionGroups.map((group) => (
                <div key={group.label}>
                  <span>{group.label}</span>
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={isRouteActive(pathname, item.href) ? "is-active" : undefined}
                      aria-current={isRouteActive(pathname, item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`site-mobile-link${isRouteActive(pathname, link.href) ? " is-active" : ""}`}
                aria-current={isRouteActive(pathname, link.href) ? "page" : undefined}
              >
                <span className="site-mobile-arrow" aria-hidden="true">→</span>
                {link.label}
              </Link>
            ))}
            <Link href="/talleres" className="site-mobile-cta site-mobile-cta--volt">
              <BrainCircuit size={16} />
              Talleres
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="site-mobile-cta site-mobile-cta--violet">
              <MessagesSquare size={16} />
              Hablemos
            </a>
          </>
        )}
      </nav>
    </header>
  );
}
