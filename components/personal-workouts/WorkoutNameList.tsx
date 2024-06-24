import {
  PersonalWorkoutDistance,
  PersonalWorkoutName,
} from "@/types/personalWorkouts";
import { FlatList, Text, VStack } from "@gluestack-ui/themed";
import WorkoutNameItem from "./WorkoutNameItem";

type Props = {
  distance: string;
  personalWorkoutDistance: PersonalWorkoutDistance;
};
const WorkoutNameList = ({ distance, personalWorkoutDistance }: Props) => {
  return (
    <VStack space="md">
      <FlatList
        data={Object.keys(personalWorkoutDistance[distance])}
        renderItem={({ item }: { item: unknown }) => (
          <WorkoutNameItem
            name={item as string}
            description={
              personalWorkoutDistance[distance][
                Object.keys(personalWorkoutDistance[distance])[0]
              ][0].description
            }
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
