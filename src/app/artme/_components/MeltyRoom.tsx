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
const DEV = process.env.NODE_ENV !== "production";

// ---- cloud (burbujas) sprite ----
const C_VERT = `
  attribute vec3 iPos; attribute vec3 iColor; uniform float uSize;
  varying vec2 vUv; varying vec3 vColor;
  void main(){ vUv=uv; vColor=iColor;
    vec4 mv = modelViewMatrix * vec4(iPos,1.0);
    mv.xy += position.xy * uSize;
    gl_Position = projectionMatrix * mv; }
`;
const C_FRAG = `
  uniform float uSoft; uniform float uOpacity;
  varying vec2 vUv; varying vec3 vColor;
  void main(){ float d=length(vUv-0.5); if(d>0.5) discard;
    float a=exp(-d*d*uSoft);
    gl_FragColor=vec4(vColor, a*uOpacity); }
`;

// ---- image particles (dissolve) ----
// Particles fly omnidirectionally in 3D. Two passes share this geometry:
// the intact pixels draw on top of the cloud; the flying pixels respect depth
// so they disperse through the whole point cloud instead of covering it.
const P_VERT = `
  attribute vec3 iPos; attribute vec3 iColor; attribute vec3 iVel; attribute float iThresh;
  uniform float uProgress; uniform float uSize;
  varying vec2 vUv; varying vec3 vColor; varying float vLocal;
  void main(){ vUv=uv; vColor=iColor;
    float local = max(0.0, uProgress - iThresh);
    vLocal = local;
    vec3 pos = iPos + iVel * local * 6.0;     // scatter in all directions (incl. depth)
    float sz = uSize * (1.0 + local*0.5);
    vec4 mv = modelViewMatrix * vec4(pos,1.0);
    mv.xy += position.xy * sz;
    gl_Position = projectionMatrix * mv; }
`;
// intact figure — only pixels that haven't started flying; drawn over everything
const P_FRAG_FRONT = `
  varying vec2 vUv; varying vec3 vColor; varying float vLocal;
  void main(){ if(vLocal>0.0) discard;
    float d=length(vUv-0.5); if(d>0.5) discard;
    gl_FragColor = vec4(vColor, smoothstep(0.5,0.34,d)); }
`;
// flying pixels — depth-tested, fade as they travel into the cloud
const P_FRAG_DEPTH = `
  varying vec2 vUv; varying vec3 vColor; varying float vLocal;
  void main(){ if(vLocal<=0.0) discard;
    float d=length(vUv-0.5); if(d>0.5) discard;
    float a = 1.0 - smoothstep(0.0, 0.75, vLocal);
    if(a<=0.01) discard;
    gl_FragColor = vec4(vColor, a*smoothstep(0.5,0.34,d)); }
`;

type Brush = "burbujas" | "pinceladas";
const brushParams = (b: Brush) => b === "pinceladas" ? { size: 0.052, soft: 3.5, opacity: 0.42 } : { size: 0.016, soft: 16.0, opacity: 0.95 };

