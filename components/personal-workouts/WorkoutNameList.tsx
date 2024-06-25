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
        renderItem={({ item }: { item: unknown }) => (
          <WorkoutNameItem
            description={
              personalWorkoutDistance[distance][
                Object.keys(personalWorkoutDistance[distance])[0]
              ][0].description
            }
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
