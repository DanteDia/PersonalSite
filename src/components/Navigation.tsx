"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = ["journey", "about", "experience", "projects", "writing", "contact"] as const;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

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
    background: scrolled ? "rgba(252, 250, 248, 0.92)" : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
    borderBottom: scrolled ? "1px solid var(--border)" : "none",
    boxShadow: scrolled ? "0 2px 10px rgba(0, 0, 0, 0.05)" : "none",
    transition: "all 0.5s ease-in-out",
  };

  const linkStyle: React.CSSProperties = {
    fontSize: "0.85rem",
    fontWeight: 400,
    color: "var(--text-secondary)",
    textTransform: "lowercase" as const,
    letterSpacing: "0.02em",
    textDecoration: "none",
    transition: "color 0.5s ease-in-out",
    fontFamily: "var(--font-mono)",
  };

  const hrefFor = (item: string) => {
    if (item === "writing") return "/blog";
    // Hash anchors on home stay as "#id"; from other routes, prefix with "/"
    return onHome ? `#${item}` : `/#${item}`;
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
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1.2rem",
            fontWeight: 500,
            color: "var(--text-primary)",
            letterSpacing: "0.05em",
            textDecoration: "none",
          }}
        >
          DA
        </Link>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: "1.75rem",
            margin: 0,
            padding: 0,
            flexWrap: "wrap" as const,
          }}
        >
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <Link
                href={hrefFor(item)}
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--machine-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
