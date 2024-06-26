import { ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { useGetPersonalWorkoutsConfigByType } from "@/queries/personalWorkouts.query";
import WorkoutDistanceList from "@/components/personal-workouts/WorkoutDistanceList";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { PersonalWorkoutAbility } from "@/types/personalWorkouts";
import { useLayoutEffect } from "react";
import i18n from "@/languages/i18n";
const PersonalWorkoutList = () => {
  /*HOOKS */
  const navigation = useNavigation();
  const { ability = "agilidad" } = useLocalSearchParams<{
    ability: PersonalWorkoutAbility;
  }>();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: i18n.t(`personal_workout_flow.${ability}_header_title`),
    });
  }, []);
  const { personalWorkout } = useGetPersonalWorkoutsConfigByType({
    ability,
  });
  return (
    <ScrollView px={"$3"} pt={"$2"} bg="$white">
      <Text mb={"$3"} color="#051232" fontWeight={"400"}>
        {i18n.t("personal_workout_flow.choose_an_space_message")}
      </Text>
      <WorkoutDistanceList
        personalWorkoutDistance={personalWorkout}
        ability={ability}
      />
    </ScrollView>
  );
};

export default PersonalWorkoutList;
