import { BlogNav } from "@/components/blog/BlogNav";
import { BlogFooter } from "@/components/blog/BlogFooter";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="blog-root">
      <BlogNav />
      {children}
      <BlogFooter />
    </div>
  );
}
