"use client";

import { useState, useEffect } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: scrolled ? "rgba(250, 248, 244, 0.92)" : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
    borderBottom: scrolled ? "1px solid #e5e3df" : "none",
    boxShadow: scrolled ? "0 2px 10px rgba(0, 0, 0, 0.05)" : "none",
    transition: "all 0.5s ease-in-out",
  };

  const linkStyle: React.CSSProperties = {
    fontSize: "0.85rem",
    fontWeight: 400,
    color: "#4a4a4a",
    textTransform: "lowercase" as const,
    letterSpacing: "0.02em",
    textDecoration: "none",
    transition: "color 0.5s ease-in-out",
  };

  return (
    <nav style={navStyle}>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0.8rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <a
          href="#"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "1.2rem",
            fontWeight: 500,
            color: "#1a1a1a",
            letterSpacing: "0.05em",
            textDecoration: "none",
          }}
        >
          DA
        </a>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: "2rem",
            margin: 0,
            padding: 0,
          }}
        >
          {["about", "experience", "projects", "contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item}`}
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#16a34a")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#4a4a4a")}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
