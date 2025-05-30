"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

const Navbar = () => {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  // Remove locale prefix from pathname for switching
  const pathWithoutLocale = pathname.replace(/^\/(en|zh)/, "");
  return (
    <motion.nav initial={false} animate={{ y: 0 }} className="fixed w-full z-50 bg-black/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="text-2xl font-bold">
            {t("brand")}
          </Link>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden flex items-center px-2 py-1 text-gray-200 focus:outline-none"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Open menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6 overflow-x-auto whitespace-nowrap text-sm">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href={`/${locale}/#artists`}
                className="hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                {t("artists")}
              </Link>
              <Link href={`/${locale}/#music`} className="hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                {t("music")}
              </Link>
              <Link href={`/${locale}/works`} className="hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                {t("works")}
              </Link>
              <Link
                href={`/${locale}/#contact`}
                className="hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                {t("contact")}
              </Link>
            </div>
            <div className="ml-8 flex items-center space-x-2">
              <Link
                href={`/en${pathWithoutLocale}`}
                className={`px-2 py-1 rounded ${locale === "en" ? "bg-white text-black" : "hover:bg-gray-700"}`}
                prefetch={false}
              >
                EN
              </Link>
              <span className="text-gray-400">|</span>
              <Link
                href={`/zh${pathWithoutLocale}`}
                className={`px-2 py-1 rounded ${locale === "zh" ? "bg-white text-black" : "hover:bg-gray-700"}`}
                prefetch={false}
              >
                中文
              </Link>
            </div>
          </div>
        </div>
        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden bg-black/95 rounded-b-lg shadow-lg px-4 pt-2 pb-4 space-y-2 animate-fade-in">
            <Link
              href={`/${locale}/#artists`}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              {t("artists")}
            </Link>
            <Link
              href={`/${locale}/#music`}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              {t("music")}
            </Link>
            <Link
              href={`/${locale}/works`}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              {t("works")}
            </Link>
            <Link
              href={`/${locale}/#contact`}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              {t("contact")}
            </Link>
            <div className="flex items-center space-x-2 mt-2">
              <Link
                href={`/en${pathWithoutLocale}`}
                className={`px-2 py-1 rounded ${locale === "en" ? "bg-white text-black" : "hover:bg-gray-700"}`}
                prefetch={false}
                onClick={() => setMenuOpen(false)}
              >
                EN
              </Link>
              <span className="text-gray-400">|</span>
              <Link
                href={`/zh${pathWithoutLocale}`}
                className={`px-2 py-1 rounded ${locale === "zh" ? "bg-white text-black" : "hover:bg-gray-700"}`}
                prefetch={false}
                onClick={() => setMenuOpen(false)}
              >
                中文
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
