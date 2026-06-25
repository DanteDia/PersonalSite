"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Shot } from "../collections";
import type { Crop } from "../layouts";
import { getLayout } from "../layouts";
import FreeformCanvas from "./FreeformCanvas";

const MONO = "var(--font-mono), 'JetBrains Mono', monospace";
const SERIF = "var(--font-serif), 'EB Garamond', Georgia, serif";
const FULL: Crop = { cx: 0, cy: 0, cw: 1, ch: 1 };
const isCropped = (c?: Crop) => !!c && (c.cw < 0.999 || c.ch < 0.999);

function bgCrop(src: string, c: Crop): React.CSSProperties {
  return {
    backgroundImage: `url(${src})`,
    backgroundSize: `${100 / c.cw}% ${100 / c.ch}%`,
    backgroundPosition: `${c.cw < 1 ? (c.cx / (1 - c.cw)) * 100 : 0}% ${c.ch < 1 ? (c.cy / (1 - c.ch)) * 100 : 0}%`,
    backgroundRepeat: "no-repeat",
  };
}

// Renders the saved curation layout (positions / sizes / crops) scaled to fit width.
function FreeformView({ visible, items, aspectMap, onOpen, stagger = false }: {
  visible: Shot[]; items: Record<string, { x: number; y: number; w: number; z: number; crop?: Crop }>;
  aspectMap: Record<string, number>; onOpen: (i: number) => void; stagger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el); setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const placed = visible.map((s, i) => {
    const p = items[s.src]; if (!p) return null;
    const c = p.crop ?? FULL;
    const h = (p.w / c.cw) * (aspectMap[s.src] ?? 1) * c.ch;
    return { src: s.src, idx: i, x: p.x, y: p.y, w: p.w, h, c, z: p.z ?? 0 };
  }).filter(Boolean) as { src: string; idx: number; x: number; y: number; w: number; h: number; c: Crop; z: number }[];

  let bw = 1, bh = 1;
  placed.forEach((it) => { bw = Math.max(bw, it.x + it.w); bh = Math.max(bh, it.y + it.h); });
  bw += 60; bh += 60;
  const scale = w ? w / bw : 0;

  // staggered reveal (77 km/h): rows appear one every 2s, presented little by little
  const rowOf = useMemo(() => {
    const map: Record<string, number> = {}; if (!stagger) return map;
    let row = 0, prevY: number | null = null;
    [...placed].sort((a, b) => a.y - b.y).forEach((it) => {
      if (prevY === null || it.y - prevY > 60) row++;
      prevY = it.y; map[it.src] = row;
    });
    return map;
  }, [stagger, placed]);
  const maxRow = stagger ? Math.max(0, ...Object.values(rowOf)) : 0;
  const [shownRows, setShownRows] = useState(stagger ? 0 : Infinity);
  useEffect(() => {
    if (!stagger || !maxRow) return;
    setShownRows(1);
    const id = setInterval(() => setShownRows((r) => { if (r >= maxRow) { clearInterval(id); return r; } return r + 1; }), 2000);
    return () => clearInterval(id);
  }, [stagger, maxRow]);

  return (
    <div ref={ref} style={{ width: "100%", position: "relative", height: bh * scale }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: bw, height: bh, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {placed.map((it) => (
          <button key={it.src} onClick={() => onOpen(it.idx)} style={{ position: "absolute", left: it.x, top: it.y, width: it.w, height: it.h, zIndex: it.z, padding: 0, border: "none", background: "#141416", cursor: "zoom-in", overflow: "hidden", opacity: stagger && rowOf[it.src] > shownRows ? 0 : 1, transform: stagger && rowOf[it.src] > shownRows ? "translateY(12px)" : "none", transition: "opacity 0.9s ease, transform 0.9s ease" }}>
            <div style={{ width: "100%", height: "100%", ...bgCrop(it.src, it.c) }} />
          </button>
        ))}
      </div>
    </div>
  );
}

const COLL_LABEL: Record<string, string> = { earth: "Earth", exosphere: "Exosphere", kosma: "Kosma" };
const COLL_ORDER = ["earth", "exosphere", "kosma"];

// uniform, aligned, gap-tight square grid
function GridView({ shots, baseIndex, onOpen }: { shots: Shot[]; baseIndex: number; onOpen: (i: number) => void }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 3 }}>
      {shots.map((s, i) => (
        <button key={s.src} onClick={() => onOpen(baseIndex + i)} style={{ aspectRatio: "1", overflow: "hidden", padding: 0, border: "none", background: "#141416", cursor: "zoom-in" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.src} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </button>
      ))}
    </div>
  );
}

