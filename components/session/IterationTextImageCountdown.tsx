import { View, Box, Text } from "@gluestack-ui/themed";
import { Image } from "expo-image";
import TextInformation from "../workouts/TextInformation";
import SessionCounter from "./SessionCounter";
import { useMemo } from "react";
import { IMAGE_NAME } from "@/types/session";
import { get_image_from_name } from "@/utils/libs";
import CircularProgress from "../progress-bar/CircularProgressBar";
type Props = {
  count: number;
  imageName: IMAGE_NAME;
  textType: "dm";
  textStep: number;
  initialCountdown: number;
  iterationNumber: number;
  totalItaration: number;
};
const IterationTextImageCountdown = ({
  count,
  imageName,
  textType,
  textStep,
  initialCountdown,
  iterationNumber,
  totalItaration,
}: Props) => {
  const imageSource = useMemo(() => get_image_from_name(imageName), []);
  return (
    <View
      flex={1}
      justifyContent="space-evenly"
      flexDirection="row"
      alignItems="center"
      bg="white"
      height={"100%"}
    >
      <Box
        flex={1}
        bg="$primary"
        height={"100%"}
        justifyContent="center"
        alignItems="center"
        borderTopRightRadius={100}
        borderBottomRightRadius={100}
      >
        <Image
          source={imageSource}
          style={{ height: 100, width: 100 }}
          contentFit="contain"
        />
        <TextInformation type={textType} step={textStep} />
      </Box>
      <Box flex={1} alignItems="center">
        <Box mb="$2">
          <CircularProgress
            circleColor="#090B22"
            size={180}
            strokeWidth={6}
            text={`${count}`}
            initialCountdown={initialCountdown}
          />
        </Box>
        <SessionCounter current={iterationNumber} total={totalItaration} />
      </Box>
    </View>
  );
};

export default IterationTextImageCountdown;
