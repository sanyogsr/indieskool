"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center w-full max-w-7xl bg-[#212121] rounded-2xl m-5 justify-between lg:justify-start lg:gap-x-[7rem]">
      <Link href="#" className="flex lg:mx-0 mx-auto" prefetch={false}>
        <h1 className="text-white font-bold text-3xl">
          Indie<span className="text-[#ffd700]">Skool</span>
        </h1>
      </Link>
      <nav className="hidden lg:flex gap-10">
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
