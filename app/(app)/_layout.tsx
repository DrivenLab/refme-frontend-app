import React from "react";
import { Stack } from "expo-router/stack";
import { useColorScheme } from "@/components/useColorScheme";
import { DMProvider } from "@/context/DmContext";
import { MemoryProvider } from "@/context/MemoryContext";
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>["name"];
//   color: string;
// }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

export default function TabLayout() {
  return (
    <MemoryProvider>
      <DMProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false, headerBackTitleVisible: false }}
          />
          <Stack.Screen
            name="(verification)"
            options={{ headerShown: false, headerBackTitleVisible: false }}
          />

          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </DMProvider>
    </MemoryProvider>
  );
}
