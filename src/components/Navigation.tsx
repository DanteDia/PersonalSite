"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const NAV_ITEMS = ["journey", "about", "experience", "projects", "writing", "contact"] as const;

function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: "0.85rem",
        fontWeight: 400,
        color: hovered ? "var(--machine-accent)" : "var(--text-secondary)",
        textTransform: "lowercase" as const,
        letterSpacing: "0.02em",
        textDecoration: "none",
        transition: "color 0.3s ease",
        fontFamily: "var(--font-mono)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2px",
      }}
    >
      {label}
      <span
        style={{
          display: "block",
          height: "1.5px",
          width: "100%",
          background: "var(--machine-accent)",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.3s ease",
        }}
      />
    </Link>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  const hrefFor = (item: string) => {
    if (item === "writing") return "/blog";
    return onHome ? `#${item}` : `/#${item}`;
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled || menuOpen ? "rgba(252, 250, 248, 0.95)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid var(--border)" : "none",
        boxShadow: scrolled ? "0 2px 10px rgba(0, 0, 0, 0.05)" : "none",
        transition: "all 0.35s ease-in-out",
      }}
    >
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

        {/* Desktop nav — hidden below 600px via globals.css */}
        <ul
          className="nav-desktop-links"
          style={{
            listStyle: "none",
            gap: "1.75rem",
            margin: 0,
            padding: 0,
          }}
        >
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <NavLink href={hrefFor(item)} label={item} />
            </li>
          ))}
        </ul>

        {/* Mobile hamburger button — hidden above 600px via globals.css */}
        <button
          className="nav-hamburger-button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            padding: 0,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "var(--text-primary)",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: "transform 0.25s ease" }}
          >
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="13" x2="21" y2="13" />
                <line x1="3" y1="19" x2="15" y2="19" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" as const }}
            style={{
              borderTop: "1px solid var(--border)",
              backgroundColor: "rgba(252, 250, 248, 0.98)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <Link
                    href={hrefFor(item)}
                    onClick={() => setMenuOpen(false)}
                    className="nav-mobile-link"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
