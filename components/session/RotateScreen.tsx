import React from "react";
import { View, Text, VStack, Box } from "@gluestack-ui/themed";
import CBtn from "../CBtn";
import { ORIENTATION } from "@/constants/Orientation";
type Props = {
  orientation: string;
  onStartWorkout: () => void;
};
const RotateScreen = ({ orientation, onStartWorkout }: Props) => {
  return (
    <VStack
      height={"100%"}
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
          onPress={onStartWorkout}
        />
      </Box>
    </VStack>
  );
};

export default RotateScreen;
