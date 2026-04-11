"use client";
import Terminal from "./Terminal";

const SectionTitle = ({ title }: { title: string }) => (
  <h2
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
  </h2>
);

export default function TechnicalShowcase() {
  const terminalLines = [
    { text: "# Stack used on the current repo", type: "comment" as const, delay: 500 },
    { text: "cat package.json | jq '.dependencies'", type: "command" as const, delay: 1200 },
    { text: '  "next": "16.2.1",', type: "output" as const, delay: 300 },
    { text: '  "react": "19.2.4",', type: "output" as const, delay: 250 },
    { text: '  "@supabase/supabase-js": "2.99.3",', type: "output" as const, delay: 250 },
    { text: '  "genlayer-js": "0.23.0",', type: "output" as const, delay: 250 },
    { text: '  "openai": "1.50.0"  # backend/requirements.txt', type: "output" as const, delay: 250 },
    { text: "# ↑ Panorama Verde — hackathon winner, Apr 2026", type: "comment" as const, delay: 700 },
  ];

  return (
    <section style={{ padding: "5rem 0" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
        <SectionTitle title="Technical Architecture" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "flex-start",
          }}
        >
          <p
            style={{
              textAlign: "center",
              color: "var(--text-secondary)",
              maxWidth: "640px",
              margin: "0 auto",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
            }}
          >
            I build systems that bridge enterprise data infrastructure with modern
            AI-assisted workflows — Next.js on the front, FastAPI + Supabase on the back,
            LLM calls where they actually add leverage.
          </p>
          <Terminal variant="dark" title="~/panorama-verde" lines={terminalLines} />
        </div>
      </div>
    </section>
  );
}
