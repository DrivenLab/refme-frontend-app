import { Button, StyleSheet, TextInput } from "react-native";
import { ScrollView, Text, VStack, View } from "@gluestack-ui/themed";
import PersonalWorkoutCard from "@/components/home/PersonalWorkoutCard";
import SectionItem from "@/components/home/SectionItem";
import i18n from "@/languages/i18n";
const SECTION_ITEMS_OPTIONS = [
  {
    bgImage: require("@/assets/images/official_training_home.png"),
    iconImage: require("@/assets/images/icons/referee_whistle.png"),
    title: i18n.t("official_training"),
    hasNewItems: true,
    iconName: "",
  },
  {
    bgImage: require("@/assets/images/official_test_home.png"),
    iconImage: require("@/assets/images/icons/clipboard-list-svgrepo-com.png"),
    title: i18n.t("official_test"),
    hasNewItems: false,
    iconName: "",
  },
  {
    bgImage: require("@/assets/images/video_test_home.png"),
    iconImage: require("@/assets/images/icons/video_folder.png"),
    title: i18n.t("video_test"),
    hasNewItems: false,
    iconName: "",
  },
  {
    bgImage: require("@/assets/images/topic_home.png"),
    iconImage: require("@/assets/images/icons/topic_list.png"),
    title: i18n.t("topics"),
    hasNewItems: false,
    iconName: "",
  },
];
export default function TabOneScreen() {
  return (
    <ScrollView style={styles.container} px={"$3"}>
      <VStack space="md" flex={1} paddingBottom={10}>
        <Text fontWeight="bold" fontSize={24} color="black">
          {i18n.t("question1_home")}
        </Text>
        <PersonalWorkoutCard />
        <Text fontWeight="bold" fontSize={24} color="black">
          {i18n.t("official_test_workout")}
        </Text>
        {SECTION_ITEMS_OPTIONS.slice(0, 2).map((s, i) => (
          <SectionItem {...s} key={i} />
        ))}
        <Text fontWeight="bold" fontSize={24} color="black">
          E-learnig{" "}
        </Text>
        {SECTION_ITEMS_OPTIONS.slice(2).map((s, i) => (
          <SectionItem {...s} key={i} />
        ))}
      </VStack>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
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
