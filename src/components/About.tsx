"use client";

const SectionTitle = ({ title }: { title: string }) => (
  <h2 style={{
    fontSize: '1.8rem',
    marginBottom: '2.5rem',
    textAlign: 'center',
    position: 'relative',
    color: 'var(--text-primary)',
    fontWeight: 500,
    fontFamily: 'var(--font-serif)',
  }}>
    {title}
    <span style={{
      display: 'block',
      width: '40px',
      height: '2px',
      background: 'var(--machine-accent)',
      margin: '1rem auto 0',
      opacity: 0.6,
    }} />
  </h2>
);

const SkillCategory = ({ title, skills }: { title: string, skills: string }) => (
  <div style={{
    padding: '1.5rem',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--bg-alt)',
    transition: 'all 0.5s ease-in-out',
  }}>
    <h4 style={{
      fontSize: '0.95rem',
      fontWeight: 600,
      marginBottom: '0.75rem',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-serif)',
    }}>
      {title}
    </h4>
    <p style={{
      fontSize: '0.9rem',
      color: 'var(--text-secondary)',
      margin: 0,
      lineHeight: 1.6,
    }}>
      {skills}
    </p>
  </div>
);

export default function About() {
  return (
    <section id="about" style={{ padding: '5rem 0' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionTitle title="About" />
        <div style={{ maxWidth: '700px', margin: '0 auto 3rem' }}>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            textAlign: 'justify',
            marginBottom: '1.2rem',
            lineHeight: 1.7,
          }}>
            Business Intelligence Analyst bridging enterprise data systems with modern automation. Currently architecting end-to-end data pipelines at <strong style={{ color: 'var(--text-primary)' }}>BIND (Banco Industrial)</strong>, turning raw financial data into real-time, executive-ready intelligence.
          </p>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            textAlign: 'justify',
            marginBottom: 0,
            lineHeight: 1.7,
          }}>
            From the Brazilian jungle to blockchain tokenization to banking data architecture — I bring cross-context pattern recognition to complex technical challenges. Currently building <strong style={{ color: 'var(--text-primary)' }}>OpenClaw</strong>, a multi-agent orchestration layer, and recently won a hackathon with <strong style={{ color: 'var(--text-primary)' }}>Industriesverified.com</strong>, an on-chain verification platform built on GenLayer.
          </p>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <h3 style={{
            fontSize: '1.2rem',
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: 'var(--text-muted)',
            fontWeight: 400,
            textTransform: 'lowercase' as const,
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.05em',
          }}>
            technical skills
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}>
            <SkillCategory
              title="Data & Analytics"
              skills="Python, SQL, pandas, duckdb, pbixray, Power BI, DAX, Power Query, Looker Studio, Recharts, openpyxl, Streamlit, ETL pipelines"
            />
            <SkillCategory
              title="Backend & Automation"
              skills="FastAPI, Uvicorn, Pydantic, Supabase, OpenAI API, httpx, aiohttp, Zapier, n8n, Zoho Books, Google Sheets automation"
            />
            <SkillCategory
              title="Frontend & Visualization"
              skills="Next.js 16, React 19, TypeScript, Tailwind CSS 4, Cobe (3D globe), React Force Graph, Recharts, Lucide, Framer Motion"
            />
            <SkillCategory
              title="AI Agents & Orchestration"
              skills="OpenClaw, Claude Agent SDK, MCP (Model Context Protocol), multi-agent orchestration, sub-agent routing, autonomous workflows, OpenRouter, LLM pipelines"
            />
            <SkillCategory
              title="Blockchain & Verification"
              skills="GenLayer (industriesverified.com), smart contract analysis, token economics, DeFi protocols, Ethereum, Solana, Avax, Algorand"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
