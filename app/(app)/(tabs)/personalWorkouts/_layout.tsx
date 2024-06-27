import React from "react";
import { Stack } from "expo-router";
import i18n from "@/languages/i18n";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: i18n.t(
            "personal_workout_flow.personal_workout_header_title"
          ),
        }}
      />
      <Stack.Screen
        name="[ability]"
        getId={({ params }) => String(Date.now())}
      />
      <Stack.Screen
        name="config"
        options={{ headerTitle: i18n.t("common.configuration") }}
      />
    </Stack>
  );
};

export default _layout;
