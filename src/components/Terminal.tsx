"use client";

import { useState, useEffect } from "react";

interface TerminalProps {
  variant?: "light" | "dark";
  title?: string;
  lines: { text: string; type?: "command" | "output" | "comment" | "url" | "warning"; delay?: number }[];
  showPrompt?: boolean;
}

export default function Terminal({ variant = "light", title, lines, showPrompt = true }: TerminalProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let currentLine = 0;
    const typeLine = () => {
      if (currentLine < lines.length) {
        setVisibleLines(currentLine + 1);
        currentLine++;
        const delay = lines[currentLine - 1]?.delay || 800;
        setTimeout(typeLine, delay);
      }
    };
    typeLine();
  }, [lines]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const isDark = variant === "dark";

  const getLineStyle = (type?: string) => {
    const base = { fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', lineHeight: 1.6, margin: 0 };
    switch (type) {
      case "command":
        return { ...base, color: isDark ? '#DCDCDC' : '#1a1a1a' };
      case "output":
        return { ...base, color: isDark ? '#9CA3AF' : '#4a4a4a' };
      case "comment":
        return { ...base, color: isDark ? '#6B7280' : '#6a6a6a', fontStyle: 'italic' };
      case "url":
        return { ...base, color: '#34CFF6', textDecoration: 'underline' };
      case "warning":
        return { ...base, color: '#FF7B4B' };
      default:
        return { ...base, color: isDark ? '#DCDCDC' : '#1a1a1a' };
    }
  };

  return (
    <div style={{
      backgroundColor: isDark ? '#181818' : '#F3F8F5',
      borderRadius: isDark ? '12px' : '0',
      border: `1px solid ${isDark ? '#2a2a2a' : '#D1F5D3'}`,
      boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.3)' : 'none',
      overflow: 'hidden',
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      {isDark && title && (
        <div style={{
          backgroundColor: '#1a1a1a',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid #2a2a2a',
        }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
          <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#6B7280' }}>{title}</span>
        </div>
      )}
      <div style={{ padding: isDark ? '20px' : '16px' }}>
        {lines.slice(0, visibleLines).map((line, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            {line.type === 'command' && showPrompt && (
              <span style={{ color: isDark ? '#10B981' : '#16A34A', fontFamily: "'JetBrains Mono', monospace" }}>$</span>
            )}
            <span style={getLineStyle(line.type)}>{line.text}</span>
            {index === visibleLines - 1 && line.type === 'command' && showPrompt && (
              <span style={{
                display: 'inline-block',
                width: '8px',
                height: '1.2em',
                backgroundColor: isDark ? '#10B981' : '#16A34A',
                marginLeft: '4px',
                animation: 'blink 1s step-end infinite',
                opacity: cursorVisible ? 1 : 0,
              }} />
            )}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
