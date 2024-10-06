"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { useUserStore } from "@/store/userStore";
import { FaPlay, FaPause, FaBackward, FaForward, FaCog } from "react-icons/fa";
import { Volume2 } from "lucide-react";

interface Tutorial {
  id: number;
  title: string;
  videoUrl: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  links: { id: number; title: string; url: string; tutorialId: number }[];
  user: { name: string };
  isPurchased: boolean;
  authorName: string;
}

const TutorialDetailPage = ({ params }: { params: { id: string } }) => {
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, fetchUser } = useUserStore();
  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState("auto");

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const fetchTutorial = async () => {
      if (!user || !user.id) return;
      try {
        const response = await axios.get<Tutorial>(
          `/api/get-tutorials/purchased/${params.id}`,
          {
            headers: { userId: user.id },
          }
        );
        setTutorial(response.data);
      } catch (error) {
        console.error("Error fetching tutorial:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTutorial();
  }, [user, params.id]);

  const handlePlayPause = () => setPlaying(!playing);
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setVolume(parseFloat(e.target.value));
  const handlePlaybackRateChange = (rate: number) => setPlaybackRate(rate);
  const handleQualityChange = (newQuality: string) => setQuality(newQuality);
  const handleSeek = (seconds: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + seconds);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#212121]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#212121] text-white text-2xl">
        Tutorial not found
      </div>
    );
  }

  return (
    <div className="bg-[#212121]  min-h-screen sm:ml-64 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text leading-tight break-words">
          {tutorial.title}
        </h1>

        {tutorial.isPurchased ? (
          <>
            <div className="mb-6 relative pt-[56.25%] bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
              <ReactPlayer
                ref={playerRef}
                url={tutorial.videoUrl}
                playing={playing}
                controls
                width="100%"
                height="100%"
                className="absolute top-0 left-0 w-full h-full"
                volume={volume}
                playbackRate={playbackRate}
                config={{
                  file: {
                    forceVideo: true,
                    attributes: {
                      controlsList: "nodownload",
                    },
                  },
                }}
              />
            </div>

            <div className="bg-gray-800 rounded-lg shadow-xl p-4 mb-8">
              <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Speed:</span>
                  <select
                    value={playbackRate}
                    onChange={(e) =>
                      handlePlaybackRateChange(parseFloat(e.target.value))
                    }
                    className="bg-gray-800 rounded p-1 text-sm"
                  >
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                      <option key={rate} value={rate}>
                        {rate}x
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleSeek(-10)}
                    className="text-xl hover:text-purple-400 transition-colors"
                  >
                    <FaBackward />
                  </button>
                  <button
                    onClick={handlePlayPause}
                    className="text-xl hover:text-purple-400 transition-colors"
                  >
                    {playing ? <FaPause /> : <FaPlay />}
                  </button>
                  <button
                    onClick={() => handleSeek(10)}
                    className="text-xl hover:text-purple-400 transition-colors"
                  >
                    <FaForward />
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Quality:</span>
                  <select
                    value={quality}
                    onChange={(e) => handleQualityChange(e.target.value)}
                    className="bg-[#16213e] rounded p-1 text-sm"
                  >
                    <option value="auto">Auto</option>
                    <option value="240p">240p</option>
                    <option value="360p">360p</option>
                    <option value="480p">480p</option>
                    <option value="720p">720p</option>
                    <option value="1080p">1080p</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Volume2 className="text-purple-400" />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">
                Description
              </h2>
              <p className="text-gray-300 leading-relaxed break-words whitespace-pre-wrap">
                {tutorial.description}
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">
                Additional Resources
              </h2>
              <ul className="space-y-2">
                {tutorial.links.map((link) => (
                  <li key={link.id} className="flex items-center">
                    <span className="mr-2 text-purple-400">•</span>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-200 break-all"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-[#16213e] rounded-lg">
                  <p className="text-lg font-semibold text-purple-400">
                    {tutorial.authorName}
                  </p>
                  <p className="text-sm text-gray-400">Author</p>
                </div>
                <div className="p-4 bg-[#16213e] rounded-lg">
                  <p className="text-lg font-semibold text-purple-400">
                    {new Date(tutorial.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-400">Created</p>
                </div>
                <div className="p-4 bg-[#16213e] rounded-lg">
                  <p className="text-lg font-semibold text-purple-400">
                    {new Date(tutorial.updatedAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-400">Last Updated</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-[#0f3460] rounded-lg shadow-xl text-center p-8">
            <p className="mb-6 text-xl">
              You need to purchase this tutorial to view its content.
            </p>
            <button
              onClick={() => {
                /* Implement purchase logic here */
              }}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
            >
              Purchase for ${(tutorial.price / 100).toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialDetailPage;
