import { Card, CardContent } from "./ui/card";
import { FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

interface SocialLinks {
  twitter?: string;
  linkedin?: string;
}
interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  photo: string;
  socialLinks?: SocialLinks;
  videoReview?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  role,
  photo,
  socialLinks,
  videoReview,
}) => (
  <Card className="bg-gradient-to-br from-[#212121] to-[#2c2c2c] border-[#ffd700] border-2 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl min-w-[300px] max-w-[400px]">
    <CardContent className="text-[#ffd700] p-6 flex flex-col items-center">
      {photo && (
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-[#ffd700]">
          <img src={photo} alt={name} className="w-full h-full object-cover" />
        </div>
      )}
      <blockquote className="text-lg font-semibold leading-snug mb-4 text-center">
        &quot;{quote}&quot;
      </blockquote>
      <div className="mt-4 flex flex-col items-center">
        <div className="font-bold text-xl">{name}</div>
        <div className="text-sm text-[#ffd700]/80">{role}</div>
      </div>
      {socialLinks && (
        <div className="mt-4 flex space-x-4">
          {socialLinks.twitter && (
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ffd700] hover:text-white transition-colors"
            >
              <FaTwitter size={24} />
            </a>
          )}
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ffd700] hover:text-white transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
          )}
        </div>
      )}
      {videoReview && (
        <div className="mt-6 w-full">
          <a
            href={videoReview}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-[#212121] rounded-lg hover:bg-[#ffd700]/80 transition-colors"
          >
            <FaYoutube size={24} className="mr-2" />
            Watch Video Review
          </a>
        </div>
      )}
    </CardContent>
  </Card>
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
        twitter: "https://twitter.com/sanyogsr",
        linkedin: "https://linkedin.com/in/emilynguyen",
      },
      videoReview: "https://youtube.com/watch?v=example1",
    },
    {
      quote:
        "The video tutorials on this platform were invaluable in helping me learn the fundamentals of game development. I was able to create my first indie game in just a few months!",
      name: "Emily Nguyen",
      role: "Indie Game Developer",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      socialLinks: {
        twitter: "https://twitter.com/sanyogsr",
        linkedin: "https://linkedin.com/in/emilynguyen",
      },
      videoReview: "https://youtube.com/watch?v=example1",
    },
    {
      quote:
        "The coding challenges on this platform really pushed me to improve my skills. The community forums were also a great resource for getting feedback and advice.",
      name: "Liam Fitzgerald",
      role: "Solopreneur",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      socialLinks: {
        twitter: "https://twitter.com/sanyogsr",
        linkedin: "https://linkedin.com/in/liamfitzgerald",
      },
      videoReview: "https://youtube.com/watch?v=example2",
    },
    // Add more testimonials here to see the horizontal scroll effect
  ];

  return (
    <div className="px-4 md:px-6 py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-gradient-to-r from-[#ffd700] to-[#ff8c00] px-3 py-1 text-sm text-[#212121] font-semibold">
            Testimonials
          </div>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#ffd700] to-[#ff8c00]">
            Wall of Fame
          </h2>
          <p className="max-w-[900px] lg:max-w-5xl text-[#ffffff] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Take a look at how our platform has helped builders in their{" "}
            <span className="font-bold text-black bg-gradient-to-r from-[#ffd700] to-[#ff8c00] p-1 rounded-lg">
              Indie Hacking
            </span>{" "}
            journey.
          </p>
        </div>
      </div>
      <div className="overflow-x-auto pb-4 flex">
        <div className="flex lg:grid lg:grid-cols-3 gap-8 py-12 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}
