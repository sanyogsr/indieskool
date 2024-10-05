"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

interface Tutorial {
  id: number;
  title: string;
  description: string;
  price: number;
  isPurchased: boolean;
  videoUrl: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  links: { id: number; title: string; url: string }[];
}

const TutorialDetailPage = ({ params }: { params: { id: string } }) => {
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, fetchUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const fetchTutorial = async () => {
      if (!user || !user.id) return;
      try {
        const response = await axios.get(
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-ping rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500 flex justify-center items-center">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (!tutorial) {
    return <div className="text-center text-white">Tutorial not found</div>;
  }

  return (
    <div className="p-6 sm:ml-64 bg-[#212121] min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
        {tutorial.title}
      </h1>
      <div className="mb-4 text-center">
        <p>Author: {tutorial.authorName}</p>
        <p>Created: {new Date(tutorial.createdAt).toLocaleDateString()}</p>
        <p>Last Updated: {new Date(tutorial.updatedAt).toLocaleDateString()}</p>
      </div>
      {tutorial.isPurchased ? (
        <div>
          <div className="mb-8">
            <video
              controls
              src={tutorial.videoUrl}
              className="w-full max-w-3xl mx-auto"
            />
          </div>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="mb-8">{tutorial.description}</p>
            <h2 className="text-2xl font-semibold mb-4">
              Additional Resources
            </h2>
            <ul className="list-disc pl-5">
              {tutorial.links.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-4">
            You need to purchase this tutorial to view its content.
          </p>
          <button
            onClick={() => {
              /* Implement purchase logic here */
            }}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
          >
            Purchase for ${(tutorial.price / 100).toFixed(2)}
          </button>
        </div>
      )}
    </div>
  );
};

export default TutorialDetailPage;
