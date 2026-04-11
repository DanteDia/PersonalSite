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

export default function SpeakingEvents() {
  return (
    <section id="speaking" style={{ padding: '5rem 0' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionTitle title="Speaking & Events" />
        <article style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '2rem',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-alt)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            flexWrap: 'wrap' as const,
            gap: '0.5rem',
            marginBottom: '0.5rem',
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              margin: 0,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-serif)',
            }}>
              Business Developer — Cryptomate
            </h3>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              textTransform: 'uppercase' as const,
              letterSpacing: '0.05em',
              padding: '0.2rem 0.6rem',
              background: 'var(--bg-primary)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
            }}>
              2022
            </span>
          </div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.05em',
            marginBottom: '1.25rem',
          }}>
            California, USA
          </p>
          <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
            <li style={{
              position: 'relative',
              paddingLeft: '1.5rem',
              marginBottom: '0.6rem',
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
              lineHeight: 1.65,
            }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--machine-accent)' }}>—</span>
              Speaker / pitching at <strong style={{ color: 'var(--text-primary)' }}>Draper Goren Holm, LA Blockchain Summit 2022</strong>
            </li>
            <li style={{
              position: 'relative',
              paddingLeft: '1.5rem',
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
              lineHeight: 1.65,
            }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--machine-accent)' }}>—</span>
              Attending IRL conferences — connection building and lead generation
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}
