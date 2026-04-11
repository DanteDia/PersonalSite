import { NextResponse } from "next/server";
import { getAggregatedTokens } from "@/lib/tokenUsage";

// Cache the aggregated report for 5 minutes on the edge/server.
// Per-request re-fetches from OpenAI / Anthropic / OpenRouter admin APIs
// aren't free — 5 min is a sane polling cadence for a portfolio site.
export const revalidate = 300;

export async function GET() {
  const report = await getAggregatedTokens();
  return NextResponse.json(report, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
