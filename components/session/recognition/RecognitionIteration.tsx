import { View } from "@gluestack-ui/themed";
import React from "react";
import { DM_ANSWER, MEMORY_ANSWER, MEMORY_STEPS } from "@/types/session";
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
  const handleFinishCountdown = (step: MEMORY_STEPS) => {
    // Defer the state update until after the current rendering cycle
    setTimeout(() => {
      changeIterationStep(step);
    }, 0);
  };
  const onFinishDecision = (answer: MEMORY_ANSWER) => {
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
    if (currentIterarion.video) handleFinishCountdown("video");
    else handleFinishCountdown("workout");
  };
  return (
    <View flex={1}>
      {currentIterationStep === "beginning" ? (
        <>
          <SessionCountdown
            onFinishCountdown={handleSessionNextStep}
            initialCountdown={currentIterarion.timeToGetReadyInSec}
            // imageName="play_video"
            // TODO: SEND IMAGE ACCORDINGLY
            iterationNumber={currentIterarion.iterationNumber}
            totalItaration={workout.iterations.length}
            type="memory"
          />
        </>
      ) : currentIterationStep === "imageDecision" && currentIterarion.video ? (
        <>
          {/* <CVideo
            uri={currentIterarion.video}
            onFinishVideo={() => handleFinishCountdown("workout")}
          /> */}
        </>
      ) : currentIterationStep === "workout" ? (
        <SessionTrainingCountdown
          onFinishCountdown={() => handleFinishCountdown("decision")}
          initialCountdown={currentIterarion.timeToWorkoutInSec}
          hasVideo={!(currentIterarion.video == undefined)}
          iterationNumber={currentIterarion.iterationNumber}
          totalItaration={workout.iterations.length}
          imageName="touching_with_finger"
          type="memory"
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
