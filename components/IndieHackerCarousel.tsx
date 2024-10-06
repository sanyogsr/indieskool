import Image from "next/image";
import React from "react";

interface Profile {
  id: number;
  name: string;
  avatar: string;
}

const profiles: Profile[] = [
  { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/100?img=1" },
  { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/100?img=2" },
  { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/100?img=3" },
  { id: 4, name: "David", avatar: "https://i.pravatar.cc/100?img=4" },
  { id: 5, name: "Eve", avatar: "https://i.pravatar.cc/100?img=5" },
  { id: 6, name: "Frank", avatar: "https://i.pravatar.cc/100?img=6" },
  { id: 7, name: "Grace", avatar: "https://i.pravatar.cc/100?img=7" },
  { id: 8, name: "Henry", avatar: "https://i.pravatar.cc/100?img=8" },
];

const ScrollingProfileCarousel: React.FC = () => {
  return (
    <div className="w-full py-8 overflow-hidden ">
      <div className="max-w-7xl profile-carousel-container">
        <div className="profile-carousel">
          {[...profiles, ...profiles, ...profiles].map((profile, index) => (
            <div key={`${profile.id}-${index}`} className="profile-item">
              <Image
                src={profile.avatar}
                alt={profile.name}
                className="w-16 h-16 rounded-full border-2 border-white mx-auto"
              />
              <p className="text-sm mt-2 text-white text-center">
                {profile.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingProfileCarousel;
