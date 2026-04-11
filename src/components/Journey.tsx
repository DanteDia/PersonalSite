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

type Chapter = {
  index: string;
  place: string;
  chapter: string;
  title: string;
  body: string;
  pullQuote: string;
};

const chapters: Chapter[] = [
  {
    index: '01',
    place: 'BUENOS AIRES',
    chapter: 'The Foundation',
    title: 'Business Economics at UTDT',
    body: 'Bachelor in Business Economics at Torcuato Di Tella University on a scholarship earned from top grades at ILSE. Econometrics, capital markets, digital marketing, and data analytics — the economic first-principles that still shape how I think about data.',
    pullQuote: 'First principles over frameworks',
  },
  {
    index: '02',
    place: 'BRAZIL',
    chapter: 'The Reset',
    title: '6 Months in the Jungle',
    body: 'Solo permaculture deep in the Amazon. Self-sustained living. No internet, no shortcuts — just systems that had to work.',
    pullQuote: 'Everything is figureoutable',
  },
  {
    index: '03',
    place: 'ARGENTINA',
    chapter: 'The Pivot',
    title: 'Blockchain & Startups',
    body: 'Project Manager at Oxygen — tokenizing and monetizing native forests. Business development in the crypto frontier.',
    pullQuote: 'Where sustainability meets blockchain',
  },
  {
    index: '04',
    place: 'BIND',
    chapter: 'Now',
    title: 'Data Automation at Scale',
    body: 'Building data pipelines from extraction to analysis. Automating the flow of financial intelligence.',
    pullQuote: 'Making banking data dance',
  },
];

const ChapterCard = ({ item }: { item: Chapter }) => (
  <article style={{
    padding: '2rem',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--bg-alt)',
    transition: 'all 0.5s ease-in-out',
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: '0.75rem',
      marginBottom: '0.75rem',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.75rem',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.08em',
      color: 'var(--text-muted)',
    }}>
      <span style={{ color: 'var(--machine-accent)', fontWeight: 600 }}>{item.index}</span>
      <span>/</span>
      <span>{item.place}</span>
    </div>
    <p style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.8rem',
      color: 'var(--text-secondary)',
      marginBottom: '0.5rem',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    }}>
      {item.chapter}
    </p>
    <h3 style={{
      fontSize: '1.25rem',
      fontWeight: 600,
      marginBottom: '1rem',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-serif)',
    }}>
      {item.title}
    </h3>
    <p style={{
      fontSize: '1rem',
      color: 'var(--text-secondary)',
      marginBottom: '1.25rem',
      lineHeight: 1.65,
    }}>
      {item.body}
    </p>
    <p style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.8rem',
      color: 'var(--machine-accent)',
      fontStyle: 'italic',
      margin: 0,
      paddingTop: '0.75rem',
      borderTop: '1px solid var(--border)',
    }}>
      → {item.pullQuote}
    </p>
  </article>
);

export default function Journey() {
  return (
    <section id="journey" style={{ padding: '5rem 0' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionTitle title="The Path" />
        <p style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto 3rem',
          fontSize: '1rem',
          fontStyle: 'italic',
          fontFamily: 'var(--font-serif)',
        }}>
          Not a linear career. A series of deep dives into whatever needed figuring out.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem',
        }}>
          {chapters.map((c) => <ChapterCard key={c.index} item={c} />)}
        </div>
      </div>
    </section>
  );
}
