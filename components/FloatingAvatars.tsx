import React from "react";
import { Twitter } from "lucide-react";
import Link from "next/link";

export default function FloatingAvatars() {
  return (
    <div className="relative inset-0 w-full h-full pointer-events-none">
      <div className="fixed bottom-20 right-10 pointer-events-auto">
        <FixedAvatar />
      </div>
    </div>
  );
}

function FixedAvatar() {
  return (
    <Link href={"https://x.com/sanyogsr"} target="_blank">
      <div className=" hidden relative group lg:flex cursor-pointer items-center justify-center p-4 m-2 w-26 h-8 bg-gray-200 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-110 hover:bg-gray-300">
        {/* Avatar with Twitter icon */}
        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-black text-white rounded-md text-xs shadow-lg">
          Go to sanyogsr
        </div>
        <Twitter className="text-2xl text-gray-800 group-hover:text-blue-500" />
        <span className="ml-2 text-sm font-bold">sanyogsr</span>
      </div>
    </Link>
  );
}
