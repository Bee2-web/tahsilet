import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { GrainOverlay } from "@/components/effects/GrainOverlay";
import { getContent, isLocale, LOCALES, SITE_URL } from "@/content";
import "../globals.css";

const hn = localFont({
  src: [
    { path: "../../fonts/Hn-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/Hn-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../fonts/Hn-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-hn-face",
  display: "swap",
  adjustFontFallback: "Arial",
});

const quadrant = localFont({
  src: "../../fonts/QuadrantText-Regular.woff2",
  weight: "400",
  variable: "--font-quadrant-face",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = getContent(lang);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL),
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${lang}`, languages: { tr: "/tr", en: "/en", "x-default": "/tr" } },
    openGraph: { type: "website", title: meta.title, description: meta.description, locale: lang === "tr" ? "tr_TR" : "en_US" },
    twitter: { card: "summary", title: meta.title, description: meta.description },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f4ef",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    // suppressHydrationWarning: browser extensions (LanguageTool, ColorZilla…) add attributes to <html>/<body>.
    <html lang={lang} className={`${hn.variable} ${quadrant.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SmoothScroll />
        {children}
        <GrainOverlay />
      </body>
    </html>
  );
}
