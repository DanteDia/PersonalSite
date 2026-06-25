import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

// Persists per-room default 3D camera view (set via the "⌖ guardar vista" button). Dev-only.
export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false, error: "Sólo en local." }, { status: 403 });
  }
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "json inválido" }, { status: 400 }); }
  const { slug, view } = body ?? {};
  if (!slug) return NextResponse.json({ ok: false, error: "slug requerido" }, { status: 400 });
  const file = path.join(process.cwd(), "src/app/artme-views.json");
  let all: Record<string, unknown> = {};
  try { all = JSON.parse(await fs.readFile(file, "utf8")); } catch {}
  all[slug] = view ?? null;
  await fs.writeFile(file, JSON.stringify(all, null, 2));
  return NextResponse.json({ ok: true });
}
