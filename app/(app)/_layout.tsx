import React from "react";
import { Stack } from "expo-router/stack";
import { DMProvider } from "@/context/DmContext";
import { MemoryProvider } from "@/context/MemoryContext";
import { DMAndMemProvider } from "@/context/DmAndMemoryContext";
import { RecognitionProvider } from "@/context/RecognitionContext";
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
        <RecognitionProvider>
          <DMAndMemProvider>
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false, headerBackTitleVisible: false }}
              />
              <Stack.Screen
                name="(verification)"
                options={{ headerShown: false, headerBackTitleVisible: false }}
              />

              {/* <Stack.Screen name="modal" options={{ presentation: "modal" }} /> */}
            </Stack>
          </DMAndMemProvider>
        </RecognitionProvider>
      </DMProvider>
    </MemoryProvider>
  );
}
