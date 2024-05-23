import { View, Box, Text } from "@gluestack-ui/themed";
import { Image } from "expo-image";
import SessionCounter from "./SessionCounter";
import { useMemo } from "react";
import { IMAGE_NAME } from "@/types/session";
import { get_image_from_name } from "@/utils/libs";
import CircularProgress from "../progress-bar/CircularProgressBar";

type Props = {
  count: number;
  imageName: IMAGE_NAME;
  initialCountdown: number;
};
const IterationImageCountdown = ({
  count,
  imageName,
  initialCountdown,
}: Props) => {
  const imageSource = useMemo(() => get_image_from_name(imageName), []);
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
        <Image
          source={imageSource}
          style={{ height: "50%", width: "50%" }}
          contentFit="contain"
        />
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
