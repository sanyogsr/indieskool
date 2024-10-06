"use client";
import { PlusIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

interface DeveloperCardProps {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

const mockDevelopers = Array(100)
  .fill(1, 0, 20)
  .map((_, i) => ({
    id: i + 1,
    name: `Developer ${i + 1}`,
    role: [
      "SaaS Founder",
      "Product Designer",
      "Growth Hacker",
      "Full-Stack Dev",
    ][i % 4],
    avatar: `/api/placeholder/${30}/${30}`,
  }));

// Custom Avatar component
function Avatar({
  src,
  alt,
  fallback,
}: {
  src: string;
  alt: string;
  fallback: string;
}) {
  return (
    <div className="h-8 w-8 md:h-10 md:w-10 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center text-white">
      {src ? (
        <Image
          src={src}
          alt={alt}
          height={25}
          width={25}
          className="h-full w-full object-cover"
        />
      ) : (
        fallback
      )}
    </div>
  );
}

// Custom Button component
function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center text-xs md:text-sm text-yellow-400 hover:bg-yellow-400 bg-[#212121] hover:text-gray-900 px-2 md:px-3 py-1 md:py-2 rounded transition-colors"
    >
      {children}
    </button>
  );
}

// DeveloperCard component using custom Button and Avatar
function DeveloperCard({ name, role, avatar }: DeveloperCardProps) {
  const fallbackText = name
    .split(" ")
    .map((n) => n[0])
    .join(""); // Generate initials for avatar fallback

  return (
    <div className="bg-gray-100 text-black rounded-lg p-2 md:p-4 cursor-pointer hover:bg-gray-300 transition-colors shadow-md h-auto md:h-[auto]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 md:space-x-3">
          <Avatar src={avatar} alt={name} fallback={fallbackText} />
          <div>
            <div className="font-medium text-sm md:text-base text-black">
              {name}
            </div>
            <div className="text-xs md:text-sm text-black">{role}</div>
          </div>
        </div>
        <Button>
          <PlusIcon className="h-3 w-3 md:h-4 md:w-4 mr-1" />
          Follow
        </Button>
      </div>
    </div>
  );
}

export default function Indiecard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [developers, setDevelopers] = useState(mockDevelopers);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = mockDevelopers.filter(
      (dev) =>
        dev.name.toLowerCase().includes(term) ||
        dev.role.toLowerCase().includes(term)
    );
    setDevelopers(filtered);
  };

  return (
    <div className="">
      {/* Search Input */}
      <div className="flex mb-4 md:mb-6">
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search Indie hacker..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 h-[35px] md:h-[40px] py-1 rounded-lg bg-white border border-gray-300 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50 transition-all"
          />
        </div>
      </div>

      {/* Developer Cards */}
      <div className="p-3 md:p-5 bg-[#212121] rounded-xl">
        <div className="h-[400px] md:h-[500px] overflow-y-auto pr-2 space-y-2">
          {developers.map((dev) => (
            <DeveloperCard
              key={dev.id}
              id={dev.id}
              name={dev.name}
              role={dev.role}
              avatar={dev.avatar}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
