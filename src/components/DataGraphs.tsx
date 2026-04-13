"use client";

import { useEffect, useRef, useState } from "react";

type Metric = {
  label: string;
  value: string;
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

/**
 * Format a raw token count into compact portfolio-friendly notation.
 *   1_500 → "1.5K"
 *   1_500_000 → "1.5M"
 *   1_500_000_000 → "1.5B"
 */
function formatTokens(n: number): { value: string; suffix: string } {
  if (n >= 1_000_000_000) return { value: (n / 1_000_000_000).toFixed(1), suffix: "B" };
  if (n >= 1_000_000) return { value: (n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1), suffix: "M" };
  if (n >= 1_000) return { value: (n / 1_000).toFixed(0), suffix: "K" };
  return { value: String(n), suffix: "" };
}

// Static metrics that don't have a live data source. The LLM Tokens card
// is injected separately and updated from /api/token-usage.
const staticMetrics: Metric[] = [
  {
    label: "Hackathons Won",
    value: "1",
    caption: "Industriesverified.com — 2026",
  },
  {
    label: "Products Shipped",
    value: "10",
    suffix: "+",
    caption: "deployed on github.com/DanteDia",
  },
  {
    label: "Countries Lived In",
    value: "5",
    caption: "AR · BR · FI · US · (and counting)",
  },
];

export default function DataGraphs() {
  const [animated, setAnimated] = useState(false);
  const [tokenReport, setTokenReport] = useState<TokenUsageReport | null>(null);
  const [tokenLoading, setTokenLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimated(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Poll /api/token-usage on mount and every 60s. The server route is
  // cached for 5 minutes, so polling is cheap — it just avoids needing
  // a page reload to see new numbers.
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/token-usage", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as TokenUsageReport;
        if (!cancelled) {
          setTokenReport(data);
          setTokenLoading(false);
        }
      } catch {
        if (!cancelled) setTokenLoading(false);
      }
    }
    load();
    const interval = setInterval(load, 60_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  // Build the LLM Tokens metric from the live report, falling back to a
  // placeholder if no providers are configured or the fetch is loading.
  const liveTotal = tokenReport?.total ?? 0;
  const anyConfigured = tokenReport?.sources.some((s) => s.configured) ?? false;
  const configuredLabels =
    tokenReport?.sources
      .filter((s) => s.configured && s.tokens !== null)
      .map((s) => s.label)
      .join(" · ") ?? "";

  const llmMetric: Metric = (() => {
    if (tokenLoading) {
      return { label: "LLM Tokens Processed", value: "…", caption: "fetching live usage", live: true };
    }
    if (!anyConfigured || liveTotal === 0) {
      return {
        label: "LLM Tokens Processed",
        value: "4.5",
        suffix: "B+",
        caption: "across Claude, GPT & OpenRouter",
        live: false,
      };
    }
    const formatted = formatTokens(liveTotal);
    return {
      label: "LLM Tokens Processed",
      value: formatted.value,
      suffix: formatted.suffix,
      caption: configuredLabels ? `live from ${configuredLabels}` : "live",
      live: true,
    };
  })();

  const metrics: Metric[] = [llmMetric, ...staticMetrics];

  return (
    <section ref={sectionRef} style={{ padding: "5rem 0" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
        <h2
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
          <span
            style={{
              display: "block",
              width: "40px",
              height: "2px",
              background: "var(--machine-accent)",
              margin: "1rem auto 0",
              opacity: 0.6,
            }}
          />
        </h2>
        <p
          style={{
            textAlign: "center",
            fontStyle: "italic",
            color: "var(--text-secondary)",
            fontFamily: "var(--font-serif)",
            maxWidth: "560px",
            margin: "0 auto 3rem",
          }}
        >
          A few metrics that reflect the shape of the work — not the scale of the ego.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {metrics.map((m, i) => (
            <div
              key={m.label}
              style={{
                padding: "1.75rem 1.5rem",
                border: "1px solid var(--border-light)",
                backgroundColor: "var(--bg-primary)",
                opacity: animated ? 1 : 0,
                transform: animated ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s ease-in-out ${i * 0.1}s`,
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
                {m.value}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
