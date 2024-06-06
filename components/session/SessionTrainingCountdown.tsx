import { View, Box } from "@gluestack-ui/themed";
import React, { useEffect, useMemo, useState } from "react";
import SessionCounter from "./SessionCounter";
import { Image } from "expo-image";

import IterationTextImage from "./IterationTextImage";
import TextInformation from "../workouts/TextInformation";
import CircularProgress from "../progress-bar/CircularProgressBar";
import ManRunningWithColor from "@/assets/svgs/ManRunningWithColor";
// import Sound from "@/assets/audio/silbatoCorto.MP3";
// import Sound from "../../assets/audio/silbatoCorto.MP3";

import { get_image_from_name } from "@/utils/libs";
import { TEXT_TYPES } from "@/types/workout";
import { IMAGE_NAME, RECOGNITION_VIDEO_TYPE } from "@/types/session";
import { Audio } from "expo-av";

type Props = {
  initialCountdown: number;
  hasVideo: boolean;
  iterationNumber: number;
  totalItaration: number;
  imageName: IMAGE_NAME;
  type: TEXT_TYPES;
  recognitionType?: RECOGNITION_VIDEO_TYPE;
  onFinishCountdown: () => void;
};
async function playSound() {
  //   const { sound } = await Audio.Sound.createAsync(
  //     require("@/assets/audio/silbatoCorto.mp3")
  //   );
  //   await sound.playAsync();
}
const SessionTrainingCountdown = ({
  initialCountdown,
  hasVideo,
  iterationNumber,
  totalItaration,
  imageName,
  type,
  recognitionType,
  onFinishCountdown,
}: Props) => {
  const [count, setCount] = useState(initialCountdown);
  const imageSource = useMemo(
    () => get_image_from_name(hasVideo ? imageName : "how_you_feel"),
    [hasVideo]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 0) {
          clearInterval(interval);
          onFinishCountdown();
          return 0;
        }
        const newCountdownValue = prevCount - 1;
        if ([3, 2, 1].includes(prevCount)) {
          playSound();
        }
        return newCountdownValue;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);
  return (
    <View flex={1}>
      {count >= 1 ? (
        <View
          flex={1}
          justifyContent="space-evenly"
          flexDirection="row"
          alignItems="center"
          bg="white"
          height={"100%"}
        >
          {count >= 4 ? (
            <Box flex={1} justifyContent="center" alignItems="center">
              <Box style={{ width: "50%" }}>
                <ManRunningWithColor width={300} height={300} />
              </Box>
            </Box>
          ) : (
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
              <TextInformation
                type={type}
                step={2}
                hasVideo={hasVideo}
                recognitionType={recognitionType}
              />
            </Box>
          )}
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
      ) : (
        <IterationTextImage imageName={hasVideo ? imageName : "how_you_feel"}>
          <TextInformation
            type={type}
            step={2}
            hasVideo={hasVideo}
            recognitionType={recognitionType}
          />
        </IterationTextImage>
      )}
    </View>
  );
};

export default SessionTrainingCountdown;
