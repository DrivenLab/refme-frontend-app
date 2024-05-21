import { Box, Divider, Text, VStack } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { DM_ANSWER1, DM_ANSWER2 } from "@/constants/Session";
import DecisionMakingOption from "./DecisionMakingOption";
import i18n from "@/languages/i18n";
import { t_DM_ANSWER1, t_DM_ANSWER2 } from "@/types/session";
type Props = {
  onFinish: () => void;
};
const DecisionMakingAnswer = ({ onFinish }: Props) => {
  const [answerQ1, setAnswerQ1] = useState<t_DM_ANSWER1 | undefined>();
  const [answerQ2, setAnswerQ2] = useState<t_DM_ANSWER2 | undefined>();
  const handleUserAnswer = (answer: string, questionType: string) => {
    let hasCompleted = false;
    if (questionType === "q1") {
      setAnswerQ1(answer as t_DM_ANSWER1);
      if (answerQ2) hasCompleted = true;
    } else if (questionType === "q2") {
      setAnswerQ2(answer as t_DM_ANSWER2);
      if (answerQ1) hasCompleted = true;
    }
    if (hasCompleted) onFinish();
  };
  return (
    <Box flex={1} bg="$white" px={"$4"} py="$5" justifyContent="center">
      <VStack
        width={"100%"}
        flexDirection="row"
        space="md"
        justifyContent="space-between"
      >
        {Object.entries(DM_ANSWER1).map(([key, value]) => (
          <DecisionMakingOption
            key={key}
            text={i18n.t(key)}
            userAnswer={answerQ1}
            answer={value as t_DM_ANSWER1}
            handleUserAnswer={handleUserAnswer}
            questionType="q1"
          />
        ))}
      </VStack>
      <Divider my="$5" bg="$black" />
      <VStack
        width={"100%"}
        flexDirection="row"
        space="md"
        justifyContent="space-between"
      >
        {Object.entries(DM_ANSWER2).map(([key, value]) => (
          <DecisionMakingOption
            key={key}
            text={i18n.t(key)}
            userAnswer={answerQ2}
            answer={value as t_DM_ANSWER2}
            handleUserAnswer={handleUserAnswer}
            questionType="q2"
          />
        ))}
      </VStack>
    </Box>
  );
};

export default DecisionMakingAnswer;
