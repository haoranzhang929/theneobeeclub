"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { works } from "@/data/works";
import { useOptimizedVariants } from "@/lib/animations";

export default function MusicSection() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;
  const { containerVariants, itemVariants, textRevealVariants } = useOptimizedVariants();

  return (
    <motion.section
      id="music"
      className="py-20 bg-gray-900 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          variants={textRevealVariants}
          className="font-display text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
        >
          {t("music.title")}
        </motion.h2>

        <motion.div variants={itemVariants} className="relative max-w-5xl mx-auto">
          {/* Enhanced background glow for video - more visible */}
          <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-3xl blur-3xl opacity-80"></div>
          <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-2xl blur-xl opacity-60"></div>

          <div className="relative z-20 aspect-video rounded-2xl overflow-hidden shadow-2xl mx-0 sm:mx-4 lg:mx-8 transition-all duration-300 hover:-translate-y-1">
            <iframe
              className="w-full h-full"
              src={works[0].src}
              title={works[0].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>

        {/* Call-to-action button */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <Link
            href={`/${locale}/works`}
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl group"
          >
            {t("music.viewMore")}
            <svg
              className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
