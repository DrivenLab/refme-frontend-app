import { Box, Divider, Text, VStack } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { DM_ANSWER1, DM_ANSWER2 } from "@/constants/Session";
import DecisionMakingOption from "./DecisionMakingOption";
import i18n from "@/languages/i18n";
import { DM_ANSWER, IterationDM } from "@/types/session";
import CProgress from "@/components/progress-bar/CProgress";
import useCountdown from "@/hooks/useCountdown";

type Props = {
  onFinish: (a: DM_ANSWER) => void;
  iteration: IterationDM;
};

const DecisionMakingAnswer = ({ onFinish, iteration }: Props) => {
  const [asnwer, setAnswer] = useState<DM_ANSWER>({} as DM_ANSWER);
  const [hasCompleted, setHasCompleted] = useState(false);
  const { hasFinished, elapsedRunningTime } = useCountdown({
    stopInSec: iteration.timeToAnswerInSec,
    delay: 1,
  });
  useEffect(() => {
    if (hasFinished.current) handleOnFinishCountdown();
  }, [hasFinished.current]);
  function handleOnFinishCountdown() {
    const a: DM_ANSWER = {
      ...asnwer,
      isCorrect:
        asnwer.answer1 === iteration.answer1 &&
        asnwer.asnwer2 === iteration.answer2,
    };
    onFinish(a);
  }
  const handleUserAnswer = (answerSelected: string, questionType: string) => {
    const answer_ = { ...asnwer };
    let completed = false;
    if (questionType === "q1") {
      answer_.answer1 = answerSelected;
    } else if (questionType === "q2") {
      answer_.asnwer2 = answerSelected;
    }
    if (answer_.answer1 && answer_.asnwer2) completed = true;
    if (completed) {
      answer_.answeredInMs = elapsedRunningTime.current;
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
              showAnswer={hasCompleted}
              canTouch={hasCompleted == false}
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
              answerKey={key}
              text={i18n.t(key)}
              handleUserAnswer={() => handleUserAnswer(value, "q2")}
              hasMarked={value === asnwer.asnwer2}
              isCorrect={asnwer.asnwer2 === iteration.answer2}
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
