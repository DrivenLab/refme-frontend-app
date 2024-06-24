import { Text, Box, Pressable } from "@gluestack-ui/themed";
import React from "react";
import { StyleSheet } from "react-native";
import { ImageBackground } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

type Props = {
  bgImage: any;
  title: string;
  href: string;
};
const WorkoutTypeCard = (props: Props) => {
  return (
    <Link href={props.href} asChild>
      <Pressable>
        <ImageBackground
          source={props.bgImage}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <LinearGradient // Background Linear Gradient
            colors={["rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0)"]}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.backgroundLinearGradient}
          >
            <Box flex={1} px={"$7"}>
              <Text
                fontWeight="bold"
                fontSize={20}
                maxWidth={"80%"}
                style={{ color: "white" }}
              >
                {props.title}
              </Text>
            </Box>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    </Link>
  );
};

export default WorkoutTypeCard;
const styles = StyleSheet.create({
  backgroundLinearGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  backgroundImage: {
    height: 150,
    width: "100%",
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
});
