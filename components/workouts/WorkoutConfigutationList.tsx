import { Workout } from "@/types/workout";
import WorkoutConfigItem from "./WorkoutConfigurationItem";
import { VStack, Text } from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { PersonalWorkout } from "@/types/personalWorkouts";
type Props = {
  workout?: Workout | PersonalWorkout;
};
const WorkoutConfigutationList = ({ workout }: Props) => {
  return (
    <VStack space="md">
      <Text fontSize={20} fontWeight="bold" color="black">
        {i18n.t("common.configuration")}
      </Text>
      {workout ? (
        <>
          <WorkoutConfigItem
            configName="numberOfRepetitions"
            quantity={workout?.numberOfRepetitions}
          />
          <WorkoutConfigItem
            configName="numberOfDecisions"
            quantity={workout?.numberOfDecisions}
          />
          <WorkoutConfigItem
            configName="excerciseDuration"
            quantity={workout?.excerciseDuration}
            inSeconds={true}
          />
          <WorkoutConfigItem
            configName="breakDuration"
            quantity={workout?.breakDuration}
            inSeconds={true}
          />
        </>
      ) : (
        <Text>-</Text>
      )}
    </VStack>
  );
};

export default WorkoutConfigutationList;
