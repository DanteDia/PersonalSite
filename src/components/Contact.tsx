"use client";

const SectionTitle = ({ title }: { title: string }) => (
  <h2 style={{ fontSize: '1.8rem', marginBottom: '2.5rem', textAlign: 'center', position: 'relative', color: '#1a1a1a', fontWeight: 500 }}>
    {title}
    <span style={{ display: 'block', width: '40px', height: '2px', background: '#16a34a', margin: '1rem auto 0', opacity: 0.6 }} />
  </h2>
);

const ContactLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" style={{
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.9rem',
    color: '#1a1a1a',
    padding: '0.8rem 1.5rem',
    border: '1px solid #e5e3df',
    backgroundColor: '#faf8f4',
    textDecoration: 'none',
    transition: 'all 0.5s ease-in-out',
  }}>
    {children}
  </a>
);

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '5rem 0' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionTitle title="Contact" />
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ fontSize: '1.1rem', color: '#4a4a4a', marginBottom: '2rem' }}>
            Interested in collaborating or have a project in mind? Let's connect.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' as const }}>
            <ContactLink href="mailto:aroladante@gmail.com">aroladante@gmail.com</ContactLink>
            <ContactLink href="https://github.com/DanteDia">GitHub</ContactLink>
            <ContactLink href="https://dantearola.com">dantearola.com</ContactLink>
          </div>
        </div>
      </div>
    </section>
  );
}
