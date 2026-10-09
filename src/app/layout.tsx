import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { GrainOverlay } from "@/components/effects/GrainOverlay";
import "./globals.css";

const hn = localFont({
  src: [
    { path: "../fonts/Hn-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Hn-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/Hn-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-hn-face",
  display: "swap",
  adjustFontFallback: "Arial",
});

const quadrant = localFont({
  src: "../fonts/QuadrantText-Regular.woff2",
  weight: "400",
  variable: "--font-quadrant-face",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const description =
  "Stuut automates your entire order-to-cash process. Collect 40% more revenue with AI agents that actually do the work. Live and collecting cash in days.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Stuut | Your AI coworker for order-to-cash",
  description,
  icons: { icon: "/assets/brand/favicon.png", apple: "/assets/brand/webclip.png" },
  openGraph: {
    type: "website",
    title: "Stuut | Your AI coworker for order-to-cash",
    description,
    images: ["/assets/brand/og-image.png"],
  },
  twitter: { card: "summary_large_image", title: "Stuut | Your AI coworker for order-to-cash", description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e3e3e3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hn.variable} ${quadrant.variable}`}>
      <body>
        <SmoothScroll />
        {children}
        <GrainOverlay />
      </body>
    </html>
  );
}
