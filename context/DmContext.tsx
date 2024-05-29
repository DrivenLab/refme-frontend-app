import { useState, createContext, useContext, PropsWithChildren } from "react";
import {
  DM_ANSWER,
  DMWorkout,
  DM_STEPS,
  IterationDM,
  DM_WORKOUT_STATUS,
} from "@/types/session";
import { Iteration } from "@/types/session";
import {
  formatDate,
  formatMilliseconds,
  formatTimeDifference,
  getIterationsOrdered,
} from "@/utils/session";
import { Workout, WorkoutResume } from "@/types/workout";

type DMContextType = {
  currentIterarion: IterationDM;
  currentIterationStep: DM_STEPS;
  prepareWorkout: (w: Workout) => void;
  changeIterationStep: (s: DM_STEPS) => void;
  handleUserAnswer: (a: DM_ANSWER) => void;
  handleUserRPE: (a?: number) => IterationDM;
  handleNextIteration: (i: IterationDM) => void;
  updateWorkoutStatus: (s: DM_WORKOUT_STATUS) => void;
  resume: WorkoutResume;
  status: DM_WORKOUT_STATUS;
  startWorkout: () => void;
  workout: DMWorkout;
};

const DMContext = createContext<DMContextType>({} as DMContextType);
export function useDMWorkout() {
  return useContext(DMContext);
}

const INITIAL_ITERATION_INDEX = 0;
export function DMProvider({ children }: PropsWithChildren) {
  const [workout, setWorkout] = useState<DMWorkout>({} as DMWorkout);
  const [iterationIndex, setIterationIndex] = useState(0);
  const [currentIterarion, setCurrentIterarion] = useState<IterationDM>(
    {} as IterationDM
  );
  const [currentIterationStep, setCurrentIterationStep] =
    useState<DM_STEPS>("beginning");
  const [resume, setResume] = useState<WorkoutResume>({} as WorkoutResume);
  const [status, setStatus] = useState<DM_WORKOUT_STATUS>("pending");

  const prepareIteration = ({
    i,
    timeToWorkout,
  }: {
    i: Iteration;
    timeToWorkout: number;
  }) => {
    const i_: IterationDM = {
      idIteration: i.id,
      video: i.answers.length ? i.answers[0].video1.video : undefined,
      answer1: i.answers.length ? i.answers[0].video1.answer1 : undefined,
      answer2: i.answers.length ? i.answers[0].video1.answer2 : undefined,
      timeToGetReadyInSec:
        i.repetitionNumber === 1 ? 3 : i.answers.length ? 0 : 10,
      timeToWorkoutInSec: timeToWorkout,
      timeToAnswerInSec: 6,
      timeToRPEInSec: 3,
      answeredInMs: 7,
      iterationNumber: i.repetitionNumber,
    } as IterationDM;
    return i_;
  };
  const handleUserAnswer = (a: DM_ANSWER) => {
    const a_: IterationDM = {
      ...currentIterarion,
      userAnswer1: a.answer1,
      userAnswer2: a.asnwer2,
      answeredInMs: a.answeredInMs ?? 7,
    };
    setCurrentIterarion(a_);
  };
  const handleUserRPE = (rpe?: number) => {
    const a_: IterationDM = {
      ...currentIterarion,
      rpe: rpe,
    };
    setCurrentIterarion(a_);
    return a_;
  };
  const prepareWorkout = (w: Workout) => {
    const iterations_ = getIterationsOrdered(w);
    const workout_: DMWorkout = {
      date: {
        start: new Date(),
        end: new Date(),
      },
      breakDuration: w.breakDuration,
      exerciseDuration: w.excerciseDuration,
      maxDesicionTime: 7,
      maxRPETime: 7,
      numberOfDecisions: w.numberOfDecisions,
      numberOfRepetitions: w.numberOfRepetitions,
      iterations: iterations_.map((i) =>
        prepareIteration({
          i,
          timeToWorkout: w.excerciseDuration,
        })
      ),
      status: "pending",
    };
    setStatus("pending");
    setWorkout(workout_);
    setCurrentIterationStep("beginning");
    setCurrentIterarion(workout_.iterations[INITIAL_ITERATION_INDEX]);
  };

  const handleNextIteration = (currentIterarion: IterationDM) => {
    updateIteration(currentIterarion);
    console.log("len", workout.iterations.length, iterationIndex);
    if (iterationIndex < workout.iterations.length - 1) {
      const newCurrentIteration = workout.iterations[iterationIndex + 1];
      setCurrentIterarion(newCurrentIteration);
      setIterationIndex((prev) => prev + 1);
      setCurrentIterationStep(() =>
        newCurrentIteration.timeToGetReadyInSec === 0 ? "workout" : "beginning"
      );
    } else {
      const date = workout.date;
      date.end = new Date();
      setWorkout((prev) => ({ ...prev, date, status: "finished" }));
      setResume(getWorkoutResume());
    }
  };
  const updateIteration = (iteration: IterationDM) => {
    const index = workout.iterations.findIndex(
      (i) => i.idIteration === iteration.idIteration
    );

    //console.log("calling update iteration-----", index, iteration);
    if (index === -1) return;
    const w_ = { ...workout };
    w_.iterations[index] = {
      ...w_.iterations[index],
      ...iteration,
    };
    setWorkout(w_);
  };

  const changeIterationStep = (step_: DM_STEPS) => {
    if (step_ === "video" && !currentIterarion.video)
      setCurrentIterationStep("rpe");
    else if (step_ === "decision" && !currentIterarion.video)
      setCurrentIterationStep("rpe");
    else setCurrentIterationStep(step_);
  };
  const updateWorkoutStatus = (status: DM_WORKOUT_STATUS) => {
    setWorkout((prev) => ({ ...prev, status }));
  };
  const getWorkoutResume = () => {
    //console.log("session resume", s);
    const iterationWithVideos = workout.iterations.filter((i) => i.video);
    const correctAnswers = iterationWithVideos.filter((i) => {
      //Si al usuario le faltó responder algunas de las 2 preguntas, ya se pone como incorrecta.
      if (!i.answer1 || !i.answer2) return false;
      return i.answer1 == i.userAnswer1 && i.answer2 == i.userAnswer2;
    }).length;
    //Manejo de Promedio
    let answerTotalTime = 0;
    for (const i of iterationWithVideos) {
      answerTotalTime += i.answeredInMs;
    }

    return {
      date: formatDate(workout.date.start),
      totalTime: formatTimeDifference(workout.date.start, workout.date.end),
      correctAnswers,
      wrongAnswers: Math.abs(iterationWithVideos.length - correctAnswers),
      answerAverageTime: formatMilliseconds(
        answerTotalTime / iterationWithVideos.length
      ),
      answerTotalTime: formatMilliseconds(answerTotalTime),
    };
  };
  const startWorkout = () => {
    setWorkout((prev) => ({ ...prev, status: "inCourse" }));
  };
  return (
    <DMContext.Provider
      value={{
        currentIterarion,
        currentIterationStep,
        prepareWorkout,
        handleNextIteration,
        changeIterationStep,
        handleUserAnswer,
        handleUserRPE,
        updateWorkoutStatus,
        resume,
        status,
        startWorkout,
        workout,
      }}
    >
      {children}
    </DMContext.Provider>
  );
}
