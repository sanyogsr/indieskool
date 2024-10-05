
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
