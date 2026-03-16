import Ionicons from "@expo/vector-icons/Ionicons";
import { Models } from "react-native-appwrite";

export type CreateUserParams = {
  name: string;
  email: string;
  password: string;
};

export type AuthParams = {
  email: string;
  password: string;
};

export type User = {
  userId: string;
  name: string;
  email: string;
  avatar: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
  signout: () => void;
  setLoading: (loading: boolean) => void;
  fetchAuthenticatedUser: () => Promise<void>;
};

export type CartState = {
  items: CartItemType[];
  addToCart: (item: CartItemType) => void;
  removeFromCart: (id: string) => void;
};

export interface CartItemType {
  $id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

type OrderStatus = "confirmed" | "preparing" | "on_the_way" | "delivered";

interface OrderStore {
  status: OrderStatus;
  estimatedMinutes: number;
  setStatus: (status: OrderStatus) => void;
}

export type TabBarIconProps = {
  focused: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
};

export type GetMenuParams = {
  category: string;
  query: string;
};

export interface Menu extends Models.Document {
  $id: string;
  name: string;
  description: string;
  image_url: string;
  rating: number;
  calories: number;
  protein: number;
  price: number;
  categories: Cateogries[];
}

export interface Categories extends Models.Document {
  name: string;
  description: string;
}
