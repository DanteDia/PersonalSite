"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Shot } from "../collections";

const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const DEV = process.env.NODE_ENV !== "production";

const COLLS = [
  { key: "earth", name: "Earth", hero: "/artme/callista/hero/slide2.webp", line: "Donde todo empieza — lo que crece y florece." },
  { key: "exosphere", name: "Exosphere", hero: "/artme/callista/hero/slide1.webp", line: "El borde de la atmósfera, donde el aire se vuelve luz." },
  { key: "kosma", name: "Kosma", hero: "/artme/callista/hero/slide3.webp", line: "El cosmos: átomos, estrellas, lo más lejos." },
];

export default function CallistaRoom({ shots, deleted = [] }: { shots: Shot[]; deleted?: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  // curation state (dev only)
  const [order, setOrder] = useState<string[]>(() => shots.map((s) => s.src));
  const [del, setDel] = useState<Set<string>>(() => new Set(deleted));
  const [editing, setEditing] = useState(false);
  const [sel, setSel] = useState<string | null>(null);
  const [saveMsg, setSaveMsg] = useState("");

  const shotMap = useMemo(() => new Map(shots.map((s) => [s.src, s])), [shots]);
  const flatVisible = useMemo(
    () => order.filter((src) => !del.has(src) && shotMap.has(src)).map((src) => shotMap.get(src)!),
    [order, del, shotMap]
  );
  const byColl = (k: string) => flatVisible.filter((s) => (s as any).coll === k);
  const flatIndex = (src: string) => flatVisible.findIndex((s) => s.src === src);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback((d: number) => setOpen((i) => (i === null ? null : (i + d + flatVisible.length) % flatVisible.length)), [flatVisible.length]);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, [open, close, go]);

  const onTile = (src: string) => {
    if (!editing) { setOpen(flatIndex(src)); return; }
    if (sel === null) { setSel(src); return; }
    if (sel === src) { setSel(null); return; }
    setOrder((o) => { const a = o.indexOf(sel), b = o.indexOf(src); const n = [...o]; [n[a], n[b]] = [n[b], n[a]]; return n; });
    setSel(null);
  };
  const onDelete = (src: string) => { setDel((d) => { const n = new Set(d); n.add(src); return n; }); if (sel === src) setSel(null); };
  const save = () => {
    setSaveMsg("guardando…");
    fetch("/api/artme/curate", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ slug: "callista", layout: { deleted: [...del], order } }) })
      .then((r) => r.json()).then((j) => setSaveMsg(j.ok ? "guardado ✓ (recargá)" : "error")).catch(() => setSaveMsg("error"));
    setTimeout(() => setSaveMsg(""), 3500);
  };

  return (
    <main style={{ background: "#f4f1ec", color: "#1a1a1a", minHeight: "100vh", fontFamily: SANS }}>
      {/* nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.1rem clamp(1.2rem,4vw,3rem)", background: "rgba(244,241,236,0.85)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <Link href="/artme" style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#777", textDecoration: "none" }}>← artme</Link>
        <span style={{ fontSize: "1.05rem", letterSpacing: "0.42em", fontWeight: 300, textTransform: "uppercase", paddingLeft: "0.42em" }}>Callista</span>
        <div style={{ display: "flex", gap: "1.3rem", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#555" }}>
          {COLLS.map((c) => <a key={c.key} href={`#${c.key}`} style={{ color: "#555", textDecoration: "none" }}>{c.name}</a>)}
        </div>
      </nav>

      {/* full-bleed hero — the abstract silver sphere shot */}
      <header style={{ position: "relative", height: "clamp(62vh, 70vh, 760px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", textAlign: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/artme/callista/hero/newin.webp" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.32), rgba(0,0,0,0.18) 45%, rgba(0,0,0,0.42))" }} />
        <div style={{ position: "relative", color: "#fff" }}>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.34em", textTransform: "uppercase", opacity: 0.9, marginBottom: "1.4rem" }}>Brillo eterno</div>
          <h1 style={{ fontWeight: 200, fontSize: "clamp(3.2rem,10vw,7rem)", letterSpacing: "0.1em", margin: 0, textTransform: "uppercase", textShadow: "0 2px 30px rgba(0,0,0,0.3)" }}>Callista</h1>
          <p style={{ maxWidth: "26ch", margin: "1.6rem auto 0", fontSize: "clamp(0.95rem,2vw,1.15rem)", lineHeight: 1.6, fontWeight: 300, opacity: 0.95 }}>
            Un ascenso de la tierra al cosmos, en tres colecciones.
          </p>
        </div>
      </header>

      {/* collections */}
      <section style={{ textAlign: "center", padding: "clamp(3.5rem,9vh,6rem) 1.5rem clamp(2rem,5vh,3rem)" }}>
        <h2 style={{ fontWeight: 200, fontSize: "clamp(1.4rem,3.4vw,2.1rem)", letterSpacing: "0.18em", textTransform: "uppercase", margin: 0, color: "#2a2a2a" }}>Nuestras colecciones</h2>
      </section>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(0,0,0,0.08)" }}>
        {COLLS.map((c) => (
          <a key={c.key} href={`#${c.key}`} style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#e8e4dd", display: "block" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.hero} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "1.7rem", background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 55%)" }}>
              <span style={{ color: "#fff", fontSize: "clamp(1rem,2.4vw,1.5rem)", letterSpacing: "0.24em", textTransform: "uppercase", fontWeight: 300 }}>{c.name}</span>
            </div>
          </a>
        ))}
      </div>

      {/* per-collection grids */}
      {COLLS.map((c) => {
        const items = byColl(c.key);
        if (!items.length) return null;
        return (
          <section key={c.key} id={c.key} style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(3.5rem,9vh,7rem) clamp(1.2rem,4vw,3rem) 0", scrollMarginTop: "70px" }}>
            <div style={{ textAlign: "center", marginBottom: "clamp(2rem,5vh,3.5rem)" }}>
              <h2 style={{ fontWeight: 200, fontSize: "clamp(2rem,5vw,3.2rem)", letterSpacing: "0.14em", textTransform: "uppercase", margin: 0 }}>{c.name}</h2>
              <p style={{ maxWidth: "44ch", margin: "1rem auto 0", color: "#555", fontWeight: 300, lineHeight: 1.6, fontSize: "1rem" }}>{c.line}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "clamp(0.6rem,1.5vw,1.4rem)" }}>
              {items.map((s) => (
                <div key={s.src} style={{ position: "relative" }}>
                  <button onClick={() => onTile(s.src)} style={{ width: "100%", aspectRatio: "1", overflow: "hidden", padding: 0, border: sel === s.src ? "3px solid #1a1a1a" : "none", background: "#fff", cursor: editing ? "pointer" : "zoom-in", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", display: "block" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.src} alt={s.orig} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: editing && sel && sel !== s.src ? 0.6 : 1 }} />
                  </button>
                  {editing && (
                    <button data-noedit onClick={() => onDelete(s.src)} aria-label="eliminar"
                      style={{ position: "absolute", top: 6, right: 6, width: 26, height: 26, borderRadius: "50%", border: "none", background: "rgba(155,29,29,0.92)", color: "#fff", fontSize: "1rem", lineHeight: 1, cursor: "pointer" }}>×</button>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <footer style={{ textAlign: "center", padding: "clamp(4rem,10vh,7rem) 1.5rem 4rem", color: "#9a8f7e" }}>
        <div style={{ fontSize: "1rem", letterSpacing: "0.42em", textTransform: "uppercase", fontWeight: 300, color: "#4a463f", paddingLeft: "0.42em" }}>Callista</div>
        <div style={{ fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: "1rem" }}>Earth · Exosphere · Kosma</div>
      </footer>

      {/* curation toolbar (dev only) */}
      {DEV && (
        <div data-noedit style={{ position: "fixed", left: 16, bottom: 16, zIndex: 120, display: "flex", alignItems: "center", gap: "0.6rem", background: "rgba(20,20,22,0.88)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 8, padding: "0.5rem 0.7rem", backdropFilter: "blur(6px)", fontFamily: SANS }}>
          {editing && <span style={{ color: "#cfcabf", fontSize: "0.66rem", letterSpacing: "0.06em", maxWidth: 200 }}>{sel ? "elegí otra para intercambiar" : "tocá 2 fotos para swap · × elimina"}</span>}
          {editing && <button data-noedit onClick={save} style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", background: "#9b1d1d", border: "none", borderRadius: 5, padding: "0.45rem 0.8rem", cursor: "pointer" }}>{saveMsg || "guardar"}</button>}
          <button data-noedit onClick={() => { setEditing((e) => !e); setSel(null); }} style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#ece9e2", background: "transparent", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 5, padding: "0.45rem 0.8rem", cursor: "pointer" }}>{editing ? "listo" : "✎ ordenar"}</button>
        </div>
      )}

      {/* lightbox */}
      <AnimatePresence>
        {open !== null && flatVisible[open] && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}
            style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(244,241,236,0.97)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={flatVisible[open].src} alt="" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "88vw", maxHeight: "88vh", objectFit: "contain", boxShadow: "0 20px 70px rgba(0,0,0,0.25)" }} />
            <button onClick={(e) => { e.stopPropagation(); go(-1); }} style={lbBtn("left")} aria-label="anterior">‹</button>
            <button onClick={(e) => { e.stopPropagation(); go(1); }} style={lbBtn("right")} aria-label="siguiente">›</button>
            <button onClick={close} style={{ position: "fixed", top: 20, right: 26, background: "none", border: "none", color: "#333", fontSize: "2rem", cursor: "pointer", fontFamily: SANS }} aria-label="cerrar">×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function lbBtn(side: "left" | "right"): React.CSSProperties {
  return { position: "fixed", [side]: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#333", fontSize: "2.6rem", cursor: "pointer", padding: "0 1rem", opacity: 0.5 } as React.CSSProperties;
}
