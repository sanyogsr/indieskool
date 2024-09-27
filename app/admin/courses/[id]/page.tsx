import LogoHeader from "@/components/LogoHeader";
import React from "react";

const page = () => {
  return (
    <div className="p-4  sm:ml-64  bg-[#212121]">
      <LogoHeader admin={true}/>
      <div className="h-screen w-full">
        <h1 className="text-white">My Courses</h1>
      </div>
    </div>
  );
};

export default page;
