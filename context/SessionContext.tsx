import { useState, createContext, useContext, PropsWithChildren } from "react";
import {
  DM_ANSWER,
  SESSION_STATUS,
  SessionContext as SessionContextT,
  Session as SesssionModel,
  Steps,
  IterationContext,
} from "@/types/session";
import { Iteration as IterationModel } from "@/types/session";
import { getSessionOrderedByIterations } from "@/utils/session";

type SessionContextType = {
  session: SessionContextT;
  createSession: (s: SesssionModel) => void;
  updateIteration: (i: IterationContext) => void;
  currentIterarion: IterationContext;
  handleNextIteration: () => void;
  step: Steps;
  changeStep: (s: Steps) => void;
  handleUserAnswer: (a: DM_ANSWER) => void;
  handleUserRPE: (a: number) => void;
  updateSessionStatus: (s: SESSION_STATUS) => void;
};

const SessionContext = createContext<SessionContextType>(
  {} as SessionContextType
);
export function useSession() {
  return useContext(SessionContext);
}
const INITIAL_ITERATION_INDEX = 0;
export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<SessionContextT>(
    {} as SessionContextT
  );
  const [currentIterarion, setCurrentIterarion] = useState<IterationContext>(
    {} as IterationContext
  );
  const [step, setStep] = useState<Steps>("beginning");
  const [iterationIndex, setIterationIndex] = useState(INITIAL_ITERATION_INDEX);
  const getIteration = (i: IterationModel) => {
    const i_: IterationContext = {
      idIteration: i.id,
      video: i.answers.length ? i.answers[0].video1.video : undefined,
      answer1: i.answers.length ? i.answers[0].video1.answer1 : undefined,
      answer2: i.answers.length ? i.answers[0].video1.answer2 : undefined,
      timeToGetReady: 5,
      timeToWorkout: 5,
    } as IterationContext;
    return i_;
  };
  const handleUserAnswer = (a: DM_ANSWER) => {
    console.log("user answer", a);
    setCurrentIterarion((prev) => ({ ...prev, ...a }));
  };
  const handleUserRPE = (rpe: number) => {
    setCurrentIterarion((prev) => ({ ...prev, rpe }));
  };
  const createSession = (s: SesssionModel) => {
    const sessionOrdered = getSessionOrderedByIterations(s);
    const session_: SessionContextT = {
      breakDuration: sessionOrdered.workout.breakDuration,
      exerciseDuration: sessionOrdered.workout.excerciseDuration,
      maxDesicionTime: 7,
      maxRPETime: 7,
      numberOfDecisions: sessionOrdered.workout.numberOfDecisions,
      numberOfRepetitions: sessionOrdered.workout.numberOfRepetitions,
      iterations: sessionOrdered.workout.iterations.map((i) => getIteration(i)),
      status: "pending",
    };
    setIterationIndex(INITIAL_ITERATION_INDEX);
    setSession(session_);
    setStep("workout");
    setCurrentIterarion(session_.iterations[INITIAL_ITERATION_INDEX]);
  };
  const calculateTimeForIteration = () => {
    const index = session.iterations.findIndex(
      (i) => i.idIteration === i.idIteration
    );
    if (!index) return;
  };
  const handleNextIteration = () => {
    if (iterationIndex < session.iterations.length - 1) {
      setCurrentIterarion(session.iterations[iterationIndex + 1]);
      setIterationIndex(iterationIndex + 1);
      setStep("workout");
    } else {
      setSession((prev) => ({ ...prev, status: "finished" }));
    }
  };
  const updateIteration = (i: IterationContext) => {
    const index = session.iterations.findIndex(
      (i) => i.idIteration === i.idIteration
    );
    if (!index) return;
    const s_ = { ...session };
    s_.iterations[index] = {
      ...session.iterations[index],
      ...i,
    };
    setSession(s_);
  };

  const changeStep = (step_: Steps) => {
    if (step_ === "video" && !currentIterarion.video) setStep("rpe");
    else if (step === "decision" && !currentIterarion.video) setStep("rpe");
    else setStep(step_);
  };
  const updateSessionStatus = (status: SESSION_STATUS) => {
    setSession((prev) => ({ ...prev, status }));
  };
  return (
    <SessionContext.Provider
      value={{
        session,
        createSession,
        updateIteration,
        currentIterarion,
        handleNextIteration,
        step,
        changeStep,
        handleUserAnswer,
        handleUserRPE,
        updateSessionStatus,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
