"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// @ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import views from "../../artme-views.json";

const MONO = "var(--font-mono), 'JetBrains Mono', monospace";
const SERIF = "var(--font-serif), 'EB Garamond', Georgia, serif";
const COL: React.CSSProperties = { maxWidth: 1300, margin: "0 auto", padding: "0 clamp(1rem,4vw,3rem)" };

const VERT = `
  attribute vec3 iPos;
  attribute vec3 iColor;
  attribute vec3 iScatter;
  uniform float uReveal;
  uniform float uSize;
  varying vec2 vUv;
  varying vec3 vColor;
  void main() {
    vUv = uv;
    vColor = iColor;
    vec3 center = mix(iPos + iScatter, iPos, uReveal);
    vec4 mv = modelViewMatrix * vec4(center, 1.0);
    mv.xy += position.xy * uSize;
    gl_Position = projectionMatrix * mv;
  }
`;
const FRAG = `
  uniform float uReveal;
  uniform float uSoft;
  uniform float uOpacity;
  varying vec2 vUv;
  varying vec3 vColor;
  void main() {
    float d = length(vUv - 0.5);
    if (d > 0.5) discard;
    float a = exp(-d * d * uSoft);
    gl_FragColor = vec4(vColor, a * uReveal * uOpacity);
  }
`;

type Brush = "burbujas" | "pinceladas";
function brushParams(b: Brush) {
  return b === "pinceladas"
    ? { size: 0.052, soft: 3.5, opacity: 0.42 }
    : { size: 0.016, soft: 16.0, opacity: 0.95 };
}

