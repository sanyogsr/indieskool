"use client";
import React from "react";
import { BookOpen, DollarSign, Clock, Star, Link } from "lucide-react";
import { useRouter } from "next/navigation";

interface TutorialCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  isPurchased: boolean;
  thumbnail?: string; // Added thumbnail prop
  duration?: string;
  rating?: number;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  onEnroll?: (id: number) => Promise<void>;
}

const TutorialCard: React.FC<TutorialCardProps> = ({
  id,
  title,
  description,
  price,
  isPurchased,
  thumbnail,
  duration = "2h 30m",
  rating = 4.5,
  difficulty = "Intermediate",
  onEnroll,
}) => {
  const difficultyColor = {
    Beginner: "bg-green-500",
    Intermediate: "bg-yellow-500",
    Advanced: "bg-red-500",
  };

  const router = useRouter();

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform">
      {/* Thumbnail Section */}
      {thumbnail ? (
        <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-gray-800 text-cyan-300 text-2xl font-bold">
          {title}
        </div>
      )}

      {/* Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold text-cyan-300">{title}</h2>
            <p className="text-gray-400 text-sm mt-1 mb-4 line-clamp-3">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isPurchased ? (
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                Purchased
              </span>
            ) : (
              <span className="text-yellow-400 font-bold flex items-center">
                <DollarSign size={16} className="mr-1" />
                {price}
              </span>
            )}
            <span
              className={`text-xs text-white px-2 py-1 rounded-full ${difficultyColor[difficulty]}`}
            >
              {difficulty}
            </span>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-gray-400">
            <Clock size={14} className="mr-1" />
            <span className="text-sm">{duration}</span>
          </div>
          <div className="flex items-center text-yellow-400">
            <Star size={14} className="mr-1" />
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Enroll Button */}
        {isPurchased ? (
          // <Link href={`/dashboard/courses/${id}`}>
          <button
            onClick={() => router.push(`/dashboard/courses/${id}`)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 flex items-center justify-center"
          >
            <BookOpen size={18} className="mr-2" />
            Start Learning
          </button>
        ) : (
          // </Link>
          <button
            onClick={() => onEnroll && onEnroll(id)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 flex items-center justify-center"
          >
            <BookOpen size={18} className="mr-2" />
            Enroll Now
          </button>
        )}
      </div>
    </div>
  );
};

export default TutorialCard;
