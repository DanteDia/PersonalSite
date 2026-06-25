"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import shots from "../../gris-show.json";

const MONO = "var(--font-mono), 'JetBrains Mono', monospace";

export default function GrisRoom({ title = "Gris", subtitle = "" }: { title?: string; subtitle?: string }) {
  const N = (shots as { src: string; avg: string }[]).length;
  const [i, setI] = useState(0);
  const dir = useRef(1);

  useEffect(() => {
    if (N < 2) return;
    const id = setInterval(() => {
      setI((prev) => {
        let n = prev + dir.current;
        if (n > N - 1) { n = N - 2; dir.current = -1; }
        else if (n < 0) { n = 1; dir.current = 1; }
        return Math.max(0, Math.min(N - 1, n));
      });
    }, 3800);
    return () => clearInterval(id);
  }, [N]);

  const cur = (shots as { src: string; avg: string }[])[i];

  return (
    <main style={{ position: "fixed", inset: 0, overflow: "hidden", background: "#f2f2f0" }}>
      {/* the screen over-exposes to match each photo's white */}
      <motion.div
        aria-hidden
        animate={{ backgroundColor: cur.avg }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        style={{ position: "absolute", inset: 0 }}
      />

      <AnimatePresence mode="wait">
        <motion.img
          key={cur.src}
          src={cur.src}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
          style={{
            position: "absolute", inset: 0, margin: "auto", maxWidth: "88vw", maxHeight: "86vh", objectFit: "contain",
            // feathered edges: the photo dissolves into the over-exposed white so they read as one
            WebkitMaskImage: "radial-gradient(ellipse 78% 80% at 50% 50%, #000 48%, rgba(0,0,0,0) 100%)",
            maskImage: "radial-gradient(ellipse 78% 80% at 50% 50%, #000 48%, rgba(0,0,0,0) 100%)",
          } as React.CSSProperties}
        />
      </AnimatePresence>

      {/* minimal chrome */}
      <Link href="/artme" style={{ position: "fixed", top: 22, left: 24, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(40,40,40,0.55)", textDecoration: "none", mixBlendMode: "multiply", zIndex: 5 }}>← artme</Link>
      <div style={{ position: "fixed", top: 22, right: 24, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(40,40,40,0.5)", mixBlendMode: "multiply", zIndex: 5 }}>{title}{subtitle ? ` · ${subtitle}` : ""}</div>
      <div style={{ position: "fixed", bottom: 22, left: 0, right: 0, textAlign: "center", fontFamily: MONO, fontSize: "0.66rem", letterSpacing: "0.2em", color: "rgba(40,40,40,0.45)", mixBlendMode: "multiply", zIndex: 5 }}>{i + 1} / {N}</div>
    </main>
  );
}
