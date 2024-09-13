import { SessionProvider } from "@/src/providers/SessionPrvoider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 300000, // 5 minutes
        retry: 2,
        refetchOnWindowFocus: true,
      },
    },
  });

  const [loaded] = useFonts({
    InterRegular: require("@/assets/fonts/Inter-Regular.ttf"),
    InterMedium: require("@/assets/fonts/Inter-Medium.ttf"),
    InterSemiBold: require("@/assets/fonts/Inter-SemiBold.ttf"),
    InterBold: require("@/assets/fonts/Inter-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={client}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </QueryClientProvider>
  );
}
