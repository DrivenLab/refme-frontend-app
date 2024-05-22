import { t_DM_ANSWER1, t_DM_ANSWER2 } from "@/types/session";
import { Box, Pressable, Text } from "@gluestack-ui/themed";
import React, { useState } from "react";

type Props = {
  text?: string;
  userAnswer?: string;
  handleUserAnswer: (value: string, questionType: string) => void;
  answer: string;
  questionType: string;
};
const DecisionMakingOption = ({
  text,
  handleUserAnswer,
  answer,
  userAnswer,
  questionType,
}: Props) => {
  const handleOnPress = () => {
    handleUserAnswer(answer, questionType);
  };
  return (
    <Pressable
      flex={1}
      justifyContent="center"
      height={100}
      style={{ backgroundColor: userAnswer === answer ? "#090B22" : "#f5f5f6" }}
      rounded={10}
      onPress={handleOnPress}
    >
      {text && (
        <Text
          color={userAnswer === answer ? "#ffffff" : "#090B22"}
          textAlign="center"
        >
          {text}
        </Text>
      )}
    </Pressable>
  );
};

export default DecisionMakingOption;
