import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

const suggestions = [
  { href: "/", label: "Inicio" },
  { href: "/soluciones", label: "Soluciones" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Evaluar proyecto" },
];

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="route-container not-found-inner">
        <span className="not-found-code" aria-hidden="true">404</span>
        <h1>Esta página no existe o cambió de lugar</h1>
        <p>
          Es posible que el enlace esté desactualizado. Desde aquí puedes volver al inicio o ir
          directo a lo que buscas.
        </p>
        <nav aria-label="Páginas sugeridas" className="not-found-links">
          {suggestions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.href === "/contacto" ? "btn-primary" : "btn-ghost"}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
