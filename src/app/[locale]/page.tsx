"use client";
import Navbar from "@/components/Navbar";
import ArtistCard from "@/components/ArtistCard";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 animate-gradient bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-400 opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black z-10" />
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20 text-center px-4"
        >
          <picture>
            <source srcSet="/logo.webp" type="image/webp" />
            <img
              src="/logo.png"
              alt="The NeoBee Club Logo"
              className="mx-auto mb-8 w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover shadow-lg"
            />
          </picture>
          <h1 className="font-display text-3xl sm:text-5xl md:text-7xl font-bold mb-4">{t("hero.title")}</h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-300 font-normal px-2 sm:px-0">
            {t("hero.subtitle")}
          </p>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("about.title")}</h2>
          <p className="text-lg text-gray-300">{t("about.description")}</p>
        </div>
      </section>

      {/* Artists Section */}
      <section id="artists" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-6">{t("artists.title")}</h2>
          <p className="text-center text-gray-400 mb-12">{t("artists.intro")}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ArtistCard
              name="HAØSC"
              role={t("artists.haosc_role")}
              spotify="https://open.spotify.com/artist/0ASsfvcyv6P3TVLEYLurds"
              youtube="https://www.youtube.com/@HAOSC"
              bilibili="https://space.bilibili.com/3546828570101837"
              imageUrl="/haosc.jpg"
            />
            <ArtistCard
              name="Leo"
              role={t("artists.leo_role")}
              bilibili="https://space.bilibili.com/327769785"
              imageUrl="/leo.jpg"
            />
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">{t("music.title")}</h2>
          <div className="aspect-video">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/VIDEO_ID"
              title="The NeoBee Club - Funky House Mix with Guitar"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">{t("contact.title")}</h2>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.youtube.com/@TheNeoBeeClub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400"
            >
              <span className="sr-only">YouTube</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
