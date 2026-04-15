"use client";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{ padding: "5rem 0", backgroundColor: "var(--bg-alt)", borderTop: "1px solid var(--border)" }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: "1.8rem", marginBottom: "2.5rem", textAlign: "center", color: "var(--text-primary)", fontWeight: 500, fontFamily: "var(--font-serif)" }}
        >
          Contact
          <span style={{ display: "block", width: "40px", height: "2px", background: "var(--machine-accent)", margin: "1rem auto 0", opacity: 0.6 }} />
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}
        >
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "1rem", lineHeight: 1.7 }}>
            Whether you need help automating data chaos, want to talk blockchain, or just want to swap jungle
            survival stories — I&apos;m here.
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              textTransform: "uppercase" as const,
              letterSpacing: "0.05em",
              marginBottom: "2rem",
            }}
          >
            Based in Argentina · Working globally · Usually caffeinated
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" as const }}>
            {[
              { href: "mailto:aroladante@gmail.com", label: "aroladante@gmail.com" },
              { href: "https://www.linkedin.com/in/dante-arola-81456712a/", label: "LinkedIn" },
              { href: "https://github.com/DanteDia", label: "GitHub" },
              { href: "https://x.com/dante_arola", label: "X / Twitter" },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, boxShadow: "0 4px 14px rgba(0,0,0,0.06)" }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.9rem",
                  color: "var(--text-primary)",
                  padding: "1rem 1.5rem",
                  minHeight: "44px",
                  display: "inline-flex",
                  alignItems: "center",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-alt)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
