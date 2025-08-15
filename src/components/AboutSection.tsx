"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useOptimizedVariants } from "@/lib/animations";

export default function AboutSection() {
  const t = useTranslations();
  const { containerVariants, textRevealVariants } = useOptimizedVariants();

  return (
    <motion.section
      id="about"
      className="py-20 bg-gray-900 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.h2
          variants={textRevealVariants}
          className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          {t("about.title")}
        </motion.h2>
        <motion.p variants={textRevealVariants} className="text-lg md:text-xl text-gray-300 leading-relaxed">
          {t("about.description")}
        </motion.p>
      </div>
    </motion.section>
  );
}
