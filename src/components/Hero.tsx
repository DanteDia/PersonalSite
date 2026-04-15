"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CellularAutomataBackground from "./CellularAutomataBackground";

const SUBTITLE = "From the Brazilian jungle to banking data pipelines. 5 countries. Infinite curiosity.";
const CHAR_DELAY = 35;

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 180]);
  const contentY = useTransform(scrollY, [0, 600], [0, 60]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < SUBTITLE.length) {
        setTyped(SUBTITLE.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, CHAR_DELAY);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <header
      className="hero-root"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "clamp(4rem, 12vh, 6rem) 1.5rem clamp(2rem, 8vh, 4rem)",
        overflow: "hidden",
      }}
    >
      {/* Parallax background — moves faster than content */}
      <motion.div style={{ y: bgY, position: "absolute", inset: 0, zIndex: 0 }}>
        <CellularAutomataBackground />
      </motion.div>

      {/* Content — slower parallax + fade on scroll */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "800px",
          y: contentY,
          opacity: contentOpacity,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" as const }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 500,
            marginBottom: "1.5rem",
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            lineHeight: 1.2,
            fontFamily: "var(--font-serif)",
          }}
        >
          Business Intelligence & Data Automation Specialist
        </h1>

        <div
          className="hero-typewriter-container"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1rem",
            color: "var(--text-primary)",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.6rem 1.2rem",
            border: "1px solid var(--border)",
            backgroundColor: "rgba(252, 250, 248, 0.8)",
            minHeight: "3rem",
            textAlign: "left",
            maxWidth: "100%",
          }}
        >
          <span style={{ color: "var(--machine-active)", flexShrink: 0 }}>&gt;</span>
          <span
            className="hero-typewriter"
            style={{
              fontStyle: "italic",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-serif)",
              fontSize: "1.1rem",
              lineHeight: 1.5,
            }}
          >
            {typed}
            <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "1.2em",
                backgroundColor: "var(--machine-active)",
                marginLeft: "2px",
                verticalAlign: "text-bottom",
                opacity: showCursor ? 1 : 0,
                transition: "opacity 0.1s",
              }}
            />
          </span>
        </div>
      </motion.div>
    </header>
  );
}
