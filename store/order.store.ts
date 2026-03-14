import { OrderStore } from "@/type";
import { create } from "zustand";

export const useOrderStore = create<OrderStore>((set) => ({
  status: "confirmed",
  estimatedMinutes: 25,
  setStatus: (status) => set({ status }),
}));
