import { VStack, Text, Box, View } from "@gluestack-ui/themed";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { ImageBackground } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
type Props = {
  bgImage: any;
  title: string;
  hasNewItems: boolean;
  iconName?: string;
};
const SectionItem = (props: Props) => {
  return (
    <Link href={"/workouts"} asChild>
      <Pressable>
        <ImageBackground
          source={props.bgImage}
          style={styles.backgroundImage}
          resizeMode="cover"
          borderRadius={10}
        >
          <LinearGradient // Background Linear Gradient
            colors={["#090B22", "#090B22", "#090B22", "rgba(9, 11, 34, 0)"]}
            locations={[0, 0, 0.27, 0.74]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.backgroundLinearGradient}
          >
            <Box flex={1} flexDirection="column" alignItems="center">
              <Text fontWeight="bold" fontSize={20} style={{ color: "white" }}>
                {props.title}
              </Text>
              <Text fontSize={16} style={{ color: "white" }}>
                {props.hasNewItems ? "Estas al día" : "¡Nuevo!"}
              </Text>
            </Box>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    </Link>
  );
};

export default SectionItem;
const styles = StyleSheet.create({
  backgroundLinearGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  backgroundImage: {
    height: 150,
    width: "100%",
    flex: 1,
    borderRadius: 10,
  },
});
