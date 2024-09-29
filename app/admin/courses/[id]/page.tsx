// "use client"; // Marking the component as a Client Component

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation"; // Import from next/navigation
// import { useTutorialStore } from "@/store/tutorialStore";
// import Loading from "@/components/Loading";

// interface TutorialDetailProps {
//   params: {
//     id: number; // Define the expected parameter type as a number
//   };
// }

// const TutorialDetail = ({ params }: TutorialDetailProps) => {
//   const { id } = params; // Accessing the id directly from props
//   const { singleTutorial, fetchTutorialById } = useTutorialStore();
//   const [tutorial, setTutorial] = useState<any>(null);

//   useEffect(() => {
//     if (id) {
//       // Check if singleTutorial is defined and an array
//       if (Array.isArray(singleTutorial)) {
//         // Find the tutorial by id in the store
//         const foundTutorial = singleTutorial.find((tut: any) => tut.id === id);
//         if (foundTutorial) {
//           setTutorial(foundTutorial);
//         } else {
//           // Fetch from the backend if needed
//           fetchTutorialById(id).then((fetchedTutorialById: any) => {
//             setTutorial(fetchedTutorialById);
//           });
//         }
//       } else {
//         // Handle the case where singleTutorial is not an array
//         console.error("singleTutorial is not an array", singleTutorial);
//       }
//     }
//   }, [id, singleTutorial]);

//   if (!tutorial) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Loading />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-6 bg-[#212121]">
//       <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold text-white mb-4">{tutorial.title}</h1>
//         <p className="text-white mb-6">{tutorial.description}</p>
//         <div className="aspect-w-16 aspect-h-9">
//           <iframe
//             className="w-full h-full"
//             src={tutorial.videoUrl}
//             title={tutorial.title}
//             allowFullScreen
//           ></iframe>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TutorialDetail;
"use client"; // Marking the component as a Client Component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation
import { useTutorialStore } from "@/store/tutorialStore";
import Loading from "@/components/Loading";

interface Link {
  id: number;
  title: string;
  url: string;
}

interface Tutorial {
  id: number;
  title: string;
  videoUrl: string;
  description: string;
  links: Link[];
}

interface TutorialDetailProps {
  params: {
    id: number;
  };
}

const TutorialDetail = ({ params }: TutorialDetailProps) => {
  const router = useRouter();
  const { id } = params; // Accessing the id directly from props
  const { singleTutorial, fetchTutorialById } = useTutorialStore();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);

  useEffect(() => {
    if (id) {
      // Check if singleTutorial is defined and an array
      if (Array.isArray(singleTutorial)) {
        // Find the tutorial by id in the store
        const foundTutorial = singleTutorial.find((tut) => tut.id === id);
        if (foundTutorial) {
          setTutorial(foundTutorial);
        } else {
          // Fetch from the backend if needed
          fetchTutorialById(id).then((fetchedTutorialById) => {
            setTutorial(fetchedTutorialById);
          });
        }
      } else {
        // Handle the case where singleTutorial is not an array
        console.error("singleTutorial is not an array", singleTutorial);
      }
    }
  }, [id, singleTutorial]);

  if (!tutorial) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 sm:ml-64 bg-[#212121]">
      <div className="max-w-7xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        {/* Video Section */}
        <div className="aspect-w-16 aspect-h-9 mb-6">
          <iframe
            className="min-h-screen min-w-full rounded-lg border border-gray-700"
            src={tutorial.videoUrl}
            title={tutorial.title}
            allowFullScreen
          ></iframe>
        </div>

        {/* Title and Description Section */}
        <h1 className="text-3xl font-bold text-white mb-2">{tutorial.title}</h1>
        <p className="text-gray-300 mb-6">{tutorial.description}</p>

        {/* Links Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-white mb-2">
            Useful Links
          </h2>
          <ul className="list-disc list-inside text-gray-300">
            {tutorial.links &&
              tutorial.links.map((link) => (
                <li key={link.id} className="mb-1">
                  <a
                    href={link.url}
                    className="text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TutorialDetail;
