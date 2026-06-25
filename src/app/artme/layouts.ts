import layouts from "../artme-layouts.json";

export type Crop = { cx: number; cy: number; cw: number; ch: number }; // fractions of the original
export type Placed = { x: number; y: number; w: number; z: number; crop?: Crop };
export type FrameEdit = { rot?: number; tilt?: number; zoom?: number; ox?: number; oy?: number };
export type RoomLayout = {
  deleted?: string[];
  items?: Record<string, Placed>;
  order?: string[];
  edits?: Record<string, FrameEdit>; // per-image framing (overexposed)
};

export const LAYOUTS = layouts as Record<string, RoomLayout>;

export function getLayout(slug: string): RoomLayout {
  return LAYOUTS[slug] ?? {};
}
