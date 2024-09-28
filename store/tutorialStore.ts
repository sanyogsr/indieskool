import { create } from "zustand";
import axios from "axios";

interface TutorialState {
  tutorials: any;
  setTutorial: (tutorials: any) => void;
  fetchTutorials: () => Promise<void>;
}

export const useTutorialStore = create<TutorialState>((set) => ({
  tutorials: null,
  setTutorial: (tutorials) => set({ tutorials }),
  fetchTutorials: async () => {
    try {
      const res = await axios.get("/api/video/get-tutorial", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data;
      console.log(data);
      set({ tutorials: data });
    } catch (error) {
      console.error("failed to  fetch tutorials", error);
    }
  },
}));
