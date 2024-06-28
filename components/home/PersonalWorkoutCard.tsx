import { VStack, Text, Box, Pressable } from "@gluestack-ui/themed";
import React from "react";
import { StyleSheet } from "react-native";
import { ImageBackground } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import i18n from "@/languages/i18n";
import { Link, useRouter } from "expo-router";
const PersonalWorkoutCard = () => {
  const router = useRouter();
  const handleOnPress = () => {
    router.push("/(tabs)/personalWorkouts/");
  };
  return (
    <Pressable onPress={handleOnPress}>
      <ImageBackground
        source={require("@/assets/images/personal_training_home.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient // Background Linear Gradient
          colors={["transparent", "#090B22"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.backgroundLinearGradient}
        >
          <VStack flex={1} maxWidth={200}>
            <Box>
              <Text fontWeight="bold" fontSize={20} color="white">
                {i18n.t("workout_home_card")}
              </Text>
              <Text fontSize={20} color="white">
                {i18n.t("personal_home_card").toLocaleLowerCase()}
              </Text>
            </Box>
            <Text fontSize={16} color="white">
              {i18n.t("videos_available")}
            </Text>
          </VStack>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
};

export default PersonalWorkoutCard;

const styles = StyleSheet.create({
  backgroundLinearGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  backgroundImage: {
    height: 150,
    width: "100%",
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
});
