"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import type { Taller } from "@/lib/commercial/schema";
import { categoriasDeTalleres, filtrarTalleres } from "@/lib/talleres/filtro";

type TalleresCatalogoProps = {
  talleres: Taller[];
};

export function TalleresCatalogo({ talleres }: TalleresCatalogoProps) {
  const categorias = useMemo(() => categoriasDeTalleres(talleres), [talleres]);
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [duracion, setDuracion] = useState("");

  const ordenados = useMemo(
    () => [...talleres].sort((a, b) => a.titulo.localeCompare(b.titulo, "es")),
    [talleres],
  );

  const resultados = useMemo(
    () => filtrarTalleres(ordenados, { texto, categoria, duracion }),
    [ordenados, texto, categoria, duracion],
  );
  const hayFiltros = texto !== "" || categoria !== "" || duracion !== "";

  const limpiar = () => {
    setTexto("");
    setCategoria("");
    setDuracion("");
  };

  return (
    <>
      <div className="talleres-filtro-card">
        <div className="talleres-filtro-grid">
          <div className="talleres-filtro-search">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              placeholder="Buscar por nombre, área o público…"
              value={texto}
              onChange={(event) => setTexto(event.target.value)}
              aria-label="Buscar taller"
            />
          </div>
          <select
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
            aria-label="Filtrar por categoría"
          >
            <option value="">Todas las categorías</option>
            {categorias.map((categoriaOption) => (
              <option key={categoriaOption} value={categoriaOption}>
                {categoriaOption}
              </option>
            ))}
          </select>
          <select
            value={duracion}
            onChange={(event) => setDuracion(event.target.value)}
            aria-label="Filtrar por duración"
          >
            <option value="">Toda duración</option>
            <option value="4">4 horas</option>
            <option value="8">8 horas</option>
          </select>
        </div>
        <div className="talleres-filtro-footer">
          <p className="talleres-filtro-count" role="status">
            {resultados.length} de {talleres.length} talleres
          </p>
          {hayFiltros && (
            <button type="button" className="talleres-filtro-clear" onClick={limpiar}>
              <X size={14} aria-hidden="true" />
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {resultados.length > 0 ? (
        <div className="talleres-catalog-grid">
          {resultados.map((taller) => (
            <article
              key={taller.slug}
              className={`talleres-catalog-card ${
                taller.estado === "aprobado" ? "talleres-catalog-card--aprobado" : ""
              } ${taller.slug === "videos-ugc-con-ia" ? "talleres-catalog-card--ugc" : ""} ${
                taller.slug === "ia-para-productividad-administrativa"
                  ? "talleres-catalog-card--adm"
                  : ""
              } ${taller.slug === "automatizacion-de-procesos-con-ia" ? "talleres-catalog-card--auto" : ""}`}
              style={
                taller.slug === "ia-para-recursos-humanos"
                  ? ({ "--card-bg": `url("/images/recursos-humanos-taller.jpg")` } as CSSProperties)
                  : taller.slug === "ia-para-equipos-comerciales"
                    ? ({ "--card-bg": `url("/images/recursos-humanos-taller.jpg")` } as CSSProperties)
                    : taller.slug === "ia-para-gestion-de-proyectos"
                      ? ({ "--card-bg": `url("/images/gestion-de-proyectos-taller.jpg")` } as CSSProperties)
                      : taller.slug === "ia-para-lideres-y-jefaturas"
                        ? ({ "--card-bg": `url("/images/lideres-y-jefaturas.jpg")` } as CSSProperties)
                        : taller.slug === "ia-para-marketing"
                          ? ({ "--card-bg": `url("/images/marketing-taller-ia.jpg")` } as CSSProperties)
                          : taller.slug === "ia-para-operaciones-y-faenas"
                            ? ({ "--card-bg": `url("/images/operaciones-y-faenas.jpg")` } as CSSProperties)
                            : undefined
              }
            >
              <span className="talleres-cat-badge">{taller.categoria}</span>
              <h3>{taller.titulo}</h3>
              <p className="talleres-cat-dur">{taller.duracionHoras} h · Taller práctico</p>
              <div className="talleres-cat-box">
                <p className="talleres-cat-desc">{taller.resumen}</p>
              </div>
              <p className="talleres-cat-aud">
                <span className="talleres-cat-aud-label">Público:</span>
                <span className="talleres-cat-pills">
                  {taller.publico
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean)
                    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
                    .map((item) => (
                      <span key={item} className="talleres-cat-pill">
                        {item}
                      </span>
                    ))}
                </span>
              </p>
              <Link className="talleres-cat-link" href={`/talleres/${taller.slug}`}>
                Ver ficha del taller
                <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="talleres-filtro-empty">
          <p>No encontramos talleres con esos criterios.</p>
          <button type="button" className="talleres-cta talleres-cta--ghost" onClick={limpiar}>
            Limpiar filtros
          </button>
        </div>
      )}
    </>
  );
}