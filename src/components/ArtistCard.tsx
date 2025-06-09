"use client";
import { motion } from "framer-motion";
import { FaSpotify, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";
import { SiSoundcloud } from "react-icons/si";
import Image from "next/image";
import { useState } from "react";

interface ArtistCardProps {
  name: string;
  role: string;
  spotify?: string;
  youtube?: string;
  bilibili?: string;
  instagram?: string;
  soundcloud?: string;
  twitter?: string;
  imageUrl: string;
}

const ArtistCard = ({ 
  name, 
  role, 
  spotify, 
  youtube, 
  bilibili, 
  instagram,
  soundcloud,
  twitter,
  imageUrl 
}: ArtistCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Create a gradient background based on the artist name for consistency
  const getGradientColors = (name: string) => {
    if (name.includes("HAØSC") || name.includes("HAOSC")) {
      return "from-purple-500 to-pink-500";
    } else if (name.includes("Leo")) {
      return "from-blue-500 to-cyan-500";
    }
    return "from-gray-500 to-gray-700";
  };

  // Bilibili icon component
  const BilibiliIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 2.5a1 1 0 0 1 1.32-.08l.1.08L8.59 5.5H15.4l2.67-3a1 1 0 0 1 1.5 1.32l-.08.1-1.84 2.08H20a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2h1.25L3.41 3.92A1 1 0 0 1 4.5 2.5zm15.5 5H4v11h16V7.5zm-10.5 3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1zm5 0a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1z" />
    </svg>
  );

  // Social platform configurations
  const socialPlatforms = [
    {
      url: spotify,
      icon: <FaSpotify size={28} />,
      hoverColor: "text-green-500 hover:text-green-400",
      name: "Spotify"
    },
    {
      url: youtube,
      icon: <FaYoutube size={28} />,
      hoverColor: "text-red-500 hover:text-red-400",
      name: "YouTube"
    },
    {
      url: bilibili,
      icon: <BilibiliIcon />,
      hoverColor: "text-blue-400 hover:text-blue-300",
      name: "Bilibili"
    },
    {
      url: instagram,
      icon: <FaInstagram size={28} />,
      hoverColor: "text-pink-500 hover:text-pink-400",
      name: "Instagram"
    },
    {
      url: soundcloud,
      icon: <SiSoundcloud size={28} />,
      hoverColor: "text-orange-500 hover:text-orange-400",
      name: "SoundCloud"
    },
    {
      url: twitter,
      icon: <FaTwitter size={28} />,
      hoverColor: "text-blue-400 hover:text-blue-300",
      name: "Twitter"
    }
  ].filter(platform => platform.url); // Only show platforms with URLs

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-300 hover:shadow-purple-500/20 hover:-translate-y-2"
    >
      <div className="relative h-80 overflow-hidden rounded-t-2xl">
        {!imageError ? (
          <div className="relative w-full h-full transition-transform duration-300 hover:scale-105">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
            {/* Simple static overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
          </div>
        ) : (
          // Fallback gradient placeholder
          <div
            className={`relative w-full h-full bg-gradient-to-br ${getGradientColors(
              name
            )} flex items-center justify-center transition-transform duration-300 hover:scale-105`}
          >
            {/* Artist initials as placeholder */}
            <div className="text-6xl font-bold text-white/80 select-none">
              {name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()}
            </div>
            {/* Overlay for consistency */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
          </div>
        )}
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {name}
        </h3>

        <p className="text-gray-400 mb-6 text-lg">{role}</p>

        <div
          className={`flex space-x-6 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {socialPlatforms.map((platform, index) => (
            <a
              key={index}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${platform.hoverColor} transition-all duration-200 hover:scale-110`}
              aria-label={`${name} on ${platform.name}`}
            >
              {platform.icon}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistCard;
