"use client";

import { useCustomSession } from "@/hooks/session";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Demo from "./Demo";
import GetLatestUpdate from "./GetLatestUpdate";
import Testimonial from "./Testimonial";
import Indiecard from "./IndieCard";
import { StarIcon } from "lucide-react";
import Footer from "./Footer";
import Loading from "./Loading";
import FloatingAvatars from "./FloatingAvatars";

export default function SessionComponent() {
  const { loading } = useCustomSession();

  // If the user is logged in, the middleware will handle the redirect on the server side
  return (
    <div className="flex flex-col min-h-[100dvh] items-center justify-center bg-[#212121]">
      <Navbar />

      <section className="w-full py-12 md:pb-24 md:pt-14 bg-[#212121] ">
        <HeroSection />
      </section>

      <main className="flex flex-col w-full max-w-7xl ">
        <section className="py-5 md:py-20 px-4 md:px-6 mx-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl">
          <Indiecard />
          <div className="flex items-center justify-center max-w-[13rem] bg-gray-800 mt-6 p-3 rounded-md">
            <StarIcon className="h-4 w-4 text-white mr-1" />
            <span className="text-white">4.9 Average Rating</span>
          </div>
        </section>

        <section className="w-full md:pt-24 bg-[#212121]">
          <Demo />
        </section>

        <section className="w-full py-10 flex justify-center">
          <Testimonial />
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 border-t flex flex-col items-center justify-center">
          <GetLatestUpdate />
        </section>
      </main>

      <Footer />
      <FloatingAvatars />
    </div>
  );
}
