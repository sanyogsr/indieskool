"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header
      className=" 
    bg-[#fffae4]
      lg:px-10 lg:py-10 h-14 flex items-center w-full lg:max-w-screen-2xl  rounded-full lg:mx-10 lg:my-5 justify-between "
    >
      <Link href="#" className="flex lg:mx-0 mx-auto" prefetch={false}>
        <h1 className="text-black font-extrabold text-4xl">
          Indie<span className="text-black">Skool</span>
        </h1>
      </Link>
      <nav className="hidden lg:flex gap-10 py-5 px-10 bg-[#212121] rounded-full">
        <Link
          href="#"
          className="text-xl font-medium hover:underline underline-offset-4 text-white"
          prefetch={false}
        >
          Courses
        </Link>
        <Link
          href="#"
          className="text-xl font-medium hover:underline underline-offset-4 text-white"
          prefetch={false}
        >
          Discord
        </Link>
        <Link
          href="#"
          className="text-xl font-medium hover:underline underline-offset-4 text-white"
          prefetch={false}
        >
          Resources
        </Link>
        <Link
          href="#"
          className="text-xl font-medium hover:underline underline-offset-4 text-white"
          prefetch={false}
        >
          About
        </Link>
      </nav>
    </header>
  );
}
