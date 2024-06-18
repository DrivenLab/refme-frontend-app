import { Box, VStack } from "@gluestack-ui/themed";
import React, { useCallback, useEffect, useState } from "react";
import { DMAR_ANSWER } from "@/constants/Session";
import i18n from "@/languages/i18n";
import { DM_ANSWER, IterationDM } from "@/types/session";
import CProgress from "@/components/progress-bar/CProgress";
import DecisionMakingOptionAssistant from "./DecisionMakingOptionAssistant";
import { useDelay } from "react-use-precision-timer";

type Props = {
  onFinish: (a: DM_ANSWER) => void;
  iteration: IterationDM;
};

const DecisionMakingAnswerAssistant = ({ onFinish, iteration }: Props) => {
  const [asnwer, setAnswer] = useState<DM_ANSWER>({} as DM_ANSWER);
  const [hasCompleted, setHasCompleted] = useState(false);

  const handleOnFinishCountdown = useCallback(() => {
    const isCorrect =
      Boolean(asnwer.answer1) && asnwer.answer1 === iteration.answer1;
    const a: DM_ANSWER = {
      ...asnwer,
      isCorrect,
    };
    onFinish(a);
  }, [asnwer, iteration]);

  const onceTimer = useDelay(
    iteration.timeToAnswerInSec * 1000,
    handleOnFinishCountdown
  );
  useEffect(() => {
    onceTimer.start();
  }, []);

  const handleUserAnswer = (answerSelected: string, questionType: string) => {
    const answer_ = { ...asnwer };
    let completed = false;
    if (questionType === "q1") {
      answer_.answer1 = answerSelected;
    }
    if (answer_.answer1) completed = true;
    if (completed) {
      answer_.answeredInMs = onceTimer.getElapsedRunningTime();
    }
    setAnswer(answer_);
    setHasCompleted(completed);
  };

  return (
    <Box bg="$white" flex={1}>
      <CProgress totalTimeInSec={iteration.timeToAnswerInSec} />
      <Box bg="$white" flex={1} p="$8" justifyContent="center">
        <VStack
          p="$6"
          width={"100%"}
          flexDirection="row"
          space="md"
          justifyContent="space-between"
          height={"100%"}
        >
          {Object.entries(DMAR_ANSWER).map(([key, value]) => (
            <DecisionMakingOptionAssistant
              key={key}
              answerKey={key}
              text={i18n.t(key)}
              handleUserAnswer={() => handleUserAnswer(value, "q1")}
              hasMarked={value === asnwer.answer1}
              isCorrect={asnwer.answer1 === iteration.answer1}
              showAnswer={hasCompleted}
              canTouch={hasCompleted == false}
            />
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default DecisionMakingAnswerAssistant;
