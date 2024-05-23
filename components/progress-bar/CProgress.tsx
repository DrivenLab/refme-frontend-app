import Colors from "@/constants/Colors";
import {
  Progress,
  ProgressFilledTrack,
  useColorMode,
} from "@gluestack-ui/themed";
import React from "react";
type Props = {
  progressValue: number;
  initialProgressValue: number;
};
const CProgress = ({ progressValue, initialProgressValue }: Props) => {
  const mode = useColorMode();

  return (
    <Progress
      value={Math.ceil((progressValue / initialProgressValue) * 100)}
      w={"100%"}
      size="2xl"
      bg="#E6FAFF"
    >
      <ProgressFilledTrack
        bgColor={
          Math.ceil((progressValue / initialProgressValue) * 100) > 40
            ? Colors[mode as keyof typeof Colors].primary
            : Colors[mode as keyof typeof Colors].orange
        }
      />
    </Progress>
  );
};

export default CProgress;
