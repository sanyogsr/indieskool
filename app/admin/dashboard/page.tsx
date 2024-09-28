"use client";
import { useEffect, useState } from "react";
import { useCustomSession } from "@/hooks/session";
import Link from "next/link";
import { ArrowRight, Upload } from "lucide-react";
import LogoHeader from "@/components/LogoHeader";
import { useTutorialStore } from "@/store/tutorialStore";
import Loading from "@/components/Loading";
interface tutorial {
  title: string;
  description: string;
  videoUrl: string;
}
export default function AdminDashboard() {
  const { tutorials, fetchTutorials } = useTutorialStore();
  const { session, isLoggedIn } = useCustomSession();
  const [visibleTutorials, setVisibleTutorials] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    if (isLoggedIn) {
      fetchTutorials().finally(() => setLoading(false)); // Set loading to false after fetching
    }
  }, [isLoggedIn, session]);

  useEffect(() => {
    if (tutorials && tutorials.length > 0) {
      // Show 50% of tutorials when tutorials are fetched
      setVisibleTutorials(Math.ceil(tutorials.length / 2));
    }
  }, [tutorials]);

  return (
    <>
      <div className="p-4 sm:ml-64 bg-[#212121] min-h-screen relative">
        <LogoHeader admin={true} />

        {/* Upload button in top left corner with spacing */}
        <div className="absolute top-10 left-10 z-10">
          <LargeCard />
        </div>

        <div className="flex flex-col w-full items-center justify-center mt-16">
          <div className="m-5 flex justify-start">
            <h1 className="text-white text-lg font-bold">My tutorials</h1>
          </div>

          {/* Check loading and tutorials state */}
          {loading ? (
            <Loading /> // Show loading indicator while tutorials are being fetched
          ) : tutorials && tutorials.length > 0 ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mx-10"
              style={{ height: "auto" }}
            >
              {tutorials
                .slice(0, visibleTutorials)
                .map((tutorial: tutorial, index: number) => (
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
                      href={tutorial.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-yellow-500 font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-100"
                    >
                      View Tutorial
                    </a>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center h-[89vh]">
              <LargeCard />
              <p className="text-white mt-4">No tutorials available</p>
            </div>
          )}

          {/* Conditionally render "View All Tutorials" button when tutorials are available */}
          {tutorials && tutorials.length > 0 && (
            <div className="flex justify-center items-center rounded-lg cursor-pointer hover:scale-105 text-gray-800 py-2 px-5 mt-7 bg-white">
              <Link href={"/admin/courses/"}>View All Tutorials</Link>
              <ArrowRight className="size-5" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Upload Button Component
const LargeCard = () => (
  <Link href={"/admin/dashboard/upload"}>
    <div className="hover:bg-yellow-600 cursor-pointer hover:text-white bg-gray-400 flex flex-col justify-center items-center rounded-lg p-5 w-[15rem]">
      <Upload className="w-8 h-8 mb-2" />
      <h1 className="text-lg font-semibold">Upload tutorial</h1>
    </div>
  </Link>
);
