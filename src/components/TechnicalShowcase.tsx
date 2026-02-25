"use client";
import Terminal from "./Terminal";
import NodeTree from "./NodeTree";

const SectionTitle = ({ title }: { title: string }) => (
    <h2 style={{ fontSize: '1.8rem', marginBottom: '2.5rem', textAlign: 'center', color: '#1C1C1C', fontWeight: 500 }}>
      {title}
      <span style={{ display: 'block', width: '40px', height: '2px', background: '#10B981', margin: '1rem auto 0', opacity: 0.6 }} />
    </h2>
);

export default function TechnicalShowcase() {
    const terminalLines = [
        { text: "# Initialize Dante's Agent Network", type: "comment" as const, delay: 500 },
        { text: "npm dante-cli", type: "command" as const, delay: 1500 },
        { text: "> initializing OpenClaw agent network...", type: "output" as const, delay: 1000 },
        { text: "> connecting to Tailscale mesh...", type: "output" as const, delay: 800 },
        { text: "> starting Mission Control...", type: "output" as const, delay: 800 },
        { text: "> [SUCCESS] Agent network online.", type: "output" as const, delay: 500 },
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
                    <Terminal variant="dark" title="~/dante-workspace" lines={terminalLines} />
                    <NodeTree />
                </div>
            </div>
        </section>
    );
}