export default function CloudRoom({
  slug, n, title, subtitle, blurb, ply, brightness = 1.7, additive = true, defaultBrush = "burbujas", brushToggle = true,
}: { slug?: string; n: string; title: string; subtitle: string; blurb: string; ply: string; brightness?: number; additive?: boolean; defaultBrush?: Brush; brushToggle?: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const matRef = useRef<any>(null);
  const camRef = useRef<any>(null);
  const controlsRef = useRef<any>(null);
  const brushRef = useRef<Brush>(defaultBrush);
  const [status, setStatus] = useState("cargando nube de puntos…");
  const [count, setCount] = useState(0);
  const [brush, setBrush] = useState<Brush>(defaultBrush);
  const [savedView, setSavedView] = useState("");
  const view = slug ? (views as Record<string, any>)[slug] : null;

  const saveView = () => {
    const cam = camRef.current, ctr = controlsRef.current;
    if (!cam || !ctr || !slug) return;
    const p = cam.position, t = ctr.target;
    const v = { cam: [p.x, p.y, p.z], target: [t.x, t.y, t.z] };
    setSavedView("guardando…");
    fetch("/api/artme/view", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ slug, view: v }) })
      .then((r) => r.json()).then((j) => setSavedView(j.ok ? "vista guardada ✓" : "error")).catch(() => setSavedView("error"));
    setTimeout(() => setSavedView(""), 2600);
  };

  // live-update material when the brush toggles (no rebuild)
  useEffect(() => {
    brushRef.current = brush;
    const m = matRef.current;
    if (!m) return;
    const p = brushParams(brush);
    m.uniforms.uSize.value = p.size;
    m.uniforms.uSoft.value = p.soft;
    m.uniforms.uOpacity.value = p.opacity;
  }, [brush]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let raf = 0;

    const W = mount.clientWidth || 800, H = mount.clientHeight || 600;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.001, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // cap DPR: big "pinceladas" blobs are fill-rate bound
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.addEventListener("start", () => { controls.autoRotate = false; });
    camera.position.set(1.7, 1.0, 2.3);
    controls.target.set(0, 0, 0);
    if (view?.cam && view?.target) {
      camera.position.set(view.cam[0], view.cam[1], view.cam[2]);
      controls.target.set(view.target[0], view.target[1], view.target[2]);
      controls.autoRotate = false; // start parked at the saved view
    }
    controls.update();
    camRef.current = camera;
    controlsRef.current = controls;

    let mat: any = null, geo: any = null, t0 = 0;
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const loop = () => {
      if (disposed) return;
      if (mat) {
        const t = Math.min(1, (performance.now() - t0) / 2800);
        mat.uniforms.uReveal.value = 1 - Math.pow(1 - t, 3);
      }
      controls.update();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    (async () => {
      const res = await fetch(ply);
      const buf = await res.arrayBuffer();
      if (disposed) return;
      const u8 = new Uint8Array(buf);
      const headerText = new TextDecoder().decode(u8.subarray(0, 4000));
      const marker = "end_header\n";
      const mi = headerText.indexOf(marker);
      if (mi < 0) throw new Error("header no encontrado");
      const hEnd = mi + marker.length;
      // header-driven offsets (works for the full 62-prop PLY and the slim 7-prop one)
      const props = headerText.slice(0, mi).split("\n").filter((l) => l.startsWith("property float")).map((l) => l.trim().split(/\s+/).pop() as string);
      const STRIDE = props.length * 4;
      const O = (name: string) => props.indexOf(name) * 4;
      const oX = O("x"), oY = O("y"), oZ = O("z"), oR = O("f_dc_0"), oG = O("f_dc_1"), oB = O("f_dc_2");
      const oOp = props.indexOf("opacity") >= 0 ? O("opacity") : -1;

      const total = Math.floor((buf.byteLength - hEnd) / STRIDE);
      const dv = new DataView(buf, hEnd);
      const C0 = 0.28209479177387814;
      const BR = brightness;
      const iPos = new Float32Array(total * 3), iColor = new Float32Array(total * 3), iScatter = new Float32Array(total * 3);
      const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
      let kept = 0;
      for (let i = 0; i < total; i++) {
        const o = i * STRIDE;
        const op = oOp >= 0 ? 1 / (1 + Math.exp(-dv.getFloat32(o + oOp, true))) : 1;
        if (op < 0.15) continue;
        const x = dv.getFloat32(o + oX, true), y = -dv.getFloat32(o + oY, true), z = dv.getFloat32(o + oZ, true);
        const k = kept++;
        iPos[k * 3] = x; iPos[k * 3 + 1] = y; iPos[k * 3 + 2] = z;
        if (x < min[0]) min[0] = x; if (y < min[1]) min[1] = y; if (z < min[2]) min[2] = z;
        if (x > max[0]) max[0] = x; if (y > max[1]) max[1] = y; if (z > max[2]) max[2] = z;
        iColor[k * 3] = Math.min(1, Math.max(0, (0.5 + C0 * dv.getFloat32(o + oR, true)) * BR));
        iColor[k * 3 + 1] = Math.min(1, Math.max(0, (0.5 + C0 * dv.getFloat32(o + oG, true)) * BR));
        iColor[k * 3 + 2] = Math.min(1, Math.max(0, (0.5 + C0 * dv.getFloat32(o + oB, true)) * BR));
      }
      const cx = (min[0] + max[0]) / 2, cy = (min[1] + max[1]) / 2, cz = (min[2] + max[2]) / 2;
      const span = Math.max(max[0] - min[0], max[1] - min[1], max[2] - min[2]) || 1;
      const sc = 2 / span;
      for (let k = 0; k < kept; k++) {
        iPos[k * 3] = (iPos[k * 3] - cx) * sc;
        iPos[k * 3 + 1] = (iPos[k * 3 + 1] - cy) * sc;
        iPos[k * 3 + 2] = (iPos[k * 3 + 2] - cz) * sc;
        const a = Math.random() * Math.PI * 2, b = Math.acos(2 * Math.random() - 1), rr = 1.4 + Math.random() * 1.8;
        iScatter[k * 3] = Math.sin(b) * Math.cos(a) * rr;
        iScatter[k * 3 + 1] = Math.sin(b) * Math.sin(a) * rr;
        iScatter[k * 3 + 2] = Math.cos(b) * rr;
      }

      const base = new THREE.PlaneGeometry(1, 1);
      geo = new THREE.InstancedBufferGeometry();
      geo.index = base.index;
      geo.setAttribute("position", base.getAttribute("position"));
      geo.setAttribute("uv", base.getAttribute("uv"));
      geo.setAttribute("iPos", new THREE.InstancedBufferAttribute(iPos.subarray(0, kept * 3), 3));
      geo.setAttribute("iColor", new THREE.InstancedBufferAttribute(iColor.subarray(0, kept * 3), 3));
      geo.setAttribute("iScatter", new THREE.InstancedBufferAttribute(iScatter.subarray(0, kept * 3), 3));
      geo.instanceCount = kept;

      const bp = brushParams(brushRef.current);
      mat = new THREE.ShaderMaterial({
        uniforms: { uReveal: { value: 0 }, uSize: { value: bp.size }, uSoft: { value: bp.soft }, uOpacity: { value: bp.opacity } },
        vertexShader: VERT, fragmentShader: FRAG,
        transparent: true, depthWrite: !additive,
        blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      });
      matRef.current = mat;
      const mesh = new THREE.Mesh(geo, mat);
      mesh.frustumCulled = false;
      scene.add(mesh);
      t0 = performance.now();
      setCount(kept);
      setStatus("");
    })().catch((e) => { if (!disposed) setStatus("no se pudo cargar: " + (e?.message ?? e)); });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      try { controls.dispose(); } catch {}
      try { geo?.dispose(); mat?.dispose(); } catch {}
      try { renderer.dispose(); if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement); } catch {}
    };
  }, [ply, brightness, additive, view]);

  const tab = (active: boolean): React.CSSProperties => ({
    fontFamily: MONO, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase",
    background: "none", border: "none", cursor: "pointer", padding: "0.25rem 0",
    color: active ? "#ece9e2" : "#6f6a61", borderBottom: active ? "1.5px solid #9b1d1d" : "1.5px solid transparent",
  });

  return (
    <main style={{ width: "100%", paddingBottom: "4rem" }}>
      <div style={{ ...COL, paddingTop: "clamp(2rem,5vw,4rem)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8a857c" }}>
          <Link href="/artme" style={{ color: "#8a857c", textDecoration: "none" }}>← artme</Link>
          <span>{subtitle}</span>
        </div>
        <header style={{ margin: "clamp(2.5rem,8vh,5rem) 0 clamp(1.2rem,3vh,2rem)", maxWidth: "60ch" }}>
          <div style={{ fontFamily: MONO, fontSize: "0.8rem", color: "#9b1d1d", marginBottom: "0.8rem" }}>{n}</div>
          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(2.6rem,8vw,5rem)", lineHeight: 1, margin: 0, letterSpacing: "-0.02em" }}>{title}</h1>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(1.05rem,2.2vw,1.35rem)", color: "#b8b3a9", lineHeight: 1.55, marginTop: "1.4rem" }}>{blurb}</p>
        </header>
        {brushToggle && (
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginBottom: "1.2rem" }}>
            <span style={{ fontFamily: MONO, fontSize: "0.66rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#5f5b53" }}>render</span>
            <button style={tab(brush === "burbujas")} onClick={() => setBrush("burbujas")}>burbujas</button>
            <button style={tab(brush === "pinceladas")} onClick={() => setBrush("pinceladas")}>pinceladas</button>
          </div>
        )}
      </div>

      <div style={{ position: "relative", width: "100%", height: "100dvh", background: "radial-gradient(ellipse at 50% 45%, #16161a, #08080a)", borderTop: "1px solid rgba(236,233,226,0.1)", borderBottom: "1px solid rgba(236,233,226,0.1)", cursor: "grab" }}>
        <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />
        {status && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a857c", pointerEvents: "none", zIndex: 2 }}>{status}</div>
        )}
        {process.env.NODE_ENV !== "production" && slug && !status && (
          <button data-noedit onClick={saveView} title="Orbitá la nube al ángulo que quieras y guardalo como vista inicial"
            style={{ position: "absolute", right: 16, bottom: 16, zIndex: 5, fontFamily: MONO, fontSize: "0.66rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#ece9e2", background: "rgba(20,20,22,0.7)", border: "1px solid rgba(236,233,226,0.25)", borderRadius: 4, padding: "0.55rem 0.8rem", cursor: "pointer", backdropFilter: "blur(6px)" }}>
            ⌖ {savedView || "guardar vista"}
          </button>
        )}
      </div>

      <div style={{ ...COL }}>
        <p style={{ fontFamily: MONO, fontSize: "0.7rem", color: "#5f5b53", marginTop: "1.2rem", lineHeight: 1.8 }}>
          {count ? count.toLocaleString("es") + " puntos · " : ""}{brush === "pinceladas" ? "pinceladas difuminadas" : "burbujas"} · arrastrá para orbitar · scroll para acercarte
        </p>
      </div>
    </main>
  );
}
