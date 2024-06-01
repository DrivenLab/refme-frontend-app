import { View } from "@gluestack-ui/themed";
import React from "react";
import { MEMORY_ANSWER, Steps } from "@/types/session";
import CVideo from "@/components/CVideo";
import SessionTrainingCountdown from "../SessionTrainingCountdown";
import RPE from "../RPE";
import SessionCountdown from "../SessionCountdown";
import { useMemoryWorkout } from "@/context/MemoryContext";
import MemoryAnswer from "./MemoryAnswer";

const MemoryIteration = () => {
  const {
    currentIterarion,
    handleNextIteration,
    changeIterationStep,
    currentIterationStep,
    handleUserAnswer,
    handleUserRPE,
    workout,
  } = useMemoryWorkout();
  const handleFinishCountdown = (step: Steps) => {
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
            imageName="play_video"
            iterationNumber={currentIterarion.iterationNumber}
            totalItaration={workout.iterations.length}
            type="memory"
          />
        </>
      ) : currentIterationStep === "video" && currentIterarion.video ? (
        <>
          <CVideo
            uri={currentIterarion.video}
            onFinishVideo={() => handleFinishCountdown("workout")}
          />
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
      ) : currentIterationStep === "decision" ? (
        <MemoryAnswer
          onFinish={onFinishDecision}
          iteration={currentIterarion}
        />
      ) : (
        <RPE onFinishRPE={onFinishRPE} iteration={currentIterarion} />
      )}
    </View>
  );
};

export default MemoryIteration;
