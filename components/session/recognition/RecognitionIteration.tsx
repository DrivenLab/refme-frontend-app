import { View } from "@gluestack-ui/themed";
import React from "react";
import { RECOGNITION_ANSWER, RECOGNITION_STEPS } from "@/types/session";
import SessionTrainingCountdown from "../SessionTrainingCountdown";
import RPE from "../RPE";
import SessionCountdown from "../SessionCountdown";

import RecognitionAnswer from "./RecognitionAnswer";
import { useRecognitionWorkout } from "@/context/RecognitionContext";

const RecognitionIteration = () => {
  const {
    currentIterarion,
    currentIterationStep,
    handleNextIteration,
    changeIterationStep,
    handleUserAnswer,
    handleUserRPE,
    workout,
  } = useRecognitionWorkout();
  const handleFinishCountdown = (step: RECOGNITION_STEPS) => {
    // Defer the state update until after the current rendering cycle
    setTimeout(() => {
      changeIterationStep(step);
    }, 0);
  };
  const onFinishDecision = (answer: RECOGNITION_ANSWER) => {
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
    if (currentIterarion.video) handleFinishCountdown("imageDecision");
    else handleFinishCountdown("workout");
  };
  return (
    <View flex={1}>
      {currentIterationStep === "beginning" ? (
        <>
          <SessionCountdown
            onFinishCountdown={handleSessionNextStep}
            initialCountdown={currentIterarion.timeToGetReadyInSec}
            imageName="man_running_ready_to_workout"
            // TODO: SEND IMAGE ACCORDINGLY
            iterationNumber={currentIterarion.iterationNumber}
            totalItaration={workout.iterations.length}
            type="recognition"
            recognitionType={workout.recognitionType}
          />
        </>
      ) : currentIterationStep === "workout" ? (
        <SessionTrainingCountdown
          onFinishCountdown={() => handleFinishCountdown("imageDecision")}
          initialCountdown={currentIterarion.timeToWorkoutInSec}
          hasVideo={!(currentIterarion.video == undefined)}
          iterationNumber={currentIterarion.iterationNumber}
          totalItaration={workout.iterations.length}
          imageName="touching_with_finger"
          type="recognition"
          recognitionType=""
        />
      ) : currentIterationStep === "imageDecision" ? (
        <RecognitionAnswer
          onFinish={onFinishDecision}
          iteration={currentIterarion}
          recognitionType=""
        />
      ) : (
        <RPE onFinishRPE={onFinishRPE} iteration={currentIterarion} />
      )}
    </View>
  );
};

export default RecognitionIteration;
