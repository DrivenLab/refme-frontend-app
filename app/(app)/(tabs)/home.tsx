import { StyleSheet } from "react-native";
import { ScrollView, Text, VStack } from "@gluestack-ui/themed";
import PersonalWorkoutCard from "@/components/home/PersonalWorkoutCard";
import SectionItem from "@/components/home/SectionItem";
import { useAuth } from "@/context/auth";

import i18n from "@/languages/i18n";

export default function TabOneScreen() {
  const { signOut, user, userRole } = useAuth();
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
            <SectionItem
              bgImage={require("@/assets/images/official_training_home.png")}
              iconImage={require("@/assets/images/icons/referee_whistle.png")}
              title={i18n.t("official_training")}
              hasNewItems
              iconName=""
              href="/workouts/"
            />
            <SectionItem
              bgImage={require("@/assets/images/official_test_home.png")}
              iconImage={require("@/assets/images/icons/clipboard-list-svgrepo-com.png")}
              title={i18n.t("official_test")}
              hasNewItems={false}
              iconName=""
              href="/workouts/"
            />
            <Text
              fontWeight="$semibold"
              fontSize={24}
              color="black"
              marginVertical={5}
            >
              {i18n.t("elearning_title")}
            </Text>
            <SectionItem
              bgImage={require("@/assets/images/video_test_home.png")}
              iconImage={require("@/assets/images/icons/video_folder.png")}
              title={i18n.t("video_test")}
              hasNewItems={false}
              iconName=""
              href="/workouts/"
            />
            <SectionItem
              bgImage={require("@/assets/images/topic_home.png")}
              iconImage={require("@/assets/images/icons/topic_list.png")}
              title={i18n.t("topics")}
              hasNewItems={false}
              iconName=""
              href="/workouts/"
            />
          </>
        ) : userRole === "instructor" ? (
          <>
            <Text fontWeight="$semibold" fontSize={24} color="black">
              {i18n.t("official_test_workout")}
            </Text>
            <SectionItem
              bgImage={require("@/assets/images/video_test_home.png")}
              iconImage={require("@/assets/images/icons/video_folder.png")}
              title={i18n.t("video_test")}
              hasNewItems={false}
              iconName=""
              href="/workouts/"
            />
            <SectionItem
              bgImage={require("@/assets/images/topic_home.png")}
              iconImage={require("@/assets/images/icons/topic_list.png")}
              title={i18n.t("topics")}
              hasNewItems={false}
              iconName=""
              href="/workouts/"
            />
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
