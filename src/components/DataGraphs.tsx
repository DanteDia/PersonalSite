"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";

type Metric = {
  label: string;
  numericValue: number;
  decimals: number;
  suffix?: string;
  caption?: string;
  live?: boolean;
};

type TokenUsageReport = {
  total: number;
  sources: Array<{
    label: string;
    tokens: number | null;
    configured: boolean;
    error?: string;
  }>;
  lastUpdated: string;
};

function formatTokens(n: number): { value: string; suffix: string } {
  if (n >= 1_000_000_000) return { value: (n / 1_000_000_000).toFixed(1), suffix: "B" };
  if (n >= 1_000_000) return { value: (n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1), suffix: "M" };
  if (n >= 1_000) return { value: (n / 1_000).toFixed(0), suffix: "K" };
  return { value: String(n), suffix: "" };
}

const staticMetrics: Metric[] = [
  { label: "Hackathons Won", numericValue: 1, decimals: 0, caption: "Industriesverified.com — 2026" },
  { label: "Products Shipped", numericValue: 10, decimals: 0, suffix: "+", caption: "deployed on github.com/DanteDia" },
  { label: "Countries Lived In", numericValue: 5, decimals: 0, caption: "AR · BR · FI · US · (and counting)" },
];

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function CountCard({ m, animated }: { m: Metric; animated: boolean }) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!animated || hasAnimated.current || !valueRef.current) return;
    hasAnimated.current = true;
    const controls = animate(0, m.numericValue, {
      duration: 1.8,
      ease: "easeOut" as const,
      onUpdate: (v) => {
        if (valueRef.current) {
          valueRef.current.textContent = m.decimals > 0 ? v.toFixed(m.decimals) : String(Math.round(v));
        }
      },
    });
    return () => controls.stop();
  }, [animated, m.numericValue, m.decimals]);

  return (
    <motion.div
      variants={fadeUp}
      style={{
        padding: "1.75rem 1.5rem",
        border: "1px solid var(--border-light)",
        backgroundColor: "var(--bg-primary)",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--text-tertiary)",
          textTransform: "uppercase" as const,
          letterSpacing: "0.05em",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        {m.label}
        {m.live && (
          <span
            aria-label="live"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              color: "var(--machine-active)",
              fontSize: "0.62rem",
              textTransform: "uppercase" as const,
              letterSpacing: "0.08em",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--machine-active)",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            live
          </span>
        )}
      </span>
      <div
        style={{
          fontSize: "2.5rem",
          fontWeight: 600,
          color: "var(--machine-active)",
          lineHeight: 1.1,
          fontFamily: "var(--font-serif)",
        }}
      >
        <span ref={valueRef}>{m.decimals > 0 ? "0.0" : "0"}</span>
        {m.suffix && (
          <span style={{ fontSize: "1.4rem", color: "var(--text-muted)", fontWeight: 400 }}>
            {m.suffix}
          </span>
        )}
      </div>
      {m.caption && (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "var(--text-muted)",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {m.caption}
        </p>
      )}
    </motion.div>
  );
}

export default function DataGraphs() {
  const [animated, setAnimated] = useState(false);
  const [tokenReport, setTokenReport] = useState<TokenUsageReport | null>(null);
  const [tokenLoading, setTokenLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/token-usage", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as TokenUsageReport;
        if (!cancelled) { setTokenReport(data); setTokenLoading(false); }
      } catch { if (!cancelled) setTokenLoading(false); }
    }
    load();
    const interval = setInterval(load, 60_000);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  const liveTotal = tokenReport?.total ?? 0;
  const anyConfigured = tokenReport?.sources.some((s) => s.configured) ?? false;
  const configuredLabels = tokenReport?.sources.filter((s) => s.configured && s.tokens !== null).map((s) => s.label).join(" · ") ?? "";

  const llmMetric: Metric = (() => {
    if (tokenLoading) return { label: "LLM Tokens Processed", numericValue: 0, decimals: 1, suffix: "…", caption: "fetching live usage", live: true };
    if (!anyConfigured || liveTotal === 0) return { label: "LLM Tokens Processed", numericValue: 4.5, decimals: 1, suffix: "B+", caption: "across Claude, GPT & OpenRouter", live: false };
    const formatted = formatTokens(liveTotal);
    return { label: "LLM Tokens Processed", numericValue: parseFloat(formatted.value), decimals: formatted.value.includes(".") ? 1 : 0, suffix: formatted.suffix, caption: configuredLabels ? `live from ${configuredLabels}` : "live", live: true };
  })();

  const metrics: Metric[] = [llmMetric, ...staticMetrics];

  return (
    <section ref={sectionRef} style={{ padding: "5rem 0" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: "1.8rem",
            marginBottom: "0.5rem",
            textAlign: "center",
            color: "var(--text-primary)",
            fontWeight: 500,
            fontFamily: "var(--font-serif)",
          }}
        >
          By the Numbers
          <span style={{ display: "block", width: "40px", height: "2px", background: "var(--machine-accent)", margin: "1rem auto 0", opacity: 0.6 }} />
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ textAlign: "center", fontStyle: "italic", color: "var(--text-secondary)", fontFamily: "var(--font-serif)", maxWidth: "560px", margin: "0 auto 3rem" }}
        >
          A few metrics that reflect the shape of the work — not the scale of the ego.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          variants={stagger}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {metrics.map((m) => (
            <CountCard key={m.label} m={m} animated={animated} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
