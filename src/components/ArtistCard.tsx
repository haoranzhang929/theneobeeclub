"use client";
import { motion } from "framer-motion";
import { FaSpotify, FaYoutube } from "react-icons/fa";

interface ArtistCardProps {
  name: string;
  role: string;
  spotify?: string;
  youtube?: string;
  bilibili?: string;
  imageUrl: string;
}

const ArtistCard = ({ name, role, spotify, youtube, bilibili, imageUrl }: ArtistCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gray-900 rounded-lg overflow-hidden shadow-xl"
    >
      <div className="relative h-64">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-400 mb-4">{role}</p>
        <div className="flex space-x-4">
          {spotify && (
            <a href={spotify} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400">
              <FaSpotify size={24} />
            </a>
          )}
          {youtube && (
            <a href={youtube} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400">
              <FaYoutube size={24} />
            </a>
          )}
          {bilibili && (
            <a href={bilibili} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 2.5a1 1 0 0 1 1.32-.08l.1.08L8.59 5.5H15.4l2.67-3a1 1 0 0 1 1.5 1.32l-.08.1-1.84 2.08H20a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2h1.25L3.41 3.92A1 1 0 0 1 4.5 2.5zm15.5 5H4v11h16V7.5zm-10.5 3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1zm5 0a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistCard;
