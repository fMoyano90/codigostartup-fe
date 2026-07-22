"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { AnalyticsEvent, AnalyticsParams } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";

type TrackedLinkProps = {
  href: string;
  event: AnalyticsEvent;
  params?: AnalyticsParams;
  /** Enlaces salientes (WhatsApp, agenda) usan `<a>` en vez de next/link. */
  external?: boolean;
  prefetch?: boolean;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">;

/**
 * Enlace instrumentado: registra el evento en el click y luego navega con
 * normalidad. Centraliza el tracking de CTAs en vez de dispersar `onClick`.
 */
export function TrackedLink({
  href,
  event,
  params,
  external,
  prefetch,
  children,
  ...rest
}: TrackedLinkProps) {
  const handleClick = () => trackEvent(event, params);

  if (external) {
    return (
      <a href={href} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} prefetch={prefetch} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
