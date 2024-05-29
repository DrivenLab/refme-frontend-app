import { Box, Divider, VStack } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { MEMORY_ANSWER, IterationMemory } from "@/types/session";
import CProgress from "@/components/progress-bar/CProgress";
import useCountdown from "@/hooks/useCountdown";
import MemoryOption from "./MemoryOption";

type Props = {
  onFinish: (a: MEMORY_ANSWER) => void;
  iteration: IterationMemory;
};

const MemoryAnswer = ({ onFinish, iteration }: Props) => {
  const [asnwer, setAnswer] = useState<MEMORY_ANSWER>({} as MEMORY_ANSWER);
  const [hasCompleted, setHasCompleted] = useState(false);
  const { hasFinished, elapsedRunningTime } = useCountdown({
    stopInSec: iteration.timeToAnswerInSec,
    delay: 1,
  });
  useEffect(() => {
    if (hasFinished.current) handleOnFinishCountdown();
  }, [hasFinished.current]);
  function handleOnFinishCountdown() {
    const a: MEMORY_ANSWER = { ...asnwer };
    onFinish(a);
  }
  const handleUserAnswer = (answerSelected: number, questionType: string) => {
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
          {iteration.answer_1Options.map((option, key) => (
            <MemoryOption
              key={key}
              text={option + ""}
              handleUserAnswer={() => handleUserAnswer(option, "q1")}
              hasMarked={option === asnwer.answer1}
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
          {iteration.answer_2Options.map((option, key) => (
            <MemoryOption
              key={key}
              text={option + ""}
              handleUserAnswer={() => handleUserAnswer(option, "q2")}
              hasMarked={option === asnwer.asnwer2}
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

export default MemoryAnswer;
