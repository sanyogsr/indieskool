"use client";

import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Demo from "./Demo";
import GetLatestUpdate from "./GetLatestUpdate";
import Testimonial from "./Testimonial";
import Indiecard from "./IndieCard";
import { StarIcon } from "lucide-react";
import Footer from "./Footer";
import FloatingAvatars from "./FloatingAvatars";
import AnimatedGridBackground from "./GridBackgroundComponent"; // Import the new component
import ScrollingProfileCarousel from "./IndieHackerCarousel";

const AnimatedSection: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="opacity-0 transition-all duration-1000 ease-out"
    >
      {children}
    </div>
  );
};

export default function AnimatedLandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] w-full max-w-9xl items-center justify-center bg-[#212121] relative overflow-hidden">
      <AnimatedGridBackground />
      <div className="relative z-10 w-full ">
        <Navbar />

        <AnimatedSection>
          <section className="w-full py-12 md:pb-14 md:pt-14 ">
            <HeroSection />
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <ScrollingProfileCarousel />
        </AnimatedSection>

        <main className="flex flex-col w-full max-w-6xl mx-auto">
          <AnimatedSection>
            <section className="py-5 md:py-20 px-4 md:px-6 mx-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl transform hover:scale-105 transition-transform duration-300">
              <Indiecard />
              <div className="flex items-center justify-center max-w-[13rem] bg-gray-800 mt-6 p-3 rounded-md animate-pulse">
                <StarIcon className="h-4 w-4 text-white mr-1" />
                <span className="text-white">4.9 Average Rating</span>
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section className="w-full md:pt-24 ">
              <Demo />
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section className="w-full py-10 flex justify-center">
              <Testimonial />
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section className="w-full py-12 md:py-24 lg:py-32 border-t flex flex-col items-center justify-center">
              <GetLatestUpdate />
            </section>
          </AnimatedSection>
        </main>

        <Footer />
        <FloatingAvatars />
      </div>
    </div>
  );
}
