import { ImageSourcePropType, StyleSheet } from "react-native";
import { ScrollView, Text, VStack } from "@gluestack-ui/themed";
import PersonalWorkoutCard from "@/components/home/PersonalWorkoutCard";
import SectionItem from "@/components/home/SectionItem";
import { useAuth } from "@/context/auth";

import i18n from "@/languages/i18n";
import { Asset, useAssets } from "expo-asset";
import { type Href } from "expo-router";
type sioType = {
  bgImage: NodeRequire;
  iconImage: string | Asset;
  title: string;
  hasNewItems: boolean;
  iconName: string;
  href: Href<string>;
  //   href: Href<StaticRoutes | RelativePathString | `${string}:${string}`>;
  //   href:
};

const SECTION_ITEMS_OPTIONS: sioType[] = [
  {
    bgImage: require("@/assets/images/official_training_home.png"),
    iconImage: require("@/assets/images/icons/referee_whistle.png"),
    title: i18n.t("official_training"),
    hasNewItems: true,
    iconName: "",
    href: "/workouts/",
  },
  {
    bgImage: require("@/assets/images/official_test_home.png"),
    iconImage: require("@/assets/images/icons/clipboard-list-svgrepo-com.png"),
    title: i18n.t("official_test"),
    hasNewItems: false,
    iconName: "",
    href: "/workouts/",
  },
  {
    bgImage: require("@/assets/images/video_test_home.png"),
    iconImage: require("@/assets/images/icons/video_folder.png"),
    title: i18n.t("video_test"),
    hasNewItems: false,
    iconName: "",
    href: "/workouts/",
  },
  {
    bgImage: require("@/assets/images/topic_home.png"),
    iconImage: require("@/assets/images/icons/topic_list.png"),
    title: i18n.t("topics"),
    hasNewItems: false,
    iconName: "",
    href: "/workouts/",
  },
];
export default function TabOneScreen() {
  const { signOut, user, userRole } = useAuth();
  const [bgAssets] = useAssets([
    require("@/assets/images/official_training_home.png"),
    require("@/assets/images/official_test_home.png"),
    require("@/assets/images/video_test_home.png"),
    require("@/assets/images/topic_home.png"),
  ]);
  const [iconAssets] = useAssets([
    require("@/assets/images/icons/referee_whistle.png"),
    require("@/assets/images/icons/clipboard-list-svgrepo-com.png"),
    require("@/assets/images/icons/video_folder.png"),
    require("@/assets/images/icons/topic_list.png"),
  ]);
  const sectionOptions = SECTION_ITEMS_OPTIONS.map((s, i) => ({
    ...s,
    bgImage: bgAssets ? bgAssets[i] : s.bgImage,
    iconImage: (iconAssets
      ? iconAssets[i]
      : s.iconImage) as ImageSourcePropType,
  }));
  return (
    <ScrollView bgColor="white" px={"$3"} flex={1}>
      <VStack space="md" flex={1} paddingBottom={10}>
        {userRole === "member" ? (
          <>
            <Text
              fontWeight="$semibold"
              fontSize={24}
              color="black"
              marginTop={5}
            >
              {i18n.t("question1_home")}
            </Text>
            <PersonalWorkoutCard />
            <Text fontWeight="$semibold" fontSize={24} color="black">
              {i18n.t("official_test_workout")}
            </Text>
            {sectionOptions.slice(0, 2).map((s, i) => (
              <SectionItem {...s} key={i} />
            ))}
            <Text
              fontWeight="$semibold"
              fontSize={24}
              color="black"
              marginVertical={5}
            >
              {i18n.t("elearning_title")}
            </Text>
            {sectionOptions.slice(2).map((s, i) => (
              <SectionItem {...s} key={i} />
            ))}
          </>
        ) : userRole === "instructor" ? (
          <>
            <Text fontWeight="$semibold" fontSize={24} color="black">
              {i18n.t("official_test_workout")}
            </Text>
            {sectionOptions.slice(0, 2).map((s, i) => (
              <SectionItem {...s} key={i} />
            ))}
          </>
        ) : null}
      </VStack>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
