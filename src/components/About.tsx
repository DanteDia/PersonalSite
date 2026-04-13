"use client";
import { motion } from "framer-motion";

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export default function About() {
  return (
    <section id="about" style={{ padding: "5rem 0" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
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
          About
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

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ maxWidth: "700px", margin: "0 auto 3rem" }}
        >
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              textAlign: "justify",
              marginBottom: 0,
              lineHeight: 1.7,
            }}
          >
            Business Intelligence Analyst bridging enterprise data systems with modern automation. Currently
            architecting end-to-end data pipelines at{" "}
            <strong style={{ color: "var(--text-primary)" }}>BIND (Banco Industrial)</strong>, turning raw
            financial data into real-time, executive-ready intelligence. I bring cross-context pattern recognition
            to complex technical challenges. Hands on building multi-agent orchestration systems both for personal
            and enterprise use.{" "}
            <strong style={{ color: "var(--text-primary)" }}>Industriesverified.com</strong>, an industry mapping
            platform being 24/7 built by research agents and data verified by GenLayer AI-Blockchain.
          </p>
        </motion.div>

        <div style={{ marginTop: "3rem" }}>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{
              fontSize: "1.2rem",
              textAlign: "center",
              marginBottom: "1.5rem",
              color: "var(--text-muted)",
              fontWeight: 400,
              textTransform: "lowercase" as const,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.05em",
            }}
          >
            technical skills
          </motion.h3>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              { title: "Data & Analytics", skills: "Python, SQL, pandas, duckdb, pbixray, Power BI, DAX, Power Query, Looker Studio, Recharts, openpyxl, Streamlit, ETL pipelines" },
              { title: "Backend & Automation", skills: "FastAPI, Uvicorn, Pydantic, Supabase, OpenAI API, httpx, aiohttp, Zapier, n8n, Zoho Books, Google Sheets automation" },
              { title: "Frontend & Visualization", skills: "Next.js 16, React 19, TypeScript, Tailwind CSS 4, Cobe (3D globe), React Force Graph, Recharts, Lucide, Framer Motion" },
              { title: "AI Agents & Orchestration", skills: "OpenClaw, Claude Agent SDK, MCP (Model Context Protocol), multi-agent orchestration, sub-agent routing, autonomous workflows, OpenRouter, LLM pipelines" },
              { title: "Blockchain", skills: "GenLayer (industriesverified.com), smart contract analysis, token economics, DeFi protocols, Ethereum, Polygon (oxygentoken.org)" },
            ].map((cat) => (
              <motion.div
                key={cat.title}
                variants={fadeUp}
                whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}
                style={{
                  padding: "1.5rem",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-alt)",
                }}
              >
                <h4
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    marginBottom: "0.75rem",
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  {cat.title}
                </h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
                  {cat.skills}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
