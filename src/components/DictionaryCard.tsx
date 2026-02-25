"use client";
import React from 'react';

const LockIcon = () => (
    <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
        <path d="M0 9H3V8H2V7H1V6H2V5H4V6H5V7H6V8H7V9H8V10H9V11H10V9H11V8H12V7H13V6H14V5H16V6H17V7H18V10H17V11H16V12H15V13H14V14H13V15H12V16H11V17H10V18H9V19H8V20H7V21H2V20H1V19H0V9Z" fill="#D7D8D8"/>
        <path d="M1 9H2V8H1V9ZM2 8H3V7H2V8ZM2 6H3V5H2V6ZM4 5H5V6H4V5ZM5 6H6V7H5V6ZM6 7H7V8H6V7ZM7 8H8V9H7V8ZM8 9H9V10H8V9ZM9 10H10V11H9V10ZM10 10H11V9H10V10ZM11 9H12V8H11V9ZM12 8H13V7H12V8ZM13 7H14V6H13V7ZM14 6H15V5H14V6ZM16 6H17V7H16V6ZM17 7H18V8H17V7ZM17 8H18V9H17V8ZM17 9H18V10H17V9ZM17 11H16V12H17V11ZM16 12H15V13H16V12ZM15 13H14V14H15V13ZM14 14H13V15H14V14ZM13 15H12V16H13V15ZM12 16H11V17H12V16ZM11 17H10V18H11V17ZM10 18H9V19H10V18ZM9 19H8V20H9V19ZM8 20H7V21H8V20ZM7 20H2V21H7V20ZM2 20H1V19H2V20ZM1 19H0V10H1V19ZM0 10H0V9H0V10Z" fill="#8F9497"/>
        <path d="M1 8H2V7H1V8ZM3 6H4V5H3V6ZM6 8H7V7H6V8ZM8 10H9V9H8V10ZM10 9H11V8H10V9ZM13 6H14V5H13V6ZM15 6H16V5H15V6ZM17 10H16V11H17V10ZM15 12H14V13H15V12ZM13 14H12V15H13V14ZM11 16H10V17H11V16ZM9 18H8V19H9V18ZM2 19H1V10H2V19ZM3 7H2V6H3V7ZM5 7H6V6H5V7ZM7 9H8V8H7V9ZM12 7H13V6H12V7ZM14 6H15V5H14V6ZM16 7H17V6H16V7ZM16 10H17V9H16V10ZM16 11H15V12H16V11ZM14 13H13V14H14V13ZM12 15H11V16H12V15ZM10 17H9V18H10V17ZM8 19H7V20H8V19ZM1 10H0V9H1V10Z" fill="#B6B9BB"/>
    </svg>
);

const GitHubIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.49 6.01 13.82C4 14.23 3.5 13.18 3.5 13.18C3.13 12.23 2.58 11.95 2.58 11.95C1.85 11.45 2.64 11.45 2.64 11.45C3.44 11.51 3.81 12.24 3.81 12.24C4.52 13.47 5.67 13.12 6.08 12.93C6.16 12.38 6.37 11.98 6.61 11.78C4.82 11.58 2.92 10.92 2.92 7.79C2.92 6.89 3.23 6.15 3.71 5.58C3.62 5.38 3.37 4.63 3.8 3.61C3.8 3.61 4.44 3.4 6.02 4.41C6.62 4.24 7.31 4.15 8 4.15C8.69 4.15 9.38 4.24 9.98 4.41C11.56 3.4 12.2 3.61 12.2 3.61C12.63 4.63 12.38 5.38 12.29 5.58C12.77 6.15 13.08 6.89 13.08 7.79C13.08 10.93 11.17 11.58 9.39 11.78C9.68 12.03 9.98 12.54 9.98 13.28C9.98 14.29 9.97 15.11 9.97 15.21C9.97 15.42 10.12 15.67 10.53 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" fill="#6B7280"/>
    </svg>
);


export default function DictionaryCard() {
  return (
    <section style={{ padding: '5rem 0' }}>
       <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{
            border: '1px solid var(--machine-base)',
            backgroundColor: 'rgba(209, 245, 211, 0.1)',
            padding: '2.5rem',
        }}>
            {/* Header */}
            <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--machine-base)', display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, margin: 0, color: 'var(--text-primary)'}}>
                    Sov·er·eign Agent
                </h3>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    /ˈsäv(ə)rən ˈājənt/
                </span>
            </div>

            {/* Part of Speech */}
            <div style={{ paddingTop: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                    NOUN
                </span>
            </div>

            {/* Body/Definitions */}
            <div style={{ marginTop: '1rem' }}>
                <ol style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <li>
                        An autonomous AI entity capable of independent goal-setting, value accrual, and transaction execution within a digital economy.
                    </li>
                    <li>
                       A system that combines Large Language Models (LLMs) with on-chain protocols to create persistent, economically-active agents that operate on behalf of users or DAOs.
                        <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                            <li>Owns a wallet.</li>
                            <li>Can hold and transfer value (crypto/tokens).</li>
                            <li>Executes tasks based on pre-defined logic.</li>
                            <li>Learns and adapts from interactions.</li>
                        </ul>
                    </li>
                </ol>
            </div>
            
            {/* Footer */}
            <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--machine-base)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <LockIcon />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)'}}>X402 Protocol</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <GitHubIcon />
                     <a href="https://github.com/DanteDia/sovereign-agents" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)', textDecoration: 'none'}}>
                        /sovereign-agents
                    </a>
                </div>
            </div>
        </div>
       </div>
    </section>
  );
}
