# public/talleres — Imágenes de la página de Talleres

Carpeta para las fotografías reales que se muestran en `/talleres` (landing) y
`/talleres/[slug]` (fichas). Mientras una imagen no exista, la página muestra un
espacio reservado con el nombre del archivo esperado.

## Cómo subir una imagen

1. Copiar el archivo a esta carpeta con el nombre exacto indicado abajo.
2. Reemplazar en el código el componente `<ImagenSlot>` correspondiente por:

```tsx
<Image
  src="/talleres/<nombre-archivo>"
  alt="<descripción de la foto>"
  width={1200}
  height={900}
  className="talleres-img"
/>
```

(La clase `.talleres-img` ya está definida en `src/app/globals.css`.)

## Archivos esperados (landing)

| Archivo | Sección | Sugerencia de contenido |
|---|---|---|
| `hero.jpg` | Hero | Relator(a) de Código Startup o equipo trabajando con computador |
| `pilares.jpg` | "Capacitación que se implementa" | Sesión de trabajo/workshop con personas |
| `taller-en-vivo.jpg` | "Así se vive un taller" | Taller en ejecución, grupo participando |
| `testimonio-1.jpg` | Testimonios | Retrato de participante (600×600) |
| `testimonio-2.jpg` | Testimonios | Retrato de participante (600×600) |
| `testimonio-3.jpg` | Testimonios | Retrato de participante (600×600) |

## Archivos esperados (fichas)

| Archivo | Taller |
|---|---|
| `videos-ugc-con-ia.jpg` | Videos UGC con IA |
| `ia-para-productividad-administrativa.jpg` | IA para Productividad Administrativa |
| `automatizacion-de-procesos-con-ia.jpg` | Automatización de Procesos con IA |
| `ia-para-recursos-humanos.jpg` | IA para Recursos Humanos |
| `ia-para-equipos-comerciales.jpg` | IA para Equipos Comerciales |
| `ia-para-marketing.jpg` | IA para Marketing |
| `ia-para-lideres-y-jefaturas.jpg` | IA para Líderes y Jefaturas |
| `ia-para-gestion-de-proyectos.jpg` | IA para Gestión de Proyectos |
| `ia-para-operaciones-y-faenas.jpg` | IA para Operaciones y Faenas |

## Recomendaciones

- Formato JPG o WebP, orientación horizontal, mínimo 1200px de ancho (fichas: 900px).
- Las fotos de personas humanizan la página: priorizar rostros reales en contexto
  de trabajo o capacitación.
- No usar logos de clientes sin autorización previa.