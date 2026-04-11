"use client";

import { useEffect, useRef, useState } from "react";

type Metric = {
  label: string;
  value: string;
  suffix?: string;
  caption?: string;
};

// TODO(verify): confirm real numbers for each metric before public deploy
const metrics: Metric[] = [
  {
    label: "LLM Tokens Processed",
    value: "120M",
    suffix: "+",
    caption: "across Claude, GPT & local models",
  },
  {
    label: "Hackathons Won",
    value: "1",
    caption: "Panorama Verde — 2026",
  },
  {
    label: "Repos Shipped",
    value: "10",
    suffix: "+",
    caption: "public on github.com/DanteDia",
  },
  {
    label: "Countries Lived In",
    value: "5",
    caption: "AR · BR · FI · US · (and counting)",
  },
];

export default function DataGraphs() {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimated(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "5rem 0" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
        <h2
          style={{
            fontSize: "1.8rem",
            marginBottom: "0.5rem",
            textAlign: "center",
            color: "var(--text-primary)",
            fontWeight: 500,
            fontFamily: "var(--font-serif)",
          }}
        >
          By the Numbers
          <span
            style={{
              display: "block",
              width: "40px",
              height: "2px",
              background: "var(--machine-accent)",
              margin: "1rem auto 0",
              opacity: 0.6,
            }}
          />
        </h2>
        <p
          style={{
            textAlign: "center",
            fontStyle: "italic",
            color: "var(--text-secondary)",
            fontFamily: "var(--font-serif)",
            maxWidth: "560px",
            margin: "0 auto 3rem",
          }}
        >
          A few metrics that reflect the shape of the work — not the scale of the ego.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {metrics.map((m, i) => (
            <div
              key={m.label}
              style={{
                padding: "1.75rem 1.5rem",
                border: "1px solid var(--border-light)",
                backgroundColor: "var(--bg-primary)",
                opacity: animated ? 1 : 0,
                transform: animated ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s ease-in-out ${i * 0.1}s`,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--text-tertiary)",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.05em",
                }}
              >
                {m.label}
              </span>
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 600,
                  color: "var(--machine-active)",
                  lineHeight: 1.1,
                  fontFamily: "var(--font-serif)",
                }}
              >
                {m.value}
                {m.suffix && (
                  <span style={{ fontSize: "1.4rem", color: "var(--text-muted)", fontWeight: 400 }}>
                    {m.suffix}
                  </span>
                )}
              </div>
              {m.caption && (
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "var(--text-muted)",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {m.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
