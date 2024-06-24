import { PersonalWorkoutDistance } from "@/types/personalWorkouts";
import { FlatList, Text, VStack } from "@gluestack-ui/themed";
import WorkoutNameList from "./WorkoutNameList";

type Props = {
  personalWorkoutDistance: PersonalWorkoutDistance;
};
const WorkoutDistanceList = ({ personalWorkoutDistance }: Props) => {
  return (
    <VStack space="md">
      {Object.keys(personalWorkoutDistance).map((distance) => (
        <VStack key={distance} space="md">
          <Text color="#091233" fontSize={"$xl"} fontWeight={"$bold"}>
            {isNaN(Number(distance)) ? distance : distance + " m"}
          </Text>
          <WorkoutNameList
            personalWorkoutDistance={personalWorkoutDistance}
            distance={distance}
          />
        </VStack>
      ))}
    </VStack>
  );
};

export default WorkoutDistanceList;
