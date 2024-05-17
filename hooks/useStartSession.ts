import React, { useEffect, useState } from "react";
import useSession from "./useSession";
import { Iteration, Session } from "@/types/session";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
type Props = {
  idSession: string | number;
};
let currentIterationIndex = 0;
const getSessionOrderedByIterations = (session: Session) => {
  const iterations_ = session.workout.iterations.sort(
    (a, b) => a.repetitionNumber - b.repetitionNumber
  );
  session.workout.iterations = iterations_;
  return { ...session };
};
const useStartSession = ({ idSession }: Props) => {
  const [sessionOrdered, setSessionOrdered] = useState<Session>();

  const [currentIteration, setCurrentIteration] = useState<Iteration>();
  const [sessionStatus, setSessionStatus] = useState("pending");
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

  const handleOnNextIteration = ({ answer }: { answer: string }) => {
    if (!sessionOrdered) return;
    currentIterationIndex += 1;
    sessionAnswers.push(answer);
    if (currentIterationIndex <= sessionOrdered.workout.iterations.length) {
      setCurrentIteration(
        sessionOrdered?.workout?.iterations[currentIterationIndex]
      );
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
  };
};

export default useStartSession;
