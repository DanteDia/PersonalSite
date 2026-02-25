import type { Metadata } from "next";
import { EB_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dante Arola — Business Intelligence & Data Automation",
  description: "Business Intelligence Analyst bridging enterprise data systems with AI-driven automation. From the Brazilian jungle to blockchain tokenization to banking data architecture.",
  keywords: ["Business Intelligence", "Data Automation", "Blockchain", "Argentina", "Fintech", "BI Analyst"],
  authors: [{ name: "Dante Arola" }],
  openGraph: {
    title: "Dante Arola — Business Intelligence & Data Automation",
    description: "From the Brazilian jungle to blockchain tokenization to banking data architecture.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ebGaramond.variable} ${jetbrainsMono.variable} antialiased`} style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
        {children}
      </body>
    </html>
  );
}
