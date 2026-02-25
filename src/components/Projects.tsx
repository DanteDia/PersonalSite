"use client";

const SectionTitle = ({ title }: { title: string }) => (
  <h2 style={{ fontSize: '1.8rem', marginBottom: '2.5rem', textAlign: 'center', position: 'relative', color: '#1a1a1a', fontWeight: 500 }}>
    {title}
    <span style={{ display: 'block', width: '40px', height: '2px', background: '#16a34a', margin: '1rem auto 0', opacity: 0.6 }} />
  </h2>
);

const ProjectCard = ({ title, status, link, description, tech }: { title: string; status?: string; link?: string; description: string; tech: string[] }) => (
  <article style={{
    padding: '2rem',
    border: '1px solid #e5e3df',
    backgroundColor: '#faf8f4',
    transition: 'all 0.5s ease-in-out',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>{title}</h3>
      {status && <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', textTransform: 'uppercase' as const, letterSpacing: '0.05em', padding: '0.2rem 0.6rem', background: '#f5f3ef', color: '#6a6a6a', border: '1px solid #e5e3df' }}>{status}</span>}
      {link && <a href={link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#16a34a', textDecoration: 'none' }}>Live →</a>}
    </div>
    <p style={{ fontSize: '0.95rem', color: '#4a4a4a', marginBottom: '1.2rem', lineHeight: 1.6 }}>{description}</p>
    <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.5rem' }}>
      {tech.map(t => <code key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: '#f5f3ef', border: '1px solid #e5e3df', color: '#4a4a4a', borderRadius: '2px' }}>{t}</code>)}
    </div>
  </article>
);

export default function Projects() {
  const projects = [
    {
      title: "Mission Control",
      status: "Current",
      description: "Multi-agent system for orchestrating specialized AI subagents with real-time Convex sync.",
      tech: ["Next.js 16", "Convex", "TypeScript 5", "Tailwind"]
    },
    {
      title: "BIG PDF to Excel Converter",
      link: "https://big-pdf-to-excel-converter.streamlit.app",
      description: "Automated tax report processing for Argentine financial markets. Converts Datalab PDFs into structured Excel with intelligent post-processing.",
      tech: ["Python", "Streamlit", "Datalab OCR API", "openpyxl"]
    },
    {
      title: "Fund Navigator X",
      status: "Private",
      description: "Portfolio analysis and navigation platform. Real-time fund tracking with automated rebalancing signals and risk metrics.",
      tech: ["TypeScript", "Node.js", "Financial APIs"]
    },
    {
      title: "Zoho Books to Looker Studio Pipeline",
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
