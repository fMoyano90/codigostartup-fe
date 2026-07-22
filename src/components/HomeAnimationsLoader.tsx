"use client";

import dynamic from "next/dynamic";

/**
 * `ssr:false` no está permitido dentro de un Server Component (page.tsx), así
 * que el dynamic import vive en este wrapper cliente. Esto saca el bundle de
 * GSAP/ScrollTrigger del JS crítico de hidratación de la home.
 */
const HomeAnimations = dynamic(() => import("@/components/HomeAnimations"), {
  ssr: false,
});

export default function HomeAnimationsLoader() {
  return <HomeAnimations />;
}
