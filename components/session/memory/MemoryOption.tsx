import { Pressable, Text, useColorMode } from "@gluestack-ui/themed";
import React, { useMemo } from "react";
import Colors from "@/constants/Colors";

type Props = {
  text?: string;
  isCorrect: boolean;
  hasMarked: boolean;
  showAnswer: boolean;
  canTouch: boolean;
  thisAnswerIsCorrect: boolean;
  handleUserAnswer: () => void;
};
const MemoryOption = ({
  text,
  isCorrect,
  thisAnswerIsCorrect,
  hasMarked,
  showAnswer,
  canTouch,
  handleUserAnswer,
}: Props) => {
  const handleOnPress = () => {
    if (canTouch) handleUserAnswer();
  };
  const mode = useColorMode();
  const bgColor = useMemo(() => {
    if (showAnswer && thisAnswerIsCorrect) return "#a6ebb1";
    if (hasMarked && !showAnswer) return "#090b22";
    if (hasMarked && showAnswer && !thisAnswerIsCorrect) return "#ff9c97";
    else return "#f5f5f6";
  }, [isCorrect, hasMarked, showAnswer]);
  
  const textColor = useMemo(() => {
    if (!hasMarked) return "#090b22";
    else if (!showAnswer) return "#ffffff";
    else return "#090b22";
  }, [isCorrect, hasMarked, showAnswer]);
  return (
    <Pressable
      flex={1}
      justifyContent="center"
      height={100}
      style={{
        backgroundColor: bgColor,
      }}
      rounded={10}
      onPress={handleOnPress}
      borderWidth={showAnswer && hasMarked ? 2 : 0}
      borderColor={
        isCorrect
          ? Colors[mode as keyof typeof Colors].success
          : Colors[mode as keyof typeof Colors].error
      }
    >
      {text && (
        <Text color={textColor} textAlign="center" fontSize={"$4xl"} bold>
          {text}
        </Text>
      )}
    </Pressable>
  );
};

export default MemoryOption;