export default function Gallery({
  slug, n, title, subtitle, blurb, shots, freeform = false, grid = false, grouped = false, staggerReveal = false,
}: { slug: string; n: string; title: string; subtitle: string; blurb: string; shots: Shot[]; freeform?: boolean; grid?: boolean; grouped?: boolean; staggerReveal?: boolean }) {
  const layout = useMemo(() => getLayout(slug), [slug]);
  const deleted = useMemo(() => new Set(layout.deleted ?? []), [layout]);
  const visible = useMemo(() => shots.filter((s) => !deleted.has(s.src)), [shots, deleted]);
  const aspectMap = useMemo(() => { const m: Record<string, number> = {}; shots.forEach((s) => { m[s.src] = s.h / s.w; }); return m; }, [shots]);
  const hasLayout = useMemo(() => Object.keys(layout.items ?? {}).length > 0, [layout]);

  const DEV = process.env.NODE_ENV !== "production"; // la mesa de curaduría sólo existe en local
  const [mode, setMode] = useState<"galeria" | "mesa">("galeria");
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback((d: number) => setOpen((i) => (i === null ? null : (i + d + visible.length) % visible.length)), [visible.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", onKey); document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, close, go]);

  const tab = (active: boolean): React.CSSProperties => ({
    fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase",
    background: "none", border: "none", cursor: "pointer", padding: "0.2rem 0",
    color: active ? "#ece9e2" : "#6f6a61", borderBottom: active ? "1.5px solid #9b1d1d" : "1.5px solid transparent",
  });

  const lightboxNode = (s: Shot) => {
    const c = layout.items?.[s.src]?.crop;
    if (isCropped(c)) {
      const R = (c!.cw) / (c!.ch * (s.h / s.w));
      return <div onClick={(e) => e.stopPropagation()} style={{ width: `min(90vw, ${90 * R}vh)`, aspectRatio: `${R}`, ...bgCrop(s.src, c!), boxShadow: "0 0 80px rgba(0,0,0,0.6)" }} />;
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={s.src} alt="" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", boxShadow: "0 0 80px rgba(0,0,0,0.6)" }} />;
  };

  return (
    <main style={{ maxWidth: 1500, margin: "0 auto", padding: "clamp(2rem,5vw,4rem) clamp(1rem,4vw,3rem) 6rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8a857c" }}>
        <Link href="/artme" style={{ color: "#8a857c", textDecoration: "none" }}>← artme</Link>
        <span>{subtitle}</span>
      </div>

      <header style={{ margin: "clamp(2.5rem,8vh,5rem) 0 clamp(1.5rem,4vh,2rem)", maxWidth: "60ch" }}>
        <div style={{ fontFamily: MONO, fontSize: "0.8rem", color: "#9b1d1d", marginBottom: "0.8rem" }}>{n}</div>
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(2.6rem,8vw,5rem)", lineHeight: 1, margin: 0, letterSpacing: "-0.02em" }}>{title}</h1>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(1.05rem,2.2vw,1.35rem)", color: "#b8b3a9", lineHeight: 1.55, marginTop: "1.4rem" }}>{blurb}</p>
      </header>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", borderBottom: "1px solid rgba(236,233,226,0.12)", paddingBottom: "0.8rem", marginBottom: "1.5rem" }}>
        {DEV && <button style={tab(mode === "galeria")} onClick={() => setMode("galeria")}>galería</button>}
        {DEV && <button style={tab(mode === "mesa")} onClick={() => setMode("mesa")}>mesa de curaduría</button>}
        <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: "0.7rem", color: "#5f5b53" }}>{visible.length > 0 ? `${visible.length} piezas` : "en sincronización"}</span>
      </div>

      {visible.length === 0 && (
        <div style={{ fontFamily: MONO, fontSize: "0.8rem", color: "#6f6a61", lineHeight: 1.9, border: "1px dashed rgba(236,233,226,0.14)", padding: "2.5rem", textAlign: "center" }}>
          Esta sala todavía está sincronizándose desde iCloud.<br />Las imágenes aparecen acá apenas terminen de bajar.
        </div>
      )}

      {mode === "mesa" && visible.length > 0 && (<FreeformCanvas slug={slug} shots={shots} initial={layout} />)}

      {/* the gallery mirrors your mesa de curaduría arrangement when you've laid one out */}
      {mode === "galeria" && visible.length > 0 && hasLayout && (
        <FreeformView visible={visible} items={layout.items!} aspectMap={aspectMap} onOpen={(i) => setOpen(i)} stagger={staggerReveal} />
      )}

      {/* uniform grid mode (aligned, symmetric, no gaps) */}
      {mode === "galeria" && visible.length > 0 && !hasLayout && grid && grouped && (
        <div>
          {COLL_ORDER.map((c) => {
            const g = visible.filter((s) => (s as any).coll === c);
            if (!g.length) return null;
            const base = visible.findIndex((s) => s.src === g[0].src);
            return (
              <div key={c} style={{ marginBottom: "2.5rem" }}>
                <div style={{ fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#9b1d1d", marginBottom: "0.9rem" }}>{COLL_LABEL[c] ?? c}</div>
                <GridView shots={g} baseIndex={base} onOpen={(i) => setOpen(i)} />
              </div>
            );
          })}
        </div>
      )}

      {mode === "galeria" && visible.length > 0 && !hasLayout && grid && !grouped && (
        <GridView shots={visible} baseIndex={0} onOpen={(i) => setOpen(i)} />
      )}

      {mode === "galeria" && visible.length > 0 && !hasLayout && !grid && (
        <div style={{ columns: "4 280px", columnGap: "14px" }}>
          {visible.map((s, i) => {
            const c = layout.items?.[s.src]?.crop;
            return (
              <motion.button key={s.src} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 0.55, ease: "easeOut" }} onClick={() => setOpen(i)}
                style={{ display: "block", width: "100%", breakInside: "avoid", marginBottom: "14px", padding: 0, border: "none", background: "#141416", cursor: "zoom-in", overflow: "hidden" }}>
                {isCropped(c)
                  ? <div style={{ width: "100%", aspectRatio: `${c!.cw} / ${c!.ch * (s.h / s.w)}`, ...bgCrop(s.src, c!) }} />
                  // eslint-disable-next-line @next/next/no-img-element
                  : <img src={s.src} alt="" loading="lazy" width={s.w} height={s.h} style={{ width: "100%", height: "auto", display: "block" }} />}
              </motion.button>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {open !== null && visible[open] && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}
            style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(7,7,8,0.97)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <button onClick={(e) => { e.stopPropagation(); go(-1); }} style={navBtn("left")} aria-label="anterior">‹</button>
            {lightboxNode(visible[open])}
            <button onClick={(e) => { e.stopPropagation(); go(1); }} style={navBtn("right")} aria-label="siguiente">›</button>
            <button onClick={close} style={{ position: "fixed", top: 20, right: 24, background: "none", border: "none", color: "#ece9e2", fontSize: "2rem", cursor: "pointer", fontFamily: MONO }} aria-label="cerrar">×</button>
            <div style={{ position: "fixed", bottom: 22, left: 0, right: 0, textAlign: "center", fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.12em", color: "#8a857c" }}>{open + 1} / {visible.length}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function navBtn(side: "left" | "right"): React.CSSProperties {
  return { position: "fixed", [side]: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#ece9e2", fontSize: "3rem", cursor: "pointer", padding: "0 1rem", opacity: 0.6, fontFamily: "var(--font-serif), serif" } as React.CSSProperties;
}
