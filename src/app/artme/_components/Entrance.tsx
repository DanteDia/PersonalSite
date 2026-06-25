"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ROOMS, MANIFEST, isReady, type Room } from "../collections";

const MONO = "var(--font-mono), 'JetBrains Mono', monospace";
const SERIF = "var(--font-serif), 'EB Garamond', Georgia, serif";

function coverSrc(slug: string) {
  const list = MANIFEST[slug] ?? [];
  if (!list.length) return null;
  return list[Math.floor(list.length / 2)]?.src ?? list[0].src;
}

function RoomRow({ r, onHover }: { r: Room; onHover: (s: string | null) => void }) {
  const ready = isReady(r);
  const is3d = r.type === "3d";

  const inner = (
    <>
      <span style={{ fontFamily: MONO, fontSize: "0.8rem", color: is3d ? "#c9c4ba" : "#9b1d1d", minWidth: "2.6rem" }}>{r.n}</span>
      <span style={{ fontFamily: SERIF, fontSize: "clamp(1.5rem,5vw,2.7rem)", lineHeight: 1.05, flex: 1, color: ready ? undefined : "#5f5b53" }}>{r.title}</span>
      <span style={{ fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8a857c", textAlign: "right" }}>
        {ready ? r.subtitle : "sincronizando…"}
      </span>
    </>
  );

  const base: React.CSSProperties = {
    display: "flex", alignItems: "baseline", gap: "1.4rem",
    padding: "clamp(1rem,2.6vw,1.7rem) 0",
    borderBottom: "1px solid rgba(236,233,226,0.14)",
    textDecoration: "none",
  };

  if (!ready) {
    return <div style={{ ...base, color: "#5f5b53", opacity: 0.55, cursor: "default" }}>{inner}</div>;
  }
  return (
    <Link
      href={`/artme/${r.slug}`}
      onMouseEnter={() => onHover(r.slug)}
      onMouseLeave={() => onHover(null)}
      style={{ ...base, color: "#ece9e2", transition: "color 0.3s ease, padding-left 0.3s ease" }}
      onFocus={() => onHover(r.slug)}
    >
      {inner}
    </Link>
  );
}

export default function Entrance() {
  const [hover, setHover] = useState<string | null>(null);
  const preview = hover ? coverSrc(hover) : null;

  return (
    <main style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "fixed", inset: 0, backgroundImage: preview ? `url(${preview})` : "none", backgroundSize: "cover", backgroundPosition: "center", opacity: preview ? 0.2 : 0, transition: "opacity 0.7s ease", pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 70% 20%, rgba(0,0,0,0.15), rgba(11,11,12,0.93))", zIndex: 0, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "clamp(2rem,6vw,5rem) clamp(1.5rem,5vw,4rem)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8a857c" }}>
          <span>Dante Arola</span>
          <span>Artme — obra · 2026</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} style={{ marginTop: "clamp(3.5rem,13vh,9rem)" }}>
          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(3.5rem,12vw,8rem)", lineHeight: 0.95, margin: 0, letterSpacing: "-0.02em" }}>artme</h1>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(1.1rem,2.4vw,1.6rem)", color: "#c9c4ba", maxWidth: "46ch", marginTop: "1.5rem", lineHeight: 1.5 }}>
            Un cuerpo de obra que vivía disperso. Cerámica, pintura, fotografía, 3D — reunidos por primera vez para mirarlos juntos.
          </p>
        </motion.div>

        <nav style={{ marginTop: "clamp(3.5rem,11vh,7rem)", borderTop: "1px solid rgba(236,233,226,0.14)" }}>
          {ROOMS.filter((r) => !r.hidden).map((r, i) => (
            <motion.div key={r.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.5 }}>
              <RoomRow r={r} onHover={setHover} />
            </motion.div>
          ))}
        </nav>

        <p style={{ fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "0.1em", color: "#5f5b53", marginTop: "3rem", lineHeight: 1.8 }}>
          Espacio privado · no indexado · borrador curatorial en proceso
        </p>
      </div>
    </main>
  );
}
