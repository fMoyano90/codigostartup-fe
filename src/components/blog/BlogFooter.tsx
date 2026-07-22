import Link from "next/link";

export function BlogFooter() {
  return (
    <footer className="blog-footer">
      <div className="blog-footer-inner">
        <span>© {new Date().getFullYear()} Código Startup</span>
        <div className="blog-footer-links">
          <Link href="/blog">Blog</Link>
          <Link href="/">Inicio</Link>
        </div>
      </div>
    </footer>
  );
}
