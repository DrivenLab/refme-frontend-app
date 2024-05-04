import React, { useState } from "react";
import WorkoutList from "@/components/workouts/WorkoutList";
import {
  Box,
  Button,
  ButtonIcon,
  Pressable,
  SafeAreaView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import CTab from "@/components/CTab";
import i18n from "@/languages/i18n";
import { Image } from "expo-image";
import { AddIcon } from "@gluestack-ui/themed";
const Workouts = () => {
  const [tab, setTab] = useState("pending");
  return (
    <SafeAreaView bg="$white" flex={1}>
      <Image
        source={require("@/assets/images/workout_list.png")}
        style={{ height: 130, width: "100%" }}
      />
      <VStack
        px={"$3"}
        space="lg"
        borderTopLeftRadius={30}
        borderTopRightRadius={30}
        position="relative"
        top={-20}
        bg="$white"
      >
        <Box flexDirection="row" justifyContent="center" bg="$red">
          <Button
            maxWidth={50}
            rounded="$full"
            height={50}
            bg="$primary50"
            borderColor="indigo600"
            position="absolute"
            top={-20}
          >
            {/* EditIcon is imported from 'lucide-react-native' */}
            <ButtonIcon color="black" as={AddIcon} />
          </Button>
        </Box>
        <CTab
          currentTab={tab}
          changeCurrentTab={(tab_: string) => setTab(tab_)}
          tabs={[
            { label: i18n.t("workout_pending"), value: "pending" },
            { label: i18n.t("workout_finished"), value: "finished" },
          ]}
        />

        <WorkoutList />
      </VStack>
    </SafeAreaView>
  );
};

export default Workouts;
