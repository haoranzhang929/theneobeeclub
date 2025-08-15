"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useOptimizedVariants } from "@/lib/animations";

export default function ContactSection() {
  const t = useTranslations();
  const { containerVariants, itemVariants, textRevealVariants } = useOptimizedVariants();

  return (
    <motion.section
      id="contact"
      className="py-20 bg-black relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariants}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-white"
            style={{
              left: `${(i % 5) * 20}%`,
              top: `${Math.floor(i / 5) * 25}%`
            }}
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h2
          variants={textRevealVariants}
          className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
        >
          {t("contact.title")}
        </motion.h2>

        <motion.div variants={itemVariants} className="flex justify-center">
          <motion.a
            href="https://www.youtube.com/@TheNeoBeeClub"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
            <div className="relative bg-red-500 hover:bg-red-400 p-6 rounded-full transition-colors duration-300">
              <span className="sr-only">YouTube</span>
              <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
