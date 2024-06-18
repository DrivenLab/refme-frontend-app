import { Box, VStack } from "@gluestack-ui/themed";
import React, { useCallback, useEffect, useState } from "react";
import { DM_ANSWER1, DM_ANSWER2 } from "@/constants/Session";
import DecisionMakingOption from "./DecisionMakingOption";
import i18n from "@/languages/i18n";
import { DM_ANSWER, IterationDM } from "@/types/session";
import CProgress from "@/components/progress-bar/CProgress";
import { DecisionMakingAnswerDivider } from "./DecisionMakingAnswerDivider";
import { useDelay } from "react-use-precision-timer";

type Props = {
  onFinish: (a: DM_ANSWER) => void;
  iteration: IterationDM;
};

const DecisionMakingAnswer = ({ onFinish, iteration }: Props) => {
  const [asnwer, setAnswer] = useState<DM_ANSWER>({} as DM_ANSWER);
  const [hasCompleted, setHasCompleted] = useState(false);
  const handleOnFinishCountdown = useCallback(() => {
    const isCorrect =
      Boolean(asnwer.answer1) &&
      asnwer.answer1 === iteration.answer1 &&
      Boolean(asnwer.asnwer2) &&
      asnwer.asnwer2 === iteration.answer2;

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
    if (hasCompleted) return;
    const answer_ = { ...asnwer };
    let completed = false;
    if (questionType === "q1") {
      answer_.answer1 = answerSelected;
    } else if (questionType === "q2") {
      answer_.asnwer2 = answerSelected;
    }
    if (answer_.answer1 && answer_.asnwer2) completed = true;
    if (completed) {
      answer_.answeredInMs = onceTimer.getElapsedRunningTime();
    }
    setAnswer(answer_);
    setHasCompleted(completed);
  };
  return (
    <Box bg="$white" flex={1}>
      <CProgress totalTimeInSec={iteration.timeToAnswerInSec} />
      <Box bg="$white" flex={1} px={"$4"} py="$5" justifyContent="center">
        <VStack
          width={"100%"}
          flexDirection="row"
          space="md"
          justifyContent="space-between"
        >
          {Object.entries(DM_ANSWER1).map(([key, value]) => (
            <DecisionMakingOption
              key={key}
              answerKey={key}
              text={i18n.t(key)}
              handleUserAnswer={() => handleUserAnswer(value, "q1")}
              hasMarked={value === asnwer.answer1}
              isCorrect={asnwer.answer1 === iteration.answer1}
              thisAnswerIsCorrect={value === iteration.answer1}
              showAnswer={hasCompleted}
              canTouch={hasCompleted == false}
            />
          ))}
        </VStack>
        <DecisionMakingAnswerDivider />
        <VStack
          width={"100%"}
          flexDirection="row"
          space="md"
          justifyContent="space-between"
        >
          {Object.entries(DM_ANSWER2).map(([key, value]) => (
            <DecisionMakingOption
              key={key}
              answerKey={key}
              text={i18n.t(key)}
              handleUserAnswer={() => handleUserAnswer(value, "q2")}
              hasMarked={value === asnwer.asnwer2}
              isCorrect={asnwer.asnwer2 === iteration.answer2}
              thisAnswerIsCorrect={value === iteration.answer2}
              showAnswer={hasCompleted}
              canTouch={hasCompleted == false}
            />
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default DecisionMakingAnswer;
