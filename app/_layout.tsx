import useAuthStore from "@/store/auth.store";
import * as Sentry from "@sentry/react-native";
import { Stack } from "expo-router";
import { useEffect } from "react";
import "./globals.css";

Sentry.init({
  dsn: "https://648a8c36f3b683ec7f862cae291d736b@o4509375743721472.ingest.de.sentry.io/4509655395467344",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  const { isLoading, fetchAuthenticatedUser } = useAuthStore();

  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  if (isLoading) return null;
  return <Stack screenOptions={{ headerShown: false }} />;
});