export default function MeltyRoom({
  slug, n, title, subtitle, blurb, ply, subject, brightness = 1.0, defaultBrush = "burbujas",
}: { slug?: string; n: string; title: string; subtitle: string; blurb: string; ply: string; subject: string; brightness?: number; defaultBrush?: Brush }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const cloudMatRef = useRef<any>(null);
  const partMatRef = useRef<any>(null);
  const partDepthMatRef = useRef<any>(null);
  const planeRef = useRef<any>(null);
  const controlsRef = useRef<any>(null);
  const progRef = useRef(0);
  const brushRef = useRef<Brush>(defaultBrush);
  const overlayRef = useRef<{ x: number; y: number; scale: number }>(
    ((views as Record<string, any>)["spatial-real-overlay"]) ?? { x: 0, y: 0, scale: 1 }
  );

  const [status, setStatus] = useState("cargando…");
  const [brush, setBrush] = useState<Brush>(defaultBrush);
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  // live brush update (cloud only)
  useEffect(() => {
    brushRef.current = brush;
    const m = cloudMatRef.current; if (!m) return;
    const p = brushParams(brush);
    m.uniforms.uSize.value = p.size; m.uniforms.uSoft.value = p.soft; m.uniforms.uOpacity.value = p.opacity;
  }, [brush]);

  const resetReveal = () => { progRef.current = 0; setProgress(0); setUnlocked(false); if (controlsRef.current) controlsRef.current.enabled = false; };
  const saveOverlay = () => {
    setSaveMsg("guardando…");
    fetch("/api/artme/view", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ slug: "spatial-real-overlay", view: overlayRef.current }) })
      .then((r) => r.json()).then((j) => setSaveMsg(j.ok ? "guardado ✓" : "error")).catch(() => setSaveMsg("error"));
    setTimeout(() => setSaveMsg(""), 2600);
  };

  useEffect(() => {
    const mount = mountRef.current; if (!mount) return;
    let disposed = false, raf = 0;
    const W = mount.clientWidth || 800, H = mount.clientHeight || 600;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.001, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enabled = false;
    controls.autoRotate = false; controls.autoRotateSpeed = 0.5;
    const sv = slug ? (views as Record<string, any>)[slug] : null; // respect the saved initial view
    if (sv?.cam && sv?.target) { camera.position.set(sv.cam[0], sv.cam[1], sv.cam[2]); controls.target.set(sv.target[0], sv.target[1], sv.target[2]); }
    else { camera.position.set(0, 0, 3.2); controls.target.set(0, 0, 0); }
    controls.update();
    controlsRef.current = controls;
    const camRight = new THREE.Vector3(), camUp = new THREE.Vector3();

    // visible-height at z=0 plane → px↔world conversion for the placer
    const visH = 2 * 3.2 * Math.tan((50 * Math.PI / 180) / 2);
    const pxToWorld = visH / H;

    const loop = () => {
      if (disposed) return;
      if (partMatRef.current) partMatRef.current.uniforms.uProgress.value = progRef.current;
      if (partDepthMatRef.current) partDepthMatRef.current.uniforms.uProgress.value = progRef.current;
      if (controls.enabled) controls.update();
      camera.updateMatrixWorld();
      // photo is a camera-facing billboard, parked in screen space, drawn over everything
      if (planeRef.current) {
        const o = overlayRef.current;
        planeRef.current.quaternion.copy(camera.quaternion);
        camRight.setFromMatrixColumn(camera.matrixWorld, 0);
        camUp.setFromMatrixColumn(camera.matrixWorld, 1);
        planeRef.current.position.copy(controls.target).addScaledVector(camRight, o.x).addScaledVector(camUp, o.y);
        planeRef.current.scale.setScalar(o.scale);
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onResize = () => { const w = mount.clientWidth, h = mount.clientHeight; if (!w || !h) return; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); };
    window.addEventListener("resize", onResize);

    // ---- pointer: dissolve on move, or drag-to-place in placer mode ----
    let dragging = false;
    const onDown = () => { if (placingRef.current) dragging = true; };
    const onUp = () => { dragging = false; };
    const onMove = (e: PointerEvent) => {
      if (placingRef.current) {
        if (dragging) {
          overlayRef.current.x += e.movementX * pxToWorld;
          overlayRef.current.y -= e.movementY * pxToWorld;
        }
        return;
      }
      if (progRef.current >= 1) return;
      const d = Math.hypot(e.movementX, e.movementY);
      progRef.current = Math.min(1, progRef.current + d * 0.0007);
      setProgress(progRef.current);
      if (progRef.current >= 0.5 && !controls.enabled) { controls.enabled = true; controls.autoRotate = true; setUnlocked(true); }
    };
    const onWheelPlace = (e: WheelEvent) => {
      if (!placingRef.current) return;
      e.preventDefault();
      overlayRef.current.scale = Math.max(0.1, Math.min(6, overlayRef.current.scale * (e.deltaY < 0 ? 1.05 : 0.95)));
    };
    const dom = renderer.domElement;
    dom.addEventListener("pointerdown", onDown); dom.addEventListener("pointerup", onUp);
    dom.addEventListener("pointermove", onMove); dom.addEventListener("wheel", onWheelPlace, { passive: false });

    (async () => {
      // ---- load cloud PLY ----
      const buf = await (await fetch(ply)).arrayBuffer(); if (disposed) return;
      const u8 = new Uint8Array(buf);
      const headerText = new TextDecoder().decode(u8.subarray(0, 4000));
      const marker = "end_header\n"; const mi = headerText.indexOf(marker); const hEnd = mi + marker.length;
      const props = headerText.slice(0, mi).split("\n").filter((l) => l.startsWith("property float")).map((l) => l.trim().split(/\s+/).pop() as string);
      const STRIDE = props.length * 4; const O = (k: string) => props.indexOf(k) * 4;
      const oX = O("x"), oY = O("y"), oZ = O("z"), oR = O("f_dc_0"), oG = O("f_dc_1"), oB = O("f_dc_2");
      const oOp = props.indexOf("opacity") >= 0 ? O("opacity") : -1;
      const total = Math.floor((buf.byteLength - hEnd) / STRIDE);
      const dv = new DataView(buf, hEnd); const C0 = 0.28209479177387814; const BR = brightness;
      const cp = new Float32Array(total * 3), cc = new Float32Array(total * 3);
      const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity]; let kept = 0;
      for (let i = 0; i < total; i++) {
        const o = i * STRIDE;
        const op = oOp >= 0 ? 1 / (1 + Math.exp(-dv.getFloat32(o + oOp, true))) : 1; if (op < 0.15) continue;
        const x = dv.getFloat32(o + oX, true), y = -dv.getFloat32(o + oY, true), z = dv.getFloat32(o + oZ, true);
        const k = kept++; cp[k * 3] = x; cp[k * 3 + 1] = y; cp[k * 3 + 2] = z;
        if (x < min[0]) min[0] = x; if (y < min[1]) min[1] = y; if (z < min[2]) min[2] = z;
        if (x > max[0]) max[0] = x; if (y > max[1]) max[1] = y; if (z > max[2]) max[2] = z;
        cc[k * 3] = Math.min(1, Math.max(0, (0.5 + C0 * dv.getFloat32(o + oR, true)) * BR));
        cc[k * 3 + 1] = Math.min(1, Math.max(0, (0.5 + C0 * dv.getFloat32(o + oG, true)) * BR));
        cc[k * 3 + 2] = Math.min(1, Math.max(0, (0.5 + C0 * dv.getFloat32(o + oB, true)) * BR));
      }
      const cx = (min[0] + max[0]) / 2, cy = (min[1] + max[1]) / 2, cz = (min[2] + max[2]) / 2;
      const span = Math.max(max[0] - min[0], max[1] - min[1], max[2] - min[2]) || 1; const sc = 2 / span;
      for (let k = 0; k < kept; k++) { cp[k * 3] = (cp[k * 3] - cx) * sc; cp[k * 3 + 1] = (cp[k * 3 + 1] - cy) * sc; cp[k * 3 + 2] = (cp[k * 3 + 2] - cz) * sc; }

      const base = new THREE.PlaneGeometry(1, 1);
      const cgeo = new THREE.InstancedBufferGeometry();
      cgeo.index = base.index; cgeo.setAttribute("position", base.getAttribute("position")); cgeo.setAttribute("uv", base.getAttribute("uv"));
      cgeo.setAttribute("iPos", new THREE.InstancedBufferAttribute(cp.subarray(0, kept * 3), 3));
      cgeo.setAttribute("iColor", new THREE.InstancedBufferAttribute(cc.subarray(0, kept * 3), 3));
      cgeo.instanceCount = kept;
      const bp = brushParams(brushRef.current);
      const cmat = new THREE.ShaderMaterial({ uniforms: { uSize: { value: bp.size }, uSoft: { value: bp.soft }, uOpacity: { value: bp.opacity } }, vertexShader: C_VERT, fragmentShader: C_FRAG, transparent: true, depthWrite: true, blending: THREE.NormalBlending });
      cloudMatRef.current = cmat;
      const cmesh = new THREE.Mesh(cgeo, cmat); cmesh.frustumCulled = false; scene.add(cmesh);

      // ---- load subject image → particles ----
      const img = new window.Image(); img.crossOrigin = "anonymous"; img.src = subject;
      await img.decode().catch(() => {}); if (disposed) return;
      const SW = 150; const SH = Math.round(SW * img.height / img.width);
      const cvs = document.createElement("canvas"); cvs.width = SW; cvs.height = SH;
      const ctx = cvs.getContext("2d")!; ctx.drawImage(img, 0, 0, SW, SH);
      const data = ctx.getImageData(0, 0, SW, SH).data;
      const aspect = img.width / img.height;
      const planeH = 1.7, planeW = planeH * aspect; // world size of the photo
      const pp: number[] = [], pc: number[] = [], pv: number[] = [], pt: number[] = [];
      const rand = (s: number) => { const x = Math.sin(s * 12.9898) * 43758.5453; return x - Math.floor(x); };
      let pk = 0;
      for (let yy = 0; yy < SH; yy++) for (let xx = 0; xx < SW; xx++) {
        const idx = (yy * SW + xx) * 4; const a = data[idx + 3]; if (a < 50) continue;
        const u = xx / (SW - 1), v = yy / (SH - 1);
        const wx = (u - 0.5) * planeW, wy = (0.5 - v) * planeH, wz = 0;
        pp.push(wx, wy, wz);
        pc.push(data[idx] / 255, data[idx + 1] / 255, data[idx + 2] / 255);
        // fly in a uniform random 3D direction (so pixels disperse everywhere, in depth)
        const s = pk * 1.0;
        const uu = rand(s + 1) * 2 - 1, th = rand(s + 2) * 6.2831853, r2 = Math.sqrt(Math.max(0, 1 - uu * uu));
        const spd = 0.5 + rand(s + 3) * 1.3;
        pv.push(r2 * Math.cos(th) * spd, r2 * Math.sin(th) * spd, uu * spd);
        pt.push(rand(s + 4)); // dissolve threshold 0..1 (≈50% gone at progress 0.5)
        pk++;
      }
      const pgeo = new THREE.InstancedBufferGeometry();
      pgeo.index = base.index; pgeo.setAttribute("position", base.getAttribute("position")); pgeo.setAttribute("uv", base.getAttribute("uv"));
      pgeo.setAttribute("iPos", new THREE.InstancedBufferAttribute(new Float32Array(pp), 3));
      pgeo.setAttribute("iColor", new THREE.InstancedBufferAttribute(new Float32Array(pc), 3));
      pgeo.setAttribute("iVel", new THREE.InstancedBufferAttribute(new Float32Array(pv), 3));
      pgeo.setAttribute("iThresh", new THREE.InstancedBufferAttribute(new Float32Array(pt), 1));
      pgeo.instanceCount = pk;
      const psize = (planeW / SW) * 1.5; // sprite ≈ one image cell
      // intact pixels: no depth test → figure sits on top of the whole cloud
      const matFront = new THREE.ShaderMaterial({ uniforms: { uProgress: { value: 0 }, uSize: { value: psize } }, vertexShader: P_VERT, fragmentShader: P_FRAG_FRONT, transparent: true, depthWrite: false, depthTest: false, blending: THREE.NormalBlending });
      // flying pixels: depth-tested → they scatter through the cloud in 3D
      const matDepth = new THREE.ShaderMaterial({ uniforms: { uProgress: { value: 0 }, uSize: { value: psize } }, vertexShader: P_VERT, fragmentShader: P_FRAG_DEPTH, transparent: true, depthWrite: false, depthTest: true, blending: THREE.NormalBlending });
      partMatRef.current = matFront; partDepthMatRef.current = matDepth;
      const meshFront = new THREE.Mesh(pgeo, matFront); meshFront.frustumCulled = false; meshFront.renderOrder = 20;
      const meshDepth = new THREE.Mesh(pgeo, matDepth); meshDepth.frustumCulled = false; meshDepth.renderOrder = 1;
      const plane = new THREE.Group(); plane.add(meshDepth); plane.add(meshFront);
      scene.add(plane); planeRef.current = plane;

      setStatus("");
    })().catch((e) => { if (!disposed) setStatus("no se pudo cargar: " + (e?.message ?? e)); });

    return () => {
      disposed = true; cancelAnimationFrame(raf); window.removeEventListener("resize", onResize);
      dom.removeEventListener("pointerdown", onDown); dom.removeEventListener("pointerup", onUp);
      dom.removeEventListener("pointermove", onMove); dom.removeEventListener("wheel", onWheelPlace);
      try { controls.dispose(); } catch {}
      try { renderer.dispose(); if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement); } catch {}
    };
  }, [ply, subject, brightness]);

  // keep a ref of placing for the listeners
  const placingRef = useRef(placing);
  useEffect(() => { placingRef.current = placing; if (controlsRef.current) controlsRef.current.enabled = !placing && unlocked; }, [placing, unlocked]);

  const tab = (active: boolean): React.CSSProperties => ({ fontFamily: MONO, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", background: "none", border: "none", cursor: "pointer", padding: "0.25rem 0", color: active ? "#ece9e2" : "#6f6a61", borderBottom: active ? "1.5px solid #9b1d1d" : "1.5px solid transparent" });

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
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginBottom: "1.2rem" }}>
          <span style={{ fontFamily: MONO, fontSize: "0.66rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#5f5b53" }}>render</span>
          <button style={tab(brush === "burbujas")} onClick={() => setBrush("burbujas")}>burbujas</button>
          <button style={tab(brush === "pinceladas")} onClick={() => setBrush("pinceladas")}>pinceladas</button>
        </div>
      </div>

      <div style={{ position: "relative", width: "100%", height: "100dvh", background: "radial-gradient(ellipse at 50% 45%, #16161a, #08080a)", borderTop: "1px solid rgba(236,233,226,0.1)", borderBottom: "1px solid rgba(236,233,226,0.1)", cursor: placing ? "move" : "grab" }}>
        <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />
        {status && (<div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a857c", pointerEvents: "none", zIndex: 2 }}>{status}</div>)}

        {/* reveal hint + progress */}
        {!status && !placing && (
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", pointerEvents: "none" }}>
            <div style={{ fontFamily: MONO, fontSize: "0.66rem", letterSpacing: "0.16em", textTransform: "uppercase", color: unlocked ? "#9bbf9b" : "#a39e94" }}>
              {unlocked ? "✦ exploralo en 3D · arrastrá para orbitar" : "pasá el mouse por encima para deshacerla"}
            </div>
            <div style={{ width: "min(260px,55vw)", height: 2, background: "rgba(236,233,226,0.14)" }}>
              <div style={{ height: "100%", width: `${progress * 100}%`, background: progress >= 0.5 ? "#6f9b6f" : "#9b1d1d", transition: "width 0.1s linear" }} />
            </div>
          </div>
        )}

        {/* controls bottom-right */}
        <div data-noedit style={{ position: "absolute", right: 16, bottom: 16, zIndex: 5, display: "flex", gap: "0.5rem" }}>
          {(progress > 0 || unlocked) && !placing && (
            <button data-noedit onClick={resetReveal} style={btn}>↺ rehacer</button>
          )}
          {DEV && (
            <>
              {placing && <button data-noedit onClick={saveOverlay} style={{ ...btn, background: "rgba(155,29,29,0.85)" }}>{saveMsg || "guardar pos"}</button>}
              <button data-noedit onClick={() => { setPlacing((p) => !p); if (!placing) resetReveal(); }} style={btn}>{placing ? "listo" : "⌖ posicionar"}</button>
            </>
          )}
        </div>
        {placing && (<div style={{ position: "absolute", left: 16, bottom: 16, zIndex: 5, fontFamily: MONO, fontSize: "0.62rem", letterSpacing: "0.08em", color: "#cfcabf", maxWidth: 220 }}>arrastrá para mover · rueda para escalar · guardá la posición</div>)}
      </div>

      <div style={{ ...COL }}>
        <p style={{ fontFamily: MONO, fontSize: "0.7rem", color: "#5f5b53", marginTop: "1.2rem", lineHeight: 1.8 }}>
          La cerámica real, hecha polvo: pasá el mouse y se deshace en partículas. Al disolverse a la mitad, se abre la nube para explorarla en 3D.
        </p>
      </div>
    </main>
  );
}

const btn: React.CSSProperties = { fontFamily: MONO, fontSize: "0.64rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#ece9e2", background: "rgba(20,20,22,0.7)", border: "1px solid rgba(236,233,226,0.25)", borderRadius: 4, padding: "0.5rem 0.75rem", cursor: "pointer", backdropFilter: "blur(6px)" };
