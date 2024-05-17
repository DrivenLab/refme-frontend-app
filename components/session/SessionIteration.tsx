import { Iteration } from "@/types/session";
import { View, Text } from "@gluestack-ui/themed";
import React, { useState } from "react";
import CVideo from "../CVideo";
import SessionBeginning from "./SessionBeginning";
import SessionGetReady from "./SessionGetReady";
type Props = {
  iteration: Iteration;
};
type Steps =
  | "beginning"
  | "getReady"
  | "workout"
  | "readyForVideo"
  | "video"
  | "desicion"
  | "rpe";
const SessionIteration = ({ iteration }: Props) => {
  const [steps, setSteps] = useState<Steps>("beginning");
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
          <SessionBeginning
            onFinishCountdown={() => handleFinishCountdown("getReady")}
          />
        </>
      ) : steps === "getReady" ? (
        <>
          <SessionGetReady
            onFinishCountdown={() => handleFinishCountdown("video")}
          >
            <Text fontSize={30} textAlign="center">
              <Text fontWeight="bold" fontSize={30}>
                Prepárate{" "}
              </Text>
              para el{" "}
              <Text fontWeight="bold" fontSize={30}>
                ejercicio físico
              </Text>
            </Text>
          </SessionGetReady>
        </>
      ) : (
        <>
          <CVideo
            uri={iteration.answers[0].video1.video || ""}
            onFinishVideo={() => console.log("video finished")}
          />
        </>
      )}
    </View>
  );
};

export default SessionIteration;
