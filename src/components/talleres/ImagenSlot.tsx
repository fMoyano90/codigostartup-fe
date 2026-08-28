import { ImagePlus } from "lucide-react";

type ImagenSlotProps = {
  /** Nombre del archivo esperado en public/talleres/ (solo informativo). */
  archivo?: string;
  /** Proporción del espacio reservado. */
  ratio?: "21/9" | "16/9" | "4/3" | "1/1" | "3/4";
  className?: string;
};

/**
 * Espacio reservado para una fotografía real.
 *
 * Cuando exista la foto en public/talleres/, reemplazar este componente por:
 *
 *   <Image
 *     src="/talleres/<archivo>"
 *     alt="<descripción>"
 *     width={1200}
 *     height={800}
 *     className="talleres-img"
 *   />
 *
 * La clase `.talleres-img` ya está definida en globals.css.
 */
export function ImagenSlot({ archivo, ratio = "16/9", className = "" }: ImagenSlotProps) {
  return (
    <div className={`talleres-imgslot talleres-imgslot--${ratio} ${className}`} aria-hidden="true">
      <span className="talleres-imgslot-icon">
        <ImagePlus size={26} strokeWidth={1.75} />
      </span>
      <span className="talleres-imgslot-label">Imagen pendiente</span>
      {archivo && <span className="talleres-imgslot-file">public/talleres/{archivo}</span>}
    </div>
  );
}