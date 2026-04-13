"use client";

import { useEffect, useRef, useState } from "react";

interface Era {
  version: string;
  label: string;
  capabilities: string[];
  year: string;
  active?: boolean;
  achievements?: string[];
}

export default function WebEvolution() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const eras: Era[] = [
    {
      version: "2018–2021",
      label: "BI Analyst @ BAFA",
      capabilities: ["Web 2.0 Automation", "Cloud Migration", "BigQuery", "Looker"],
      year: "The Foundations",
      achievements: [
        "Migrated legacy Excel workflows to cloud-based analytics (BigQuery, Looker)",
        "Reduced manual reporting time by <strong>85%</strong> through automation",
        "Enabled data-driven decisions for trading operations ($50M+ volume)",
      ],
    },
    {
      version: "2021–2023",
      label: "Project Manager @ Oxygen Token",
      capabilities: ["Web 3.0 Integration", "DeFi Protocols", "Carbon Credits", "Tokenization"],
      year: "The Frontier",
      achievements: [
        "Led tokenization strategy for <strong>50K+ hectares</strong> of Argentinian forest carbon credits",
        "Coordinated stakeholders across Argentina, Brazil, Germany (5 time zones, 3 languages)",
        "Built operational infrastructure connecting DeFi protocols with real-world carbon assets",
      ],
    },
    {
      version: "2024–Present",
      label: "Business Intelligence Arquitect @ BIND",
      capabilities: ["Real-Time ETL", "AI-Driven Automation", "Executive Dashboards", "Enterprise Scale"],
      year: "The Enterprise",
      active: true,
      achievements: [
        "Architect ETL pipelines processing high-volume financial records, reducing reporting latency to real-time",
        "Design automation workflows eliminating manual export/import cycles",
        "Create executive dashboards for C-suite decision-making",
        "Bridge gap between legacy systems and modern cloud analytics",
      ],
    },
    {
      version: "Future",
      label: "AI Sovereign Ecosystems",
      capabilities: ["Web 4.0 Vision", "Autonomous Agents", "On-Chain Value", "Human-AI Collaboration"],
      year: "The Singularity",
    },
  ];

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        padding: "5rem 0",
        backgroundColor: "var(--bg-alt)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
        <h2
          style={{
            fontSize: "1.8rem",
            marginBottom: "2.5rem",
            textAlign: "center",
            color: "var(--text-primary)",
            fontWeight: 500,
            fontFamily: "var(--font-serif)",
          }}
        >
          Evolutionary Roadmap
          <span
            style={{
              display: "block",
              width: "40px",
              height: "2px",
              background: "var(--machine-active)",
              margin: "1rem auto 0",
              opacity: 0.6,
            }}
          />
        </h2>

        <div style={{ position: "relative", paddingLeft: "2rem" }}>
          {/* Vertical timeline line */}
          <div
            style={{
              position: "absolute",
              left: "0.5rem",
              top: "0",
              bottom: "0",
              width: "2px",
              background: "linear-gradient(to bottom, #D1F5D3, #10B981, #D1F5D3)",
            }}
          />

          {eras.map((era, index) => {
            const isExpanded = expanded === index;
            const hasDetails = era.achievements && era.achievements.length > 0;

            return (
              <div
                key={era.version}
                style={{
                  position: "relative",
                  paddingBottom: index < eras.length - 1 ? "2.5rem" : "0",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-20px)",
                  transition: `all 0.5s ease-in-out ${index * 0.15}s`,
                }}
              >
                {/* Timeline dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-1.75rem",
                    top: "0.25rem",
                    width: era.active ? "14px" : "10px",
                    height: era.active ? "14px" : "10px",
                    borderRadius: "50%",
                    background: era.active ? "var(--machine-active)" : "var(--machine-base)",
                    border: era.active
                      ? "3px solid var(--machine-active)"
                      : "2px solid var(--machine-active)",
                    boxShadow: era.active ? "0 0 20px rgba(16, 185, 129, 0.4)" : "none",
                    transition: "all 0.5s ease-in-out",
                  }}
                />

                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "0.75rem",
                      marginBottom: "0.5rem",
                      flexWrap: "wrap" as const,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: era.active ? "var(--machine-active)" : "var(--text-primary)",
                        margin: 0,
                      }}
                    >
                      {era.version}
                    </h3>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8rem",
                        color: "var(--text-tertiary)",
                        textTransform: "uppercase" as const,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {era.year}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                      color: era.active ? "var(--machine-active)" : "var(--text-secondary)",
                      marginBottom: "0.75rem",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {era.label}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.5rem" }}>
                    {era.capabilities.map((cap) => (
                      <span
                        key={cap}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.75rem",
                          padding: "0.25rem 0.6rem",
                          background: era.active
                            ? "rgba(16, 185, 129, 0.1)"
                            : "var(--bg-alt)",
                          border: `1px solid ${era.active ? "var(--machine-active)" : "var(--border)"}`,
                          color: era.active ? "var(--machine-active)" : "var(--text-secondary)",
                          borderRadius: "2px",
                        }}
                      >
                        {cap}
                      </span>
                    ))}
                  </div>

                  {/* Clickable dropdown for achievements */}
                  {hasDetails && (
                    <>
                      <button
                        onClick={() => setExpanded(isExpanded ? null : index)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          marginTop: "0.75rem",
                          padding: "0.35rem 0.8rem",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.72rem",
                          color: "var(--machine-accent)",
                          background: "transparent",
                          border: `1px solid ${isExpanded ? "var(--machine-active)" : "var(--border)"}`,
                          borderRadius: "2px",
                          cursor: "pointer",
                          textTransform: "uppercase" as const,
                          letterSpacing: "0.06em",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                            transition: "transform 0.2s ease",
                          }}
                        >
                          ▸
                        </span>
                        {isExpanded ? "collapse" : "details"}
                      </button>

                      <div
                        style={{
                          maxHeight: isExpanded ? "500px" : "0",
                          overflow: "hidden",
                          transition: "max-height 0.4s ease-in-out, opacity 0.3s ease",
                          opacity: isExpanded ? 1 : 0,
                        }}
                      >
                        <ul
                          style={{
                            listStyle: "none",
                            paddingLeft: 0,
                            marginTop: "0.75rem",
                          }}
                        >
                          {era.achievements!.map((item, i) => (
                            <li
                              key={i}
                              style={{
                                position: "relative",
                                paddingLeft: "1.5rem",
                                marginBottom: "0.5rem",
                                color: "var(--text-secondary)",
                                fontSize: "0.9rem",
                                lineHeight: 1.6,
                              }}
                            >
                              <span
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  color: "var(--machine-accent)",
                                }}
                              >
                                —
                              </span>
                              <span dangerouslySetInnerHTML={{ __html: item }} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
