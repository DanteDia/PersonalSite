"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Shot } from "../collections";
import type { FrameEdit } from "../layouts";

const MONO = "var(--font-mono), 'JetBrains Mono', monospace";
const SERIF = "var(--font-serif), 'EB Garamond', Georgia, serif";
const COL: React.CSSProperties = { maxWidth: 1300, margin: "0 auto", padding: "0 clamp(1rem,4vw,3rem)" };
const DEV = process.env.NODE_ENV !== "production";

// CSS transform that frames a square image: pan + (90° + fine tilt) + zoom,
// auto-scaled so a tilt never exposes the corners.
function frameTransform(e: FrameEdit | undefined): string {
  const rot = e?.rot ?? 0, tilt = e?.tilt ?? 0, zoom = e?.zoom ?? 1, ox = e?.ox ?? 0, oy = e?.oy ?? 0;
  const t = ((rot + tilt) * Math.PI) / 180;
  const cover = Math.abs(Math.cos(t)) + Math.abs(Math.sin(t));
  const s = zoom * cover;
  return `translate(${ox}%, ${oy}%) rotate(${rot + tilt}deg) scale(${s})`;
}

export default function ProcesoRoom({
  n, title, subtitle, blurb, shots, slug, edits: edits0 = {},
}: {
  n: string; title: string; subtitle: string; blurb: string; shots: Shot[];
  slug?: string; edits?: Record<string, FrameEdit>;
}) {
  const N = shots.length;
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // editor state
  const [editing, setEditing] = useState(false);
  const [edits, setEdits] = useState<Record<string, FrameEdit>>(edits0);
  const [saveMsg, setSaveMsg] = useState("");
  const cur = shots[i]?.src;
  const curEdit = (cur && edits[cur]) || {};
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  useEffect(() => { shots.forEach((s) => { const im = new Image(); im.src = s.src; }); }, [shots]);

  const go = useCallback((d: number) => setI((x) => (x + d + N) % N), [N]);

  useEffect(() => {
    if (!playing) return;
    timer.current = setTimeout(() => setI((x) => { if (x + 1 >= N) { setPlaying(false); return x; } return x + 1; }), 750);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [playing, i, N]);

  const play = () => { if (i >= N - 1) setI(0); setPlaying((p) => !p); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === " " && !editing) { e.preventDefault(); play(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [go, i, N, editing]);

  // ---- editor helpers ----
  const setEdit = (patch: FrameEdit) => {
    if (!cur) return;
    setEdits((m) => ({ ...m, [cur]: { ...m[cur], ...patch } }));
  };
  const rotate = (dir: number) => setEdit({ rot: (((curEdit.rot ?? 0) + dir * 90) % 360 + 360) % 360 });
  const resetEdit = () => { if (cur) setEdits((m) => { const n = { ...m }; delete n[cur]; return n; }); };
  const save = () => {
    if (!slug) return;
    setSaveMsg("guardando…");
    fetch("/api/artme/curate", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ slug, layout: { edits } }) })
      .then((r) => r.json()).then((j) => setSaveMsg(j.ok ? "guardado ✓" : "error")).catch(() => setSaveMsg("error"));
    setTimeout(() => setSaveMsg(""), 2800);
  };

  // drag to pan (crop reframe) while editing
  const onPointerDown = (e: React.PointerEvent) => {
    if (!editing || !cur) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, ox: curEdit.ox ?? 0, oy: curEdit.oy ?? 0 };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !stageRef.current) return;
    const w = stageRef.current.clientWidth || 1;
    const dx = ((e.clientX - drag.current.x) / w) * 100;
    const dy = ((e.clientY - drag.current.y) / w) * 100;
    setEdit({ ox: +(drag.current.ox + dx).toFixed(2), oy: +(drag.current.oy + dy).toFixed(2) });
  };
  const onPointerUp = () => { drag.current = null; };

  return (
    <main style={{ width: "100%", paddingBottom: "5rem" }}>
      <div style={{ ...COL, paddingTop: "clamp(2rem,5vw,4rem)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8a857c" }}>
          <Link href="/artme" style={{ color: "#8a857c", textDecoration: "none" }}>← artme</Link>
          <span>{subtitle}</span>
        </div>
        <header style={{ margin: "clamp(2.5rem,7vh,4.5rem) 0 clamp(1.5rem,4vh,2.5rem)", maxWidth: "60ch" }}>
          <div style={{ fontFamily: MONO, fontSize: "0.8rem", color: "#9b1d1d", marginBottom: "0.8rem" }}>{n}</div>
          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(2.6rem,8vw,5rem)", lineHeight: 1, margin: 0, letterSpacing: "-0.02em" }}>{title}</h1>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(1.05rem,2.2vw,1.35rem)", color: "#b8b3a9", lineHeight: 1.55, marginTop: "1.4rem" }}>{blurb}</p>
        </header>
      </div>

      {/* stage */}
      <div style={{ ...COL }}>
        <div ref={stageRef}
          onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
          style={{ position: "relative", width: "min(78vh, 100%)", aspectRatio: "1", margin: "0 auto", background: "#0d0d0e", border: editing ? "1px solid #9b1d1d" : "1px solid rgba(236,233,226,0.1)", overflow: "hidden", cursor: editing ? "move" : "default", touchAction: editing ? "none" : "auto" }}>
          {shots.map((s, k) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={s.src} src={s.src} alt={`día ${k + 1}`} draggable={false}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: frameTransform(edits[s.src]), opacity: k === i ? 1 : 0, transition: drag.current ? "none" : "opacity 0.45s ease, transform 0.15s ease" }} />
          ))}
          {/* tilt guide grid while editing */}
          {editing && (
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)", backgroundSize: "33.33% 33.33%" }} />
          )}
          <div style={{ position: "absolute", left: 14, top: 12, fontFamily: MONO, fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#ece9e2", background: "rgba(13,13,14,0.55)", padding: "0.35rem 0.6rem", borderRadius: 3, backdropFilter: "blur(4px)" }}>día {i + 1} / {N}</div>
          {!editing && <button onClick={() => go(-1)} aria-label="día anterior" style={arrow("left")}>‹</button>}
          {!editing && <button onClick={() => go(1)} aria-label="día siguiente" style={arrow("right")}>›</button>}
        </div>

        {/* editor panel */}
        {DEV && editing && (
          <div data-noedit style={{ width: "min(78vh, 100%)", margin: "1rem auto 0", padding: "0.9rem 1rem", background: "rgba(20,20,22,0.9)", border: "1px solid rgba(236,233,226,0.18)", borderRadius: 8, fontFamily: MONO, color: "#cfcabf", fontSize: "0.66rem", letterSpacing: "0.08em" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", flexWrap: "wrap" }}>
              <span style={{ color: "#8a857c" }}>día {i + 1}</span>
              <button data-noedit onClick={() => rotate(-1)} style={miniBtn}>↺ 90°</button>
              <button data-noedit onClick={() => rotate(1)} style={miniBtn}>↻ 90°</button>
              <button data-noedit onClick={resetEdit} style={miniBtn}>reset</button>
              <span style={{ marginLeft: "auto", color: "#8a857c" }}>arrastrá la imagen para encuadrar</span>
            </div>
            <label style={rowLbl}>inclinación <span style={{ color: "#ece9e2" }}>{(curEdit.tilt ?? 0).toFixed(1)}°</span>
              <input type="range" min={-20} max={20} step={0.5} value={curEdit.tilt ?? 0} onChange={(e) => setEdit({ tilt: parseFloat(e.target.value) })} style={slider} />
            </label>
            <label style={rowLbl}>zoom <span style={{ color: "#ece9e2" }}>{(curEdit.zoom ?? 1).toFixed(2)}×</span>
              <input type="range" min={1} max={2.5} step={0.02} value={curEdit.zoom ?? 1} onChange={(e) => setEdit({ zoom: parseFloat(e.target.value) })} style={slider} />
            </label>
          </div>
        )}

        {/* playback controls */}
        <div style={{ width: "min(78vh, 100%)", margin: "1.4rem auto 0", display: "flex", alignItems: "center", gap: "1rem" }}>
          <button onClick={play} disabled={editing} style={{ flexShrink: 0, fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#ece9e2", background: editing ? "rgba(80,80,80,0.4)" : "rgba(155,29,29,0.85)", border: "none", borderRadius: 4, padding: "0.6rem 1rem", cursor: editing ? "default" : "pointer", minWidth: 110 }}>
            {playing ? "❚❚ pausa" : "▶ time-lapse"}
          </button>
          <input type="range" min={0} max={N - 1} value={i} onChange={(e) => { setPlaying(false); setI(Number(e.target.value)); }} style={{ flex: 1, accentColor: "#9b1d1d", cursor: "pointer" }} />
          {DEV && (
            <button data-noedit onClick={() => { setEditing((e) => !e); setPlaying(false); }} style={{ flexShrink: 0, fontFamily: MONO, fontSize: "0.66rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#ece9e2", background: editing ? "#9b1d1d" : "transparent", border: "1px solid rgba(236,233,226,0.3)", borderRadius: 4, padding: "0.55rem 0.8rem", cursor: "pointer" }}>
              {editing ? "✓ listo" : "✎ ajustar"}
            </button>
          )}
          {DEV && editing && (
            <button data-noedit onClick={save} style={{ flexShrink: 0, fontFamily: MONO, fontSize: "0.66rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", background: "#9b1d1d", border: "none", borderRadius: 4, padding: "0.55rem 0.8rem", cursor: "pointer" }}>{saveMsg || "guardar"}</button>
          )}
        </div>

        {/* filmstrip */}
        <div style={{ width: "min(78vh, 100%)", margin: "1.2rem auto 0", display: "grid", gridTemplateColumns: `repeat(${N}, 1fr)`, gap: 6 }}>
          {shots.map((s, k) => (
            <button key={s.src} onClick={() => { setPlaying(false); setI(k); }} aria-label={`día ${k + 1}`}
              style={{ position: "relative", aspectRatio: "1", padding: 0, border: k === i ? "2px solid #9b1d1d" : "1px solid rgba(236,233,226,0.15)", borderRadius: 2, overflow: "hidden", cursor: "pointer", background: "#0d0d0e", opacity: k === i ? 1 : 0.55, transition: "opacity 0.2s" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: frameTransform(edits[s.src]) }} />
            </button>
          ))}
        </div>

        <p style={{ fontFamily: MONO, fontSize: "0.66rem", color: "#5f5b53", textAlign: "center", marginTop: "1.4rem", letterSpacing: "0.08em" }}>
          deslizá o dale play · ← → para moverte día a día
        </p>
      </div>
    </main>
  );
}

const miniBtn: React.CSSProperties = { fontFamily: MONO, fontSize: "0.64rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#ece9e2", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(236,233,226,0.2)", borderRadius: 4, padding: "0.35rem 0.6rem", cursor: "pointer" };
const rowLbl: React.CSSProperties = { display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "0.7rem" };
const slider: React.CSSProperties = { flex: 1, accentColor: "#9b1d1d", cursor: "pointer" };

function arrow(side: "left" | "right"): React.CSSProperties {
  return { position: "absolute", [side]: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(13,13,14,0.4)", border: "none", color: "#ece9e2", fontSize: "1.8rem", width: 40, height: 56, cursor: "pointer", borderRadius: 4, backdropFilter: "blur(3px)" } as React.CSSProperties;
}
