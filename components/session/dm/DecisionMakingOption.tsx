import { t_DM_ANSWER1, t_DM_ANSWER2 } from "@/types/session";
import { Box, Pressable, Text } from "@gluestack-ui/themed";
import React, { useMemo, useState } from "react";

type Props = {
  text?: string;
  handleUserAnswer: () => void;
  isCorrect: boolean;
  hasMarked: boolean;
  showAnswer: boolean;
};
const DecisionMakingOption = ({
  text,
  handleUserAnswer,
  isCorrect,
  hasMarked,
  showAnswer,
}: Props) => {
  const bgColor = useMemo(() => {
    if (!hasMarked) return "#f5f5f6";
    if (!showAnswer) return "#090b22";
    if (isCorrect) return "#a6ebb1";
    else return "#ff9c97";
  }, [isCorrect, hasMarked, showAnswer]);
  const textColor = useMemo(() => {
    if (!hasMarked) return "#090b22";
    if (!showAnswer) return "#ffffff";
    if (isCorrect) return "#090b22";
    else return "#ffffff";
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
      onPress={handleUserAnswer}
    >
      {text && (
        <Text color={textColor} textAlign="center">
          {text}
        </Text>
      )}
    </Pressable>
  );
};

export default DecisionMakingOption;
