import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Stack } from "expo-router";
import { useColorScheme } from "@/components/useColorScheme";
import i18n from "@/languages/i18n";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabVerificationLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="verify-account" options={{ headerShown: false }} />
      <Stack.Screen
        name="update-password"
        options={{
          headerShown: true,
          headerTitle: i18n.t("update_password_title"),
        }}
      />
      <Stack.Screen
        name="about-you"
        options={{
          headerShown: true,
          headerTitle: i18n.t("tell_us_about_you"),
        }}
      />
      <Stack.Screen
        name="last-step"
        options={{
          headerShown: true,
          headerTitle: i18n.t("last_step"),
        }}
      />
    </Stack>
  );
}
