import { View } from "@gluestack-ui/themed";
import React from "react";
import { MEMORY_ANSWER, MEMORY_STEPS, Steps } from "@/types/session";
import CVideo from "@/components/CVideo";
import SessionTrainingCountdown from "../SessionTrainingCountdown";
import RPE from "../RPE";
import SessionCountdown from "../SessionCountdown";
import { useMemoryWorkout } from "@/context/MemoryContext";
import MemoryAnswer from "./MemoryAnswer";

const MemoryIteration = () => {
  const {
    currentIterarion,
    currentIterationStep,
    workout,
    handleNextIteration,
    changeIterationStep,
    handleUserAnswer,
    handleUserRPE,
  } = useMemoryWorkout();

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
            imageName={
              currentIterarion.video
                ? "play_video"
                : "man_running_ready_to_workout"
            }
            iterationNumber={currentIterarion.iterationNumber}
            totalItaration={workout.iterations.length}
            type={currentIterarion.video ? "memory" : "dm"}
          />
        </>
      ) : currentIterationStep === "video" && currentIterarion.video ? (
        <>
          <CVideo
            uri={currentIterarion.video}
            onFinishVideo={() => handleFinishCountdown("beginMemoryWorkout")}
          />
        </>
      ) : currentIterationStep === "beginMemoryWorkout" ? (
        <>
          <SessionCountdown
            onFinishCountdown={() => handleFinishCountdown("workout")}
            initialCountdown={0}
            iterationNumber={currentIterarion.iterationNumber}
            totalItaration={workout.iterations.length}
            imageName="man_running_ready_to_workout"
            type="dm"
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
