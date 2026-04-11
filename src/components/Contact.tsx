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

const ContactLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" style={{
    fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem',
    color: 'var(--text-primary)',
    padding: '0.8rem 1.5rem',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--bg-alt)',
    textDecoration: 'none',
    transition: 'all 0.5s ease-in-out',
  }}>
    {children}
  </a>
);

export default function Contact() {
  return (
    <section id="contact" style={{
      padding: '5rem 0',
      backgroundColor: 'var(--bg-alt)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionTitle title="Contact" />
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            marginBottom: '1rem',
            lineHeight: 1.7,
          }}>
            Whether you need help automating data chaos, want to talk blockchain, or just want to swap jungle survival stories — I&apos;m here.
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.05em',
            marginBottom: '2rem',
          }}>
            Based in Argentina · Working globally · Usually caffeinated
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap' as const,
          }}>
            <ContactLink href="mailto:aroladante@gmail.com">aroladante@gmail.com</ContactLink>
            <ContactLink href="https://www.linkedin.com/in/dante-arola-81456712a/">LinkedIn</ContactLink>
            <ContactLink href="https://github.com/DanteDia">GitHub</ContactLink>
            <ContactLink href="https://x.com/dante_arola">X / Twitter</ContactLink>
          </div>
        </div>
      </div>
    </section>
  );
}
