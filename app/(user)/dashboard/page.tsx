"use client";
import { useCustomSession } from "@/hooks/session";
import { Plus } from "lucide-react";
import { useState } from "react";
import LogoHeader from "@/components/LogoHeader";

interface courseCard {
  name: string;
}

export default function Dashboard() {
  const [isCoursePurchased, SetIsCoursePurchased] = useState(false);
  const { loading } = useCustomSession();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className=" p-4 sm:ml-64 bg-[#212121] h-screen">
        <LogoHeader admin={false} />
        {/* <div className="flex w-full  "> */}
        <LargeCard />
        {/* </div> */}
      </div>
    </>
  );
}
const LargeCard = () => (
  <div className="flex max-w-2xl flex-col items-center justify-center h-48 max-w-screen m-4 rounded cursor-pointer bg-gray-400 ">
    <Plus className="text-white size-15 border border-collapse " />
    <p>Find your first tutorial and start building it</p>
  </div>
);
