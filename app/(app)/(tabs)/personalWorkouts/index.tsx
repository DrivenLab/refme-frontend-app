import React from "react";
import {
  Icon,
  SafeAreaView,
  Text,
  VStack,
  SettingsIcon,
} from "@gluestack-ui/themed";

import { Image } from "expo-image";

import { SafeAreaViewStyle } from "@/utils/Styles";

const PersonalWorkouts = () => {
  return (
    <SafeAreaView bg="$white" style={SafeAreaViewStyle.s}>
      <Image
        source={require("@/assets/images/workout_list.png")}
        style={{ height: 130, width: "100%" }}
      />
      <VStack
        px={"$3"}
        // space="xl"
        borderTopLeftRadius={30}
        borderTopRightRadius={30}
        position="relative"
        top={-20}
        bg="$white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        h={"90%"}
      >
        <Text fontSize="$lg" bold marginBottom={10} color="$secondary">
          Coming soon!
        </Text>
        <Icon as={SettingsIcon} w="$12" h="$12" />
      </VStack>
    </SafeAreaView>
  );
};

export default PersonalWorkouts;
