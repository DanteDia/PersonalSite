"use client";
import { motion } from "framer-motion";

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const projects = [
  {
    title: "Industriesverified.com",
    status: "Hackathon Winner · Dev",
    link: "https://industriesverified.com",
    description: "On-chain verification infrastructure for real-world industrial data. Built on GenLayer with FastAPI + Supabase, with an OpenAI-assisted insight layer and a 3D globe of Argentina's green economy (the hackathon-winning Panorama Verde demo). The most important project on my desk right now.",
    tech: ["Next.js 16", "TypeScript", "Supabase", "GenLayer", "FastAPI", "OpenAI", "Cobe", "React Force Graph"],
  },
  {
    title: "Oxygen Token",
    status: "Blockchain PM",
    link: "https://oxygentoken.org",
    description: "Tokenization platform for native Argentinian forest carbon credits on Polygon. Led business development and project management across 5 time zones and 3 languages, connecting DeFi protocols with real-world environmental assets covering 50K+ hectares.",
    tech: ["Polygon", "Smart Contracts", "Token Economics", "DeFi", "Carbon Credits"],
  },
  {
    title: "Fund Management Platform",
    status: "Dev",
    link: "https://github.com/DanteDia/DashboardFintech",
    description: "Real-time portfolio tracking, fund analytics, and rebalancing signals. A minimalist command deck built on Recharts and Lucide for fund managers who don't want another cluttered BI tool.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind 4", "Recharts", "Lucide"],
  },
  {
    title: "Power BI Cartographer",
    status: "Dev",
    link: "https://github.com/DanteDia/Powerbi-AI",
    description: "A Python toolchain that reverse-engineers legacy Power BI models — 62 tables, 82 DAX measures, 98 pages — into a documented migration plan. Uses pbixray + duckdb + networkx to map entities, audit measures, and plan a clean SQL rebuild.",
    tech: ["Python", "pbixray", "duckdb", "pandas", "networkx", "DAX", "SQL"],
  },
  {
    title: "BIG PDF to Excel Converter",
    status: "Dev",
    link: "https://big-pdf-to-excel-converter.streamlit.app",
    description: "Automated tax report processing for Argentine financial markets. Converts Datalab PDFs into structured Excel with intelligent post-processing.",
    tech: ["Python", "Streamlit", "Datalab OCR API", "openpyxl"],
  },
  {
    title: "Zoho Books → Looker Studio Pipeline",
    link: "https://github.com/DanteDia/Zoho-Books-Real-Time-Data-Integration-with-Zapier-and-Looker-Studio",
    description: "Automated accounting data flow using Zapier and Google Sheets. Real-time financial visualization without manual exports.",
    tech: ["Zoho Books", "Zapier", "Google Sheets", "Looker Studio"],
  },
];

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "5rem 0" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: "1.8rem", marginBottom: "2.5rem", textAlign: "center", color: "var(--text-primary)", fontWeight: 500, fontFamily: "var(--font-serif)" }}
        >
          Featured Projects
          <span style={{ display: "block", width: "40px", height: "2px", background: "var(--machine-accent)", margin: "1rem auto 0", opacity: 0.6 }} />
        </motion.h2>
        <motion.div
          className="responsive-grid-cards"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          variants={stagger}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}
        >
          {projects.map((p) => (
            <motion.article
              key={p.title}
              variants={fadeUp}
              whileHover={{ y: -4, boxShadow: "0 8px 28px rgba(0,0,0,0.07)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{ padding: "2rem", border: "1px solid var(--border)", backgroundColor: "var(--bg-alt)", cursor: "default" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", gap: "0.75rem", flexWrap: "wrap" as const }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 600, margin: 0, color: "var(--text-primary)", fontFamily: "var(--font-serif)" }}>{p.title}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {p.status && <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", textTransform: "uppercase" as const, letterSpacing: "0.05em", padding: "0.2rem 0.6rem", background: "var(--machine-base)", color: "var(--machine-accent)", border: "1px solid var(--machine-active)" }}>{p.status}</span>}
                  {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--machine-accent)", textDecoration: "none" }}>{p.link.includes("github.com") ? "GitHub →" : "Live →"}</a>}
                </div>
              </div>
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginBottom: "1.2rem", lineHeight: 1.65 }}>{p.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.4rem" }}>
                {p.tech.map((t) => <code key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", padding: "0.2rem 0.5rem", background: "var(--bg-primary)", border: "1px solid var(--border)", color: "var(--text-secondary)", borderRadius: "2px" }}>{t}</code>)}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
