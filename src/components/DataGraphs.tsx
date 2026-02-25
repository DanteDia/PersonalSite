"use client";

import { useEffect, useRef, useState } from "react";

export default function DataGraphs() {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "5rem 0" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
        <h2
          style={{
            fontSize: "1.8rem",
            marginBottom: "2.5rem",
            textAlign: "center",
            color: "#1C1C1C",
            fontWeight: 800,
          }}
        >
          Data &amp; Metrics
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
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* KPI Cards */}
          <div
            style={{
              padding: "1.5rem",
              border: "1px solid #D1F5D3",
              backgroundColor: "#FCFAF8",
              opacity: animated ? 1 : 0,
              transform: animated ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s ease-in-out",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                color: "#6B7280",
                textTransform: "uppercase" as const,
                letterSpacing: "0.05em",
              }}
            >
              Automation Rate
            </span>
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: 600,
                color: "#10B981",
                marginTop: "0.5rem",
              }}
            >
              85%
              <span
                style={{
                  fontSize: "1rem",
                  color: "#6B7280",
                  fontWeight: 400,
                }}
              >
                ↓
              </span>
            </div>
          </div>

          <div
            style={{
              padding: "1.5rem",
              border: "1px solid #D1F5D3",
              backgroundColor: "#FCFAF8",
              opacity: animated ? 1 : 0,
              transform: animated ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s ease-in-out 0.1s",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                color: "#6B7280",
                textTransform: "uppercase" as const,
                letterSpacing: "0.05em",
              }}
            >
              Carbon Credits Tokenized
            </span>
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: 600,
                color: "#10B981",
                marginTop: "0.5rem",
              }}
            >
              50K+
              <span
                style={{
                  fontSize: "1rem",
                  color: "#6B7280",
                  fontWeight: 400,
                }}
              >
                ha
              </span>
            </div>
          </div>

          <div
            style={{
              padding: "1.5rem",
              border: "1px solid #D1F5D3",
              backgroundColor: "#FCFAF8",
              opacity: animated ? 1 : 0,
              transform: animated ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s ease-in-out 0.2s",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                color: "#6B7280",
                textTransform: "uppercase" as const,
                letterSpacing: "0.05em",
              }}
            >
              Hours Saved by Automation
            </span>
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: 600,
                color: "#10B981",
                marginTop: "0.5rem",
              }}
            >
              4,500+
            </div>
          </div>
          
          <div
            style={{
              padding: "1.5rem",
              border: "1px solid #D1F5D3",
              backgroundColor: "#FCFAF8",
              opacity: animated ? 1 : 0,
              transform: animated ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s ease-in-out 0.2s",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                color: "#6B7280",
                textTransform: "uppercase" as const,
                letterSpacing: "0.05em",
              }}
            >
              Trading Volume Analyzed
            </span>
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: 600,
                color: "#10B981",
                marginTop: "0.5rem",
              }}
            >
              $50M+
            </div>
          </div>
        </div>

        {/* Workload Distribution Bar */}
        <div
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            border: "1px solid #e5e3df",
            backgroundColor: "#faf8f4",
            opacity: animated ? 1 : 0,
            transform: animated ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s ease-in-out 0.3s",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.75rem",
            }}
          >
            <span style={{ fontSize: "0.9rem", color: "#4a4a4a" }}>Machine</span>
            <span style={{ fontSize: "0.9rem", color: "#9A9A9A" }}>Human</span>
          </div>
          <div
            style={{
              display: "flex",
              height: "32px",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: animated ? "85%" : "0%",
                backgroundColor: "#10B981",
                transition: "width 1.2s ease-out",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.85rem",
                  color: "white",
                  fontWeight: 800,
                }}
              >
                85%
              </span>
            </div>
            <div
              style={{
                width: animated ? "15%" : "0%",
                backgroundColor: "#9A9A9A",
                transition: "width 1.2s ease-out 0.3s",
                transitionDelay: "0.3s",
              }}
            />
          </div>
        </div>

        {/* Exponential Growth Chart (SVG) */}
        <div
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            border: "1px solid #e5e3df",
            backgroundColor: "#faf8f4",
            opacity: animated ? 1 : 0,
            transform: animated ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s ease-in-out 0.4s",
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              marginBottom: "1rem",
              color: "#1C1C1C",
            }}
          >
            Automation Growth (Log Scale)
          </h3>
          <svg viewBox="0 0 400 150" style={{ width: "100%", height: "auto" }}>
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pos) => (
              <line
                key={pos}
                x1="0"
                y1={pos * 120 + 15}
                x2="400"
                y2={pos * 120 + 15}
                stroke="#e5e3df"
                strokeWidth="1"
              />
            ))}

            {/* Area under curve */}
            <defs>
              <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            <path
              d="M 0,130 Q 50,120 100,100 T 200,60 T 250,30 T 320,10 L 320,135 L 0,135 Z"
              fill="url(#lineFill)"
            />

            {/* Exponential curve */}
            <path
              d="M 0,130 Q 50,120 100,100 T 200,60 T 250,30 T 320,10"
              fill="none"
              stroke="#10B981"
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                strokeDasharray: 400,
                strokeDashoffset: animated ? 0 : 400,
                transition: "stroke-dashoffset 1.2s ease-out",
              }}
            />

            {/* Data points */}
            {[
              { x: 0, y: 130 },
              { x: 100, y: 100 },
              { x: 200, y: 60 },
              { x: 250, y: 30 },
              { x: 320, y: 10 },
            ].map((point, i) => (
              <circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="5"
                fill="#10B981"
                style={{
                  opacity: animated ? 1 : 0,
                  transition: `opacity 0.3s ease-in-out ${0.8 + i * 0.1}s`,
                }}
              />
            ))}

            {/* Axis labels */}
            <text x="0" y="145" fontSize="10" fill="#6B7280" fontFamily="'JetBrains Mono', monospace">
              2018
            </text>
            <text x="160" y="145" fontSize="10" fill="#6B7280" fontFamily="'JetBrains Mono', monospace">
              2021
            </text>
            <text x="310" y="145" fontSize="10" fill="#6B7280" fontFamily="'JetBrains Mono', monospace">
              2024
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
