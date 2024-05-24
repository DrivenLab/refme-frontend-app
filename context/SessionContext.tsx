import { useState, createContext, useContext, PropsWithChildren } from "react";
import {
  DM_ANSWER,
  SESSION_STATUS,
  SessionContext as SessionContextT,
  Session as SessionModel,
  Steps,
  IterationContext,
  SessionDate,
} from "@/types/session";
import { Iteration as IterationModel } from "@/types/session";
import { getSessionOrderedByIterations } from "@/utils/session";

type SessionContextType = {
  session: SessionContextT;
  currentIterarion: IterationContext;
  step: Steps;
  iterationIndex: number;
  createSession: (s: SessionModel) => void;
  changeStep: (s: Steps) => void;
  handleUserAnswer: (a: DM_ANSWER) => void;
  handleUserRPE: (a?: number) => void;
  updateSessionStatus: (s: SESSION_STATUS) => void;
  handleNextIteration: () => void;
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

  const getIteration = ({
    i,
    timeToWorkout,
  }: {
    i: IterationModel;
    timeToWorkout: number;
  }) => {
    const i_: IterationContext = {
      idIteration: i.id,
      video: i.answers.length ? i.answers[0].video1.video : undefined,
      answer1: i.answers.length ? i.answers[0].video1.answer1 : undefined,
      answer2: i.answers.length ? i.answers[0].video1.answer2 : undefined,
      timeToGetReadyInSec: 3,
      timeToWorkoutInSec: timeToWorkout,
      timeToAnswerInSec: 7,
      timeToRPEInSec: 2,
      answeredInMs: 7,
    } as IterationContext;
    return i_;
  };
  const handleUserAnswer = (a: DM_ANSWER) => {
    const a_: IterationContext = {
      ...currentIterarion,
      userAnswer1: a.answer1,
      userAnswer2: a.asnwer2,
      answeredInMs: a.answeredInMs ?? 7,
    };
    setCurrentIterarion(a_);
  };
  const handleUserRPE = (rpe?: number) => {
    const a_: IterationContext = {
      ...currentIterarion,
      rpe: rpe,
    };
    setCurrentIterarion(a_);
  };
  const createSession = (s: SessionModel) => {
    const sessionOrdered = getSessionOrderedByIterations(s);
    const session_: SessionContextT = {
      date: {
        start: new Date(),
        end: new Date(),
      },
      breakDuration: sessionOrdered.workout.breakDuration,
      exerciseDuration: sessionOrdered.workout.excerciseDuration,
      maxDesicionTime: 7,
      maxRPETime: 7,
      numberOfDecisions: sessionOrdered.workout.numberOfDecisions,
      numberOfRepetitions: sessionOrdered.workout.numberOfRepetitions,

      iterations: sessionOrdered.workout.iterations.map((i) =>
        getIteration({
          i,
          timeToWorkout: sessionOrdered.workout.excerciseDuration,
        })
      ),
      status: "pending",
    };
    setIterationIndex(INITIAL_ITERATION_INDEX);

    setSession(session_);
    setStep("beginning");
    setCurrentIterarion(session_.iterations[INITIAL_ITERATION_INDEX]);
  };
  const calculateTimeForIteration = () => {
    const index = session.iterations.findIndex(
      (i) => i.idIteration === i.idIteration
    );
    if (!index) return;
  };
  const handleNextIteration = () => {
    updateIteration(currentIterarion);
    if (iterationIndex < session.iterations.length - 1) {
      setCurrentIterarion(session.iterations[iterationIndex + 1]);
      setIterationIndex(iterationIndex + 1);
      setStep("beginning");
    } else {
      const date = session.date;
      date.end = new Date();
      setSession((prev) => ({ ...prev, status: "finished", date }));
    }
  };
  const updateIteration = (iteration: IterationContext) => {
    const index = session.iterations.findIndex(
      (i) => i.idIteration === iteration.idIteration
    );

    //console.log("calling update iteration-----", index, iteration);
    if (index === -1) return;
    const s_ = { ...session };
    s_.iterations[index] = {
      ...s_.iterations[index],
      ...iteration,
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
        currentIterarion,
        handleNextIteration,
        step,
        changeStep,
        handleUserAnswer,
        handleUserRPE,
        updateSessionStatus,
        iterationIndex,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
