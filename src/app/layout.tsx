import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { identity } from "@/data/profile";

const clash = localFont({
  src: [
    { path: "../fonts/ClashDisplay-500.woff2", weight: "500" },
    { path: "../fonts/ClashDisplay-600.woff2", weight: "600" },
    { path: "../fonts/ClashDisplay-700.woff2", weight: "700" },
  ],
  variable: "--font-clash",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "AI engineer in Hyderabad building agentic pipelines, voice AI agents, and automations that run in production. B.Tech AI, published researcher (ICICC-2025, Springer).";

export const metadata: Metadata = {
  title: `${identity.name} — AI Engineer`,
  description,
  keywords: [
    "AI Engineer",
    "Agentic AI",
    "n8n",
    "Voice AI",
    "LLM",
    "RAG",
    "Automation",
    "Hyderabad",
  ],
  authors: [{ name: identity.name }],
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: `${identity.name} — AI Engineer`,
    description,
    type: "website",
    siteName: identity.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${identity.name} — AI Engineer`,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scheme-dark">
      <body
        className={`${clash.variable} ${jetbrains.variable} ${inter.variable} noise antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
