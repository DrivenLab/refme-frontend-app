import { Iteration } from "@/types/session";
import { View, Text } from "@gluestack-ui/themed";
import React, { useState } from "react";
import CVideo from "../CVideo";
import SessionCountDown from "./SessionCountdown";
import SessionTrainingCountdown from "./SessionTrainingCountdown";
import DecisionMakingAnswer from "./dm/DecisionMakingAnswer";
import RPE from "./RPE";

type Props = {
  iteration: Iteration;
  handleNextIteration: () => void;
  step: Steps;
  handleChangeStep: (s: string) => void;
  currentIteration: number;
  totalIteration: number;
};
type Steps = "beginning" | "workout" | "video" | "decision" | "rpe";
const SessionIteration = ({
  iteration,
  handleNextIteration,
  step,
  handleChangeStep,
}: Props) => {
  const handleFinishCountdown = (step: Steps) => {
    // Defer the state update until after the current rendering cycle
    setTimeout(() => {
      handleChangeStep(step);
    }, 0);
  };
  return (
    <View flex={1}>
      {step === "beginning" ? (
        <>
          <SessionCountDown
            onFinishCountdown={() => handleFinishCountdown("workout")}
            initialCountdown={4}
            imageName="man_running_ready_to_workout"
          />
        </>
      ) : step === "workout" ? (
        <SessionTrainingCountdown
          onFinishCountdown={() => handleFinishCountdown("video")}
          initialCountdown={5}
        />
      ) : step === "video" ? (
        <>
          <CVideo
            uri={iteration.answers[0].video1.video || ""}
            onFinishVideo={() => handleFinishCountdown("decision")}
          />
        </>
      ) : step === "decision" ? (
        <DecisionMakingAnswer onFinish={() => handleFinishCountdown("rpe")} />
      ) : (
        <RPE onFinishRPE={handleNextIteration} />
      )}
    </View>
  );
};

export default SessionIteration;
