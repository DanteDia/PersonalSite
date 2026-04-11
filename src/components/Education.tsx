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

const EducationItem = ({ degree, school, detail }: { degree: string; school: string; detail: string }) => (
  <article style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--border)' }}>
    <h3 style={{
      fontSize: '1.1rem',
      fontWeight: 600,
      marginBottom: '0.3rem',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-serif)',
    }}>{degree}</h3>
    <span style={{
      display: 'block',
      fontSize: '0.9rem',
      color: 'var(--machine-accent)',
      fontStyle: 'italic',
      marginBottom: '0.5rem',
    }}>{school}</span>
    <p style={{
      fontSize: '0.9rem',
      color: 'var(--text-secondary)',
      margin: 0,
      lineHeight: 1.6,
    }}>{detail}</p>
  </article>
);

export default function Education() {
  const education = [
    {
      degree: "Data Analytics by Henry",
      school: "Henry — 2024",
      detail: "700 Hours Program focused on data analytics, visualization, and business intelligence | Python, SQL, pandas, Power BI, matplotlib, seaborn"
    },
    {
      degree: "Gritnova: Blockchain Crypto Management",
      school: "New York, USA — 2022–2023",
      detail: "Chosen between thousands to participate in prestige program given by Ethereum, Solana, Avax & Algorand Foundations"
    },
    {
      degree: "Minor in Digital Marketing & Data Analytics",
      school: "Torcuato Di Tella University (UTDT) — 2019–2020, Buenos Aires, Argentina",
      detail: "Post-degree minor in applied data analytics and digital marketing"
    },
    {
      degree: "Exchange Program",
      school: "Aalto University — 2019, Helsinki, Finland",
      detail: "Art, Music, Philosophy, Neuroscience & Business studies"
    },
    {
      degree: "Bachelor in Business Economics",
      school: "Torcuato Di Tella University (UTDT) — 2016–2019, Buenos Aires, Argentina",
      detail: "Scholarship awarded for high-school academic performance"
    },
    {
      degree: "High School Diploma",
      school: "ILSE — 2011–2015, Buenos Aires, Argentina",
      detail: "Graduated from one of the top high schools in Latin America"
    },
  ];

  return (
    <section id="education" style={{ padding: '5rem 0' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionTitle title="Education" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {education.map((e, i) => <EducationItem key={i} {...e} />)}
        </div>
      </div>
    </section>
  );
}
