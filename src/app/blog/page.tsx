"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { posts, type Post } from "@/lib/posts";

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const SectionTitle = ({ title }: { title: string }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    style={{
      fontSize: "1.8rem",
      marginBottom: "2.5rem",
      textAlign: "center",
      color: "var(--text-primary)",
      fontWeight: 500,
      fontFamily: "var(--font-serif)",
    }}
  >
    {title}
    <span
      style={{
        display: "block",
        width: "40px",
        height: "2px",
        background: "var(--machine-accent)",
        margin: "1rem auto 0",
        opacity: 0.6,
      }}
    />
  </motion.h2>
);

const PostCard = ({ post }: { post: Post }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -4, boxShadow: "0 8px 28px rgba(0,0,0,0.07)" }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
  >
    <Link
      href={`/blog/${post.slug}`}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "block",
        height: "100%",
      }}
    >
      <article
        style={{
          padding: "2rem",
          border: "1px solid var(--border)",
          backgroundColor: "var(--bg-alt)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
          {post.tags.map((tag) => (
            <code
              key={tag}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                padding: "0.2rem 0.5rem",
                background: "var(--bg-primary)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                borderRadius: "2px",
              }}
            >
              {tag}
            </code>
          ))}
          {post.language === "es" && (
            <code
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                padding: "0.2rem 0.5rem",
                background: "var(--machine-base)",
                border: "1px solid var(--machine-active)",
                color: "var(--machine-accent)",
                borderRadius: "2px",
              }}
            >
              ES
            </code>
          )}
        </div>
        <h3
          style={{
            fontSize: "1.3rem",
            fontWeight: 600,
            margin: "0 0 0.75rem",
            color: "var(--text-primary)",
            fontFamily: "var(--font-serif)",
            lineHeight: 1.3,
          }}
        >
          {post.title}
        </h3>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--text-secondary)",
            marginBottom: "1.25rem",
            lineHeight: 1.65,
            flex: 1,
          }}
        >
          {post.excerpt}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
            paddingTop: "1rem",
            borderTop: "1px solid var(--border)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          <span>{post.publishedAt}</span>
          <span>
            {post.readMinutes} min · {post.views} views
          </span>
        </div>
        <div
          style={{
            marginTop: "1rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--machine-accent)",
          }}
        >
          Read →
        </div>
      </article>
    </Link>
  </motion.div>
);

export default function BlogPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <Navigation />
      <section style={{ padding: "8rem 0 5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
          <SectionTitle title="Writing" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              textAlign: "center",
              color: "var(--text-secondary)",
              maxWidth: "600px",
              margin: "0 auto 3rem",
              fontSize: "1rem",
              fontStyle: "italic",
              fontFamily: "var(--font-serif)",
            }}
          >
            Notes on DeFi, digital identity, NFTs, and the slow collision of finance with open networks.
          </motion.p>
          <motion.div
            className="responsive-grid-cards"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </motion.div>
          <p
            style={{
              marginTop: "3rem",
              textAlign: "center",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            More articles coming soon
          </p>
        </div>
      </section>
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
