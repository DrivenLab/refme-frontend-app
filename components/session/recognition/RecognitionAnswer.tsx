import { Box } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";

import { IterationRecognition, Answer } from "@/types/session";
import CProgress from "@/components/progress-bar/CProgress";
import useCountdown from "@/hooks/useCountdown";
import * as RecognitionSingularAnswer from "./RecognitionSingularAnswer";

type Props = {
  iteration: IterationRecognition;
  onFinish: (a: any) => void;
};

type RecognitionAnswerType = string | number | null;

const RecognitionAnswer = ({ iteration, onFinish }: Props) => {
  const [answer, setAnswer] = useState<RecognitionAnswerType>(null);
  const [currentAnswer, setCurrentAnswer] = useState<Answer>(
    iteration.answers[0]
  );
  const [userAnswer, setUserAnswer] = useState<RecognitionAnswerType[]>([
    null,
    null,
    null,
  ]);
  //   const [hasCompleted, setHasCompleted] = useState(false);
  //   const isCorrect = answer === REAL_ANSWER;
  const { hasFinished, elapsedRunningTime } = useCountdown({
    stopInSec: iteration.timeToAnswerInSec,
    delay: 1,
  });
  useEffect(() => {
    setCurrentAnswer(iteration.answers[0]);
  }, [iteration]);
  useEffect(() => {
    if (hasFinished.current) handleOnFinishCountdown();
  }, [hasFinished.current]);

  function handleOnFinishCountdown() {
    onFinish(userAnswer);
  }
  return (
    <Box bg="$white" flex={1} height="100%">
      <CProgress totalTimeInSec={iteration.timeToAnswerInSec} />
      {currentAnswer.videoType === "foult" && (
        <RecognitionSingularAnswer.RecognitionSingularAnswerFault
          recognitionAnswer={currentAnswer}
          setAnswer={(a) => setAnswer(a)}
        />
      )}
      {currentAnswer.videoType === "hand" && (
        <RecognitionSingularAnswer.RecognitionSingularAnswerHand
          recognitionAnswer={currentAnswer}
          setAnswer={(a) => setAnswer(a)}
        />
      )}
      {currentAnswer.videoType === "players" && (
        <RecognitionSingularAnswer.RecognitionSingularAnswerNumberOfPlayers
          recognitionAnswer={currentAnswer}
          setAnswer={(a) => setAnswer(a)}
        />
      )}
      {currentAnswer.videoType === "contact" && (
        <RecognitionSingularAnswer.RecognitionSingularAnswerContactPoint
          recognitionAnswer={currentAnswer}
          setAnswer={(a) => setAnswer(a)}
        />
      )}
    </Box>
  );
};

export default RecognitionAnswer;
