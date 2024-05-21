import { Box, Divider, Text, VStack } from "@gluestack-ui/themed";
import React from "react";
import { DM_ANSWER1, DM_ANSWER2 } from "@/constants/Session";
import DecisionMakingOption from "./DecisionMakingOption";
import i18n from "@/languages/i18n";
const DecisionMakingAnswer = () => {
  return (
    <Box flex={1} bg="$white" px={"$4"} py="$5" justifyContent="center">
      <VStack
        width={"100%"}
        flexDirection="row"
        space="md"
        justifyContent="space-between"
      >
        {Object.entries(DM_ANSWER1).map(([key, value]) => (
          <DecisionMakingOption key={key}>
            <Text color="black" textAlign="center">
              {i18n.t(key)}
            </Text>
          </DecisionMakingOption>
        ))}
      </VStack>
      <Divider my="$5" bg="$black" />
      <VStack
        width={"100%"}
        flexDirection="row"
        space="md"
        justifyContent="space-between"
      >
        {Object.entries(DM_ANSWER2).map(([key, value]) => (
          <DecisionMakingOption key={key}>
            <Text color="black" textAlign="center">
              {i18n.t(key)}
            </Text>
          </DecisionMakingOption>
        ))}
      </VStack>
    </Box>
  );
};

export default DecisionMakingAnswer;
