import React from "react";
import Link from "next/link";

interface TutorialCardProps {
  id: number;
  title: string;
  description: string;
  thumbnailUrl?: string; // Optional thumbnail prop
}

const TutorialCard: React.FC<TutorialCardProps> = ({
  id,
  title,
  description,
  thumbnailUrl,
}) => {
  return (
    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-lg transform transition-transform hover:scale-101 ">
      {/* Thumbnail Section */}
      <div className="p-2">
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-[#212121]">
              <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
          )}

          {/* Title overlay on top of thumbnail */}
          {thumbnailUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
          )}
        </div>
        <div className="px-2 pt-2">
          <h1 className="text-gray-800 text-2xl font-bold"> {title}</h1>
        </div>

        {/* Content Section */}
        <div className="p-2">
          <p className="text-gray-800 text-sm mb-4">{description}</p>
          <Link
            href={`/admin/courses/${id}`}
            className="block w-full text-center bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
          >
            View Tutorial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorialCard;
