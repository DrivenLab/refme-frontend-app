import { View } from "@gluestack-ui/themed";
import React, { useEffect } from "react";
import { RECOGNITION_STEPS, RecognitionSingularAnswer } from "@/types/session";
import SessionTrainingCountdown from "../SessionTrainingCountdown";
import RPE from "../RPE";
import SessionCountdown from "../SessionCountdown";

import RecognitionAnswer from "./RecognitionAnswer";
import { useRecognitionWorkout } from "@/context/RecognitionContext";
import { RecognitionImageMap } from "@/utils/session";
import { useWhistleContext } from "@/hooks/useWhistle";
import { TIME_TO_RPE } from "@/constants/Session";

const RecognitionIteration = () => {
  const {
    currentIterarion,
    currentIterationStep,
    workout,
    handleNextIteration,
    changeIterationStep,
    handleUserAnswer,
    handleUserRPE,
    getNextIteration
  } = useRecognitionWorkout();
  const handleFinishCountdown = (step: RECOGNITION_STEPS) => {
    // Defer the state update until after the current rendering cycle
    setTimeout(() => {
      changeIterationStep(step);
    }, 0);
  };
  const onFinishDecision = (answer: RecognitionSingularAnswer[]) => {
    handleUserAnswer(answer);
    handleFinishCountdown("rpe");
  };
  const onFinishRPE = (rpe?: number) => {
    const i = handleUserRPE(rpe);
    setTimeout(() => {
      handleNextIteration(i);
    }, 0);
  };
  const handleSessionNextStep = () => {
    if (currentIterarion.answers.length) {
      handleFinishCountdown("imageDecision");
    } else handleFinishCountdown("rpe");
  };
  const whistle = useWhistleContext();

  useEffect(() => {
    // WHISTLE LOGIC!
    if (
      currentIterationStep === "beginning" &&
      currentIterarion.timeToGetReadyInSec >= 3
    ) {
      setTimeout(async () => {
        await whistle.playAllSounds();
      }, (currentIterarion.timeToGetReadyInSec - 3) * 1000);
    } else if (currentIterationStep === "workout") {
      setTimeout(async () => {
        await whistle.playAllSounds();
      }, (currentIterarion.timeToWorkoutInSec - 3) * 1000);
    } else if (currentIterationStep === "rpe") {
      const nextIteration = getNextIteration();
      const time =
        (nextIteration?.timeToGetReadyInSec || 0) +
        TIME_TO_RPE[workout?.memberType || "ar"][workout.type];
      if (nextIteration && nextIteration?.timeToGetReadyInSec < 3) {
        setTimeout(async () => {
          await whistle.playAllSounds();
        }, (time - 3) * 1000);
      }
    }
  }, [currentIterationStep]);


  return (
    <View flex={1}>
      {currentIterationStep === "beginning" ? (
        <>
          <SessionCountdown
            onFinishCountdown={() => handleFinishCountdown("workout")}
            initialCountdown={currentIterarion.timeToGetReadyInSec}
            imageName="man_running_ready_to_workout"
            iterationNumber={currentIterarion.iterationNumber}
            totalItaration={workout.iterations.length}
            type="dm"
          />
        </>
      ) : currentIterationStep === "workout" ? (
        <SessionTrainingCountdown
          onFinishCountdown={handleSessionNextStep}
          initialCountdown={currentIterarion.timeToWorkoutInSec}
          hasVideo={currentIterarion.answers.length > 0}
          iterationNumber={currentIterarion.iterationNumber}
          totalItaration={workout.iterations.length}
          imageName={RecognitionImageMap[currentIterarion.videoType]}
          type="recognition"
          recognitionType={currentIterarion.videoType}
        />
      ) : currentIterationStep === "imageDecision" ? (
        <RecognitionAnswer
          onFinish={onFinishDecision}
          iteration={currentIterarion}
        />
      ) : (
        <RPE onFinishRPE={onFinishRPE} iteration={currentIterarion} />
      )}
    </View>
  );
};

export default RecognitionIteration;
