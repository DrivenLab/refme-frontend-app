import { Text, Box, Badge, BadgeText, Pressable } from "@gluestack-ui/themed";
import React from "react";
import { ImageSourcePropType, StyleSheet } from "react-native";
import { ImageBackground } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { Image } from "expo-image";
import i18n from "@/languages/i18n";
import useToast from "@/hooks/useToast";

type Props = {
  bgImage: any;
  title: string;
  hasNewItems: boolean;
  iconName?: string;
  iconImage: ImageSourcePropType;
  href?: string;
};
const SectionItem = (props: Props) => {
  const router = useRouter();
  const { showToast } = useToast();
  const handleOnPress = () => {
    if (props.href) router.push(props.href);
    else
      showToast({
        title: i18n.t("coming_soon"),
        description: i18n.t("working_on_that"),
        action: "warning",
      });
  };
  return (
    <Pressable onPress={handleOnPress}>
      <ImageBackground
        source={props.bgImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient // Background Linear Gradient
          colors={["#090B22", "#090B22", "#090B22", "rgba(9, 11, 34, 0)"]}
          locations={[0, 0, 0.27, 0.74]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.backgroundLinearGradient}
        >
          <Box w={80} h={45} mx={10}>
            <Image
              source={props.iconImage}
              contentFit="contain"
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
          <Box flex={1} flexDirection="column">
            <Text fontWeight="bold" fontSize={20} style={{ color: "white" }}>
              {props.title}
            </Text>
            <Text fontSize={16} style={{ color: "white" }} marginTop={5}>
              {props.hasNewItems ? (
                <Badge
                  size="md"
                  variant="solid"
                  rounded="$full"
                  bg="$orange500"
                >
                  <BadgeText color="white">{i18n.t("new")}</BadgeText>
                </Badge>
              ) : (
                `¡${i18n.t("up_to_date")}!`
              )}
            </Text>
          </Box>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
};

export default SectionItem;
const styles = StyleSheet.create({
  backgroundLinearGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  backgroundImage: {
    height: 90,
    width: "100%",
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
});
