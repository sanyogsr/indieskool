// import { create } from "zustand";
// import axios from "axios";

// interface TutorialState {
//   tutorials: any;
//   setTutorial: (tutorials: any) => void;
//   fetchTutorials: () => Promise<void>;

//   singleTutorial: any; // Store a single tutorial
//   setSingleTutorial: (tutorial: any) => void; // To set a single tutorial
//   fetchTutorialById: (id: number) => Promise<void>; // Fetch tutorial by ID
// }

// export const useTutorialStore = create<TutorialState>((set) => ({
//   tutorials: null,
//   singleTutorial: null,
//   setTutorial: (tutorials) => set({ tutorials }),
//   fetchTutorials: async () => {
//     try {
//       const res = await axios.get("/api/video/get-tutorial", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const data = res.data;
//       console.log(data);
//       set({ tutorials: data });
//     } catch (error) {
//       console.error("failed to  fetch tutorials", error);
//     }
//   },
//   setSingleTutorial: (tutorial) => set({ singleTutorial: tutorial }),

//   fetchTutorialById: async (id: number) => {
//     try {
//       const res = await axios.get(`/api/video/get-tutorial/${id}`, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const data = res.data;
//       console.log("Single tutorial by ID:", data);
//       set({ singleTutorial: data });
//     } catch (error) {
//       console.error(`Failed to fetch tutorial with id ${id}`, error);
//     }
//   },
// }));
import { create } from "zustand";
import axios from "axios";

interface TutorialState {
  tutorials: any[];
  singleTutorial: any[]; // Add this if not already in your store
  setTutorial: (tutorials: any) => void;
  fetchTutorials: () => Promise<void>;
  fetchTutorialById: (id: number) => Promise<any>; // Add this method
}

export const useTutorialStore = create<TutorialState>((set) => ({
  tutorials: [],
  singleTutorial: [], // Initialize as an empty array
  setTutorial: (tutorials) => set({ tutorials }),
  fetchTutorials: async () => {
    try {
      const res = await axios.get("/api/video/get-tutorial");
      const data = res.data;
      set({ tutorials: data, singleTutorial: data }); // Assuming both are the same for now
    } catch (error) {
      console.error("Failed to fetch tutorials", error);
    }
  },
  fetchTutorialById: async (id) => {
    try {
      const res = await axios.get(`/api/video/get-tutorial/${id}`);
      return res.data; // Return the fetched tutorial
    } catch (error) {
      console.error("Failed to fetch tutorial by ID", error);
      return null; // Return null on error
    }
  },
}));
