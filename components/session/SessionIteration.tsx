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
};
type Steps = "beginning" | "workout" | "video" | "decision" | "rpe";
const SessionIteration = ({ iteration }: Props) => {
  const [steps, setSteps] = useState<Steps>("rpe");
  const handleFinishCountdown = (step: Steps) => {
    // Defer the state update until after the current rendering cycle
    setTimeout(() => {
      setSteps(step);
    }, 0);
  };
  return (
    <View flex={1}>
      {steps === "beginning" ? (
        <>
          <SessionCountDown
            onFinishCountdown={() => handleFinishCountdown("workout")}
            initialCountdown={4}
            imageName="man_running_ready_to_workout"
          />
        </>
      ) : steps === "workout" ? (
        <SessionTrainingCountdown
          onFinishCountdown={() => handleFinishCountdown("video")}
          initialCountdown={5}
        />
      ) : steps === "video" ? (
        <>
          <CVideo
            uri={iteration.answers[0].video1.video || ""}
            onFinishVideo={() => handleFinishCountdown("decision")}
          />
        </>
      ) : steps === "decision" ? (
        <DecisionMakingAnswer />
      ) : (
        <RPE />
      )}
    </View>
  );
};

export default SessionIteration;
