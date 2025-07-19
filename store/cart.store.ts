import { CartState } from "@/type";
import { create } from "zustand";

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (item) => {
    set((state) => {
      const existingItem = state.items.find(
        (existingItem) => existingItem.name === item.name
      );
      if (!existingItem) {
        return { items: [...state.items, item] };
      } else {
        return {
          items: state.items.map((existingItem) =>
            existingItem.name === item.name
              ? { ...existingItem, quantity: existingItem.quantity + 1 }
              : existingItem
          ),
        };
      }
    });
  },
  removeFromCart: (id) => {
    set((state) => {
      const removingItem = state.items.find((item) => item.$id === id);
      if (removingItem?.quantity === 1) {
        return {
          items: state.items.filter((item) => item.$id !== id),
        };
      } else {
        return {
          items: state.items.map((removingItem) => {
            if (removingItem.$id === id) {
              return { ...removingItem, quantity: removingItem?.quantity - 1 };
            }
          }),
        };
      }
    });
  },
}));
