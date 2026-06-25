import type { Metadata } from "next";
import type { ReactNode } from "react";
import EditProvider from "./_components/EditProvider";

// /artme is intentionally NOT linked from the professional site and is hidden
// from search engines. It exists only if you know the URL.
export const metadata: Metadata = {
  title: "ARTME — Dante Arola",
  description: "Obra. Un espacio aparte.",
  robots: { index: false, follow: false, nocache: true },
};

export default function ArtmeLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        background: "#0b0b0c",
        color: "#ece9e2",
        fontFamily: "var(--font-serif), 'EB Garamond', Georgia, serif",
        zIndex: 1,
      }}
    >
      <EditProvider>{children}</EditProvider>
    </div>
  );
}
