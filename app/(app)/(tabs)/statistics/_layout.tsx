import { useEffect, useState } from "react";
import { Box } from "@gluestack-ui/themed";
import { Stack, useNavigation, usePathname } from "expo-router";

import { CTabScroll } from "@/components/CTabScroll";

export default function Layout() {
  const navigation = useNavigation<any>();
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState<string>("personal");

  useEffect(() => {
    if (pathname.startsWith("/statistics")) {
      // async change tab
      setTimeout(() => {
        navigation.navigate(currentTab);
      }, 1);
    }
  }, [currentTab]);

  return (
    <>
      <Box bg="white">
        <CTabScroll
          currentTab={currentTab}
          tabs={[
            // { label: "Personales", value: "personal" },
            // { label: "Ranking", value: "ranking" },
            { label: "Ejercicios oficiales", value: "official" },
            // { label: "Tests oficiales", value: "tests" },
          ]}
          changeCurrentTab={function (tab: string): void {
            setCurrentTab(tab);
          }}
        />
      </Box>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "simple_push",
        }}
      >
        <Stack.Screen name="personal" />
      </Stack>
    </>
  );
}
