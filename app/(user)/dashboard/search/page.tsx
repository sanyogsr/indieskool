import LogoHeader from "@/components/LogoHeader";
import React from "react";

const page = () => {
  return (
    <div className=" p-4 sm:ml-64 bg-[#212121] h-screen">
      <LogoHeader admin={false} />
      <div className=" w-full bg-[#212121]">
        <div>
          <h1 className="text-white">Search Courses</h1>
        </div>
      </div>
    </div>
  );
};

export default page;
