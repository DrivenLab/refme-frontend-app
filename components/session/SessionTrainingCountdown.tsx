import { View, Box } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import SessionCounter from "./SessionCounter";
import { Image } from "expo-image";

import IterationTextImage from "./IterationTextImage";
import TextInformation from "../workouts/TextInformation";
import CircularProgress from "../progress-bar/CircularProgressBar";
import ManRunningWithColor from "@/assets/svgs/ManRunningWithColor";
import { get_image_from_name } from "@/utils/libs";

type Props = {
  initialCountdown: number;
  hasNoVideo: boolean;
  onFinishCountdown: () => void;
};
const SessionTrainingCountdown = ({
  initialCountdown,
  hasNoVideo,
  onFinishCountdown,
}: Props) => {
  const [count, setCount] = useState(initialCountdown);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 0) {
          clearInterval(interval);
          onFinishCountdown();
          return 0;
        }
        return prevCount - 1;
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
          {count >= 4 || hasNoVideo ? (
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
                source={get_image_from_name("play_video")}
                style={{ height: 100, width: 100 }}
                contentFit="contain"
              />
              <TextInformation type={"dm"} step={2} />
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
            <SessionCounter />
          </Box>
        </View>
      ) : (
        <IterationTextImage imageName="play_video">
          <TextInformation type="dm" step={2} />
        </IterationTextImage>
      )}
    </View>
  );
};

export default SessionTrainingCountdown;
