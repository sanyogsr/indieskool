import { create } from "zustand";
import axios from "axios";

interface UserState {
  user: any;
  setUser: (user: any) => void;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    try {
      const res = await axios.get("/api/user", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data;
      set({ user: data.user });
    } catch (error) {
      console.error("failed to  fetch user date", error);
    }
  },
}));
