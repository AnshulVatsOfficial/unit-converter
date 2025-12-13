import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Base URL: use env var if available (set NEXT_PUBLIC_SITE_URL in Vercel), otherwise fallback.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://unitlab.org";
const SITE_NAME = "UnitConvert — UnitLab";
const DESCRIPTION =
  "UnitConvert — fast, accurate unit conversions (length, area, time, weight, volume, and more). Instant updates and 100+ units supported.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s — UnitConvert",
  },
  description: DESCRIPTION,
  keywords: [
    "unit converter",
    "length converter",
    "time converter",
    "area converter",
    "convert units",
    "meters to feet",
    "km to miles",
    "unit conversion",
  ],
  authors: [{ name: "UnitLab", url: SITE_URL }],
  openGraph: {
    title: SITE_NAME,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    // update image path to an actual image in /public when you add one
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // allow the bot to fetch dynamically generated pages if needed
      // (adjust if you have pages you don't want indexed)
    },
  },
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Small JSON-LD structured data for the site (Organization)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "UnitLab",
    url: SITE_URL,
    sameAs: [],
    logo: `${SITE_URL}/logo.png`,
  };

  return (
    <html lang="en" title="Unit Converter">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7211777208376091"
          crossOrigin="anonymous"
        ></script>
        <meta
          name="google-adsense-account"
          content="ca-pub-7211777208376091"
        ></meta>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        {/* JSON-LD: simple, safe SEO boost */}
        <Script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <main className="flex flex-col justify-between w-full min-h-screen">
          <Header />
          <section className="size-full overflow-visible">{children}</section>
          <Footer />
        </main>
      </body>
    </html>
  );
}
