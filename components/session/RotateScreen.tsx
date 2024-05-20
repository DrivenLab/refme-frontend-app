import React from "react";
import { Text, VStack, Box, Button, ButtonText } from "@gluestack-ui/themed";
import { Image } from "expo-image";
import { ORIENTATION } from "@/constants/Orientation";
type Props = {
  orientation: string;
  onStartWorkout: () => void;
};
const RotateScreen = ({ orientation, onStartWorkout }: Props) => {
  return (
    <VStack
      height={"100%"}
      bg="$primary"
      justifyContent="center"
      alignItems="center"
      space="md"
    >
      <Image
        source={require("@/assets/images/rotate_phone.png")}
        style={{ height: 100, width: 100 }}
        contentFit="contain"
      />
      <Text fontWeight="bold" textAlign="center" color="black">
        Gire su pantalla para comenzar
      </Text>
      <Box maxWidth={"80%"}>
        <Button
          size="md"
          mr="$3"
          bg="$white"
          onPress={onStartWorkout}
          isDisabled={ORIENTATION.PORTRAIT == orientation}
          rounded={"$full"}
        >
          <ButtonText color="black">Iniciar entrenamiento</ButtonText>
        </Button>
      </Box>
    </VStack>
  );
};

export default RotateScreen;
