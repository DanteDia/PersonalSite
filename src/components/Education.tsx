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
      degree: "Data Analytics",
      school: "Henry — 2024",
      detail: "700-hour intensive program | Python, SQL, Power BI, pandas, data visualization"
    },
    {
      degree: "Gritnova: Blockchain Crypto Management",
      school: "New York, USA — 2022-2023",
      detail: "Selected among thousands for prestige program by Ethereum, Solana, Avax & Algorand Foundations"
    },
    {
      degree: "Bachelor in Business Economics",
      school: "Torcuato Di Tella University (UTDT) — 2016-2020",
      detail: "Scholarship + Minor in Digital Marketing & Data Analytics"
    },
    {
      degree: "Exchange Program",
      school: "Aalto University, Helsinki — 2019",
      detail: "Neuroscience, Philosophy, Business & Art"
    }
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
