import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Entrenamiento Personal",
        }}
      />
    </Stack>
  );
};

export default _layout;
