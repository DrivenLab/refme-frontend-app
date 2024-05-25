import { View, Text } from "react-native";
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
        name="startWorkout"
        options={{ headerShown: false, headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="createWorkout"
        options={{ headerShown: false, headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="assignReferee"
        options={{ headerShown: false, href: null }}
      />
    </Stack>
  );
};

export default _layout;
