import {
  PersonalWorkoutAbility,
  PersonalWorkoutDistance,
} from "@/types/personalWorkouts";
import { Text, VStack } from "@gluestack-ui/themed";
import WorkoutNameList from "./WorkoutNameList";

type Props = {
  personalWorkoutDistance: PersonalWorkoutDistance;
  ability: PersonalWorkoutAbility;
};
const WorkoutDistanceList = ({ personalWorkoutDistance, ability }: Props) => {
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
            ability={ability}
          />
        </VStack>
      ))}
    </VStack>
  );
};

export default WorkoutDistanceList;
