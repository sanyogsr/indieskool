"use client";
import Link from "next/link";

export default function HeroSection({
  scrollToDemo,
}: {
  scrollToDemo: () => void;
}) {
  // Custom Button component
  const Button = ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={`py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="px-4 md:px-6 flex justify-center items-center to-black">
      <div className="flex flex-col justify-center items-center text-center space-y-8 max-w-4xl mx-auto">
        {/* Title Section */}
        <h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 animate-text">
          Learn to Build{" "}
          <span className="inline-block bg-gray-800 text-white px-3 py-1 mx-2 my-1 rounded-lg border border-yellow-500 shadow-lg">
            SaaS
          </span>{" "}
          from Your Favorite{" "}
          <span className="inline-block bg-white text-gray-800 px-3 py-1 mx-2 my-1 rounded-lg border border-gray-400 shadow-lg">
            Indie Hacker
          </span>
        </h1>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
          <Link href={"/login"}>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold border border-yellow-500">
              Start Learning Now
            </Button>
          </Link>
          <Button
            onClick={scrollToDemo} // Call the scroll function
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold border border-gray-600"
          >
            Watch Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
