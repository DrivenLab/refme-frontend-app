import React from "react";
import { Stack } from "expo-router/stack";

export default function TabLayout() {
  return (
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
  );
}
