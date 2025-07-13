import { getCurrentUser } from "@/libs/appwrite";
import { AuthState } from "@/type";
import { create } from "zustand";

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setUser: (user) => set({ user }),
  setLoading: (value) => {
    {
      isLoading: value;
    }
  },
  fetchAuthenticatedUser: async () => {
    set({ isLoading: true });
    try {
      const user = await getCurrentUser();
      if (user) {
        set({ isAuthenticated: true, user: user });
      }
    } catch (error) {
      set({ isAuthenticated: false });
      throw new Error(error as string);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
