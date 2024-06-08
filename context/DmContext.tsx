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
import { calculateNextTimeToGetReady } from "@/utils/workoutUtils";
import { TIME_TO_ANSWER, TIME_TO_RPE } from "@/constants/Session";

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
    oldIteration,
    workout,
  }: {
    i: Iteration;
    oldIteration?: Iteration;
    workout: Workout;
  }) => {
    const { excerciseDuration, type, memberType } = workout;
    const i_: IterationDM = {
      idIteration: i.id,
      video: i.answers.length ? i.answers[0].video1.video : undefined,
      answer1: i.answers.length ? i.answers[0].video1.answer1 : undefined,
      answer2: i.answers.length ? i.answers[0].video1.answer2 : undefined,
      timeToGetReadyInSec: calculateNextTimeToGetReady({
        i: oldIteration,
        breakDuration: workout.breakDuration,
        type: workout.type,
        memberType: workout.memberType || "ar",
      }),
      timeToWorkoutInSec: excerciseDuration,
      timeToAnswerInSec: TIME_TO_ANSWER[memberType][type],
      timeToRPEInSec: TIME_TO_RPE[memberType][type],
      answeredInMs: TIME_TO_ANSWER[memberType][type],
      iterationNumber: i.repetitionNumber,
      isCorrect: false,
    };
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
      iterations: iterations_.map((i, itIndex) =>
        prepareIteration({
          i,
          oldIteration: iterations_[itIndex - 1],
          workout: w,
        })
      ),
      status: "pending",
      workoutId: w.id,
      type: w.type,
      memberType: w.memberType,
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
      setIterationIndex(0);
      setCurrentIterarion(workout.iterations[INITIAL_ITERATION_INDEX]);
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
    const iterationWithVideos = workout.iterations.filter((i) => i.video);
    const correctAnswers = iterationWithVideos.reduce(
      (prev, curr) => prev + (curr.isCorrect ? 1 : 0),
      0
    );
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
