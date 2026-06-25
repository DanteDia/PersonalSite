"use client";

import Link from "next/link";
import { createElement, useCallback, useEffect, useRef, useState } from "react";
import views from "../../artme-views.json";

const MONO = "var(--font-mono), 'JetBrains Mono', monospace";
const SERIF = "var(--font-serif), 'EB Garamond', Georgia, serif";
const COL: React.CSSProperties = { maxWidth: 1300, margin: "0 auto", padding: "0 clamp(1rem,4vw,3rem)" };

export default function ModelRoom({
  slug, n, title, subtitle, blurb, model, iosModel, exposure = "1.05",
}: {
  slug?: string; n: string; title: string; subtitle: string; blurb: string; model: string; iosModel?: string; exposure?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [prog, setProg] = useState(0);
  const [savedView, setSavedView] = useState("");
  const attached = useRef(false);
  const mvEl = useRef<any>(null);
  const view = slug ? (views as Record<string, any>)[slug] : null;

  const saveView = () => {
    const el = mvEl.current; if (!el || !slug) return;
    const o = el.getCameraOrbit();
    const orbit = `${o.theta}rad ${o.phi}rad ${o.radius}m`;
    const fov = `${el.getFieldOfView()}deg`;
    setSavedView("guardando…");
    fetch("/api/artme/view", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ slug, view: { orbit, fov } }) })
      .then((r) => r.json()).then((j) => setSavedView(j.ok ? "vista guardada ✓" : "error"))
      .catch(() => setSavedView("error"));
    setTimeout(() => setSavedView(""), 2600);
  };

  useEffect(() => {
    let active = true;
    import("@google/model-viewer").then(() => { if (active) setLoaded(true); });
    return () => { active = false; };
  }, []);

  const mvRef = useCallback((el: any) => {
    mvEl.current = el;
    if (!el || attached.current) return;
    attached.current = true;
    el.addEventListener("progress", (e: any) => setProg(e.detail?.totalProgress ?? 0));
    el.addEventListener("load", () => setProg(1));
  }, []);

  return (
    <main style={{ width: "100%", paddingBottom: "4rem" }}>
      <div style={{ ...COL, paddingTop: "clamp(2rem,5vw,4rem)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8a857c" }}>
          <Link href="/artme" style={{ color: "#8a857c", textDecoration: "none" }}>← artme</Link>
          <span>{subtitle}</span>
        </div>

        <header style={{ margin: "clamp(2.5rem,8vh,5rem) 0 clamp(1.5rem,4vh,2.5rem)", maxWidth: "60ch" }}>
          <div style={{ fontFamily: MONO, fontSize: "0.8rem", color: "#9b1d1d", marginBottom: "0.8rem" }}>{n}</div>
          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(2.6rem,8vw,5rem)", lineHeight: 1, margin: 0, letterSpacing: "-0.02em" }}>{title}</h1>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(1.05rem,2.2vw,1.35rem)", color: "#b8b3a9", lineHeight: 1.55, marginTop: "1.4rem" }}>{blurb}</p>
          <div style={{ fontFamily: MONO, fontSize: "0.66rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5f5b53", marginTop: "1.8rem" }}>↓ scrolleá para verla en pantalla completa</div>
        </header>
      </div>

      {/* full-bleed, full-viewport interactive stage */}
      <div style={{ position: "relative", width: "100%", height: "100dvh", background: "radial-gradient(ellipse at 50% 40%, #1a1a1d, #0b0b0c)", borderTop: "1px solid rgba(236,233,226,0.1)", borderBottom: "1px solid rgba(236,233,226,0.1)" }}>
        {loaded && createElement("model-viewer", {
          src: model,
          "ios-src": iosModel,
          alt: title,
          ref: mvRef,
          "camera-controls": true,
          "auto-rotate": true,
          "auto-rotate-delay": 0,
          "rotation-per-second": "18deg",
          "shadow-intensity": "1",
          "shadow-softness": "0.8",
          exposure: exposure,
          "interaction-prompt": "none",
          ar: iosModel ? true : undefined,
          "ar-modes": "webxr scene-viewer quick-look",
          ...(view ? { "camera-orbit": view.orbit, "field-of-view": view.fov } : {}),
          style: { width: "100%", height: "100%", backgroundColor: "transparent", "--poster-color": "transparent" },
        })}
        {(!loaded || prog < 1) && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.9rem", pointerEvents: "none" }}>
            <div style={{ fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8a857c" }}>cargando obra{loaded ? ` · ${Math.round(prog * 100)}%` : "…"}</div>
            <div style={{ width: "min(280px, 60vw)", height: 2, background: "rgba(236,233,226,0.15)" }}>
              <div style={{ height: "100%", width: `${(loaded ? prog : 0.04) * 100}%`, background: "#9b1d1d", transition: "width 0.25s ease" }} />
            </div>
          </div>
        )}
        {process.env.NODE_ENV !== "production" && slug && loaded && (
          <button data-noedit onClick={saveView} title="Orbitá la obra al ángulo que quieras y guardalo como vista inicial"
            style={{ position: "absolute", right: 16, bottom: 16, zIndex: 5, fontFamily: MONO, fontSize: "0.66rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#ece9e2", background: "rgba(20,20,22,0.7)", border: "1px solid rgba(236,233,226,0.25)", borderRadius: 4, padding: "0.55rem 0.8rem", cursor: "pointer", backdropFilter: "blur(6px)" }}>
            ⌖ {savedView || "guardar vista"}
          </button>
        )}
      </div>

      <div style={{ ...COL }}>
        <p style={{ fontFamily: MONO, fontSize: "0.7rem", color: "#5f5b53", marginTop: "1.2rem", lineHeight: 1.8 }}>
          Arrastrá para rotar · scroll/pellizco para zoom{iosModel ? " · botón AR para verla en tu espacio" : ""}
        </p>
      </div>
    </main>
  );
}
