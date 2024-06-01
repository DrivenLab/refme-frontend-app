import { Box, Text } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";

import {
  IMAGE_NAME,
  RECOGNITION_VIDEO_TYPE,
  IterationRecognition,
  Answer,
} from "@/types/session";
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
  //   console.log({ currentAnswer });
  //   console.log("iteration.answers", iteration.answers[0]);
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
    // const a: DM_ANSWER = { ...asnwer };
    onFinish(userAnswer);
  }
  console.log("videoType", currentAnswer.videoType);
  console.log("video1", currentAnswer.video1.video);
  console.log("video2", currentAnswer.video2);
  return (
    <Box bg="$white" flex={1} height="100%">
      <CProgress totalTimeInSec={iteration.timeToAnswerInSec} />
      <Text>ans</Text>
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
