import React from "react";
import { View, Text, VStack, Box } from "@gluestack-ui/themed";
import CBtn from "../CBtn";
import { ORIENTATION } from "@/constants/Orientation";
type Props = {
  orientation: string;
};
const RotateScreen = ({ orientation }: Props) => {
  return (
    <VStack
      flex={1}
      bg="$primary0"
      justifyContent="center"
      alignItems="center"
      space="md"
    >
      <Text fontWeight="bold" textAlign="center">
        Gire su pantalla para comenzar
      </Text>
      <Box maxWidth={"80%"}>
        <CBtn
          title="Iniciar entrenamiento"
          isDisabled={ORIENTATION.PORTRAIT == orientation}
        />
      </Box>
    </VStack>
  );
};

export default RotateScreen;
