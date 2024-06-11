import React from "react";
import { Stack } from "expo-router";
import { useKeepAwake } from "expo-keep-awake";
import { WhistleProvider } from "@/hooks/useWhistle";

const _layout = () => {
  useKeepAwake();
  return (
    <WhistleProvider>
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
    </WhistleProvider>
  );
};

export default _layout;
