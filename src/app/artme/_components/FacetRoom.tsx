"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// @ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// @ts-ignore
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import views from "../../artme-views.json";

const MONO = "var(--font-mono), 'JetBrains Mono', monospace";
const SERIF = "var(--font-serif), 'EB Garamond', Georgia, serif";
const COL: React.CSSProperties = { maxWidth: 1300, margin: "0 auto", padding: "0 clamp(1rem,4vw,3rem)" };

// The object nearly vanishes into the dark; only the facets catching the light
// flicker in and out as it turns. Recreates the "moving white dots" capture.
// slider runs 0.12 (oscuro) → 1.5 (claro); map a "% de luz" onto it
const LUM_MIN = 0.12, LUM_MAX = 1.5;
const pctToLum = (p: number) => LUM_MIN + p * (LUM_MAX - LUM_MIN);

export default function FacetRoom({
  slug, n, title, subtitle, blurb, model,
}: { slug?: string; n: string; title: string; subtitle: string; blurb: string; model: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const keyRef = useRef<any>(null);
  const ambRef = useRef<any>(null);
  const fillRef = useRef<any>(null);
  const camRef = useRef<any>(null);
  const controlsRef = useRef<any>(null);
  const view = slug ? (views as Record<string, any>)[slug] : null;
  const [status, setStatus] = useState("cargando…");
  const [savedView, setSavedView] = useState("");
  // default = 20% de luz (arranca oscuro, "apariciones"); o lo que se haya guardado
  const [lum, setLum] = useState<number>(view?.lum ?? pctToLum(0.2));
  const lumRef = useRef(lum);

  const saveView = () => {
    const cam = camRef.current, ctr = controlsRef.current;
    if (!cam || !ctr || !slug) return;
    const p = cam.position, t = ctr.target;
    const v = { cam: [p.x, p.y, p.z], target: [t.x, t.y, t.z], lum: lumRef.current };
    setSavedView("guardando…");
    fetch("/api/artme/view", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ slug, view: v }) })
      .then((r) => r.json()).then((j) => setSavedView(j.ok ? "vista guardada ✓" : "error")).catch(() => setSavedView("error"));
    setTimeout(() => setSavedView(""), 2600);
  };

  // live darkness control
  useEffect(() => {
    lumRef.current = lum;
    if (keyRef.current) keyRef.current.intensity = 3.0 * lum;
    if (ambRef.current) ambRef.current.intensity = 0.03 * lum;
    if (fillRef.current) fillRef.current.intensity = 0.22 * lum;
  }, [lum]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let raf = 0;

    const W = mount.clientWidth || 800, H = mount.clientHeight || 600;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.01, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    camera.position.set(0, 0, 3.2);
    controls.target.set(0, 0, 0);
    if (view?.cam && view?.target) {
      camera.position.set(view.cam[0], view.cam[1], view.cam[2]);
      controls.target.set(view.target[0], view.target[1], view.target[2]);
    }
    controls.update();
    camRef.current = camera;
    controlsRef.current = controls;

    // grazing back-light: most of the camera-facing surface stays black,
    // only facets tilted toward the light flare up as the piece turns.
    const amb = new THREE.AmbientLight(0xffffff, 0.03 * lumRef.current);
    scene.add(amb); ambRef.current = amb;
    const key = new THREE.DirectionalLight(0xffffff, 3.0 * lumRef.current);
    key.position.set(-2.6, 1.6, -1.4);
    scene.add(key); keyRef.current = key;
    const fill = new THREE.DirectionalLight(0x6f86b0, 0.22 * lumRef.current);
    fill.position.set(1.6, -0.8, 1.2);
    scene.add(fill); fillRef.current = fill;

    let pivot: any = null;

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const loop = () => {
      if (disposed) return;
      if (pivot) pivot.rotation.y += 0.0045; // object turns relative to fixed light
      controls.update();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    new GLTFLoader().load(
      model,
      (gltf: any) => {
        if (disposed) return;
        const obj = gltf.scene;
        const mat = new THREE.MeshStandardMaterial({ color: 0xf2efe9, flatShading: true, roughness: 0.78, metalness: 0.0 });
        obj.traverse((c: any) => { if (c.isMesh) { c.material = mat; c.geometry.computeVertexNormals(); } });
        // center + normalize to radius ~1
        const box = new THREE.Box3().setFromObject(obj);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const s = 2 / (Math.max(size.x, size.y, size.z) || 1);
        obj.position.sub(center);
        pivot = new THREE.Group();
        pivot.scale.setScalar(s);
        pivot.add(obj);
        scene.add(pivot);
        setStatus("");
      },
      undefined,
      (e: any) => { if (!disposed) setStatus("no se pudo cargar: " + (e?.message ?? e)); }
    );

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      try { controls.dispose(); } catch {}
      try { renderer.dispose(); if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement); } catch {}
    };
  }, [model, view]);

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
        </header>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.2rem", fontFamily: MONO, fontSize: "0.66rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#5f5b53" }}>
          <span>oscuridad</span>
          <input type="range" min={0.12} max={1.5} step={0.02} value={lum} onChange={(e) => setLum(parseFloat(e.target.value))} style={{ width: 200 }} />
          <span>luz</span>
        </div>
      </div>

      <div style={{ position: "relative", width: "100%", height: "100dvh", background: "radial-gradient(ellipse at 50% 45%, #0d0d0f, #050506)", borderTop: "1px solid rgba(236,233,226,0.1)", borderBottom: "1px solid rgba(236,233,226,0.1)", cursor: "grab" }}>
        <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />
        {status && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a857c", pointerEvents: "none", zIndex: 2 }}>{status}</div>
        )}
        {process.env.NODE_ENV !== "production" && slug && !status && (
          <button data-noedit onClick={saveView} title="Orbitá y ajustá la oscuridad; guardalo como punto de inicio"
            style={{ position: "absolute", right: 16, bottom: 16, zIndex: 5, fontFamily: MONO, fontSize: "0.66rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#ece9e2", background: "rgba(20,20,22,0.7)", border: "1px solid rgba(236,233,226,0.25)", borderRadius: 4, padding: "0.55rem 0.8rem", cursor: "pointer", backdropFilter: "blur(6px)" }}>
            ⌖ {savedView || "guardar vista"}
          </button>
        )}
      </div>

      <div style={{ ...COL }}>
        <p style={{ fontFamily: MONO, fontSize: "0.7rem", color: "#5f5b53", marginTop: "1.2rem", lineHeight: 1.8 }}>
          Gira sola · arrastrá para orbitar · lo que se revela al moverse
        </p>
      </div>
    </main>
  );
}
