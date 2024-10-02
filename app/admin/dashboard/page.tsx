"use client";

import React, { useEffect, useState } from "react";
import { useCustomSession } from "@/hooks/session";
import Link from "next/link";
import { ArrowRight, Upload } from "lucide-react";
import LogoHeader from "@/components/LogoHeader";
import { useTutorialStore } from "@/store/tutorialStore";
import TutorialCard from "@/components/AdminTutorialCard";

interface Tutorial {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
}

export default function AdminDashboard() {
  const { tutorials, fetchTutorials } = useTutorialStore();
  const { session, isLoggedIn } = useCustomSession();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isLoggedIn) {
      fetchTutorials().finally(() => setLoading(false));
    }
  }, [isLoggedIn, session, fetchTutorials]);

  return (
    <div className="p-4 sm:ml-64 bg-[#212121] min-h-screen relative">
      <LogoHeader admin={true} />

      {/* Large Card - Centered on small screens */}
      <div className="flex justify-center sm:justify-start sm:absolute sm:top-[90px] sm:left-[5em] lg:left-10 md:left-10 z-10 mt-4 sm:mt-0">
        <LargeCard />
      </div>

      <div className="flex flex-col w-full mt-[10em]">
        <div className="m-5 flex justify-start">
          <h1 className="text-gray-100 text-3xl font-bold">My tutorials</h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center mt-[10em]">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : tutorials && tutorials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full px-4 sm:px-8 lg:px-16">
            {tutorials.map((tutorial: Tutorial) => (
              <TutorialCard
                key={tutorial.id}
                id={tutorial.id}
                title={tutorial.title}
                description={tutorial.description}
                thumbnailUrl={tutorial.thumbnailUrl}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[89vh]">
            <p className="text-white mt-4">
              No tutorials found. Please upload{" "}
              <Link
                href="/admin/upload"
                className="text-blue-400 hover:underline"
              >
                here
              </Link>
            </p>
          </div>
        )}

        {tutorials && tutorials.length > 0 && (
          <div className="flex justify-center">
            <div className="flex justify-center max-w-[14em] items-center rounded-lg cursor-pointer hover:scale-105 text-gray-800 py-2 px-5 mt-7 bg-white">
              <Link href="/admin/courses/">View All Tutorials</Link>
              <ArrowRight className="size-5 ml-2" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const LargeCard = () => (
  <Link href="/admin/dashboard/upload">
    <div className="hover:bg-yellow-600 cursor-pointer hover:text-white bg-gray-400 flex flex-col justify-center items-center rounded-lg p-5 w-full sm:w-[15rem]">
      <Upload className="w-8 h-8 mb-2" />
      <h1 className="text-lg font-semibold">Upload tutorial</h1>
    </div>
  </Link>
);
