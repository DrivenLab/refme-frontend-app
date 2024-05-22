import React, { useEffect, useState } from "react";
import useSession from "./useSession";
import { Iteration, Session } from "@/types/session";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { getSessionOrderedByIterations } from "@/utils/session";
type Props = {
  idSession: string | number;
};
type Steps = "beginning" | "workout" | "video" | "decision" | "rpe";

let currentIterationIndex = 0;

const useStartSession = ({ idSession }: Props) => {
  const [sessionOrdered, setSessionOrdered] = useState<Session>();
  const [currentIteration, setCurrentIteration] = useState<Iteration>();
  const [sessionStatus, setSessionStatus] = useState("pending");
  const [step, setStep] = useState<Steps>("beginning");

  const sessionAnswers: string[] = [];
  const queryClient = useQueryClient();
  useEffect(() => {
    const data = queryClient.getQueryData<AxiosResponse<Session>>([
      "sessions",
      idSession,
    ]);
    if (data) {
      const sessions_ = getSessionOrderedByIterations(data.data);
      setSessionOrdered(getSessionOrderedByIterations(data.data));
      setCurrentIteration(sessions_.workout.iterations[currentIterationIndex]);
    }
  }, []);

  const handleOnNextIteration = ({ answer }: { answer?: string }) => {
    console.log("neeextt----", currentIterationIndex, currentIterationIndex);
    if (!sessionOrdered) return;
    currentIterationIndex += 1;
    sessionAnswers.push(answer || "");
    if (currentIterationIndex <= sessionOrdered.workout.iterations.length - 1) {
      setCurrentIteration(
        sessionOrdered?.workout?.iterations[currentIterationIndex]
      );
      setStep("beginning");
    } else {
      console.log("here i have to manage the end of the workout");
    }
  };
  return {
    sessionOrdered,
    currentIteration,
    sessionStatus,
    setSessionStatus,
    handleOnNextIteration,
    step,
    onChangeStep: (s: string) => setStep(s as Steps),
  };
};

export default useStartSession;
