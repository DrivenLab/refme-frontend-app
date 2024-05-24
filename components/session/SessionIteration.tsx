import { View, Text } from "@gluestack-ui/themed";
import React, { useState } from "react";
import CVideo from "../CVideo";
import SessionCountDown from "./SessionCountdown";
import SessionTrainingCountdown from "./SessionTrainingCountdown";
import DecisionMakingAnswer from "./dm/DecisionMakingAnswer";
import RPE from "./RPE";
import { useSession } from "@/context/SessionContext";
import { DM_ANSWER, IterationContext, Steps } from "@/types/session";

type Props = {
  iteration: IterationContext;
  step: Steps;
  handleChangeStep: (s: string) => void;
};
const SessionIteration = () => {
  const {
    currentIterarion,
    step,
    handleNextIteration,
    changeStep,
    handleUserAnswer,
    handleUserRPE,
  } = useSession();
  const handleFinishCountdown = (step: Steps) => {
    // Defer the state update until after the current rendering cycle
    setTimeout(() => {
      changeStep(step);
    }, 0);
  };
  const onFinishDecision = (answer: DM_ANSWER) => {
    handleUserAnswer(answer);
    handleFinishCountdown("rpe");
  };
  const onFinishRPE = (rpe?: number) => {
    console.log("rpe selected", rpe);
    handleUserRPE(rpe);
    setTimeout(() => {
      handleNextIteration();
    }, 0);
  };
  return (
    <View flex={1}>
      {step === "beginning" ? (
        <>
          <SessionCountDown
            onFinishCountdown={() => handleFinishCountdown("workout")}
            initialCountdown={currentIterarion.timeToGetReadyInSec}
            imageName="man_running_ready_to_workout"
          />
        </>
      ) : step === "workout" ? (
        <SessionTrainingCountdown
          onFinishCountdown={() => handleFinishCountdown("video")}
          initialCountdown={currentIterarion.timeToWorkoutInSec}
          hasNoVideo={currentIterarion.video == undefined}
        />
      ) : step === "video" && currentIterarion.video ? (
        <>
          <CVideo
            uri={currentIterarion.video}
            onFinishVideo={() => handleFinishCountdown("decision")}
          />
        </>
      ) : step === "decision" ? (
        <DecisionMakingAnswer
          onFinish={onFinishDecision}
          iteration={currentIterarion}
        />
      ) : (
        <RPE onFinishRPE={onFinishRPE} iteration={currentIterarion} />
      )}
    </View>
  );
};

export default SessionIteration;
