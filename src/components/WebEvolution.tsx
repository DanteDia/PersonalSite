"use client";

import { useEffect, useRef, useState } from "react";

interface Era {
  version: string;
  label: string;
  capabilities: string[];
  year: string;
  active?: boolean;
}

export default function WebEvolution() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const eras: Era[] = [
    {
      version: "Web 1.0",
      label: "Read",
      capabilities: ["Static pages", "Information consumption", "HTML/CSS"],
      year: "1991–2004",
    },
    {
      version: "Web 2.0",
      label: "Read · Write",
      capabilities: ["User-generated content", "Social media", "AJAX", "APIs"],
      year: "2004–2014",
    },
    {
      version: "Web 3.0",
      label: "Read · Write · Own",
      capabilities: ["Blockchain", "Decentralization", "Token economics", "Smart contracts"],
      year: "2014–2024",
    },
    {
      version: "Web 4.0",
      label: "Read · Write · Own · Transact",
      capabilities: ["AI Sovereign", "Agent orchestration", "Autonomous transactions", "Human-AI collaboration"],
      year: "2024–Present",
      active: true,
    },
  ];

  return (
    <section
      ref={ref}
      style={{
        padding: "5rem 0",
        backgroundColor: "#f5f3ef",
        borderTop: "1px solid #e5e3df",
        borderBottom: "1px solid #e5e3df",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
        <h2
          style={{
            fontSize: "1.8rem",
            marginBottom: "2.5rem",
            textAlign: "center",
            color: "#1C1C1C",
            fontWeight: 500,
          }}
        >
          Evolutionary Roadmap
          <span
            style={{
              display: "block",
              width: "40px",
              height: "2px",
              background: "#10B981",
              margin: "1rem auto 0",
              opacity: 0.6,
            }}
          />
        </h2>

        <div
          style={{
            position: "relative",
            paddingLeft: "2rem",
          }}
        >
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

          {eras.map((era, index) => (
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
                  background: era.active ? "#10B981" : "#D1F5D3",
                  border: era.active ? "3px solid #10B981" : "2px solid #10B981",
                  boxShadow: era.active ? "0 0 20px rgba(16, 185, 129, 0.4)" : "none",
                  transition: "all 0.5s ease-in-out",
                }}
              />

              {/* Content */}
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
                      color: era.active ? "#10B981" : "#1C1C1C",
                      margin: 0,
                    }}
                  >
                    {era.version}
                  </h3>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.8rem",
                      color: "#6B7280",
                      textTransform: "uppercase" as const,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {era.year}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.9rem",
                    color: era.active ? "#10B981" : "#4a4a4a",
                    marginBottom: "0.75rem",
                    letterSpacing: "0.02em",
                  }}
                >
                  {era.label}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap" as const,
                    gap: "0.5rem",
                  }}
                >
                  {era.capabilities.map((cap) => (
                    <span
                      key={cap}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.75rem",
                        padding: "0.25rem 0.6rem",
                        background: era.active ? "rgba(16, 185, 129, 0.1)" : "#f5f3ef",
                        border: `1px solid ${era.active ? "#10B981" : "#e5e3df"}`,
                        color: era.active ? "#10B981" : "#4a4a4a",
                        borderRadius: "2px",
                      }}
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
