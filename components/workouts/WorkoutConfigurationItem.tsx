import i18n from "@/languages/i18n";
import { Box, Text, VStack } from "@gluestack-ui/themed";

type Props = {
  configName:
    | "numberOfRepetitions"
    | "numberOfDecisions"
    | "excerciseDuration"
    | "breakDuration";
  quantity?: string | number;
  inSeconds?: boolean;
};
const WorkoutConfigItem = (props: Props) => {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      py="$3"
      borderBottomWidth={1}
      borderBottomColor="#0000001A"
    >
      <Text color="#666666">{i18n.t(`workout_flow.${props.configName}`)}</Text>
      <VStack flexDirection="row">
        <Text fontWeight="bold" fontSize={16} color="black">
          {props.quantity}
        </Text>
        {props.inSeconds && <Text ml="$0.5">s</Text>}
      </VStack>
    </Box>
  );
};

export default WorkoutConfigItem;
