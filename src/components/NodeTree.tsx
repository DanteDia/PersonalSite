"use client";
import React from 'react';

const Node = ({ name, children, level = 0 }: { name: string; children?: React.ReactNode; level?: number }) => (
  <div style={{ marginLeft: `${level * 24}px`, position: 'relative' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem', color: 'var(--text-primary)' }}>
      {level > 0 && <span style={{ color: 'var(--text-muted)' }}>└─</span>}
      <span>{name}</span>
      {level === 0 && <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>(Root)</span>}
    </div>
    {children && <div style={{ marginTop: '8px' }}>{children}</div>}
  </div>
);

export default function NodeTree() {
  return (
    <div style={{
      backgroundColor: '#F3F8F5',
      border: '1px solid #D1F5D3',
      padding: '2rem',
      marginTop: '2rem',
    }}>
      <h3 style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '1rem',
        color: 'var(--text-primary)',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        Mission Control: Agent Hierarchy
      </h3>
      <Node name="Dante Arola">
        <Node name="Pango" level={1} />
        <Node name="Nico" level={1} />
        <Node name="Javi" level={1} />
        <Node name="Ari" level={1} />
        <Node name="Vita" level={1} />
      </Node>
    </div>
  );
}
