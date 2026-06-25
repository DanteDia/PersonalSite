"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import overrides from "../../artme-text.json";

const MONO = "var(--font-mono), 'JetBrains Mono', monospace";
const DEV = process.env.NODE_ENV !== "production"; // edición sólo en local; en prod sólo se aplican los textos finales

function domPath(el: Element, root: Element): string {
  const parts: string[] = [];
  let cur: Element | null = el;
  while (cur && cur !== root && cur.nodeType === 1) {
    const parent: Element | null = cur.parentElement;
    let idx = 1;
    if (parent) idx = Array.from(parent.children).filter((c) => c.tagName === cur!.tagName).indexOf(cur) + 1;
    parts.unshift(`${cur.tagName.toLowerCase()}:${idx}`);
    cur = parent;
  }
  return parts.join(">");
}

function isTextLeaf(el: Element): boolean {
  if (!el || el.nodeType !== 1) return false;
  if ((el as HTMLElement).closest("[data-noedit]")) return false;
  const tag = el.tagName.toLowerCase();
  if (tag === "canvas" || tag === "model-viewer" || tag === "img" || tag === "input" || tag === "svg") return false;
  for (const c of Array.from(el.childNodes)) if (c.nodeType === 1) return false;
  return (el.textContent || "").trim().length > 0;
}

function leaves(root: Element): HTMLElement[] {
  const out: HTMLElement[] = [];
  const w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let el: Node | null = w.currentNode;
  while (el) { if (el.nodeType === 1 && isTextLeaf(el as Element)) out.push(el as HTMLElement); el = w.nextNode(); }
  return out;
}

export default function EditProvider({ children }: { children: React.ReactNode }) {
  const [edit, setEdit] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const ov = useRef<Record<string, string>>({ ...(overrides as Record<string, string>) });
  const pathname = usePathname();

  // apply saved overrides after render (with a couple of retries past hydration)
  useEffect(() => {
    const root = rootRef.current; if (!root) return;
    const apply = () => {
      for (const le of leaves(root)) {
        const id = pathname + "::" + domPath(le, root);
        const v = ov.current[id];
        if (v != null && le.textContent !== v) le.textContent = v;
      }
    };
    apply();
    const t1 = setTimeout(apply, 350), t2 = setTimeout(apply, 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [pathname]);

  // toggle in-place editing for every text leaf
  useEffect(() => {
    const root = rootRef.current; if (!root) return;
    if (!edit) return;
    const cleanups: Array<() => void> = [];
    for (const le of leaves(root)) {
      le.setAttribute("contenteditable", "true");
      le.spellcheck = false;
      const prev = le.style.outline, prevOff = le.style.outlineOffset;
      le.style.outline = "1px dashed rgba(155,29,29,0.65)";
      le.style.outlineOffset = "3px";
      const onBlur = () => {
        const id = pathname + "::" + domPath(le, root);
        const t = le.textContent || "";
        ov.current[id] = t;
        fetch("/api/artme/text", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id, value: t }) }).catch(() => {});
      };
      le.addEventListener("blur", onBlur);
      cleanups.push(() => { le.removeEventListener("blur", onBlur); le.removeAttribute("contenteditable"); le.style.outline = prev; le.style.outlineOffset = prevOff; });
    }
    return () => cleanups.forEach((c) => c());
  }, [edit, pathname]);

  return (
    <div ref={rootRef}>
      {children}
      {DEV && (
        <button
          data-noedit
          onClick={() => setEdit((e) => !e)}
          style={{ position: "fixed", bottom: 18, right: 18, zIndex: 30000, fontFamily: MONO, fontSize: "0.64rem", letterSpacing: "0.12em", textTransform: "uppercase", background: edit ? "#9b1d1d" : "rgba(26,26,28,0.9)", color: "#ece9e2", border: "1px solid #3a3a3a", padding: "0.5rem 0.85rem", cursor: "pointer", borderRadius: 3, backdropFilter: "blur(6px)" }}
        >
          {edit ? "✓ listo" : "✎ textos"}
        </button>
      )}
    </div>
  );
}
