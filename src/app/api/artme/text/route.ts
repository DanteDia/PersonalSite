import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

// Local text-editing endpoint: persists per-text-id overrides so edits made in
// the browser ("✎ editar textos") are baked into the next build. Disabled in prod.
export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false, error: "La edición de textos sólo funciona en local." }, { status: 403 });
  }
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "json inválido" }, { status: 400 }); }
  const { id, value } = body ?? {};
  if (!id || typeof id !== "string") return NextResponse.json({ ok: false, error: "id requerido" }, { status: 400 });

  const file = path.join(process.cwd(), "src/app/artme-text.json");
  let all: Record<string, string> = {};
  try { all = JSON.parse(await fs.readFile(file, "utf8")); } catch {}
  if (value === "" || value == null) delete all[id];
  else all[id] = String(value);
  await fs.writeFile(file, JSON.stringify(all, null, 2));
  return NextResponse.json({ ok: true });
}
