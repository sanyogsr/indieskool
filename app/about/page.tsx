"use client";

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

const AboutPage = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login"); // Change the path to your login route
  };

  return (
    <>
      <div className="bg-[#212121]">
        {/* Fit Navbar at the top */}
        <div className="fixed w-full z-50">
          <Navbar />
        </div>

        {/* Add padding to avoid overlapping with fixed navbar */}
        <div className="pt-20 min-h-screen bg-[#212121] text-white flex flex-col items-center justify-center p-8">
          <section className="max-w-3xl text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Welcome to IndieSkool
            </h1>
            <p className="text-lg mb-8 leading-relaxed text-gray-300">
              IndieSkool is your ultimate platform to learn the art of indie
              hacking. We connect aspiring creators with experienced indie
              hackers to help you build and grow your projects. Whether
              you&apos;re just starting out or looking for advanced mentorship,
              IndieSkool provides the resources, tutorials, and community to
              help you succeed.
            </p>
            <p className="text-lg mb-8 leading-relaxed text-gray-300">
              Join a community of creators, collaborate with like-minded
              individuals, and bring your ideas to life. Explore new
              opportunities, gain valuable insights, and transform your indie
              hacking journey with IndieSkool.
            </p>
            <button
              onClick={handleLogin}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              Login to Get Started
            </button>
          </section>

          <footer className="mt-12 text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} IndieSkool. All Rights Reserved.
          </footer>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
