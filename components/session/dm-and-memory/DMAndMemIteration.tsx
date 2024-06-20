import React, { useEffect } from "react";
import { Text, View } from "@gluestack-ui/themed";

import { DM_MEM_STEPS, IterationDMAndMem } from "@/types/session";
import CVideo from "@/components/CVideo";
import { useDMAndMemWorkout } from "@/context/DmAndMemoryContext";

import SessionTrainingCountdown from "../SessionTrainingCountdown";
import DecisionMakingAnswer from "../dm/DecisionMakingAnswer";
import RPE from "../RPE";
import SessionCountdown from "../SessionCountdown";
import MemoryAnswer from "../memory/MemoryAnswer";
import { useWhistleContext } from "@/hooks/useWhistle";
import { VIDEO_TIME_IN_SECONDS } from "@/constants/Session";

const DMAndMemIteration = () => {
  const {
    currentIterarion,
    workout,
    currentIterationStep,
    handleNextIteration,
    changeIterationStep,
    handleUserDMAnswer,
    handleUserMemAnswer,
    handleUserDMRPE,
    handleUserMemRPE,
    getNextIteration,
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
  const whistle = useWhistleContext();
  useEffect(() => {
    // WHISTLE LOGIC!
    if (
      currentIterationStep === "beginning" &&
      !currentIterarion.memoryVideo &&
      currentIterarion.timeToGetReadyInSec >= 3
    ) {
      setTimeout(async () => {
        await whistle.playAllSounds();
      }, (currentIterarion.timeToGetReadyInSec - 3) * 1000);
    } else if (currentIterationStep === "mem-video") {
      setTimeout(async () => {
        await whistle.playAllSounds();
      }, (VIDEO_TIME_IN_SECONDS[workout.memberType || "ar"]["memory"] - 3) * 1000);
    } else if (currentIterationStep === "dm-rpe") {
      setTimeout(async () => {
        await whistle.playAllSounds();
      }, 1000);
    } else if (
      currentIterationStep === "dm-workout" ||
      currentIterationStep === "mem-workout"
    ) {
      setTimeout(async () => {
        await whistle.playAllSounds();
      }, (currentIterarion.timeToWorkoutInSec - 3) * 1000);
    }
  }, [currentIterationStep]);

  const iterationNumberDm = currentIterarion.iterationNumber * 2 - 1;
  const iterationNumberMem = iterationNumberDm + 1;
  const totalIteration = workout.iterations.length * 2;

  // Flujo normal: mem-beginning mem-video dm-beginning dm-workout
  // dm-video dm-rpe dm-decision mem-workout mem-decision rpe
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
            initialCountdown={currentIterarion.iterationNumber == 1 ? 3 : 0}
            imageName="play_video"
            iterationNumber={iterationNumberDm}
            totalItaration={totalIteration}
            type="memory"
          />
        </>
      ) : currentIterationStep === "mem-video" &&
        currentIterarion.memoryVideo ? (
        <>
          <CVideo
            uri={currentIterarion.memoryVideo}
            delayTime={VIDEO_TIME_IN_SECONDS["re"]["memory"]}
            onFinishVideo={() => handleFinishCountdown("dm-beginning")}
          />
        </>
      ) : currentIterationStep === "dm-beginning" ? (
        <>
          <SessionCountdown
            onFinishCountdown={() => handleFinishCountdown("dm-workout")}
            initialCountdown={
              currentIterarion.iterationNumber === 1
                ? 0
                : currentIterarion.dmVideo
                ? (getNextIteration()?.timeToGetReadyInSec ?? 0) + 4
                : getNextIteration()?.timeToGetReadyInSec ?? 0
            }
            imageName="man_running_ready_to_workout"
            iterationNumber={iterationNumberDm}
            totalItaration={totalIteration}
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
          iterationNumber={iterationNumberDm}
          totalItaration={totalIteration}
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
          initialCountdown={getNextIteration()?.timeToGetReadyInSec ?? 0}
          imageName="man_running_ready_to_workout"
          iterationNumber={iterationNumberMem}
          totalItaration={totalIteration}
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
          iterationNumber={iterationNumberMem}
          totalItaration={totalIteration}
          imageName="touching_with_finger"
          type="memory"
        />
      ) : currentIterationStep === "mem-decision" ? (
        <MemoryAnswer
          onFinish={(answer) => {
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
