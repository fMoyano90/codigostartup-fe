import Link from "next/link";
import { siteConfig } from "@/config/site";

export function BlogNav() {
  return (
    <nav className="blog-nav">
      <Link href="/" className="blog-nav-logo">
        <img src="/logo.svg" alt="Codigo Startup" className="blog-nav-logo-img" />
      </Link>
      <div className="blog-nav-links">
        <Link href="/blog" className="blog-nav-link">
          Blog
        </Link>
        <Link href="/#servicios" className="blog-nav-link">
          Servicios
        </Link>
      </div>
      <a
        href={siteConfig.contact.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="blog-nav-cta"
      >
        Hablemos
      </a>
    </nav>
  );
}
