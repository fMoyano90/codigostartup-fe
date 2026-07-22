import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Código Startup — Productos digitales que perduran";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return new ImageResponse(renderOgImage({ title: "Productos digitales que perduran" }), {
    ...size,
  });
}
