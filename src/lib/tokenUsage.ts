/**
 * Live LLM token usage aggregator.
 *
 * Pulls token counts from three providers — OpenRouter, OpenAI, and
 * Anthropic — using each vendor's admin / usage API, then sums them.
 *
 * Every provider fetcher is defensive:
 *   - If its API key env var is missing, it returns `tokens: null` with
 *     `configured: false` and no error.
 *   - If the network call fails, it returns `tokens: null` with an
 *     `error` string. The aggregate does NOT throw.
 *
 * Environment variables expected on Vercel:
 *   OPENROUTER_API_KEY         — any OpenRouter key (read-only is fine)
 *   OPENAI_ADMIN_KEY           — Admin-tier OpenAI key (starts sk-admin-…)
 *   ANTHROPIC_ADMIN_API_KEY    — Anthropic Admin key (starts sk-ant-admin-…)
 *   TOKEN_USAGE_SINCE          — ISO date, optional. Defaults 2024-01-01.
 */

export type TokenSource = {
  provider: "openrouter" | "openai" | "anthropic";
  label: string;
  tokens: number | null;
  configured: boolean;
  error?: string;
};

export type TokenUsageReport = {
  total: number;
  sources: TokenSource[];
  lastUpdated: string;
  since: string;
};

const FETCH_TIMEOUT_MS = 6000;
const DEFAULT_SINCE = "2024-01-01T00:00:00Z";

/**
 * Rough USD → tokens conversion for OpenRouter. OpenRouter's /credits
 * endpoint reports total USD spent; we convert back to tokens at a
 * blended rate of ~$2 per 1M tokens (a reasonable average across Claude
 * Sonnet / GPT-4o / Gemini Pro call patterns). Tune via env var.
 */
const USD_PER_MILLION_TOKENS = Number(process.env.OPENROUTER_USD_PER_MTOK ?? 2);

async function fetchWithTimeout(
  url: string,
  init: RequestInit = {},
  timeoutMs = FETCH_TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

export async function getOpenRouterUsage(): Promise<TokenSource> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    return {
      provider: "openrouter",
      label: "OpenRouter",
      tokens: null,
      configured: false,
    };
  }
  try {
    const res = await fetchWithTimeout("https://openrouter.ai/api/v1/credits", {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!res.ok) {
      return {
        provider: "openrouter",
        label: "OpenRouter",
        tokens: null,
        configured: true,
        error: `HTTP ${res.status}`,
      };
    }
    const json = (await res.json()) as { data?: { total_usage?: number } };
    const usdSpent = json.data?.total_usage ?? 0;
    const tokens = Math.round((usdSpent / USD_PER_MILLION_TOKENS) * 1_000_000);
    return {
      provider: "openrouter",
      label: "OpenRouter",
      tokens,
      configured: true,
    };
  } catch (err) {
    return {
      provider: "openrouter",
      label: "OpenRouter",
      tokens: null,
      configured: true,
      error: err instanceof Error ? err.message : "unknown error",
    };
  }
}

type OpenAIUsageBucket = {
  results?: Array<{
    input_tokens?: number;
    output_tokens?: number;
    input_cached_tokens?: number;
  }>;
};

export async function getOpenAIUsage(): Promise<TokenSource> {
  const key = process.env.OPENAI_ADMIN_KEY;
  if (!key) {
    return {
      provider: "openai",
      label: "OpenAI",
      tokens: null,
      configured: false,
    };
  }
  try {
    const since = Math.floor(
      new Date(process.env.TOKEN_USAGE_SINCE ?? DEFAULT_SINCE).getTime() / 1000,
    );
    const url = new URL("https://api.openai.com/v1/organization/usage/completions");
    url.searchParams.set("start_time", String(since));
    url.searchParams.set("bucket_width", "1d");
    url.searchParams.set("limit", "400");
    const res = await fetchWithTimeout(url.toString(), {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!res.ok) {
      return {
        provider: "openai",
        label: "OpenAI",
        tokens: null,
        configured: true,
        error: `HTTP ${res.status}`,
      };
    }
    const json = (await res.json()) as { data?: OpenAIUsageBucket[] };
    const tokens = (json.data ?? []).reduce((sum, bucket) => {
      const bucketTotal = (bucket.results ?? []).reduce(
        (acc, r) => acc + (r.input_tokens ?? 0) + (r.output_tokens ?? 0),
        0,
      );
      return sum + bucketTotal;
    }, 0);
    return { provider: "openai", label: "OpenAI", tokens, configured: true };
  } catch (err) {
    return {
      provider: "openai",
      label: "OpenAI",
      tokens: null,
      configured: true,
      error: err instanceof Error ? err.message : "unknown error",
    };
  }
}

type AnthropicUsageBucket = {
  results?: Array<{
    uncached_input_tokens?: number;
    cache_creation_input_tokens?: number;
    cache_read_input_tokens?: number;
    output_tokens?: number;
  }>;
};

export async function getAnthropicUsage(): Promise<TokenSource> {
  const key = process.env.ANTHROPIC_ADMIN_API_KEY;
  if (!key) {
    return {
      provider: "anthropic",
      label: "Anthropic",
      tokens: null,
      configured: false,
    };
  }
  try {
    const starting = process.env.TOKEN_USAGE_SINCE ?? DEFAULT_SINCE;
    const url = new URL(
      "https://api.anthropic.com/v1/organizations/usage_report/messages",
    );
    url.searchParams.set("starting_at", starting);
    url.searchParams.set("bucket_width", "1d");
    url.searchParams.set("limit", "400");
    const res = await fetchWithTimeout(url.toString(), {
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
    });
    if (!res.ok) {
      return {
        provider: "anthropic",
        label: "Anthropic",
        tokens: null,
        configured: true,
        error: `HTTP ${res.status}`,
      };
    }
    const json = (await res.json()) as { data?: AnthropicUsageBucket[] };
    const tokens = (json.data ?? []).reduce((sum, bucket) => {
      const bucketTotal = (bucket.results ?? []).reduce(
        (acc, r) =>
          acc +
          (r.uncached_input_tokens ?? 0) +
          (r.cache_creation_input_tokens ?? 0) +
          (r.cache_read_input_tokens ?? 0) +
          (r.output_tokens ?? 0),
        0,
      );
      return sum + bucketTotal;
    }, 0);
    return { provider: "anthropic", label: "Anthropic", tokens, configured: true };
  } catch (err) {
    return {
      provider: "anthropic",
      label: "Anthropic",
      tokens: null,
      configured: true,
      error: err instanceof Error ? err.message : "unknown error",
    };
  }
}

export async function getAggregatedTokens(): Promise<TokenUsageReport> {
  const sources = await Promise.all([
    getOpenRouterUsage(),
    getOpenAIUsage(),
    getAnthropicUsage(),
  ]);
  const total = sources.reduce((sum, s) => sum + (s.tokens ?? 0), 0);
  return {
    total,
    sources,
    lastUpdated: new Date().toISOString(),
    since: process.env.TOKEN_USAGE_SINCE ?? DEFAULT_SINCE,
  };
}
