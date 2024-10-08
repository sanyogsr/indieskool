"use client";
import Loading from "@/components/Loading";
import LogoHeader from "@/components/LogoHeader";
import { useCustomSession } from "@/hooks/session";
import { useTutorialStore } from "@/store/tutorialStore";
import React, { useEffect } from "react";
import TutorialCard from "@/components/AdminTutorialCard"; // Import the new component

const CoursePage = () => {
  const { tutorials, fetchTutorials } = useTutorialStore();
  const { isLoggedIn } = useCustomSession();

  useEffect(() => {
    if (isLoggedIn) {
      fetchTutorials();
    }
  }, [isLoggedIn]);

  if (!tutorials) {
    return (
      <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
    );
  }

  return (
    <div className="min-h-screen p-6 sm:ml-64 bg-[#212121]">
      <LogoHeader admin={true} />
      <div className="max-w-7xl mx-auto">
        <h1 className="w-full text-white text-3xl mb-6">My Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials && tutorials.length > 0 ? (
            tutorials.map((tutorial) => (
              <TutorialCard
                key={tutorial.id} // Use id as the key
                id={tutorial.id}
                title={tutorial.title}
                description={tutorial.description}
              />
            ))
          ) : (
            <p className="text-white">No tutorials found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
