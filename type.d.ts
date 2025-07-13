import Ionicons from "@expo/vector-icons/IonIcons";

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
  setLoading: (loading: boolean) => void;
  fetchAuthenticatedUser: () => Promise<void>;
};

export type TabBarIconProps = {
  focused: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
};
