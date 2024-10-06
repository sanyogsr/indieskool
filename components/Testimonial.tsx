"use client";
import Image from "next/image";
import { FaTwitter, FaLinkedin } from "react-icons/fa";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  photo: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
  };
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  role,
  photo,
  socialLinks,
}) => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
    <div className="p-6 flex flex-col items-center">
      <img
        src={photo}
        alt={name}
        className="w-10 h-10 rounded-full mb-4 object-cover"
      />
      <blockquote className="text-lg font-medium leading-relaxed mb-4 text-center text-gray-700">
        &quot;{quote}&quot;
      </blockquote>
      <div className="mt-4 flex flex-col items-center">
        <div className="font-semibold text-gray-800">{name}</div>
        <div className="text-sm text-gray-600">{role}</div>
      </div>
      {socialLinks && (
        <div className="mt-4 flex space-x-4">
          {socialLinks.twitter && (
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTwitter size={20} />
            </a>
          )}
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
          )}
        </div>
      )}
    </div>
  </div>
);

export default function Testimonial() {
  const testimonials = [
    {
      quote:
        "The video tutorials on this platform were invaluable in helping me learn the fundamentals of game development. I was able to create my first indie game in just a few months!",
      name: "Emily Nguyen",
      role: "Indie Game Developer",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      socialLinks: {
        twitter: "https://twitter.com/emilynguyen",
        linkedin: "https://linkedin.com/in/emilynguyen",
      },
    },
    {
      quote:
        "The coding challenges on this platform really pushed me to improve my skills. The community forums were also a great resource for getting feedback and advice.",
      name: "Liam Fitzgerald",
      role: "Solopreneur",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      socialLinks: {
        twitter: "https://twitter.com/liamfitz",
        linkedin: "https://linkedin.com/in/liamfitzgerald",
      },
    },
  ];

  return (
    <div className="py-6 ">
      <h2 className="text-3xl text-white font-bold text-center mb-12">
        Testimonials{" "}
      </h2>
      <div className="grid md:grid-cols-2  gap-8 max-w-xs md:max-w-2xl mx-3">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
}
