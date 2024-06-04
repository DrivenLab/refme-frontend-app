import { Text, View } from "@gluestack-ui/themed";
import React from "react";
import { DM_ANSWER, Steps } from "@/types/session";
import { useDMWorkout } from "@/context/DmContext";
import CVideo from "@/components/CVideo";
import SessionTrainingCountdown from "../SessionTrainingCountdown";
import DecisionMakingAnswer from "../dm/DecisionMakingAnswer";
import RPE from "../RPE";
import SessionCountdown from "../SessionCountdown";
import DecisionMakingAnswerAssistant from "../dm/DecisionMakingAnswerAssistant";
import { useDMAndMemWorkout } from "@/context/DmAndMemoryContext";
import { useNavigation, useRouter } from "expo-router";

const DMAndMemIteration = () => {
  const {
    currentIterarion,
    handleNextIteration,
    changeIterationStep,
    currentIterationStep,
    handleUserAnswer,
    handleUserRPE,
    workout,
  } = useDMAndMemWorkout();

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
          <Text>uhea</Text>
          <SessionCountdown
            onFinishCountdown={() => handleFinishCountdown("workout")}
            initialCountdown={currentIterarion.timeToGetReadyInSec}
            imageName="play_video"
            iterationNumber={currentIterarion.iterationNumber}
            totalItaration={workout.iterations.length}
            type="memory"
          />
        </>
      ) : currentIterationStep === "workout" ? (
        <SessionTrainingCountdown
          onFinishCountdown={() => handleFinishCountdown("video")}
          initialCountdown={currentIterarion.timeToWorkoutInSec}
          hasVideo={!(currentIterarion.video == undefined)}
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

export default DMAndMemIteration;
