import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";

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
  return (
    <html lang={locale} className="scroll-smooth">
      <body className="bg-black text-white min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
