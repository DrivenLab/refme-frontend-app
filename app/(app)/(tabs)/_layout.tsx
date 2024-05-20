import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Path, Svg } from "react-native-svg";
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const StatsIcon = () => {
  return (
    <Svg
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
      //   xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M7.02697 9.20703V16.0672"
        stroke="#090B22"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M11.694 5.92188V16.0646"
        stroke="#090B22"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16.2843 12.832V16.067"
        stroke="#090B22"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.3415 1.00391H6.97005C3.70338 1.00391 1.65576 3.31599 1.65576 6.58906V15.4187C1.65576 18.6918 3.69386 21.0039 6.97005 21.0039H16.3415C19.6177 21.0039 21.6558 18.6918 21.6558 15.4187V6.58906C21.6558 3.31599 19.6177 1.00391 16.3415 1.00391Z"
        stroke="#090B22"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const ProfileIcon = () => {
  return (
    <Svg
      width={28}
      height={28}
      viewBox="0 0 18 22"
      fill="none"
      // xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M8.99951 12.337C12.3527 12.337 15.0435 9.64637 15.0435 6.29496H13.5435C13.5435 8.81761 11.5246 10.837 8.99951 10.837V12.337ZM2.95553 6.29496C2.95553 9.64646 5.64745 12.337 8.99951 12.337V10.837C6.47537 10.837 4.45553 8.81752 4.45553 6.29496H2.95553ZM8.99951 0.253906C5.64764 0.253906 2.95553 2.94327 2.95553 6.29496H4.45553C4.45553 3.77259 6.47518 1.75391 8.99951 1.75391V0.253906ZM15.0435 6.29496C15.0435 2.94337 12.3525 0.253906 8.99951 0.253906V1.75391C11.5248 1.75391 13.5435 3.77249 13.5435 6.29496H15.0435ZM0.249512 17.5789C0.249512 18.4461 0.548448 19.1811 1.08661 19.7683C1.60929 20.3386 2.32579 20.7362 3.12254 21.0184C4.70603 21.5791 6.81247 21.7539 8.99951 21.7539V20.2539C6.84893 20.2539 4.95537 20.0762 3.62327 19.6044C2.96221 19.3703 2.49202 19.0817 2.19246 18.7548C1.90837 18.4448 1.74951 18.0717 1.74951 17.5789H0.249512ZM8.99951 13.4278C6.82532 13.4278 4.7197 13.5962 3.13424 14.1499C2.33663 14.4285 1.61748 14.8224 1.0922 15.3902C0.550939 15.9754 0.249512 16.71 0.249512 17.5789H1.74951C1.74951 17.0872 1.90876 16.7165 2.19334 16.4088C2.4939 16.0839 2.96576 15.7976 3.62882 15.566C4.9647 15.0995 6.85909 14.9278 8.99951 14.9278V13.4278ZM17.7495 17.6029C17.7495 16.7357 17.4507 16.0008 16.9126 15.4135C16.39 14.8432 15.6736 14.4455 14.8769 14.1634C13.2935 13.6026 11.187 13.4278 8.99951 13.4278V14.9278C11.1506 14.9278 13.0442 15.1056 14.3761 15.5773C15.0371 15.8114 15.5072 16.1 15.8067 16.4269C16.0907 16.7368 16.2495 17.11 16.2495 17.6029H17.7495ZM8.99951 21.7539C11.1737 21.7539 13.2793 21.5855 14.8648 21.0318C15.6624 20.7533 16.3815 20.3594 16.9068 19.7915C17.4481 19.2064 17.7495 18.4718 17.7495 17.6029H16.2495C16.2495 18.0945 16.0903 18.4653 15.8057 18.7729C15.5051 19.0979 15.0333 19.3841 14.3702 19.6157C13.0343 20.0823 11.1399 20.2539 8.99951 20.2539V21.7539Z"
        fill="black"
      />
    </Svg>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,

        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        //headerShown: false,
      }}
    >
      <Tabs.Screen
        name="statistics"
        options={{
          title: "Estadisticas",
          tabBarIcon: ({ color }) => <StatsIcon />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <ProfileIcon />,
        }}
      />
      {/**TABS HIDDEN */}
      <Tabs.Screen
        name="workouts"
        options={{ headerShown: false, href: null }}
      />
    </Tabs>
  );
}
