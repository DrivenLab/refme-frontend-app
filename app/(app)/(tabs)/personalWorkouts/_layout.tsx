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
      <Stack.Screen
        name="[ability]"
        getId={({ params }) => String(Date.now())}
        options={{
          headerTitle: "Nombre de la Habilidad",
        }}
      />
      <Stack.Screen name="config" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
