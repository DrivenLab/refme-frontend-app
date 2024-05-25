import { Pressable, Text, useColorMode } from "@gluestack-ui/themed";
import React, { useCallback, useMemo, useState } from "react";
import Colors from "@/constants/Colors";

type Props = {
  text?: string;
  handleUserAnswer: () => void;
  isCorrect: boolean;
  hasMarked: boolean;
  showAnswer: boolean;
  canTouch: boolean;
};
const DecisionMakingOption = ({
  text,
  handleUserAnswer,
  isCorrect,
  hasMarked,
  showAnswer,
  canTouch,
}: Props) => {
  const handleOnPress = () => {
    if (canTouch) handleUserAnswer();
  };
  const mode = useColorMode();
  const bgColor = useMemo(() => {
    if (!hasMarked) return "#f5f5f6";
    if (!showAnswer) return "#090b22";
    if (isCorrect) return "#a6ebb1";
    else return "#ff9c97";
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
        <Text color={textColor} textAlign="center" fontSize={20}>
          {text}
        </Text>
      )}
    </Pressable>
  );
};

export default DecisionMakingOption;
