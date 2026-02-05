import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Dante Arola | Data Architect & Automation Specialist",
  description: "From jungle permaculture to data pipelines. Business Intelligence, automation, and blockchain expertise across 5 countries.",
  keywords: ["Business Intelligence", "Data Automation", "Blockchain", "Argentina", "Fintech"],
  authors: [{ name: "Dante Arola" }],
  openGraph: {
    title: "Dante Arola | Data Architect & Automation Specialist",
    description: "From jungle permaculture to data pipelines.",
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
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
