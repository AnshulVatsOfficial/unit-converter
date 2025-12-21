import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://unitlab.org";
const SITE_NAME = "All Unit Converters Online – Free & Simple | UnitLab";
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3N8MLCN4DT"
          strategy="afterInteractive"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-3N8MLCN4DT', {
          page_path: window.location.pathname,
        });
      `,
          }}
        />
        <Script
          id="adsense"
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7211777208376091`}
          crossOrigin="anonymous"
        />
        <Script
          src="https://cmp.gatekeeperconsent.com/min.js"
          data-cfasync="false"
          strategy="beforeInteractive"
        />
        <Script
          src="https://the.gatekeeperconsent.com/cmp.min.js"
          data-cfasync="false"
          strategy="beforeInteractive"
        />
        {/* Ezoic script */}
        <Script
          src="https://www.ezojs.com/ezoic/sa.min.js"
          strategy="afterInteractive"
          async
        />
        {/* Ezoic global config */}
        <Script
          id="ezoic-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      window.ezstandalone = window.ezstandalone || {};
      ezstandalone.cmd = ezstandalone.cmd || [];
    `,
          }}
        />
        <meta
          name="google-adsense-account"
          content="ca-pub-7211777208376091"
        ></meta>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <SpeedInsights />
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
