import { useState, createContext, useContext, PropsWithChildren } from "react";
import {
  DM_ANSWER,
  DMWorkout,
  DM_STEPS,
  IterationDM,
  DM_WORKOUT_STATUS,
  SessionPostType,
} from "@/types/session";
import { Iteration } from "@/types/session";
import {
  formatDate,
  formatTimeDifference,
  formatSeconds,
  getIterationsOrdered,
} from "@/utils/session";
import { Workout, WorkoutResultBarChart, WorkoutResume } from "@/types/workout";
import { usePostSession } from "@/queries/session.query";

type DMContextType = {
  currentIterarion: IterationDM;
  currentIterationStep: DM_STEPS;
  resume: WorkoutResume;
  status: DM_WORKOUT_STATUS;
  workout: DMWorkout;
  resultCharBarData: WorkoutResultBarChart[];
  startWorkout: () => void;
  prepareWorkout: (w: Workout) => void;
  changeIterationStep: (s: DM_STEPS) => void;
  handleUserAnswer: (a: DM_ANSWER) => void;
  handleUserRPE: (a?: number) => IterationDM;
  handleNextIteration: (i: IterationDM) => void;
  updateWorkoutStatus: (s: DM_WORKOUT_STATUS) => void;
  saveSession: () => void;
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
  const [resultCharBarData, setResultCharBarData] = useState<
    WorkoutResultBarChart[]
  >([]);
  const { postSessionMutation } = usePostSession({
    workoutId: workout.workoutId,
  });
  const prepareIteration = ({
    i,
    timeToWorkout,
    timeToAnswerInSec,
  }: {
    i: Iteration;
    timeToWorkout: number;
    timeToAnswerInSec: number;
  }) => {
    const i_: IterationDM = {
      idIteration: i.id,
      video: i.answers.length ? i.answers[0].video1.video : undefined,
      answer1: i.answers.length ? i.answers[0].video1.answer1 : undefined,
      answer2: i.answers.length ? i.answers[0].video1.answer2 : undefined,
      timeToGetReadyInSec:
        i.repetitionNumber === 1 ? 3 : i.answers.length ? 0 : 10,
      timeToWorkoutInSec: timeToWorkout,
      timeToAnswerInSec: timeToAnswerInSec,
      timeToRPEInSec: 3,
      answeredInMs: 7,
      iterationNumber: i.repetitionNumber,
      isCorrect: false,
    } as IterationDM;
    return i_;
  };
  const handleUserAnswer = (a: DM_ANSWER) => {
    const a_: IterationDM = {
      ...currentIterarion,
      userAnswer1: a.answer1,
      userAnswer2: a.asnwer2,
      isCorrect: a.isCorrect ?? false,
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
          timeToAnswerInSec: w.type === "dm" ? 7 : w.type === "dmar" ? 4 : 0,
        })
      ),
      status: "pending",
      workoutId: w.id,
      type: w.type,
    };
    setStatus("pending");
    setWorkout(workout_);
    setCurrentIterationStep("beginning");
    setCurrentIterarion(workout_.iterations[INITIAL_ITERATION_INDEX]);
  };

  const handleNextIteration = (currentIterarion: IterationDM) => {
    updateIteration(currentIterarion);
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
      calculateResultCharBarData();
      setWorkout((prev) => ({ ...prev, date, status: "finished" }));
      setResume(getWorkoutResume());
    }
  };
  const updateIteration = (iteration: IterationDM) => {
    const index = workout.iterations.findIndex(
      (i) => i.idIteration === iteration.idIteration
    );

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
      answerAverageTime: formatSeconds(
        answerTotalTime / iterationWithVideos.length
      ),
      answerTotalTime: formatSeconds(answerTotalTime),
    };
  };
  const calculateResultCharBarData = () => {
    const data_: WorkoutResultBarChart[] = workout.iterations.map(
      (i, index) => ({
        x: index + 1,
        y: i.answeredInMs / 1000,
        hasVideo: i.video?.length ? true : false,
        isCorrect: i.isCorrect,
        rpe: i.rpe,
      })
    );
    setResultCharBarData(data_);
  };
  const startWorkout = () => {
    setWorkout((prev) => ({ ...prev, status: "inCourse" }));
  };
  const saveSession = () => {
    const sessionsPayload: SessionPostType[] = workout.iterations.map((it) => ({
      workout_iteration: it.idIteration,
      answer_1: it.userAnswer1,
      answer_2: it.userAnswer2,
      borgScale: it.rpe,
      replyTime: it.answeredInMs,
    }));
    postSessionMutation.mutate(sessionsPayload);
  };
  return (
    <DMContext.Provider
      value={{
        currentIterarion,
        currentIterationStep,
        workout,
        resultCharBarData,
        resume,
        status,
        prepareWorkout,
        handleNextIteration,
        changeIterationStep,
        handleUserAnswer,
        handleUserRPE,
        updateWorkoutStatus,
        startWorkout,
        saveSession,
      }}
    >
      {children}
    </DMContext.Provider>
  );
}
