import React, { useState } from "react";
import { BookOpen, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface TutorialCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  isPurchased: boolean;
  thumbnail?: string;
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
  rating = 4.5,
  difficulty = "Intermediate",
  onEnroll,
}) => {
  const [isNavigating, setIsNavigating] = useState(false); // New loading state for navigation
  const difficultyColor = {
    Beginner: "bg-green-500",
    Intermediate: "bg-yellow-500",
    Advanced: "bg-red-500",
  };

  const router = useRouter();

  const handleNavigation = async () => {
    setIsNavigating(true); // Set loading state before navigation
    router.push(`/dashboard/courses/${id}`);
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform">
      {/* Thumbnail Section */}
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-gray-800 text-cyan-300 text-2xl font-bold">
          {title.length > 30 ? `${title.substring(0, 30)}...` : title}
        </div>
      )}

      {/* Content Section */}
      <div className="p-4 sm:p-6">
        {/* Title and Description */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-cyan-300 truncate">
            {title}
          </h2>
          <p className="text-gray-400 text-sm mt-1 mb-2 line-clamp-2">
            {description}
          </p>
        </div>

        {/* Status Section */}
        <div className="flex justify-between items-center mb-4">
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
              className={`text-xs text-gray-900 px-2 py-1 rounded-full ${difficultyColor[difficulty]}`}
            >
              {difficulty}
            </span>
          </div>
        </div>

        {/* Enroll Button */}
        {isPurchased ? (
          <button
            onClick={handleNavigation}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 flex items-center justify-center"
          >
            {isNavigating ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              <>
                <BookOpen size={18} className="mr-2" />
                Start Learning
              </>
            )}
          </button>
        ) : (
          <button
            onClick={async () => {
              setIsNavigating(true);
              if (onEnroll) await onEnroll(id);
              setIsNavigating(false);
            }}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 flex items-center justify-center"
          >
            {isNavigating ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              <>
                <BookOpen size={18} className="mr-2" />
                Enroll Now
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default TutorialCard;
