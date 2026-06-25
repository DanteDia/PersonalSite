"use client";

import Link from "next/link";

const MONO = "var(--font-mono), 'JetBrains Mono', monospace";

// order from the saved curation layout (left → right)
const FARO = ["faro-003", "faro-004", "faro-002", "faro-006", "faro-005"].map((s) => `/artme/faro/${s}.jpg`);

export default function FaroRoom({ title = "Faro", subtitle = "" }: { title?: string; subtitle?: string }) {
  return (
    <main style={{ position: "fixed", inset: 0, background: "#0b0b0c", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", gap: "clamp(8px,1.1vw,22px)", alignItems: "center", justifyContent: "center", width: "100%", padding: "0 clamp(12px,2.2vw,48px)" }}>
        {FARO.map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            style={{ flex: "1 1 0", minWidth: 0, width: 0, maxHeight: "82vh", objectFit: "contain", boxShadow: "0 12px 50px rgba(0,0,0,0.55)" }}
          />
        ))}
      </div>

      <Link href="/artme" style={{ position: "fixed", top: 22, left: 24, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(236,233,226,0.5)", textDecoration: "none", zIndex: 5 }}>← artme</Link>
      <div style={{ position: "fixed", top: 22, right: 24, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(236,233,226,0.45)", zIndex: 5 }}>{title}{subtitle ? ` · ${subtitle}` : ""}</div>
    </main>
  );
}
