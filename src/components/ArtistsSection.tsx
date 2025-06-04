"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ArtistCard from "@/components/ArtistCard";
import { containerVariants, itemVariants, textRevealVariants } from "@/lib/animations";

export default function ArtistsSection() {
  const t = useTranslations();

  return (
    <motion.section
      id="artists"
      className="py-20 bg-black relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          variants={textRevealVariants}
          className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
        >
          {t("artists.title")}
        </motion.h2>
        <motion.p variants={textRevealVariants} className="text-center text-gray-400 mb-16 text-lg">
          {t("artists.intro")}
        </motion.p>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <ArtistCard
              name="HAØSC"
              role={t("artists.haosc_role")}
              spotify="https://open.spotify.com/artist/0ASsfvcyv6P3TVLEYLurds"
              youtube="https://www.youtube.com/@HAOSC"
              bilibili="https://space.bilibili.com/3546828570101837"
              imageUrl="/haosc.jpg"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ArtistCard
              name="Leo"
              role={t("artists.leo_role")}
              bilibili="https://space.bilibili.com/327769785"
              imageUrl="/leo.jpg"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
