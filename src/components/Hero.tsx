"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={heroRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "6rem 1.5rem 4rem",
      }}
    >
      <div style={{ maxWidth: "800px", opacity: 0, animation: "fadeIn 0.8s ease-in-out forwards" }}>
        <h1
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 500,
            marginBottom: "1.5rem",
            letterSpacing: "-0.02em",
            color: "#1a1a1a",
            lineHeight: 1.2,
          }}
        >
          Business Intelligence & Data Automation Specialist
        </h1>
        <p
          style={{
            fontSize: "1.15rem",
            color: "#4a4a4a",
            fontStyle: "italic",
            marginBottom: "2rem",
          }}
        >
          From the Brazilian jungle to blockchain tokenization to banking data architecture
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href="mailto:aroladante@gmail.com"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.85rem",
              color: "#6a6a6a",
              textDecoration: "none",
              transition: "color 0.5s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#16a34a")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6a6a6a")}
          >
            aroladante@gmail.com
          </a>
          <span style={{ color: "#e5e3df" }}>|</span>
          <a
            href="https://github.com/DanteDia"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.85rem",
              color: "#6a6a6a",
              textDecoration: "none",
              transition: "color 0.5s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#16a34a")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6a6a6a")}
          >
            github.com/DanteDia
          </a>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}
