import { Button, StyleSheet, TextInput } from "react-native";
import { ScrollView, Text, VStack, View } from "@gluestack-ui/themed";
import PersonalWorkoutCard from "@/components/home/PersonalWorkoutCard";
import SectionItem from "@/components/home/SectionItem";

const SECTION_ITEMS_OPTIONS = [
  {
    bgImage: require("@/assets/images/official_training_home.png"),
    title: "Ejercicios oficiales",
    hasNewItems: true,
    iconName: "",
  },
  {
    bgImage: require("@/assets/images/official_test_home.png"),
    title: "Test oficiales",
    hasNewItems: false,
    iconName: "",
  },
  {
    bgImage: require("@/assets/images/video_test_home.png"),
    title: "Video Test",
    hasNewItems: false,
    iconName: "",
  },
  {
    bgImage: require("@/assets/images/topic_home.png"),
    title: "Tópicos",
    hasNewItems: false,
    iconName: "",
  },
];
export default function TabOneScreen() {
  return (
    <ScrollView style={styles.container} px={"$3"}>
      <VStack space="md" flex={1}>
        <Text fontWeight="bold" fontSize={24} color="black">
          ¿Qué vas a entrenar hoy?
        </Text>
        <PersonalWorkoutCard />
        <Text fontWeight="bold" fontSize={24} color="black">
          Entrenamientos Oficiales{" "}
        </Text>
        {SECTION_ITEMS_OPTIONS.slice(0, 2).map((s, i) => (
          <SectionItem
            bgImage={s.bgImage}
            title={s.title}
            hasNewItems={s.hasNewItems}
            key={i}
          />
        ))}
        <Text fontWeight="bold" fontSize={24} color="black">
          E-learnig{" "}
        </Text>
        {SECTION_ITEMS_OPTIONS.slice(2).map((s, i) => (
          <SectionItem
            bgImage={s.bgImage}
            title={s.title}
            hasNewItems={s.hasNewItems}
            key={i}
          />
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
