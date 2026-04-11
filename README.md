# dantearola.com

Personal site for **Dante Arola** — Business Intelligence & Data Automation Specialist.
From the Brazilian jungle to banking data pipelines. 5 countries. Infinite curiosity.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript 5
- Tailwind CSS v4 · Framer Motion
- Fonts: EB Garamond (serif) + JetBrains Mono
- Deployed on Vercel

## Aesthetic

Editorial cream/serif palette with machine-green accents and pixel-art motifs.
Design tokens live in `src/app/globals.css`.

## Structure

- `src/app/page.tsx` — single-page composition (Hero → Journey → About → WebEvolution → DataGraphs → TechnicalShowcase → DictionaryCard → Experience → Speaking & Events → Projects → Education → Embedded X Post → Contact)
- `src/app/blog/page.tsx` — `/blog` route with long-form posts
- `src/components/` — all section components
- `src/lib/posts.ts` — blog post content source

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Outstanding TODOs

Search the codebase for `TODO(verify)` / `TODO(confirm)` — currently flagged:

- `DataGraphs.tsx` — verify 85% / 50K+ ha / 4,500+ hrs / $50M+ figures
- `Experience.tsx` — same figures, cross-linked
- `NodeTree.tsx` — confirm subagent names (Pango, Nico, Javi, Ari, Vita)
- `EmbeddedXPost.tsx` — tweet URL may be a placeholder
- `src/lib/posts.ts` — attach real external URLs for the 4 blog posts
