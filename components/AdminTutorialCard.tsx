import React from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";

interface TutorialCardProps {
  id: number;
  title: string;
  description: string;
  thumbnailUrl?: string;
}

const TutorialCard: React.FC<TutorialCardProps> = ({
  id,
  title,
  description,
  thumbnailUrl,
}) => {
  return (
    <div className="bg-[#161319] w-full max-w-[25em] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform">
      {/* Thumbnail Section */}
      <div className="relative w-full h-[20em] overflow-hidden">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-800">
            <h2 className="text-2xl font-bold text-cyan-300">{title}</h2>
          </div>
        )}
        {thumbnailUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h1 className="text-xl font-semibold text-cyan-300 mb-2">{title}</h1>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{description}</p>

        {/* View Tutorial Button */}
        <Link href={`/admin/courses/${id}`}>
          <button className="w-full bg-gradient-to-r from-purple-700 to-pink-900 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 flex items-center justify-center">
            <BookOpen size={18} className="mr-2" />
            View Tutorial
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TutorialCard;
