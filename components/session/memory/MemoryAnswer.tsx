import { Box, Divider, HStack } from "@gluestack-ui/themed";
import React, { useCallback, useEffect, useState } from "react";
import { MEMORY_ANSWER, IterationMemory } from "@/types/session";
import CProgress from "@/components/progress-bar/CProgress";
import MemoryOption from "./MemoryOption";
import IconPersonWhoFault from "@/assets/svgs/IconPersonWhoFault";
import IconPersonWhoRecieveFault from "@/assets/svgs/IconPersonWhoRecieveFault";
import { useDelay } from "react-use-precision-timer";

type Props = {
  onFinish: (a: MEMORY_ANSWER) => void;
  iteration: IterationMemory;
};

const MemoryAnswer = ({ onFinish, iteration }: Props) => {
  const [asnwer, setAnswer] = useState<MEMORY_ANSWER>({} as MEMORY_ANSWER);
  const [hasCompleted, setHasCompleted] = useState(false);
  const handleOnFinishCountdown = useCallback(() => {
    const a: MEMORY_ANSWER = {
      ...asnwer,
      isCorrect:
        asnwer.answer1 == iteration.answer1 &&
        asnwer.asnwer2 == iteration.answer2,
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

  const handleUserAnswer = (answerSelected: number, questionType: string) => {
    const answer_ = { ...asnwer };
    let completed = false;
    if (questionType == "q1") {
      answer_.answer1 = answerSelected;
    } else if (questionType == "q2") {
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
      <Box bg="$white" flex={1} px={"$9"} py="$5" justifyContent="center">
        <HStack
          width={"100%"}
          flexDirection="row"
          space="xl"
          justifyContent="space-between"
        >
          <IconPersonWhoFault width={100} height={100} />
          {iteration.answer_1Options.map((option, key) => (
            <MemoryOption
              key={key}
              text={option + ""}
              handleUserAnswer={() => handleUserAnswer(option, "q1")}
              hasMarked={option == asnwer.answer1}
              isCorrect={asnwer.answer1 == iteration.answer1}
              showAnswer={hasCompleted}
              canTouch={hasCompleted == false}
            />
          ))}
        </HStack>
        <Box position="relative">
          <Divider
            my="$5"
            bg="$black"
            h={3}
            position="relative"
            w="$full"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box h={12} w={12} rounded={"$full"} bgColor="black"></Box>
          </Divider>
        </Box>

        <HStack
          width={"100%"}
          flexDirection="row"
          space="xl"
          justifyContent="space-between"
        >
          <IconPersonWhoRecieveFault width={100} height={100} />
          {iteration.answer_2Options.map((option, key) => (
            <MemoryOption
              key={key}
              text={option + ""}
              handleUserAnswer={() => handleUserAnswer(option, "q2")}
              hasMarked={option == asnwer.asnwer2}
              isCorrect={asnwer.asnwer2 == iteration.answer2}
              showAnswer={hasCompleted}
              canTouch={hasCompleted == false}
            />
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

export default MemoryAnswer;
