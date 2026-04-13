"use client";
import { useEffect, useState } from "react";
import CellularAutomataBackground from "./CellularAutomataBackground";

const SUBTITLE = "From the Brazilian jungle to banking data pipelines. 5 countries. Infinite curiosity.";
const CHAR_DELAY = 35; // ms per character

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < SUBTITLE.length) {
        setTyped(SUBTITLE.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, CHAR_DELAY);
    return () => clearInterval(interval);
  }, []);

  // Blink cursor forever
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <header
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "6rem 1.5rem 4rem",
        overflow: "hidden",
      }}
    >
      <CellularAutomataBackground />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "800px",
          animation: "fadeInUp 0.8s ease-in-out forwards",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 500,
            marginBottom: "1.5rem",
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            lineHeight: 1.2,
            fontFamily: "var(--font-serif)",
          }}
        >
          Business Intelligence & Data Automation Specialist
        </h1>

        {/* Typewriter subtitle with green cursor */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1rem",
            color: "var(--text-primary)",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.6rem 1.2rem",
            border: "1px solid var(--border)",
            backgroundColor: "rgba(252, 250, 248, 0.8)",
            minHeight: "3rem",
            textAlign: "left",
            maxWidth: "100%",
          }}
        >
          <span style={{ color: "var(--machine-active)", flexShrink: 0 }}>&gt;</span>
          <span
            style={{
              fontStyle: "italic",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-serif)",
              fontSize: "1.1rem",
              lineHeight: 1.5,
            }}
          >
            {typed}
            <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "1.2em",
                backgroundColor: "var(--machine-active)",
                marginLeft: "2px",
                verticalAlign: "text-bottom",
                opacity: showCursor ? 1 : 0,
                transition: "opacity 0.1s",
              }}
            />
          </span>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}
