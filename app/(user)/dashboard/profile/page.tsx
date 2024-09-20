import LogoHeader from "@/components/LogoHeader";
import React from "react";

function page() {
  return (
    <div className="p-4  sm:ml-64 bg-[#212121]">
      <LogoHeader />
      <div className="w-full h-screen">
        <h1 className="text-white">Profile page</h1>
      </div>
    </div>
  );
}

export default page;
