import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import "../globals.css";
import { Playfair_Display, Montserrat, Noto_Sans_SC, Orbitron } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair"
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat"
});
const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-sc"
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-orbitron"
});

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "zh" }];
}

const locales = ["en", "zh"];

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { params } = props;
  const { locale } = await params;

  const messages = (await import(`../../messages/${locale}.json`)).default;

  const title = messages.hero.title;
  const description = messages.hero.subtitle;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theneobee.club";

  return {
    title: {
      default: title,
      template: `%s | ${title}`
    },
    description,
    keywords: [
      "music collective",
      "electronic music",
      "jazz",
      "soulful music",
      "Dublin music",
      "DJ",
      "producer",
      "house music"
    ],
    authors: [{ name: "The NeoBee Club" }],
    creator: "The NeoBee Club",
    publisher: "The NeoBee Club",
    formatDetection: {
      email: false,
      address: false,
      telephone: false
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        zh: "/zh"
      }
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      siteName: title,
      images: [
        {
          url: "/logo.webp",
          width: 1200,
          height: 630,
          alt: `${title} Logo`
        }
      ],
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo.webp"]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    }
  };
}

export default async function LocaleLayout(props: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { children, params } = props;
  const { locale } = await params;

  setRequestLocale(locale);
  if (!locales.includes(locale)) notFound();
  const messages = (await import(`../../messages/${locale}.json`)).default;

  // Choose font based on locale
  const bodyFontClass = locale === "zh" ? notoSansSC.className : montserrat.className;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`scroll-smooth ${bodyFontClass} ${notoSansSC.variable} ${orbitron.variable}`}
      style={
        {
          "--font-playfair": playfair.style.fontFamily,
          "--font-noto-sans-sc": notoSansSC.style.fontFamily,
          "--font-orbitron": orbitron.style.fontFamily
        } as React.CSSProperties
      }
    >
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="bg-black text-white min-h-screen" suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
