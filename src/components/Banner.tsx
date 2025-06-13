"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { works } from "@/data/works";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("banner");

  // Extract latest video ID from the first entry in works.ts
  const latestVideoSrc = works[0]?.src || "";
  const latestVideoId = latestVideoSrc.match(/youtube\.com\/embed\/([^?]+)/)?.[1] || "";
  const latestVideoUrl = latestVideoId ? `https://www.youtube.com/watch?v=${latestVideoId}` : "";

  useEffect(() => {
    // Check if banner was dismissed in localStorage and if there's a valid video URL
    const dismissedTime = localStorage.getItem("banner-dismissed");
    const shouldShow = !dismissedTime || Date.now() - parseInt(dismissedTime) > 7 * 24 * 60 * 60 * 1000; // Show again after 7 days

    if (shouldShow && latestVideoUrl) {
      setIsVisible(true);
    }
  }, [latestVideoUrl]);

  // Add/remove top padding to body when banner is visible/hidden
  useEffect(() => {
    const bannerHeight = isVisible ? "52px" : "0px"; // Adjust based on actual banner height
    document.body.style.paddingTop = bannerHeight;

    return () => {
      document.body.style.paddingTop = "0px";
    };
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    // Store dismissal with a timestamp so we can potentially show it again after some time
    localStorage.setItem("banner-dismissed", Date.now().toString());
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white shadow-lg"
          role="banner"
          aria-label="Latest video announcement"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-xl"
                >
                  🎵
                </motion.div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                  <span className="font-medium text-sm sm:text-base">{t("newVideo")}</span>
                  <a
                    href={latestVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white underline hover:text-yellow-200 transition-colors duration-200 text-sm sm:text-base"
                    aria-label={`${t("watchNow")} - ${t("newVideo")}`}
                  >
                    {t("watchNow")}
                  </a>
                </div>
              </div>

              <motion.button
                onClick={handleDismiss}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 hover:bg-white/10 rounded-full transition-colors duration-200"
                aria-label="Dismiss banner"
              >
                <XMarkIcon className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Banner;
