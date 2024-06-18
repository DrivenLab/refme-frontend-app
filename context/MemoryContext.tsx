import { useState, createContext, useContext, PropsWithChildren } from "react";
import {
  MEMORY_ANSWER,
  MemoryWorkout,
  MEMORY_STEPS,
  IterationMemory,
  MEMORY_WORKOUT_STATUS,
  SessionPostType,
} from "@/types/session";
import { Iteration } from "@/types/session";
import {
  formatDate,
  formatSeconds,
  formatTimeDifference,
  generateUniqueRandomNumbersWithInitialValues,
  getIterationsOrdered,
  shuffleArray,
} from "@/utils/session";
import { Workout, WorkoutResultBarChart, WorkoutResume } from "@/types/workout";
import { TIME_TO_ANSWER, TIME_TO_RPE } from "@/constants/Session";
import { usePostSession } from "@/queries/session.query";
import { calculateNextTimeToGetReady } from "@/utils/workoutUtils";

type MemoryContextType = {
  currentIterarion: IterationMemory;
  currentIterationStep: MEMORY_STEPS;
  prepareWorkout: (w: Workout) => void;
  changeIterationStep: (s: MEMORY_STEPS) => void;
  handleUserAnswer: (a: MEMORY_ANSWER) => void;
  handleUserRPE: (a?: number) => IterationMemory;
  handleNextIteration: (i: IterationMemory) => void;
  updateWorkoutStatus: (s: MEMORY_WORKOUT_STATUS) => void;
  resume: WorkoutResume;
  startWorkout: () => void;
  workout: MemoryWorkout;
  resultCharBarData: WorkoutResultBarChart[];
  //handleNextStep:()=>void
  saveSession: () => void;
};

