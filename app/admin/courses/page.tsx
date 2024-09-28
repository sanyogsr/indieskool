"use client";
import Loading from "@/components/Loading";
import LogoHeader from "@/components/LogoHeader";
import { useCustomSession } from "@/hooks/session";
import { useTutorialStore } from "@/store/tutorialStore";
import { useUserStore } from "@/store/userStore";
import React, { useEffect } from "react";

const Page = () => {
  const { user, fetchUser } = useUserStore();
  const { tutorials, fetchTutorials } = useTutorialStore();
  const { session, isLoggedIn } = useCustomSession();

  // Fetch the user when logged in
  useEffect(() => {
    if (!user && isLoggedIn) {
      fetchUser();
      console.log(user);
    }
  }, [session, isLoggedIn]);

  // Fetch the tutorials when the user is available and logged in
  useEffect(() => {
    if (isLoggedIn && user) {
      fetchTutorials();
      console.log(tutorials);
    }
  }, [isLoggedIn, user]);

  if (!user && !tutorials) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
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
            tutorials.map((tutorial: any, index: number) => (
              <div
                key={index}
                className="bg-yellow-500 hover:bg-yellow-400 rounded-lg p-6 flex flex-col justify-between shadow-lg transform transition-transform hover:scale-105"
              >
                <h2 className="text-xl font-bold text-white mb-2">
                  {tutorial.title}
                </h2>
                <p className="text-white text-sm mb-4">
                  {tutorial.description}
                </p>
                <a
                  href={tutorial.videoUrl} // Assuming links is an array, you may need to adjust this
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-yellow-500 font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-100"
                >
                  View Tutorial
                </a>
              </div>
            ))
          ) : (
            <p className="text-white">No tutorials found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
