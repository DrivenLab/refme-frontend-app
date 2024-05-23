import { View, Box, Text } from "@gluestack-ui/themed";
import SessionCounter from "./SessionCounter";
import CircularProgress from "../progress-bar/CircularProgressBar";
import ManRunningWithColor from "@/assets/svgs/ManRunningWithColor";

type Props = {
  count: number;
  imageName: "man_running_with_color";
  //   TODO:  Add more image names
  initialCountdown: number;
};
const IterationImageCountdown = ({
  count,
  imageName,
  initialCountdown,
}: Props) => {
  const progress =
    initialCountdown - count > 0
      ? (initialCountdown - count) / initialCountdown
      : 0;
  return (
    <View
      flex={1}
      justifyContent="space-evenly"
      flexDirection="row"
      alignItems="center"
      bg="white"
      height={"100%"}
    >
      <Box flex={1} justifyContent="center" alignItems="center">
        {imageName === "man_running_with_color" ? (
          <Box style={{ width: "50%" }}>
            <ManRunningWithColor width={300} height={300} />
          </Box>
        ) : (
          <Text> {imageName} </Text>
        )}
      </Box>
      <Box flex={1} alignItems="center">
        <Box mb="$2">
          <CircularProgress
            progress={1 - progress}
            circleColor="#090B22"
            size={180}
            strokeWidth={6}
            text={`${count}`}
          />
        </Box>
        <SessionCounter />
      </Box>
    </View>
  );
};

export default IterationImageCountdown;
