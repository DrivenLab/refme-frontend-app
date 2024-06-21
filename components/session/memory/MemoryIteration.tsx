import React, { useEffect } from "react";

import { View } from "@gluestack-ui/themed";
import { MEMORY_ANSWER, MEMORY_STEPS, Steps, IterationMemory } from "@/types/session";
import CVideo from "@/components/CVideo";
import SessionTrainingCountdown from "../SessionTrainingCountdown";
import RPE from "../RPE";
import SessionCountdown from "../SessionCountdown";
import { useMemoryWorkout } from "@/context/MemoryContext";
import MemoryAnswer from "./MemoryAnswer";
import { useWhistleContext } from "@/hooks/useWhistle";
import {
  ITERATION_TOTAL_TIME,
  TIME_TO_ANSWER,
  TIME_TO_RPE,
  VIDEO_TIME_IN_SECONDS,
} from "@/constants/Session";


const MemoryIteration = () => {
  const {
    currentIterarion,
    currentIterationStep,
    workout,
    handleNextIteration,
    changeIterationStep,
    handleUserAnswer,
    handleUserRPE,
    getPreviousIteration,
    getNextIteration
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
  const whistle = useWhistleContext();
  useEffect(() => {
    // WHISTLE LOGIC!
    if (
      currentIterationStep === "beginning" &&
      !currentIterarion.video &&
      currentIterarion.iterationNumber == 1
      && currentIterarion.timeToGetReadyInSec >=3
    ) {
      setTimeout(async () => {
        await whistle.playAllSounds();
      }, (currentIterarion.timeToGetReadyInSec - 3) * 1000);
    }
    if (currentIterationStep === "video") {
      const videoTime =
        VIDEO_TIME_IN_SECONDS[workout.memberType || "ar"]["memory"];
      setTimeout(async () => {
        await whistle.playAllSounds();
      }, (videoTime + calculateInitialCountdown(currentIterarion, getPreviousIteration()) - 3) * 1000);
      return;
    }
    if (currentIterationStep === "rpe" && !getNextIteration()?.video) {
      const rpeTime = TIME_TO_RPE[workout.memberType || "ar"]["memory"];
      const nextIteration = getNextIteration();

      const waitTime = calculateInitialCountdown(
        nextIteration,
        currentIterarion
      );
      
      if (nextIteration) {
        setTimeout(async () => {
          await whistle.playAllSounds();
        }, (rpeTime + waitTime - 3) * 1000);
      }
      return;
    } 
    
    if (
      currentIterationStep === "workout"
    ) {
      setTimeout(async () => {
        await whistle.playAllSounds();
      }, (currentIterarion.timeToWorkoutInSec - 3) * 1000);
    }
    
  }, [currentIterationStep]);

  const calculateInitialCountdown = (
    currentIterarion?: IterationMemory,
    prevIteration?: IterationMemory
  ) => {
    const minimumTime = workout.breakDuration - ITERATION_TOTAL_TIME[workout.memberType || "re"]["memory"]
    if (currentIterarion?.iterationNumber === 1) {
      return 0;
    } else if (currentIterarion?.video && prevIteration?.video) {      
      return (minimumTime ?? 0) ;
    
    } else if (currentIterarion?.video && !prevIteration?.video) {
      return (minimumTime ?? 0) + 6;
    
    } else if (!currentIterarion?.video && prevIteration?.video) {
      return (minimumTime ?? 0)  + 1 + 5;
    
    } else {
      return (minimumTime ?? 0) + 6 + 1 + 5;

    }
  };

  return (
    <View flex={1}>
      {currentIterationStep === "beginning" ? (
        <BeginningStep
        currentIteration={currentIterarion}
        handleFinishCountdown={handleFinishCountdown}
      />): currentIterationStep === "videoBeginning" ? (
        <> 
          <SessionCountdown
            onFinishCountdown={handleSessionNextStep}
            initialCountdown={currentIterarion?.iterationNumber === 1 ? 3 : 0}
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
            delayTime={VIDEO_TIME_IN_SECONDS["re"][workout.type]}
            onFinishVideo={() => handleFinishCountdown("beginMemoryWorkout")}
          />
        </>
      ) : currentIterationStep === "beginMemoryWorkout" ? (
        <>
          <SessionCountdown
            onFinishCountdown={() => handleFinishCountdown("workout")}
            initialCountdown={calculateInitialCountdown(
              currentIterarion,
              getPreviousIteration()
            )}
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

type BeginningStepProps = {
  currentIteration: IterationMemory;
  handleFinishCountdown: (step: MEMORY_STEPS) => void;
};
const BeginningStep = ({
  currentIteration,
  handleFinishCountdown,
}: BeginningStepProps) => {
  if (!currentIteration.video && currentIteration?.iterationNumber !== 1) handleFinishCountdown("beginMemoryWorkout");
  else handleFinishCountdown("videoBeginning");
  return <></>;
};
