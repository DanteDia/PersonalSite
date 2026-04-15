import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { posts } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Dante Arola`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return notFound();

  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <Navigation />

      <article style={{ padding: "8rem 0 4rem" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 1.5rem" }}>
          <Link
            href="/blog"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "var(--machine-accent)",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            ← back to writing
          </Link>

          <header style={{ marginTop: "2rem", marginBottom: "3rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
              {post.tags.map((tag) => (
                <code
                  key={tag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    padding: "0.2rem 0.5rem",
                    background: "var(--bg-alt)",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                    borderRadius: "2px",
                  }}
                >
                  {tag}
                </code>
              ))}
            </div>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 500,
                color: "var(--text-primary)",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              {post.title}
            </h1>
            <p
              style={{
                marginTop: "1.25rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {post.publishedAt} · {post.readMinutes} min read · {post.views} views
            </p>
            <p
              style={{
                marginTop: "1.5rem",
                fontFamily: "var(--font-serif)",
                fontSize: "1.15rem",
                fontStyle: "italic",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}
            >
              {post.excerpt}
            </p>
          </header>

          <div className="article-body" style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
            {post.body.map((section, i) => (
              <section key={i} style={{ marginBottom: "2.5rem" }}>
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: "1rem",
                    marginTop: 0,
                  }}
                >
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, j) => (
                  <p key={j} style={{ margin: "0 0 1.1rem" }}>
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div
            style={{
              marginTop: "4rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <Link
              href="/blog"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                color: "var(--machine-accent)",
                textDecoration: "none",
              }}
            >
              ← more writing
            </Link>
            <a
              href="mailto:aroladante@gmail.com"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                color: "var(--text-secondary)",
                textDecoration: "none",
              }}
            >
              comments / questions → aroladante@gmail.com
            </a>
          </div>
        </div>
      </article>

      <footer
        style={{
          padding: "3rem 1.5rem",
          textAlign: "center",
          borderTop: "1px solid var(--border)",
          backgroundColor: "var(--bg-alt)",
        }}
      >
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
          © {new Date().getFullYear()} Dante Arola.
        </p>
      </footer>
    </main>
  );
}
