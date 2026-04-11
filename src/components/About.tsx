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
            Business Intelligence Analyst bridging enterprise data systems with AI-driven automation. Currently architecting end-to-end data pipelines at <strong style={{ color: 'var(--text-primary)' }}>BIND (Banco Industrial)</strong>, transforming raw financial data into real-time actionable intelligence.
          </p>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            textAlign: 'justify',
            marginBottom: 0,
            lineHeight: 1.7,
          }}>
            From the Brazilian jungle to blockchain tokenization to banking data architecture — I bring cross-context pattern recognition to complex technical challenges. Seeking to leverage operational AI experience at the frontier of human-AI collaboration.
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
            <SkillCategory title="Data & Analytics" skills="Python, SQL, ETL pipelines, Power BI, Looker Studio, pandas, NumPy, matplotlib, real-time dashboards" />
            <SkillCategory title="Automation & Integration" skills="Zapier, n8n, API integrations, Google Sheets automation, process automation, Zoho Books" />
            <SkillCategory title="Blockchain & Emerging Tech" skills="Token economics, DeFi, smart contract analysis, Ethereum, Solana, Avax, Algorand" />
          </div>
        </div>
      </div>
    </section>
  );
}
