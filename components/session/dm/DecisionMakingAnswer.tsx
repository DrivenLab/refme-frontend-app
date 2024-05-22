import { Box, Divider, Text, VStack } from "@gluestack-ui/themed";
import React, { useEffect, useMemo, useState } from "react";
import { DM_ANSWER1, DM_ANSWER2 } from "@/constants/Session";
import DecisionMakingOption from "./DecisionMakingOption";
import i18n from "@/languages/i18n";
import {
  DM_ANSWER,
  IterationContext,
  t_DM_ANSWER1,
  t_DM_ANSWER2,
} from "@/types/session";
import { getEndVideoTime } from "@/utils/session";
type Props = {
  onFinish: (a: DM_ANSWER) => void;
  iteration: IterationContext;
};
const DecisionMakingAnswer = ({ onFinish, iteration }: Props) => {
  const [asnwer, setAnswer] = useState<DM_ANSWER>({
    startTime: new Date(),
    endTime: getEndVideoTime(),
  } as DM_ANSWER);
  const [hasCompleted, setHasCompleted] = useState(false);
  const handleUserAnswer = (answer: string, questionType: string) => {
    const answer_ = { ...asnwer };
    let completed = false;
    if (questionType === "q1") {
      answer_.answer1 = answer;
    } else if (questionType === "q2") {
      answer_.asnwer2 = answer;
    }
    if (answer_.answer1 && answer_.asnwer2) {
      answer_.endTime = new Date();
      completed = true;
    }
    setAnswer(answer_);
    setHasCompleted(completed);
    if (completed) onFinish(answer_);
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
            handleUserAnswer={() => handleUserAnswer(value, "q1")}
            hasMarked={value === asnwer.answer1}
            isCorrect={hasCompleted && asnwer.answer1 === iteration.answer1}
            showAnswer={hasCompleted}
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
            handleUserAnswer={() => handleUserAnswer(value, "q2")}
            hasMarked={value === asnwer.asnwer2}
            isCorrect={asnwer.asnwer2 === iteration.answer2}
            showAnswer={hasCompleted}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default DecisionMakingAnswer;
