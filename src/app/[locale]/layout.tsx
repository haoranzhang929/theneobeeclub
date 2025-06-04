import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";
import { Playfair_Display, Montserrat } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "zh" }];
}

const locales = ["en", "zh"];

export default async function LocaleLayout(props: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { children, params } = props;
  const { locale } = await params;

  setRequestLocale(locale);
  if (!locales.includes(locale)) notFound();
  const messages = (await import(`../../messages/${locale}.json`)).default;

  // Debug logs
  console.log("Loaded locale:", locale);
  console.log("Loaded messages:", messages);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`scroll-smooth ${montserrat.className}`}
      style={{ "--font-playfair": playfair.style.fontFamily } as React.CSSProperties}
    >
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="bg-black text-white min-h-screen" suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
