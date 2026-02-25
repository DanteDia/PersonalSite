"use client";

const SectionTitle = ({ title }: { title: string }) => (
  <h2 style={{ fontSize: '1.8rem', marginBottom: '2.5rem', textAlign: 'center', position: 'relative', color: '#1a1a1a', fontWeight: 500 }}>
    {title}
    <span style={{ display: 'block', width: '40px', height: '2px', background: '#16a34a', margin: '1rem auto 0', opacity: 0.6 }} />
  </h2>
);

const ExperienceItem = ({ role, company, date, achievements }: { role: string; company: string; date: string; achievements: string[] }) => (
  <article style={{ padding: '2rem 0', borderBottom: '1px solid #e5e3df' }}>
    <div style={{ marginBottom: '1.2rem' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.3rem' }}>{role}</h3>
      <span style={{ display: 'block', fontSize: '1rem', color: '#16a34a', fontWeight: 500, marginBottom: '0.3rem' }}>{company}</span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#6a6a6a', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>{date}</span>
    </div>
    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
      {achievements.map((item, index) => (
        <li key={index} style={{ position: 'relative', paddingLeft: '1.5rem', marginBottom: '0.6rem', color: '#4a4a4a', fontSize: '0.95rem' }}>
          <span style={{ position: 'absolute', left: 0, color: '#16a34a' }}>—</span>
          <span dangerouslySetInnerHTML={{ __html: item }} />
        </li>
      ))}
    </ul>
  </article>
);

export default function Experience() {
  const experiences = [
    {
      role: 'Business Intelligence Analyst',
      company: 'BIND (Banco Industrial)',
      date: '2024–Present | Buenos Aires',
      achievements: [
        'Architect ETL pipelines processing high-volume financial records, reducing reporting latency to real-time',
        'Design automation workflows eliminating manual export/import cycles',
        'Create executive dashboards for C-suite decision-making',
        'Bridge gap between legacy systems and modern cloud analytics',
      ]
    },
    {
      role: 'Project Manager & Business Development',
      company: 'Oxygen Token',
      date: '2021–2023 | Remote',
      achievements: [
        'Led tokenization strategy for <strong>50K+ hectares</strong> of Argentinian forest carbon credits',
        'Coordinated stakeholders across Argentina, Brazil, Germany (5 time zones, 3 languages)',
        'Built operational infrastructure connecting DeFi protocols with real-world carbon assets',
      ]
    },
    {
      role: 'BI Analyst',
      company: 'BAFA (Financial Services)',
      date: '2018–2021 | Buenos Aires',
      achievements: [
        'Migrated legacy Excel workflows to cloud-based analytics (BigQuery, Looker)',
        'Reduced manual reporting time by <strong>85%</strong> through automation',
        'Enabled data-driven decisions for trading operations ($50M+ volume)',
      ]
    }
  ];

  return (
    <section id="experience" style={{ padding: '5rem 0', backgroundColor: '#f5f3ef', borderTop: '1px solid #e5e3df', borderBottom: '1px solid #e5e3df' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionTitle title="Experience" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {experiences.map((exp, index) => (
            <ExperienceItem key={index} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
