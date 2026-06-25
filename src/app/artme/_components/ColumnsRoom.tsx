"use client";

import Link from "next/link";

const MONO = "var(--font-mono), 'JetBrains Mono', monospace";
const SERIF = "var(--font-serif), 'EB Garamond', Georgia, serif";

const v = (i: number) => `/artme/viento/viento-${String(i).padStart(3, "0")}.jpg`;
// one column per object
const COLS: string[][] = [
  Array.from({ length: 10 }, (_, i) => v(i + 1)),    // árbol / palmera
  Array.from({ length: 15 }, (_, i) => v(i + 11)),   // pastizal
  Array.from({ length: 6 }, (_, i) => v(i + 26)),    // sillas tiradas
  Array.from({ length: 6 }, (_, i) => v(i + 32)),    // margaritas
];

export default function ColumnsRoom({ n = "11", title = "77 km/h", subtitle = "", blurb = "" }: { n?: string; title?: string; subtitle?: string; blurb?: string }) {
  return (
    <main style={{ width: "100%", background: "#0b0b0c", minHeight: "100vh", paddingBottom: "2px" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "clamp(2rem,5vw,4rem) clamp(1rem,4vw,3rem) clamp(1.5rem,4vh,2.5rem)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8a857c" }}>
          <Link href="/artme" style={{ color: "#8a857c", textDecoration: "none" }}>← artme</Link>
          <span>{subtitle}</span>
        </div>
        <header style={{ marginTop: "clamp(2.5rem,8vh,5rem)", maxWidth: "60ch" }}>
          <div style={{ fontFamily: MONO, fontSize: "0.8rem", color: "#9b1d1d", marginBottom: "0.8rem" }}>{n}</div>
          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(2.6rem,8vw,5rem)", lineHeight: 1, margin: 0, letterSpacing: "-0.02em" }}>{title}</h1>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(1.05rem,2.2vw,1.35rem)", color: "#b8b3a9", lineHeight: 1.55, marginTop: "1.4rem" }}>{blurb}</p>
        </header>
      </div>

      {/* tight columns, no gaps, full bleed — each as large as the column allows */}
      <div style={{ display: "flex", width: "100%", alignItems: "flex-start" }}>
        {COLS.map((col, c) => (
          <div key={c} style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column" }}>
            {col.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt="" loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
