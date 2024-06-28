import {
  PersonalWorkoutDistance,
  PersonalWorkoutAbility,
} from "@/types/personalWorkouts";
import { FlatList, Text, VStack } from "@gluestack-ui/themed";
import WorkoutNameItem from "./WorkoutNameItem";

type Props = {
  distance: string;
  personalWorkoutDistance: PersonalWorkoutDistance;
  ability: PersonalWorkoutAbility;
};
const WorkoutNameList = ({
  distance,
  personalWorkoutDistance,
  ability,
}: Props) => {
  return (
    <VStack space="md">
      <FlatList
        data={Object.keys(personalWorkoutDistance[distance])}
        renderItem={({ item }: { item: any }) => (
          <WorkoutNameItem
            personalWorkout={personalWorkoutDistance[distance][item][0]}
            params={{ distance, name: item as string, ability }}
          />
        )}
        keyExtractor={(item, i) => `workoutMaterial-${i}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </VStack>
  );
};

export default WorkoutNameList;
