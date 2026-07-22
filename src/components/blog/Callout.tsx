import type { ReactNode } from "react";

type CalloutVariant = "info" | "tip" | "warning" | "success";

const VARIANT_LABEL: Record<CalloutVariant, string> = {
  info: "Nota",
  tip: "Consejo",
  warning: "Atención",
  success: "Recomendado",
};

export function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className={`callout callout-${variant}`}>
      <div className="callout-label">{title ?? VARIANT_LABEL[variant]}</div>
      <div className="callout-body">{children}</div>
    </div>
  );
}
