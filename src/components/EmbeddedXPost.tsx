"use client";
import React from 'react';

// Simplified Twitter/X Icon
const XIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '1.2em', height: '1.2em', fill: 'var(--text-primary)' }}>
        <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
        </g>
    </svg>
);

export default function EmbeddedXPost() {
  // TODO(confirm): tweet URL looks synthetic (status ID embeds "2026"); replace with real tweet from @dante_arola
  const postUrl = "https://x.com/dante_arola/status/2026508473022779509?s=46";

  return (
    <section style={{ padding: '5rem 0', backgroundColor: '#f5f3ef', borderTop: '1px solid #e5e3df', borderBottom: '1px solid #e5e3df' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 1.5rem' }}>
            <a href={postUrl} target="_blank" rel="noopener noreferrer" style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-primary)',
                padding: '1.5rem',
                transition: 'all 0.3s ease',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <img src="https://pbs.twimg.com/profile_images/1788229729828552704/o5-E1c3G_400x400.jpg" alt="Dante Arola" style={{ width: '48px', height: '48px', borderRadius: '50%', marginRight: '12px' }} />
                    <div style={{ flex: 1 }}>
                        <h4 style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>Dante Arola</h4>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>@dante_arola</p>
                    </div>
                    <XIcon />
                </div>
                
                <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                    The next step in AI agents is not just giving them tools, but wallets.
                    <br /><br />
                    When an agent can hold value, execute transactions, and participate in an economy, it transitions from a utility to a sovereign participant.
                    <br /><br />
                    This is the foundation for Web4.
                </p>

                <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span>10:30 AM · Feb 25, 2026</span>
                </div>
            </a>
        </div>
    </section>
  );
}
