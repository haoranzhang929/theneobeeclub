"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";

export default function HeroSection() {
  const t = useTranslations();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef });

  // Parallax transforms
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  return (
    <section ref={heroRef} className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Gradient Background with Parallax */}
      <motion.div
        style={{ y: yBg, scale, willChange: "transform" }}
        className="absolute inset-0 z-0 animate-gradient bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-400 opacity-80"
      />
      <motion.div
        style={{ opacity, willChange: "opacity" }}
        className="absolute inset-0 bg-gradient-to-b from-black/50 to-black z-10"
      />

      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          type: "spring",
          damping: 20,
          stiffness: 100
        }}
        className="relative z-20 text-center px-4"
        style={{ willChange: "transform, opacity" }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
          whileHover={{ scale: 1.05, rotate: 5 }}
          className="relative"
        >
          <Image
            src="/logo.webp"
            alt="The NeoBee Club Logo"
            width={192}
            height={192}
            className="mx-auto mb-8 w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover shadow-2xl ring-4 ring-white/20"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-display text-3xl sm:text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-base sm:text-xl md:text-2xl text-gray-300 font-normal px-2 sm:px-0 max-w-3xl mx-auto"
        >
          {t("hero.subtitle")}
        </motion.p>
      </motion.div>
    </section>
  );
}
