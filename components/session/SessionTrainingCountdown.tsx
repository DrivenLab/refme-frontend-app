import { View, Text, Box } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import SessionCounter from "./SessionCounter";
import { Image } from "expo-image";
import IterationImageCountdown from "./IterationImageCountdown";
import IterationTextImageCountdown from "./IterationTextImageCountdown";
import IterationTextImage from "./IterationTextImage";
import TextInformation from "../workouts/TextInformation";

type Props = {
  onFinishCountdown: () => void;
  initialCountdown: number;
  hasNoVideo: boolean;
};
const SessionTrainingCountdown = ({
  onFinishCountdown,
  initialCountdown,
  hasNoVideo,
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
    <View
      flex={1}
      justifyContent="space-evenly"
      flexDirection="row"
      alignItems="center"
      bg="white"
    >
      {count >= 4 || hasNoVideo ? (
        <IterationImageCountdown
          count={count}
          imageName="man_running_with_color"
          initialCountdown={initialCountdown}
        />
      ) : count >= 1 ? (
        <IterationTextImageCountdown
          textStep={2}
          textType="dm"
          count={count}
          imageName="play_video"
          initialCountdown={initialCountdown}
        />
      ) : (
        <IterationTextImage imageName="play_video">
          <TextInformation type="dm" step={2} />
        </IterationTextImage>
      )}
    </View>
  );
};

export default SessionTrainingCountdown;
