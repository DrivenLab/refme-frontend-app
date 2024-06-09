import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDelay } from "react-use-precision-timer";

import { Box } from "@gluestack-ui/themed";
import {
  IterationRecognition,
  RecognitionSingularAnswer as RecognitionSingularAnswerType,
} from "@/types/session";
import CProgress from "@/components/progress-bar/CProgress";
import { RecognitionSingularAnswer } from "./RecognitionSingularAnswer";

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
    const maxPlayers =
      currentAnswer &&
      currentAnswer.video2?.answer1 &&
      iteration.videoType === "players"
        ? currentAnswer.video1.answer1 > currentAnswer.video2.answer1
          ? currentAnswer.video1.answer1
          : currentAnswer.video2.answer1
        : "";
    setUserAnswer((prev) => {
      const newAnswer = [...prev];
      newAnswer[currentAnswerIndex] = {
        selectedAnswer: userSelectedAnswer,
        answeredInMs: onceTimer.getElapsedResumedTime(),
        isCorrect: ["hand", "foul"].includes(iteration.videoType)
          ? userSelectedAnswer === "yes"
          : iteration.videoType === "players"
          ? userSelectedAnswer === maxPlayers
          : iteration.videoType === "contact"
          ? false
          : true,
      };
      // TODO: HANDLE CONTACT!! Type
      return newAnswer;
    });
    handleNextCurrentAnswer();
  };

  return (
    <Box bg="$white" flex={1} height="100%">
      <CProgress totalTimeInSec={iteration.timeToAnswerInSec} />
      {currentAnswer && (
        <RecognitionSingularAnswer
          recognitionAnswer={currentAnswer}
          setAnswer={handleUserAnswer}
          selectedAnswer={
            userAnswer[currentAnswerIndex]?.selectedAnswer || null
          }
          recognitionType={currentAnswer?.videoType || "foul"}
        />
      )}
      {/* {currentAnswer.videoType === "contact" && (
        <RecognitionSingularAnswer.RecognitionSingularAnswerContactPoint
          recognitionAnswer={currentAnswer}
          setAnswer={(a) => setAnswer(a)}
        />
      )} */}
    </Box>
  );
};

export default RecognitionAnswer;
