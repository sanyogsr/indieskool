import LogoHeader from "@/components/LogoHeader";
import React from "react";

const TutorialPage = () => {
  return (
    <div className="p-4  sm:ml-64  bg-[#212121]">
      <LogoHeader admin={false} />
      <div className="h-screen w-full">
        <h1 className="text-white">My tutorials by its id</h1>
      </div>
    </div>
  );
};

export default TutorialPage;
