import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />
      <Stack.Screen name="startWorkoutDM" />
      <Stack.Screen name="startWorkoutDMAndMem" />
      <Stack.Screen name="startWorkoutMemory" />
      <Stack.Screen name="startWorkoutRecognition" />
      <Stack.Screen name="createWorkout" />
      <Stack.Screen name="assignReferee" />
    </Stack>
  );
};

export default _layout;
