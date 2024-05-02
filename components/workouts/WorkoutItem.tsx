import { Workout } from "@/types/workout";
import { Box, Text } from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
type Props = {
  workout: Workout;
};

const WorkoutItem = ({ workout }: Props) => {
  return (
    <Box>
      <Text>{i18n.t("dm")}</Text>
    </Box>
  );
};

export default WorkoutItem;
