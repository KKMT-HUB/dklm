import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, Noto_Naskh_Arabic, Noto_Sans_Malayalam } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const sans = Figtree({ subsets: ["latin"], variable: "--nf-sans", display: "swap" });
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--nf-display", display: "swap" });
// Loaded only when Arabic or Malayalam text is actually rendered on a page.
const arabic = Noto_Naskh_Arabic({ subsets: ["arabic"], variable: "--nf-arabic", display: "swap", preload: false });
const malayalam = Noto_Sans_Malayalam({ subsets: ["malayalam"], variable: "--nf-malayalam", display: "swap", preload: false });

export const metadata: Metadata = {
  title: { default: `${siteConfig.name} | ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
};

export const viewport: Viewport = {
  themeColor: "#0b4b3b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${arabic.variable} ${malayalam.variable}`}>
      <body className="min-h-svh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary-800 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
