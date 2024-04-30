import { VStack, Text, Box } from "@gluestack-ui/themed";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet } from "react-native";

const PersonalWorkoutCard = () => {
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      borderRadius={8}
      bg="$warmGray100"
    >
      <Box flex={1}>
        <Image
          source={require("@/assets/images/personal_training_home.png")}
          style={styles.img}
          contentFit="contain"
        />
      </Box>
      <VStack flex={1}>
        <Box>
          <Text fontWeight="bold" fontSize={20}>
            Entrenamiento
          </Text>
          <Text fontSize={20}>personal</Text>
        </Box>
        <Text fontSize={16}>
          Te quedan <Text>20</Text> videos disponibles este mes
        </Text>
      </VStack>
    </Box>
  );
};

export default PersonalWorkoutCard;
const styles = StyleSheet.create({
  img: {
    height: 200,
    width: "100%",
  },
});
