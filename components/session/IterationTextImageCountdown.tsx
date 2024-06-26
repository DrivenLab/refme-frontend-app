import { Box, SafeAreaView } from "@gluestack-ui/themed";
import { Image } from "expo-image";
import TextInformation from "../workouts/TextInformation";
import SessionCounter from "./SessionCounter";
import { useMemo } from "react";
import { IMAGE_NAME, RECOGNITION_VIDEO_TYPE } from "@/types/session";
import { getImageFromName } from "@/utils/libs";
import CircularProgress from "../progress-bar/CircularProgressBar";
import { TEXT_TYPES } from "@/types/workout";
import { ImageSourcePropType } from "react-native";

type Props = {
  count: number;
  imageName: IMAGE_NAME;
  textType: TEXT_TYPES;
  textStep: number;
  initialCountdown: number;
  iterationNumber: number;
  totalItaration: number;
  recognitionType?: RECOGNITION_VIDEO_TYPE;
};
const IterationTextImageCountdown = ({
  count,
  imageName,
  textType,
  textStep,
  initialCountdown,
  iterationNumber,
  totalItaration,
  recognitionType,
}: Props) => {
  const imageSource = useMemo(() => getImageFromName(imageName), []);

  return (
    <SafeAreaView
      flex={1}
      justifyContent="space-evenly"
      flexDirection="row"
      alignItems="center"
      bg="white"
      height={"100%"}
    >
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <Box
          width="150%"
          aspectRatio={1}
          left={"-50%"}
          bg="$primary"
          position="absolute"
          borderRadius="$full"
        />
        <Image
          source={imageSource}
          style={{ height: 100, width: 100 }}
          contentFit="contain"
        />
        <TextInformation
          type={textType}
          step={textStep}
          recognitionType={recognitionType}
        />
      </Box>
      <Box flex={1} alignItems="center">
        <Box mb="$6">
          <CircularProgress
            circleColor="#090B22"
            strokeWidth={6}
            text={`${count}`}
            initialCountdown={initialCountdown}
          />
        </Box>
        <SessionCounter current={iterationNumber} total={totalItaration} />
      </Box>
    </SafeAreaView>
  );
};

export default IterationTextImageCountdown;
