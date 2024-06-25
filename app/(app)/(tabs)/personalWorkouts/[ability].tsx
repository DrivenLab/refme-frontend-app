import { ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { useGetPersonalWorkoutsConfigByType } from "@/queries/personalWorkouts.query";
import WorkoutDistanceList from "@/components/personal-workouts/WorkoutDistanceList";
import { useLocalSearchParams } from "expo-router";
import { PersonalWorkoutAbility } from "@/types/personalWorkouts";

const PersonalWorkoutList = () => {
  const { ability = "agilidad" } = useLocalSearchParams<{
    ability: PersonalWorkoutAbility;
  }>();
  const { personalWorkout } = useGetPersonalWorkoutsConfigByType({
    ability,
  });
  return (
    <ScrollView px={"$3"} pt={"$2"} bg="$white">
      <Text fontWeight={"$bold"} fontSize={"$xl"} color="#051232" mb={"$3"}>
        Elige una opción de acuerdo al espacio que tienes disponible
      </Text>
      <WorkoutDistanceList
        personalWorkoutDistance={personalWorkout}
        ability={ability}
      />
    </ScrollView>
  );
};

export default PersonalWorkoutList;
