import { Box, Text, VStack } from "@gluestack-ui/themed";
import React from "react";

type Props = {
  configName: string;
  quantity?: string | number;
  inSeconds?: boolean;
};
const WorkoutConfigItem = (props: Props) => {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      py="$2"
      borderBottomWidth={1}
      borderBottomColor="coolGray100"
    >
      <Text>{props.configName}</Text>
      <VStack flexDirection="row">
        <Text fontWeight="bold" fontSize={16} color="black">
          {props.quantity}
        </Text>
        {props.inSeconds && <Text ml="$0.5">s</Text>}
      </VStack>
    </Box>
  );
};

export default WorkoutConfigItem;
