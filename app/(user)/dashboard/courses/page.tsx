"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/store/userStore";
import TutorialCard from "@/components/UserTutorialCard"; // Adjust the import path as needed

interface Tutorial {
  id: number;
  title: string;
  description: string;
  price: number;
  isPurchased: boolean;
  duration?: string;
  rating?: number;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
}

// Define the shape of the API response
interface ApiResponse {
  data: Tutorial[];
}

const TutorialPage = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const fetchTutorials = async () => {
      if (!user || !user.id) return;
      try {
        const response: ApiResponse = await axios.get(`/api/get-tutorials`, {
          headers: { userId: user.id },
        });

        // Filter tutorials to only include those that are purchased
        const purchasedTutorials = response.data.filter(
          (tutorial) => tutorial.isPurchased
        );
        setTutorials(purchasedTutorials);
      } catch (error) {
        console.error("Error fetching tutorials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTutorials();
  }, [user]);

  const handleEnroll = (tutorialId: number) => {
    // Implement enrollment logic here
    console.log(`Enrolling in tutorial ${tutorialId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-ping rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500 flex justify-center items-center">
          <div>Loading...</div>{" "}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:ml-64 bg-[#212121] min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
        Explore Tutorials
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.length > 0 ? (
          tutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              {...tutorial}
              // onEnroll={handleEnroll}
            />
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center">
            <p className="text-xl text-white">
              Please purchase a tutorial to see it here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialPage;
