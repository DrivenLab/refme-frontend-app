import { useMemo } from "react";
import { View, Box } from "@gluestack-ui/themed";

import { IMAGE_NAME, RECOGNITION_VIDEO_TYPE } from "@/types/session";
import { TEXT_TYPES } from "@/types/workout";
import { get_image_from_name } from "@/utils/libs";
import SessionCounter from "./SessionCounter";
import CircularProgress from "../progress-bar/CircularProgressBar";
import { IterationSemiCircle } from "./IterationSemiCircle";

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
      <IterationSemiCircle
        imageSource={imageSource}
        textType={textType}
        textStep={textStep}
        recognitionType={recognitionType}
      />
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
    </View>
  );
};

export default IterationTextImageCountdown;
