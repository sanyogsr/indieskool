"use client";
import React, { useEffect, useState } from "react";
import { useTutorialStore } from "@/store/tutorialStore";
import Loading from "@/components/Loading";
import { ExternalLink } from "lucide-react";
import Player from "next-video/player";

interface Link {
  id: number;
  title: string;
  url: string;
}

interface Tutorial {
  id: number;
  title: string;
  videoUrl: string;
  description: string;
  links: Link[];
}

interface TutorialDetailProps {
  params: {
    id: number;
  };
}

const TutorialDetail = ({ params }: TutorialDetailProps) => {
  const { id } = params;
  const { singleTutorial, fetchTutorialById } = useTutorialStore();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      if (Array.isArray(singleTutorial)) {
        const foundTutorial = singleTutorial.find((tut) => tut.id === id);
        if (foundTutorial) {
          setTutorial(foundTutorial);
        } else {
          fetchTutorialById(id)
            .then((fetchedTutorialById) => {
              if (fetchedTutorialById) {
                setTutorial(fetchedTutorialById);
              } else {
                setNotFound(true);
              }
            })
            .catch(() => {
              setNotFound(true);
            });
        }
      } else {
        console.error("singleTutorial is not an array", singleTutorial);
      }
    }
  }, [id, singleTutorial, fetchTutorialById]);

  if (notFound) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#212121]">
        <h1 className="text-3xl font-bold text-red-500">
          Tutorial Not Available
        </h1>
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#212121]">
        <Loading />
      </div>
    );
  }

  const handleVideoError = () => {
    setVideoError("Error loading video. Please check the URL and try again.");
  };

  return (
    <div className="min-h-screen sm:ml-64 p-6 bg-[#212121]">
      <div className="max-w-4xl mx-auto">
        {/* Video Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-2">Video</h2>
          {videoError ? (
            <p className="text-red-500">{videoError}</p>
          ) : (
            <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
              <Player className="w-full h-full" src={tutorial.videoUrl} />
            </div>
          )}
        </div>

        {/* Title and Description Section */}
        <div className="bg-[#1a1811] rounded-lg p-6 mb-6 shadow-lg overflow-hidden">
          <h1 className="text-3xl font-bold text-cyan-300 mb-4 break-words">
            {tutorial.title}
          </h1>
          <p className="text-gray-300 mb-6 leading-relaxed break-words whitespace-pre-wrap">
            {tutorial.description}
          </p>
        </div>

        {/* Links Section */}
        <div className="bg-[#1a1811] rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">
            Useful Links
          </h2>
          <ul className="space-y-2">
            {tutorial.links &&
              tutorial.links.map((link) => (
                <li key={link.id} className="flex items-center">
                  <ExternalLink
                    className="text-purple-400 mr-2 flex-shrink-0"
                    size={18}
                  />
                  <a
                    href={link.url}
                    className="text-gray-300 hover:text-pink-400 transition-colors duration-200 break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TutorialDetail;
