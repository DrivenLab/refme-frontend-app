import { View } from "@gluestack-ui/themed";
import React from "react";
import { DM_ANSWER, Steps } from "@/types/session";
import { useDMWorkout } from "@/context/DmContext";
import CVideo from "@/components/CVideo";
import SessionTrainingCountdown from "../SessionTrainingCountdown";
import DecisionMakingAnswer from "./DecisionMakingAnswer";
import RPE from "../RPE";
import SessionCountdown from "../SessionCountdown";
import DecisionMakingAnswerAssistant from "./DecisionMakingAnswerAssistant";

const DecisionMakingIteration = () => {
  const {
    currentIterarion,
    currentIterationStep,
    workout,
    handleNextIteration,
    changeIterationStep,
    handleUserAnswer,
    handleUserRPE,
  } = useDMWorkout();
  const handleFinishCountdown = (step: Steps) => {
    // Defer the state update until after the current rendering cycle
    setTimeout(() => {
      changeIterationStep(step);
    }, 0);
  };
  const onFinishDecision = (answer: DM_ANSWER) => {
    handleUserAnswer(answer);
    handleFinishCountdown("rpe");
  };
  const onFinishRPE = (rpe?: number) => {
    const i = handleUserRPE(rpe);
    setTimeout(() => {
      handleNextIteration(i);
    }, 0);
  };

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
          onFinishCountdown={() => handleFinishCountdown("video")}
          initialCountdown={currentIterarion.timeToWorkoutInSec}
          hasVideo={Boolean(currentIterarion.video)}
          iterationNumber={currentIterarion.iterationNumber}
          totalItaration={workout.iterations.length}
          type="dm"
          imageName="play_video"
        />
      ) : currentIterationStep === "video" && currentIterarion.video ? (
        <>
          <CVideo
            uri={currentIterarion.video}
            onFinishVideo={() => handleFinishCountdown("decision")}
          />
        </>
      ) : currentIterationStep === "decision" ? (
        workout.type === "dm" ? (
          <DecisionMakingAnswer
            onFinish={onFinishDecision}
            iteration={currentIterarion}
          />
        ) : workout.type === "dmar" ? (
          <DecisionMakingAnswerAssistant
            onFinish={onFinishDecision}
            iteration={currentIterarion}
          />
        ) : null
      ) : (
        <RPE onFinishRPE={onFinishRPE} iteration={currentIterarion} />
      )}
    </View>
  );
};

export default DecisionMakingIteration;
