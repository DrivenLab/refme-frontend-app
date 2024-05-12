import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { GluestackUIProvider, StyledProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"; // Optional if you want to use default theme
import { customConfig } from "@/theme/config";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "@/components/useColorScheme";
import { onlineManager, QueryClient } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { AuthProvider } from "@/context/auth";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    PlusJakartaSans: require("../assets/fonts/PlusJakartaSans-VariableFont_wght.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  if (!loaded) {
    return null;
  }
  return <RootLayoutNav />;
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours,
      retry: 1,
    },
  },
});
const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  //throttleTime: 1000 * 60 * 60 * 24, // 24 hours,
});
function RootLayoutNav() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    return NetInfo.addEventListener((state) => {
      const status = !!state.isConnected;
      onlineManager.setOnline(status);
    });
  }, []);
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        //maxAge: 1000 * 60 * 60 * 24, // 24 hours
      }}
      onSuccess={() =>
        queryClient
          .resumePausedMutations()
          .then(() => queryClient.invalidateQueries())
      }
    >
      <GluestackUIProvider config={customConfig}>
        <AuthProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Slot />
          </ThemeProvider>
        </AuthProvider>
      </GluestackUIProvider>
    </PersistQueryClientProvider>
  );
}
