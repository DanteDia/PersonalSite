"use client";

const SectionTitle = ({ title }: { title: string }) => (
  <h2 style={{ fontSize: '1.8rem', marginBottom: '2.5rem', textAlign: 'center', position: 'relative', color: 'var(--text-primary)', fontWeight: 500, fontFamily: 'var(--font-serif)' }}>
    {title}
    <span style={{ display: 'block', width: '40px', height: '2px', background: 'var(--machine-accent)', margin: '1rem auto 0', opacity: 0.6 }} />
  </h2>
);

const ProjectCard = ({ title, status, link, description, tech }: { title: string; status?: string; link?: string; description: string; tech: string[] }) => (
  <article style={{
    padding: '2rem',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--bg-alt)',
    transition: 'all 0.5s ease-in-out',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '0.75rem', flexWrap: 'wrap' as const }}>
      <h3 style={{ fontSize: '1.15rem', fontWeight: 600, margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>{title}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {status && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase' as const, letterSpacing: '0.05em', padding: '0.2rem 0.6rem', background: 'var(--machine-base)', color: 'var(--machine-accent)', border: '1px solid var(--machine-active)' }}>{status}</span>}
        {link && <a href={link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--machine-accent)', textDecoration: 'none' }}>{link.includes('github.com') ? 'GitHub →' : 'Live →'}</a>}
      </div>
    </div>
    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.2rem', lineHeight: 1.65 }}>{description}</p>
    <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.4rem' }}>
      {tech.map(t => <code key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', padding: '0.2rem 0.5rem', background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: '2px' }}>{t}</code>)}
    </div>
  </article>
);

export default function Projects() {
  const projects = [
    {
      title: "Panorama Verde",
      status: "Hackathon Winner",
      link: "https://github.com/DanteDia/argentina-green-panorama",
      description: "A 3D atlas of Argentina's green economy. Carbon corridors, agricultural flows, and green-finance signals rendered on an interactive globe, with on-chain verification through GenLayer (industriesverified.com) and LLM-assisted insights via OpenAI.",
      tech: ["Next.js 16", "TypeScript", "Supabase", "GenLayer", "FastAPI", "OpenAI", "Cobe", "React Force Graph"]
    },
    {
      title: "Cables",
      link: "https://github.com/DanteDia/DashboardFintech",
      description: "A minimalist real-time fintech command deck for fund tracking and portfolio signals. Built on Recharts and Lucide for traders who don't want another cluttered BI tool.",
      tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind 4", "Recharts", "Lucide"]
    },
    {
      title: "Power BI Cartographer",
      link: "https://github.com/DanteDia/Powerbi-AI",
      description: "A Python toolchain that reverse-engineers legacy Power BI models — 62 tables, 82 DAX measures, 98 pages — into a documented migration plan. Uses pbixray + duckdb + networkx to map entities, audit measures, and plan a clean SQL rebuild.",
      tech: ["Python", "pbixray", "duckdb", "pandas", "networkx", "DAX", "SQL"]
    },
    {
      title: "BIG PDF to Excel Converter",
      link: "https://big-pdf-to-excel-converter.streamlit.app",
      description: "Automated tax report processing for Argentine financial markets. Converts Datalab PDFs into structured Excel with intelligent post-processing.",
      tech: ["Python", "Streamlit", "Datalab OCR API", "openpyxl"]
    },
    {
      title: "Zoho Books → Looker Studio Pipeline",
      link: "https://github.com/DanteDia/Zoho-Books-Real-Time-Data-Integration-with-Zapier-and-Looker-Studio",
      description: "Automated accounting data flow using Zapier and Google Sheets. Real-time financial visualization without manual exports.",
      tech: ["Zoho Books", "Zapier", "Google Sheets", "Looker Studio"]
    },
  ];

  return (
    <section id="projects" style={{ padding: '5rem 0' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionTitle title="Featured Projects" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {projects.map((p, i) => <ProjectCard key={i} {...p} />)}
        </div>
      </div>
    </section>
  );
}
