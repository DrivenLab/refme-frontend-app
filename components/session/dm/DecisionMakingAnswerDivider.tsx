import { Box, Divider } from "@gluestack-ui/themed";
import React from "react";

export const DecisionMakingAnswerDivider = () => {
  return (
    <Divider
      my="$5"
      height={2}
      bg="$black"
      justifyContent="center"
      alignItems="center"
    >
      <Box width={8} aspectRatio={1} borderRadius="$full" bg="black" />
    </Divider>
  );
};
