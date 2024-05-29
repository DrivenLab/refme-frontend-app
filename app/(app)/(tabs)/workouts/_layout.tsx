import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerBackTitleVisible: false, headerShown: false }}
      />
      <Stack.Screen
        name="[id]"
        options={{ headerBackTitleVisible: false, headerShown: false }}
      />
      <Stack.Screen
        name="startWorkoutDM"
        options={{ headerShown: false, headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="startWorkoutMemory"
        options={{ headerShown: false, headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="createWorkout"
        options={{ headerShown: false, headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="assignReferee"
        options={{ headerShown: false, headerBackTitleVisible: false }}
      />
    </Stack>
  );
};

export default _layout;
