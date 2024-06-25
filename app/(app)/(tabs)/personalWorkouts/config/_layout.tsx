import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[params]"
        options={{
          headerTitle: "Configuración",
        }}
      />
    </Stack>
  );
};

export default _layout;
