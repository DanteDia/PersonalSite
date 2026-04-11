"use client";
import CellularAutomataBackground from './CellularAutomataBackground';

export default function Hero() {
  return (
    <header style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '6rem 1.5rem 4rem',
      overflow: 'hidden',
    }}>
      <CellularAutomataBackground />
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '800px',
        animation: 'fadeInUp 0.8s ease-in-out forwards',
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 500,
          marginBottom: '1.5rem',
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          fontFamily: 'var(--font-serif)',
        }}>
          Business Intelligence & Data Automation Specialist
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-secondary)',
          fontStyle: 'italic',
          marginBottom: '2.5rem',
          fontFamily: 'var(--font-serif)',
        }}>
          From the Brazilian jungle to banking data pipelines. 5 countries. Infinite curiosity.
        </p>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1rem',
          color: 'var(--text-primary)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          border: '1px solid var(--border)',
          backgroundColor: 'rgba(252, 250, 248, 0.8)',
        }}>
          <span>&gt;</span>
          <span style={{
            display: 'inline-block',
            width: '10px',
            height: '1.4em',
            backgroundColor: 'var(--machine-active)',
            animation: 'blink 1s step-end infinite',
          }} />
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </header>
  );
}
