"use client";

import Link from "next/link";

const MONO = "var(--font-mono), 'JetBrains Mono', monospace";
const SERIF = "var(--font-serif), 'EB Garamond', Georgia, serif";
const COL: React.CSSProperties = { maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1rem,4vw,3rem)" };

const m = (id: string) => `/artme/mesa/mesa-${id}.jpg`;

// order taken from the saved curation layout (mesa de curaduría):
// materials = grid top→bottom, left→right; process = sorted by left edge (x).
const MATERIALS = ["006","007","013","009","010","011","012","015","019","014","016","008","021","005","020","024","023","025"].map(m);
const PROCESS = ["029","033","034","037","038","040","048","051","053","054","026","050","049","003"].map(m);
const FINISHED = ["finished-1","finished-2","finished-3","finished-4"].map((f) => `/artme/mesa-extra/${f}.jpg`);
const TARGETS = [...PROCESS, ...FINISHED]; // flip target per material (by index)

// last row is intentionally spaced: 16 · _ · 17 · _ · 18
type Cell = { kind: "card"; i: number } | { kind: "gap" };
const CELLS: Cell[] = [
  ...Array.from({ length: 15 }, (_, i) => ({ kind: "card", i } as Cell)),
  { kind: "card", i: 15 }, { kind: "gap" }, { kind: "card", i: 16 }, { kind: "gap" }, { kind: "card", i: 17 },
];

export default function MesaTest({
  n = "02", title = "Mesa con Papá", subtitle = "Cemento · madera · metal", blurb = "",
}: { n?: string; title?: string; subtitle?: string; blurb?: string }) {
  return (
    <main style={{ width: "100%", paddingBottom: "5rem", minHeight: "100vh" }}>
      <style>{`
        .mgrid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
        @media (max-width: 760px){ .mgrid { grid-template-columns: repeat(3, 1fr); } }
        .flipcard { perspective: 1100px; aspect-ratio: 1; }
        .flipinner { position: relative; width: 100%; height: 100%; transition: transform .55s cubic-bezier(.4,.1,.2,1); transform-style: preserve-3d; }
        .flipcard:hover .flipinner, .flipcard:focus-within .flipinner { transform: rotateY(180deg); }
        .flipface { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; overflow: hidden; background:#141416; }
        .flipface img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .flipback { transform: rotateY(180deg); }
        .gap { aspect-ratio: 1; }
      `}</style>

      <div style={{ ...COL, paddingTop: "clamp(2rem,5vw,4rem)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8a857c" }}>
          <Link href="/artme" style={{ color: "#8a857c", textDecoration: "none" }}>← artme</Link>
          <span>{subtitle}</span>
        </div>

        <header style={{ margin: "clamp(2.5rem,8vh,5rem) 0 clamp(2rem,5vh,3rem)", maxWidth: "62ch" }}>
          <div style={{ fontFamily: MONO, fontSize: "0.8rem", color: "#9b1d1d", marginBottom: "0.8rem" }}>{n}</div>
          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(2.6rem,8vw,5rem)", lineHeight: 1, margin: 0, letterSpacing: "-0.02em" }}>{title}</h1>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(1.05rem,2.2vw,1.35rem)", color: "#b8b3a9", lineHeight: 1.55, marginTop: "1.4rem" }}>
            {blurb || "Una muestra de los materiales —cemento, madera, metal—. Pasá el mouse por cada uno: gira y revela el momento del proceso que le dio forma."}
          </p>
        </header>

        <div className="mgrid">
          {CELLS.map((cell, idx) =>
            cell.kind === "gap" ? (
              <div className="gap" key={`gap-${idx}`} aria-hidden />
            ) : (
              <div className="flipcard" key={MATERIALS[cell.i]} tabIndex={0}>
                <div className="flipinner">
                  <div className="flipface">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={MATERIALS[cell.i]} alt="" loading="lazy" />
                  </div>
                  <div className="flipface flipback">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={TARGETS[cell.i]} alt="" loading="lazy" />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}
