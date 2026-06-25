"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Shot } from "../collections";
import type { Crop, Placed, RoomLayout } from "../layouts";

const MONO = "var(--font-mono), 'JetBrains Mono', monospace";

type Item = Placed & { src: string };
const FULL: Crop = { cx: 0, cy: 0, cw: 1, ch: 1 };

function autoPlace(i: number) {
  const cols = 5, gap = 40, w = 240, cellH = 260;
  return { x: 60 + (i % cols) * (w + gap), y: 60 + Math.floor(i / cols) * cellH, w };
}
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

// ---- cropped image tile: shows only the crop region of the source ----
function Cropped({ src, w, aspect, crop }: { src: string; w: number; aspect: number; crop: Crop }) {
  const c = crop;
  const fullW = w / c.cw;
  const fullH = fullW * aspect;
  const h = c.ch * fullH;
  return (
    <div style={{ position: "relative", width: w, height: h, overflow: "hidden" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" draggable={false} loading="lazy"
        style={{ position: "absolute", left: -c.cx * fullW, top: -c.cy * fullH, width: fullW, height: fullH, maxWidth: "none", pointerEvents: "none", display: "block" }} />
    </div>
  );
}

// ---- crop modal: move the rect, drag any corner ----
function CropModal({ src, initial, onConfirm, onCancel }: { src: string; initial: Crop; onConfirm: (c: Crop) => void; onCancel: () => void }) {
  const [crop, setCrop] = useState<Crop>(initial);
  const boxRef = useRef<HTMLDivElement>(null);
  const drag = useRef<null | { mode: string; sx: number; sy: number; c0: Crop }>(null);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const d = drag.current, box = boxRef.current; if (!d || !box) return;
      const r = box.getBoundingClientRect();
      const dx = (e.clientX - d.sx) / r.width, dy = (e.clientY - d.sy) / r.height;
      let { cx, cy, cw, ch } = d.c0; const m = 0.05;
      if (d.mode === "move") { cx = clamp(cx + dx, 0, 1 - cw); cy = clamp(cy + dy, 0, 1 - ch); }
      if (d.mode.includes("e")) cw = clamp(cw + dx, m, 1 - cx);
      if (d.mode.includes("s")) ch = clamp(ch + dy, m, 1 - cy);
      if (d.mode.includes("w")) { const nx = clamp(cx + dx, 0, cx + cw - m); cw = cw + (cx - nx); cx = nx; }
      if (d.mode.includes("n")) { const ny = clamp(cy + dy, 0, cy + ch - m); ch = ch + (cy - ny); cy = ny; }
      setCrop({ cx, cy, cw, ch });
    };
    const up = () => { drag.current = null; };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
  }, []);

  const start = (mode: string) => (e: React.PointerEvent) => { e.stopPropagation(); e.preventDefault(); drag.current = { mode, sx: e.clientX, sy: e.clientY, c0: crop }; };
  const handle = (pos: React.CSSProperties, mode: string) => (
    <div onPointerDown={start(mode)} style={{ position: "absolute", width: 18, height: 18, background: "#9b1d1d", border: "2px solid #fff", cursor: `${mode}-resize`, touchAction: "none", ...pos }} />
  );

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 20000, background: "rgba(6,6,7,0.94)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.2rem" }}>
      <div ref={boxRef} style={{ position: "relative", maxWidth: "78vw", maxHeight: "76vh", lineHeight: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" draggable={false} style={{ maxWidth: "78vw", maxHeight: "76vh", display: "block", userSelect: "none" }} />
        {/* dim outside */}
        <div style={{ position: "absolute", inset: 0, boxShadow: `0 0 0 9999px rgba(0,0,0,0.55)`, clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${crop.cx * 100}% ${crop.cy * 100}%, ${crop.cx * 100}% ${(crop.cy + crop.ch) * 100}%, ${(crop.cx + crop.cw) * 100}% ${(crop.cy + crop.ch) * 100}%, ${(crop.cx + crop.cw) * 100}% ${crop.cy * 100}%, ${crop.cx * 100}% ${crop.cy * 100}%)`, pointerEvents: "none" }} />
        {/* crop rect */}
        <div onPointerDown={start("move")}
          style={{ position: "absolute", left: `${crop.cx * 100}%`, top: `${crop.cy * 100}%`, width: `${crop.cw * 100}%`, height: `${crop.ch * 100}%`, border: "1px solid rgba(255,255,255,0.9)", cursor: "move", touchAction: "none" }}>
          {handle({ left: -9, top: -9 }, "nw")}
          {handle({ right: -9, top: -9 }, "ne")}
          {handle({ left: -9, bottom: -9 }, "sw")}
          {handle({ right: -9, bottom: -9 }, "se")}
        </div>
      </div>
      <div style={{ display: "flex", gap: "1rem", fontFamily: MONO, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
        <button onClick={() => onConfirm(crop)} style={{ background: "#9b1d1d", color: "#fff", border: "none", padding: "0.5rem 1.3rem", cursor: "pointer" }}>recortar</button>
        <button onClick={() => onConfirm(FULL)} style={{ background: "none", color: "#b8b3a9", border: "1px solid #3a3a3a", padding: "0.5rem 1rem", cursor: "pointer" }}>reset</button>
        <button onClick={onCancel} style={{ background: "none", color: "#8a857c", border: "1px solid #3a3a3a", padding: "0.5rem 1rem", cursor: "pointer" }}>cancelar</button>
      </div>
    </div>
  );
}

export default function FreeformCanvas({ slug, shots, initial }: { slug: string; shots: Shot[]; initial: RoomLayout }) {
  const aspect = useMemo(() => {
    const m: Record<string, number> = {};
    shots.forEach((s) => { m[s.src] = s.h / s.w; });
    return m;
  }, [shots]);

  const [deleted, setDeleted] = useState<Set<string>>(() => new Set(initial.deleted ?? []));
  const [items, setItems] = useState<Item[]>(() => {
    const saved = initial.items ?? {};
    let z = 1;
    return shots.filter((s) => !(initial.deleted ?? []).includes(s.src)).map((s, i) => {
      const p = saved[s.src];
      if (p) { z = Math.max(z, p.z + 1); return { src: s.src, ...p }; }
      const a = autoPlace(i);
      return { src: s.src, x: a.x, y: a.y, w: a.w, z: z++ };
    });
  });
  const [zoom, setZoom] = useState(0.7);
  const [sel, setSel] = useState<string | null>(null);
  const [cropTarget, setCropTarget] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  const drag = useRef<null | { src: string; mode: "move" | "resize"; sx: number; sy: number; ox: number; oy: number; ow: number }>(null);
  const zoomRef = useRef(zoom); zoomRef.current = zoom;

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const d = drag.current; if (!d) return;
      const k = zoomRef.current;
      const dx = (e.clientX - d.sx) / k, dy = (e.clientY - d.sy) / k;
      setItems((prev) => prev.map((it) => it.src !== d.src ? it : d.mode === "move" ? { ...it, x: d.ox + dx, y: d.oy + dy } : { ...it, w: Math.max(60, d.ow + dx) }));
    };
    const up = () => { drag.current = null; };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
  }, []);

  const maxZ = () => items.reduce((m, it) => Math.max(m, it.z), 0);
  const startMove = (e: React.PointerEvent, it: Item) => {
    e.stopPropagation(); setSel(it.src);
    setItems((prev) => prev.map((p) => p.src === it.src ? { ...p, z: maxZ() + 1 } : p));
    drag.current = { src: it.src, mode: "move", sx: e.clientX, sy: e.clientY, ox: it.x, oy: it.y, ow: it.w };
  };
  const startResize = (e: React.PointerEvent, it: Item) => { e.stopPropagation(); e.preventDefault(); drag.current = { src: it.src, mode: "resize", sx: e.clientX, sy: e.clientY, ox: it.x, oy: it.y, ow: it.w }; };
  const remove = (e: React.MouseEvent, src: string) => { e.stopPropagation(); setItems((p) => p.filter((x) => x.src !== src)); setDeleted((p) => new Set(p).add(src)); if (sel === src) setSel(null); };
  const applyCrop = (src: string, c: Crop) => { setItems((p) => p.map((it) => it.src === src ? { ...it, crop: c.cw >= 0.999 && c.ch >= 0.999 ? undefined : c } : it)); setCropTarget(null); };

  const save = async () => {
    setStatus("guardando…");
    const layout: RoomLayout = {
      deleted: [...deleted],
      items: Object.fromEntries(items.map((it) => [it.src, { x: Math.round(it.x), y: Math.round(it.y), w: Math.round(it.w), z: it.z, ...(it.crop ? { crop: it.crop } : {}) }])),
    };
    try {
      const r = await fetch("/api/artme/curate", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ slug, layout }) });
      const j = await r.json(); setStatus(j.ok ? "guardado ✓" : "error: " + j.error);
    } catch (e: any) { setStatus("error: " + (e?.message ?? e)); }
    setTimeout(() => setStatus(""), 2600);
  };

  const bounds = useMemo(() => {
    let mw = 2200, mh = 1400;
    items.forEach((it) => { const c = it.crop ?? FULL; const h = (it.w / c.cw) * (aspect[it.src] ?? 1) * c.ch; mw = Math.max(mw, it.x + it.w + 200); mh = Math.max(mh, it.y + h + 200); });
    return { mw, mh };
  }, [items, aspect]);

  const cropItem = cropTarget ? items.find((i) => i.src === cropTarget) : null;

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap", fontFamily: MONO, fontSize: "0.72rem", color: "#8a857c", marginBottom: "1rem" }}>
        <span style={{ color: "#b8b3a9" }}>{items.length} en mesa · {deleted.size} ocultas</span>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>zoom<input type="range" min={0.3} max={1.4} step={0.05} value={zoom} onChange={(e) => setZoom(parseFloat(e.target.value))} /></label>
        <button onClick={save} style={btn}>guardar</button>
        {status && <span style={{ color: status.startsWith("error") ? "#e06a5a" : "#7dd6a0" }}>{status}</span>}
        <span style={{ color: "#5f5b53" }}>arrastrá para mover · esquina ↘ redimensiona · ✂ recorta · × oculta</span>
      </div>

      <div style={{ position: "relative", width: "100%", height: "min(78vh, 880px)", overflow: "auto", background: "radial-gradient(ellipse at 50% 30%, #141416, #0a0a0b)", border: "1px solid rgba(236,233,226,0.1)" }} onPointerDown={() => setSel(null)}>
        <div style={{ position: "relative", width: bounds.mw, height: bounds.mh, transform: `scale(${zoom})`, transformOrigin: "0 0" }}>
          {items.map((it) => {
            const crop = it.crop ?? FULL;
            const selected = sel === it.src;
            return (
              <div key={it.src} onPointerDown={(e) => startMove(e, it)}
                style={{ position: "absolute", left: it.x, top: it.y, zIndex: it.z, cursor: "grab", boxShadow: selected ? "0 0 0 2px #9b1d1d, 0 18px 40px rgba(0,0,0,0.5)" : "0 10px 30px rgba(0,0,0,0.4)", touchAction: "none" }}>
                <Cropped src={it.src} w={it.w} aspect={aspect[it.src] ?? 1} crop={crop} />
                {selected && (
                  <>
                    <button onClick={(e) => remove(e, it.src)} title="ocultar" style={delBtn}>×</button>
                    <button onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); setCropTarget(it.src); }} title="recortar" style={cropBtn}>✂</button>
                    <div onPointerDown={(e) => startResize(e, it)} title="redimensionar" style={resizeHandle} />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {cropItem && (
        <CropModal src={cropItem.src} initial={cropItem.crop ?? FULL} onConfirm={(c) => applyCrop(cropItem.src, c)} onCancel={() => setCropTarget(null)} />
      )}
    </div>
  );
}

const btn: React.CSSProperties = { fontFamily: MONO, fontSize: "0.72rem", color: "#ece9e2", background: "#9b1d1d", border: "none", padding: "0.4rem 1rem", cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase" };
const delBtn: React.CSSProperties = { position: "absolute", top: -12, right: -12, width: 26, height: 26, borderRadius: "50%", background: "#0b0b0c", color: "#fff", border: "1px solid #9b1d1d", cursor: "pointer", fontSize: "1rem", lineHeight: 1, zIndex: 99999 };
const cropBtn: React.CSSProperties = { position: "absolute", top: -12, left: -12, width: 26, height: 26, borderRadius: "50%", background: "#0b0b0c", color: "#fff", border: "1px solid #9b1d1d", cursor: "pointer", fontSize: "0.8rem", lineHeight: 1, zIndex: 99999 };
const resizeHandle: React.CSSProperties = { position: "absolute", right: -7, bottom: -7, width: 16, height: 16, background: "#9b1d1d", border: "2px solid #0b0b0c", cursor: "nwse-resize", touchAction: "none", zIndex: 99999 };
