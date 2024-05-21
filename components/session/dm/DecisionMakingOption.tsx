import { Box, Text } from "@gluestack-ui/themed";
import React from "react";
type Props = {
  children: React.ReactNode;
};
const DecisionMakingOption = ({ children }: Props) => {
  return (
    <Box
      flex={1}
      justifyContent="center"
      height={100}
      style={{ backgroundColor: "#f5f5f6" }}
      rounded={10}
    >
      {children}
    </Box>
  );
};

export default DecisionMakingOption;
