import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDelay } from "react-use-precision-timer";

import { Box } from "@gluestack-ui/themed";
import {
  IterationRecognition,
  RecognitionSingularAnswer as RecognitionSingularAnswerType,
} from "@/types/session";
import CProgress from "@/components/progress-bar/CProgress";
import {
  RecognitionSingularAnswer,
  RecognitionSingularAnswerContactPoint,
} from "./RecognitionSingularAnswer";

type Props = {
  iteration: IterationRecognition;
  onFinish: (a: RecognitionSingularAnswerType[]) => void;
};

const RecognitionAnswer = ({ iteration, onFinish }: Props) => {
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<RecognitionSingularAnswerType[]>(
    []
  );

  const handleOnFinishCountdown = useCallback(() => {
    const _userAnswer = [...userAnswer];
    for (let i = currentAnswerIndex; i < 3; i++) {
      // If user didn't answer, set the answer to empty string and ms to 0
      _userAnswer.push({ selectedAnswer: null, answeredInMs: 0 });
    }
    onFinish(_userAnswer);
  }, [userAnswer]);

  const onceTimer = useDelay(
    iteration.timeToAnswerInSec * 1000,
    handleOnFinishCountdown
  );

  useEffect(() => {
    onceTimer.start();
  }, []);

  const handleNextCurrentAnswer = () => {
    if (currentAnswerIndex < 2) {
      setCurrentAnswerIndex((prev) => prev + 1);
    }
  };

  const currentAnswer = useMemo(
    () =>
      iteration?.answers.length > 0
        ? iteration.answers[currentAnswerIndex]
        : null,
    [iteration.answers, currentAnswerIndex]
  );

  const handleUserAnswer = (userSelectedAnswer: string) => {
    setUserAnswer((prev) => {
      const newAnswer = [...prev];
      if (newAnswer[currentAnswerIndex]) {
        return newAnswer;
      }
      let isCorrect = false;
      if (iteration.videoType === "hand" || iteration.videoType === "foul") {
        isCorrect = userSelectedAnswer === "yes";
      } else if (iteration.videoType === "players") {
        const maxPlayers =
          currentAnswer &&
          currentAnswer.video2?.answer1 &&
          iteration.videoType === "players"
            ? currentAnswer.video1.answer1 > currentAnswer.video2.answer1
              ? currentAnswer.video1.answer1
              : currentAnswer.video2.answer1
            : "";
        userSelectedAnswer === maxPlayers;
      } else {
        isCorrect =
          userSelectedAnswer.toLowerCase() === currentAnswer?.video1.answer3;
      }
      newAnswer[currentAnswerIndex] = {
        selectedAnswer: userSelectedAnswer,
        answeredInMs: onceTimer.getElapsedResumedTime(),
        isCorrect,
      };
      // TODO: HANDLE CONTACT!! Type
      return newAnswer;
    });

    //SHOW The current answer for 500ms
    setTimeout(() => {
      handleNextCurrentAnswer();
    }, 500);
  };
  if (!currentAnswer) return null;
  return (
    <Box bg="$white" flex={1} height="100%">
      <CProgress totalTimeInSec={iteration.timeToAnswerInSec} />
      {currentAnswer.videoType === "contact" ? (
        <RecognitionSingularAnswerContactPoint
          recognitionAnswer={currentAnswer}
          setAnswer={handleUserAnswer}
          selectedAnswer={
            userAnswer[currentAnswerIndex]?.selectedAnswer || null
          }
          recognitionType={currentAnswer?.videoType || "foul"}
        />
      ) : (
        <RecognitionSingularAnswer
          recognitionAnswer={currentAnswer}
          setAnswer={handleUserAnswer}
          selectedAnswer={
            userAnswer[currentAnswerIndex]?.selectedAnswer || null
          }
          recognitionType={currentAnswer?.videoType || "foul"}
        />
      )}
    </Box>
  );
};

export default RecognitionAnswer;
