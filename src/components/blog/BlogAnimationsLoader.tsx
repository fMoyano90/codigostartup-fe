"use client";

import dynamic from "next/dynamic";

/**
 * `ssr:false` no está permitido dentro de un Server Component (page.tsx), así
 * que el dynamic import vive en este wrapper cliente, igual que en la home.
 */
const BlogAnimations = dynamic(() => import("@/components/blog/BlogAnimations"), {
  ssr: false,
});

export default function BlogAnimationsLoader() {
  return <BlogAnimations />;
}
