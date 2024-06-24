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
        name="resistanceTraining"
        options={{
          headerTitle: "Resistencia",
        }}
      />
      <Stack.Screen
        name="agilityTraining"
        options={{
          headerTitle: "Agilidad y Cambio de dirección",
        }}
      />
      <Stack.Screen
        name="velocityTraining"
        options={{
          headerTitle: "Velocidad - RSA",
        }}
      />
    </Stack>
  );
};

export default _layout;
