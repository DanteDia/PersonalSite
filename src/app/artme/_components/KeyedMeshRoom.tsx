"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// @ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// @ts-ignore
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const MONO = "var(--font-mono), 'JetBrains Mono', monospace";
const SERIF = "var(--font-serif), 'EB Garamond', Georgia, serif";
const COL: React.CSSProperties = { maxWidth: 1300, margin: "0 auto", padding: "0 clamp(1rem,4vw,3rem)" };

export default function KeyedMeshRoom({
  n, title, subtitle, blurb, model,
}: { n: string; title: string; subtitle: string; blurb: string; model: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const keyUniform = useRef({ value: 0.30 });
  const [status, setStatus] = useState("cargando…");
  const [key, setKey] = useState(0.30);

  useEffect(() => { keyUniform.current.value = key; }, [key]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false, raf = 0;

    const W = mount.clientWidth || 800, H = mount.clientHeight || 600;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.01, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.autoRotate = true; controls.autoRotateSpeed = 0.6;
    controls.addEventListener("start", () => { controls.autoRotate = false; });
    camera.position.set(0, 0.3, 3); controls.target.set(0, 0, 0); controls.update();

    scene.add(new THREE.HemisphereLight(0xffffff, 0x33343a, 1.0));
    const d1 = new THREE.DirectionalLight(0xffffff, 1.6); d1.position.set(2, 3, 2); scene.add(d1);
    const d2 = new THREE.DirectionalLight(0xbcd0ff, 0.5); d2.position.set(-2, 0, -1.5); scene.add(d2);

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const loop = () => {
      if (disposed) return;
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
        obj.traverse((c: any) => {
          if (!c.isMesh) return;
          c.material.transparent = false;
          c.material.side = THREE.DoubleSide;
          // chroma-key: discard near-white/cream texels so the scan's background
          // (cream) is cut away, leaving only the colored piece.
          c.material.onBeforeCompile = (shader: any) => {
            shader.uniforms.uKey = keyUniform.current;
            shader.fragmentShader =
              "uniform float uKey;\n" +
              shader.fragmentShader.replace(
                "#include <map_fragment>",
                "#include <map_fragment>\n  if (min(min(diffuseColor.r, diffuseColor.g), diffuseColor.b) > uKey) discard;"
              );
          };
          c.material.needsUpdate = true;
        });
        const box = new THREE.Box3().setFromObject(obj);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const s = 2 / (Math.max(size.x, size.y, size.z) || 1);
        obj.position.sub(center);
        const pivot = new THREE.Group();
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
  }, [model]);

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
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.2rem", fontFamily: MONO, fontSize: "0.66rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#5f5b53" }}>
          <span>recorte del fondo crema</span>
          <input type="range" min={0.2} max={0.95} step={0.01} value={key} onChange={(e) => setKey(parseFloat(e.target.value))} style={{ width: 220 }} />
          <span>{Math.round(key * 100)}%</span>
        </div>
      </div>

      <div style={{ position: "relative", width: "100%", height: "100dvh", background: "radial-gradient(ellipse at 50% 45%, #16161a, #08080a)", borderTop: "1px solid rgba(236,233,226,0.1)", borderBottom: "1px solid rgba(236,233,226,0.1)", cursor: "grab" }}>
        <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />
        {status && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a857c", pointerEvents: "none", zIndex: 2 }}>{status}</div>
        )}
      </div>

      <div style={{ ...COL }}>
        <p style={{ fontFamily: MONO, fontSize: "0.7rem", color: "#5f5b53", marginTop: "1.2rem", lineHeight: 1.8 }}>
          Subí el recorte hasta que el fondo crema desaparezca · arrastrá para orbitar
        </p>
      </div>
    </main>
  );
}
