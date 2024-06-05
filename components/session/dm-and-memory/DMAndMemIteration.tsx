import React from "react";
import { Text, View } from "@gluestack-ui/themed";

import { DM_MEM_STEPS, IterationDMAndMem } from "@/types/session";
import CVideo from "@/components/CVideo";
import { useDMAndMemWorkout } from "@/context/DmAndMemoryContext";

import SessionTrainingCountdown from "../SessionTrainingCountdown";
import DecisionMakingAnswer from "../dm/DecisionMakingAnswer";
import RPE from "../RPE";
import SessionCountdown from "../SessionCountdown";
import MemoryAnswer from "../memory/MemoryAnswer";

const DMAndMemIteration = () => {
  const {
    currentIterarion,
    handleNextIteration,
    changeIterationStep,
    currentIterationStep,
    handleUserDMAnswer,
    handleUserMemAnswer,
    handleUserDMRPE,
    handleUserMemRPE,
    workout,
  } = useDMAndMemWorkout();

  const handleFinishCountdown = (step: DM_MEM_STEPS) => {
    // Defer the state update until after the current rendering cycle
    setTimeout(() => {
      changeIterationStep(step);
    }, 0);
  };
  const onFinishRPE = (rpe?: number) => {
    const i = handleUserMemRPE(rpe);
    setTimeout(() => {
      handleNextIteration(i);
    }, 0);
  };
  // Flujo normal: mem-beginning mem-video dm-beginning dm-workout
  // dm-video dm-rpe dm-decision mem-workout mem-decision rpe
  // currentIterarion.iterationNumber = 2;
  console.log({ currentIterationStep, step: currentIterarion.iterationNumber });

  return (
    <View flex={1}>
      {currentIterationStep === "beginning" ? (
        <BeginningStep
          currentIteration={currentIterarion}
          handleFinishCountdown={handleFinishCountdown}
        />
      ) : currentIterationStep === "mem-beginning" ? (
        <>
          <SessionCountdown
            onFinishCountdown={() => handleFinishCountdown("mem-video")}
            initialCountdown={currentIterarion.timeToGetReadyInSec}
            imageName="play_video"
            iterationNumber={currentIterarion.iterationNumber}
            totalItaration={workout.iterations.length}
            type="memory"
          />
        </>
      ) : currentIterationStep === "mem-video" &&
        currentIterarion.memoryVideo ? (
        <>
          <CVideo
            uri={currentIterarion.memoryVideo}
            onFinishVideo={() => handleFinishCountdown("dm-beginning")}
          />
        </>
      ) : currentIterationStep === "dm-beginning" ? (
        <>
          <SessionCountdown
            onFinishCountdown={() => handleFinishCountdown("dm-workout")}
            initialCountdown={
              !currentIterarion.dmVideo
                ? currentIterarion.timeToGetReadyInSec
                : 0
            }
            imageName="man_running_ready_to_workout"
            iterationNumber={currentIterarion.iterationNumber}
            totalItaration={workout.iterations.length}
            type="dm"
          />
        </>
      ) : currentIterationStep === "dm-workout" ? (
        <SessionTrainingCountdown
          onFinishCountdown={() => {
            if (currentIterarion.dmVideo) {
              handleFinishCountdown("dm-video");
            } else {
              handleFinishCountdown("dm-rpe");
            }
          }}
          initialCountdown={currentIterarion.timeToWorkoutInSec}
          hasVideo={!(currentIterarion.dmVideo == undefined)}
          iterationNumber={currentIterarion.iterationNumber}
          totalItaration={workout.iterations.length}
          type="dm"
          imageName="play_video"
        />
      ) : currentIterationStep === "dm-video" && currentIterarion.dmVideo ? (
        <>
          <CVideo
            uri={currentIterarion.dmVideo}
            onFinishVideo={() => handleFinishCountdown("dm-decision")}
          />
        </>
      ) : currentIterationStep === "dm-decision" ? (
        <DecisionMakingAnswer
          onFinish={(answer) => {
            handleUserDMAnswer(answer);
            handleFinishCountdown("dm-rpe");
          }}
          iteration={{
            ...currentIterarion,
            answer1: currentIterarion.dmAnswer1,
            answer2: currentIterarion.dmAnswer2,
          }}
        />
      ) : currentIterationStep === "dm-rpe" ? (
        <RPE
          onFinishRPE={(rpe) => {
            handleUserDMRPE(rpe);
            handleFinishCountdown("beginning-mem-workout");
          }}
          iteration={currentIterarion}
        />
      ) : currentIterationStep === "beginning-mem-workout" ? (
        <SessionCountdown
          onFinishCountdown={() => handleFinishCountdown("mem-workout")}
          initialCountdown={0}
          imageName="man_running_ready_to_workout"
          iterationNumber={currentIterarion.iterationNumber}
          totalItaration={workout.iterations.length}
          type="dm"
        />
      ) : currentIterationStep === "mem-workout" ? (
        <SessionTrainingCountdown
          onFinishCountdown={() => {
            if (currentIterarion.memoryVideo)
              handleFinishCountdown("mem-decision");
            else handleFinishCountdown("mem-rpe");
          }}
          initialCountdown={currentIterarion.timeToWorkoutInSec}
          hasVideo={!(currentIterarion.memoryVideo == undefined)}
          iterationNumber={currentIterarion.iterationNumber}
          totalItaration={workout.iterations.length}
          imageName="touching_with_finger"
          type="memory"
        />
      ) : currentIterationStep === "mem-decision" ? (
        <MemoryAnswer
          onFinish={(answer) => {
            console.log("answer", answer);
            handleUserMemAnswer(answer);
            handleFinishCountdown("mem-rpe");
          }}
          iteration={{
            ...currentIterarion,
            // @ts-ignore
            answer1: currentIterarion.memoryAnswer1,
            // @ts-ignore
            answer2: currentIterarion.memoryAnswer2,
            answer_1Options: currentIterarion.answer_1Options,
            answer_2Options: currentIterarion.answer_2Options,
          }}
        />
      ) : currentIterationStep === "mem-rpe" ? (
        <RPE onFinishRPE={onFinishRPE} iteration={currentIterarion} />
      ) : (
        <Text>Invalid Step{currentIterationStep}</Text>
      )}
    </View>
  );
};

export default DMAndMemIteration;

type BeginningStepProps = {
  currentIteration: IterationDMAndMem;
  handleFinishCountdown: (step: DM_MEM_STEPS) => void;
};
const BeginningStep = ({
  currentIteration,
  handleFinishCountdown,
}: BeginningStepProps) => {
  if (!currentIteration.dmVideo) handleFinishCountdown("dm-beginning");
  else handleFinishCountdown("mem-beginning");
  return <></>;
};
