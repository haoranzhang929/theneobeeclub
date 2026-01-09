"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ArtistCard from "@/components/ArtistCard";
import { useOptimizedVariants } from "@/lib/animations";
import { artists } from "@/data/artists";

export default function ArtistsSection() {
  const t = useTranslations();
  const { containerVariants, itemVariants, textRevealVariants } = useOptimizedVariants();

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

        <motion.div
          className={`grid gap-8 lg:gap-12 ${
            artists.length === 1
              ? "grid-cols-1 max-w-md mx-auto"
              : artists.length === 2
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
          variants={containerVariants}
        >
          {artists.map((artist, index) => (
            <motion.div key={artist.id} variants={itemVariants}>
              <ArtistCard
                name={artist.name}
                role={t(artist.roleKey)}
                bio={artist.bioKey ? t(artist.bioKey) : undefined}
                spotify={artist.social.spotify}
                youtube={artist.social.youtube}
                bilibili={artist.social.bilibili}
                imageUrl={artist.imageUrl}
                instagram={artist.social.instagram}
                soundcloud={artist.social.soundcloud}
                twitter={artist.social.twitter}
                xiaohongshu={artist.social.xiaohongshu}
                priority={index < 3}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
