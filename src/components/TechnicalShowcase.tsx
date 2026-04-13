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
    { text: "$ dante-cli status --all", type: "command" as const, delay: 800 },
    { text: "", type: "output" as const, delay: 300 },
    { text: "  PRODUCT                     STATUS    STACK", type: "output" as const, delay: 200 },
    { text: "  ─────────────────────────────────────────────", type: "output" as const, delay: 150 },
    { text: "  industriesverified.com       ● online  GenLayer · Supabase · FastAPI", type: "output" as const, delay: 400 },
    { text: "  fund-management-platform     ● online  Next.js 16 · Recharts · Tailwind", type: "output" as const, delay: 350 },
    { text: "  big-pdf-converter            ● online  Streamlit · Datalab OCR", type: "output" as const, delay: 300 },
    { text: "  zoho-looker-pipeline         ● online  Zapier · Google Sheets · Looker", type: "output" as const, delay: 300 },
    { text: "  powerbi-cartographer         ○ local   Python · pbixray · duckdb", type: "output" as const, delay: 300 },
    { text: "  openclaw                     ◐ building  Claude SDK · MCP · agents", type: "output" as const, delay: 400 },
    { text: "", type: "output" as const, delay: 200 },
    { text: "  6 products · 4 online · 1 local · 1 building", type: "comment" as const, delay: 500 },
    { text: "  last deploy: industriesverified.com — 2h ago", type: "comment" as const, delay: 400 },
  ];

  return (
    <section style={{ padding: "5rem 0" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
        <SectionTitle title="System Status" />
        <p
          style={{
            textAlign: "center",
            color: "var(--text-secondary)",
            maxWidth: "640px",
            margin: "0 auto 2.5rem",
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
          }}
        >
          Everything I build, ship, and maintain — from one terminal.
        </p>
        <Terminal variant="dark" title="~/dante-workspace" lines={terminalLines} />
      </div>
    </section>
  );
}
