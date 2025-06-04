"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";

const Navbar = () => {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Remove locale prefix from pathname for switching
  const pathWithoutLocale = pathname.replace(/^\/(en|zh)/, "");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}/#artists`, label: t("artists") },
    { href: `/${locale}/#music`, label: t("music") },
    { href: `/${locale}/works`, label: t("works") },
    { href: `/${locale}/#contact`, label: t("contact") }
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-black/60 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={`/${locale}`} className="relative group">
              <motion.span
                className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >
                {t("brand")}
              </motion.span>
              {/* Underline effect */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          {/* Hamburger for mobile */}
          <motion.button
            className="md:hidden flex items-center px-2 py-1 text-gray-200 focus:outline-none relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={menuOpen ? "open" : "closed"}
              className="w-7 h-7 flex flex-col justify-around"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 8 }
                }}
                className="w-full h-0.5 bg-current transform transition-all duration-300"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                className="w-full h-0.5 bg-current transform transition-all duration-300"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -8 }
                }}
                className="w-full h-0.5 bg-current transform transition-all duration-300"
              />
            </motion.div>
          </motion.button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.div 
              className="flex items-baseline space-x-1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, staggerChildren: 0.1 }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="relative group px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    <motion.span
                      className="relative z-10 group-hover:text-white transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                    >
                      {link.label}
                    </motion.span>
                    {/* Hover background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-md"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    {/* Active indicator */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Language switcher */}
            <motion.div 
              className="flex items-center space-x-2 ml-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Link
                  href={`/en${pathWithoutLocale}`}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all duration-200 ${
                    locale === "en" 
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg" 
                      : "hover:bg-gray-700/50 text-gray-300"
                  }`}
                  prefetch={false}
                >
                  EN
                </Link>
              </motion.div>
              
              <span className="text-gray-400">|</span>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Link
                  href={`/zh${pathWithoutLocale}`}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all duration-200 ${
                    locale === "zh" 
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg" 
                      : "hover:bg-gray-700/50 text-gray-300"
                  }`}
                  prefetch={false}
                >
                  中文
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <motion.div 
                className="bg-black/95 backdrop-blur-md rounded-b-2xl shadow-2xl mx-2 mb-2 p-4 space-y-2"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                initial="hidden"
                animate="visible"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    <Link
                      href={link.href}
                      className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile language switcher */}
                <motion.div 
                  className="flex items-center justify-center space-x-2 pt-4 border-t border-gray-700"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <Link
                    href={`/en${pathWithoutLocale}`}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      locale === "en" 
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
                        : "hover:bg-gray-700 text-gray-300"
                    }`}
                    prefetch={false}
                    onClick={() => setMenuOpen(false)}
                  >
                    EN
                  </Link>
                  <span className="text-gray-400">|</span>
                  <Link
                    href={`/zh${pathWithoutLocale}`}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      locale === "zh" 
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
                        : "hover:bg-gray-700 text-gray-300"
                    }`}
                    prefetch={false}
                    onClick={() => setMenuOpen(false)}
                  >
                    中文
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
