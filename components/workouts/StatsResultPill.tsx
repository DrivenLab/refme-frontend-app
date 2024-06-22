import ErrorIcon from "@/assets/svgs/ErrorIcon";
import SuccessIcon from "@/assets/svgs/SuccessIcon";
import TimeIcon from "@/assets/svgs/TimeIcon";
import { Box, Text } from "@gluestack-ui/themed";

type Props = { type: "time" | "success" | "error"; text: string };

const StatsResultPill = ({ type, text }: Props) => {
  return (
    <Box
      borderRadius={40}
      bgColor={
        type === "success"
          ? "#a6ecb1"
          : type === "error"
          ? "#ff9c98"
          : "#f2f3f4"
      }
      display="flex"
      flexDirection="row"
      alignItems="center"
      paddingHorizontal={20}
      paddingVertical={5}
      gap={10}
    >
      {type === "time" && <TimeIcon />}
      {type === "success" && <SuccessIcon />}
      {type === "error" && <ErrorIcon />}
      <Text color="$secondary" fontSize={24} bold>
        {text}
      </Text>
    </Box>
  );
};
export default StatsResultPill;
