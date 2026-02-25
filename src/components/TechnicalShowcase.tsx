"use client";
import Terminal from "./Terminal";

const SectionTitle = ({ title }: { title: string }) => (
    <h2 style={{ fontSize: '1.8rem', marginBottom: '2.5rem', textAlign: 'center', color: '#1C1C1C', fontWeight: 500 }}>
      {title}
      <span style={{ display: 'block', width: '40px', height: '2px', background: '#10B981', margin: '1rem auto 0', opacity: 0.6 }} />
    </h2>
);

export default function TechnicalShowcase() {
    const terminalLines = [
        { text: "# Connect to on-chain autonomous agent...", type: "comment" as const, delay: 500 },
        { text: "npx openclaw connect --agent=FinanceAutomaton", type: "command" as const, delay: 1500 },
        { text: "Connecting to agent [0x742d35Cc6634C0532925a3b844Bc454e4438f44e]...", type: "output" as const, delay: 1000 },
        { text: "✅ Connection successful. Automaton is active.", type: "output" as const, delay: 800 },
        { text: "# Task: Fund automaton with 15.00 USDC for gas fees.", type: "comment" as const, delay: 500 },
        { text: "fund automaton 15.00 USDC", type: "command" as const, delay: 1500 },
        { text: "Transaction sent... Hash: 0xabc...def", type: "output" as const, delay: 1000 },
        { text: "✅ Automaton funded and executing tasks.", type: "output" as const, delay: 500 },
    ];

    return (
        <section style={{ padding: '5rem 0' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
                <SectionTitle title="Technical Architecture" />
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '3rem',
                    alignItems: 'flex-start'
                }}>
                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        I architect and implement systems that bridge traditional data infrastructure with the emerging world of autonomous, on-chain agents. Below is a snapshot of the operational environment.
                    </p>
                    <Terminal variant="dark" title="~/sovereign-agents" lines={terminalLines} />
                </div>
            </div>
        </section>
    );
}
