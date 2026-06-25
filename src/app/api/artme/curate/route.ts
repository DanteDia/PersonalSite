import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

// Local curation endpoint: persists per-album freeform layout + deletions to
// disk so the curated result is baked into the next build. Disabled in prod.
export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false, error: "La curaduría sólo funciona en local (npm run dev)." }, { status: 403 });
  }
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "json inválido" }, { status: 400 }); }
  const { slug, layout } = body ?? {};
  if (!slug || typeof slug !== "string") return NextResponse.json({ ok: false, error: "slug requerido" }, { status: 400 });

  const file = path.join(process.cwd(), "src/app/artme-layouts.json");
  let all: Record<string, unknown> = {};
  try { all = JSON.parse(await fs.readFile(file, "utf8")); } catch {}
  all[slug] = layout ?? {};
  await fs.writeFile(file, JSON.stringify(all, null, 2));

  // explicit src order (grid curation, e.g. Callista swaps): reorder the manifest
  // so the saved order is baked into the next build. Deleted items stay in the
  // array (filtered out at render) but are pushed to the end.
  try {
    const order = layout?.order as string[] | undefined;
    if (Array.isArray(order) && order.length) {
      const manFile = path.join(process.cwd(), "src/app/artme-manifest.json");
      const man = JSON.parse(await fs.readFile(manFile, "utf8"));
      const arr = man[slug];
      if (Array.isArray(arr)) {
        const pos = new Map(order.map((s, i) => [s, i]));
        man[slug] = [...arr].sort((a: any, b: any) => (pos.get(a.src) ?? Infinity) - (pos.get(b.src) ?? Infinity));
        await fs.writeFile(manFile, JSON.stringify(man, null, 2));
      }
    }
  } catch {}

  // saving the mesa also commits its reading order (top→bottom, left→right)
  // to the gallery order (the manifest) for this collection.
  try {
    const items = (layout?.items ?? {}) as Record<string, { x: number; y: number }>;
    if (Object.keys(items).length) {
      const manFile = path.join(process.cwd(), "src/app/artme-manifest.json");
      const man = JSON.parse(await fs.readFile(manFile, "utf8"));
      const arr = man[slug];
      if (Array.isArray(arr)) {
        const row = (y: number) => Math.round(y / 200);
        const positioned = arr.filter((s: any) => items[s.src]).sort((a: any, b: any) => {
          const pa = items[a.src], pb = items[b.src];
          return row(pa.y) !== row(pb.y) ? row(pa.y) - row(pb.y) : pa.x - pb.x;
        });
        const rest = arr.filter((s: any) => !items[s.src]);
        man[slug] = [...positioned, ...rest];
        await fs.writeFile(manFile, JSON.stringify(man, null, 2));
      }
    }
  } catch {}

  return NextResponse.json({ ok: true });
}
