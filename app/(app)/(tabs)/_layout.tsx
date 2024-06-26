import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import HomeIconTab from "@/components/HomeIconTab";
import ProfileTabBarIcon from "@/components/ProfileTabBarIcon";
import StatsTabBarIcon from "@/components/StatsTabBarIcon";
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>["name"];
//   color: string;
// }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,

        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        //headerShown: false,
        tabBarStyle: {
          borderRadius: 20,
        },
      }}
    >
      <Tabs.Screen
        name="statistics"
        options={{
          title: "Estadisticas",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <StatsTabBarIcon color={color} isFocused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIconTab />,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <ProfileTabBarIcon color={color} isFocused={focused} />
          ),
          //   headerRight: () => (
          //     <Link href="/profile/modal" asChild>
          //       <Pressable>
          //         {({ pressed }) => (
          //           <FontAwesome
          //             name="info-circle"
          //             size={25}
          //             color={Colors[colorScheme ?? "light"].text}
          //             style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //           />
          //         )}
          //       </Pressable>
          //     </Link>
          //   ),
        }}
      />
      {/**TABS HIDDEN */}
      <Tabs.Screen
        name="workouts"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="personalWorkouts"
        options={{ headerShown: false, href: null }}
      />
    </Tabs>
  );
}