const MemoryContext = createContext<MemoryContextType>({} as MemoryContextType);
export function useMemoryWorkout() {
  return useContext(MemoryContext);
}
type PrepareIterationType = {
  _currentIteration: Iteration;
  oldIteration?: Iteration;
  workout: Workout;
};
const INITIAL_ITERATION_INDEX = 0;
export function MemoryProvider({ children }: PropsWithChildren) {
  const [workout, setWorkout] = useState<MemoryWorkout>({} as MemoryWorkout);
  const [iterationIndex, setIterationIndex] = useState(0);
  const [currentIterarion, setCurrentIterarion] = useState<IterationMemory>(
    {} as IterationMemory
  );
  const [currentIterationStep, setCurrentIterationStep] =
    useState<MEMORY_STEPS>("beginning");
  const [resume, setResume] = useState<WorkoutResume>({} as WorkoutResume);
  const [resultCharBarData, setResultCharBarData] = useState<
    WorkoutResultBarChart[]
  >([]);
  const { postSessionMutation } = usePostSession({
    workoutId: workout.workoutId,
  });
  const prepareIteration = ({
    _currentIteration,
    oldIteration,
    workout,
  }: PrepareIterationType) => {
    const { answers } = _currentIteration;
    const a1 = answers.length ? answers[0].video1.answer1 : undefined;
    const a2 = answers.length ? answers[0].video1.answer2 : undefined;
    let initialAnswerOptions = [];
    let optionsA1: number[] = [];
    let optionsA2: number[] = [];
    if (a1 && a2) {
      initialAnswerOptions = [Number(a1), Number(a2)];
      const options = generateUniqueRandomNumbersWithInitialValues(
        1,
        44,
        initialAnswerOptions,
        4
      );
      optionsA1 = shuffleArray(options);
      optionsA2 = shuffleArray(options);
    }
    const { type, memberType, breakDuration, excerciseDuration } = workout;
    const i_: IterationMemory = {
      idIteration: _currentIteration.id,
      video: answers.length ? answers[0].video1.video : undefined,
      answer1: answers.length ? Number(answers[0].video1.answer1) : undefined,
      answer2: answers.length ? Number(answers[0].video1.answer2) : undefined,
      timeToGetReadyInSec: calculateNextTimeToGetReady({
        i: oldIteration,
        type,
        breakDuration,
        memberType,
      }),
      timeToWorkoutInSec: excerciseDuration,
      timeToAnswerInSec: TIME_TO_ANSWER[memberType][type],
      timeToRPEInSec: TIME_TO_RPE[memberType][type],
      answeredInMs: TIME_TO_ANSWER[memberType][type],
      iterationNumber: _currentIteration.repetitionNumber,
      answer_1Options: optionsA1,
      answer_2Options: optionsA2,
      isCorrect: false,
    };
    return i_;
  };

  const handleUserAnswer = (a: MEMORY_ANSWER) => {
    if (!workout || !workout.memberType) {
      return;
    }
    const a_: IterationMemory = {
      ...currentIterarion,
      userAnswer1: a.answer1,
      userAnswer2: a.asnwer2,
      answeredInMs:
        a.answeredInMs ?? TIME_TO_ANSWER[workout.memberType]["memory"] * 1000,
      isCorrect: a.isCorrect ?? false,
    };
    setCurrentIterarion(a_);
  };
  const handleUserRPE = (rpe?: number) => {
    const a_: IterationMemory = {
      ...currentIterarion,
      rpe: rpe,
    };
    setCurrentIterarion(a_);
    return a_;
  };

  const prepareWorkout = (w: Workout) => {
    const iterations_ = getIterationsOrdered(w);
    const workout_: MemoryWorkout = {
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
          _currentIteration: i,
          oldIteration: iterations_[itIndex - 1],
          workout: w,
        })
      ),
      status: "pending",
      workoutId: w.id,
      type: w.type,
      memberType: w.memberType,
    };
    setWorkout(workout_);
    setCurrentIterationStep("beginning");
    setCurrentIterarion(workout_.iterations[INITIAL_ITERATION_INDEX]);
    setIterationIndex(0);
  };

  const handleNextIteration = (currentIterarion: IterationMemory) => {
    updateIteration(currentIterarion);

    if (iterationIndex < workout.iterations.length - 1) {
      const newCurrentIteration = workout.iterations[iterationIndex + 1];
      setCurrentIterarion(newCurrentIteration);
      setIterationIndex((prev) => prev + 1);
      setCurrentIterationStep(() => "beginning");
    } else {
      const date = workout.date;
      date.end = new Date();
      calculateResultCharBarData();
      setWorkout((prev) => ({ ...prev, date, status: "finished" }));
      setResume(getWorkoutResume());
      setIterationIndex(0);
      setCurrentIterarion(workout.iterations[INITIAL_ITERATION_INDEX]);
      setTimeout(() => {
        saveSession();
      }, 500);
    }
  };
  const updateIteration = (iteration: IterationMemory) => {
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

  const changeIterationStep = (step_: MEMORY_STEPS) => {
    if (step_ === "video" && !currentIterarion.video)
      setCurrentIterationStep("rpe");
    else if (step_ === "decision" && !currentIterarion.video)
      setCurrentIterationStep("rpe");
    else setCurrentIterationStep(step_);
  };
  const updateWorkoutStatus = (status: MEMORY_WORKOUT_STATUS) => {
    setWorkout((prev) => ({ ...prev, status }));
  };
  const getWorkoutResume = () => {
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
        y:
          i.answeredInMs / 1000 ||
          TIME_TO_ANSWER[workout.memberType || "ar"][workout.type],
        hasVideo: i.video?.length ? true : false,
        isCorrect: i.isCorrect,
        rpe: i.rpe,
      })
    );
    setResultCharBarData(data_);
  };
  const startWorkout = () => {
    setWorkout((prev) => ({
      ...prev,
      status: "inCourse",
      date: { ...prev.date, start: new Date() },
    }));
  };

  const saveSession = () => {
    const sessionsPayload: SessionPostType[] = workout.iterations.map((it) => ({
      workout_iteration: it.idIteration,
      answer_1: `${it.userAnswer1}`,
      answer_2: `${it.userAnswer2}`,
      borgScale: it.rpe,
      replyTime: it.answeredInMs,
    }));
    postSessionMutation.mutate(sessionsPayload);
  };
  return (
    <MemoryContext.Provider
      value={{
        currentIterarion,
        currentIterationStep,
        resume,
        workout,
        resultCharBarData,
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
    </MemoryContext.Provider>
  );
}
