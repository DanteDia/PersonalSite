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

type Card = {
  role: string;
  org: string;
  location: string;
  date: string;
  bullets: string[];
};

const cards: Card[] = [
  {
    role: 'Business Developer',
    org: 'Cryptomate',
    location: 'California, USA',
    date: '2022',
    bullets: [
      'Speaker / pitching at <strong>Draper Goren Holm — LA Blockchain Summit 2022</strong>',
      'Attending IRL conferences — connection building and lead generation',
    ],
  },
  {
    role: 'Event Producer',
    org: 'Outlo.ba · Trascendence · Jet Buenos Aires · Qurable · Aura.fabrica · Ruptive Creative',
    location: 'Buenos Aires, Argentina',
    date: '2022',
    bullets: [
      'Produced the first IRL/Web3 crypto party fusion, hosted at <strong>@Jetbuenosaires</strong> — one of the top clubs in town',
      'Fashion by <strong>@Outlo.ba</strong> with NFT ticketing by <strong>@Qurable</strong>: avatars with digital clothing announcing the brand\u2019s new season release',
      'DJs playing IRL and simultaneously inside the <strong>@ruptivecreative</strong> spatial metaverse',
      'NFT gallery curated by <strong>@aura.fabrica</strong>',
    ],
  },
  {
    role: 'Educator',
    org: 'Independent',
    location: 'Buenos Aires, Argentina',
    date: '2022–2023',
    bullets: [
      'Designed and delivered an <strong>NFT Workshop for Artists</strong> for <strong>@agora.ciclo</strong>',
      'Seminar on <strong>Metaverse & Banking</strong> at a National University',
      'Green Finance seminar at <strong>Universidad Nacional Agraria La Molina (UNALM)</strong>, Peru',
    ],
  },
];

const Bullet = ({ html }: { html: string }) => (
  <li style={{
    position: 'relative',
    paddingLeft: '1.5rem',
    marginBottom: '0.6rem',
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    lineHeight: 1.65,
  }}>
    <span style={{ position: 'absolute', left: 0, color: 'var(--machine-accent)' }}>—</span>
    <span dangerouslySetInnerHTML={{ __html: html }} />
  </li>
);

const EventCard = ({ card }: { card: Card }) => (
  <article style={{
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
      marginBottom: '0.3rem',
    }}>
      <h3 style={{
        fontSize: '1.2rem',
        fontWeight: 600,
        margin: 0,
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-serif)',
      }}>
        {card.role}
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
        {card.date}
      </span>
    </div>
    <p style={{
      fontSize: '0.95rem',
      color: 'var(--machine-accent)',
      fontStyle: 'italic',
      margin: '0 0 0.3rem 0',
    }}>
      {card.org}
    </p>
    <p style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.8rem',
      color: 'var(--text-muted)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      marginBottom: '1.25rem',
    }}>
      {card.location}
    </p>
    <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
      {card.bullets.map((b, i) => <Bullet key={i} html={b} />)}
    </ul>
  </article>
);

export default function SpeakingEvents() {
  return (
    <section id="speaking" style={{ padding: '5rem 0' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionTitle title="Speaking & Events" />
        <p style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto 3rem',
          fontSize: '1rem',
          fontStyle: 'italic',
          fontFamily: 'var(--font-serif)',
        }}>
          Extras. Side roles where the web3/AI world and the physical world collided.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {cards.map((c, i) => <EventCard key={i} card={c} />)}
        </div>
      </div>
    </section>
  );
}
