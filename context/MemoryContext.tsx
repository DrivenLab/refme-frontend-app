import { useState, createContext, useContext, PropsWithChildren } from "react";
import {
  MEMORY_ANSWER,
  MemoryWorkout,
  MEMORY_STEPS,
  IterationMemory,
  MEMORY_WORKOUT_STATUS,
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
import {
  MEMBER_TYPE,
  WORKOUT_TYPE,
  Workout,
  WorkoutResultBarChart,
  WorkoutResume,
} from "@/types/workout";
import {
  INITAL_TIME_TO_GET_READY,
  ITERATION_TOTAL_TIME,
  TIME_TO_ANSWER,
  TIME_TO_RPE,
  VIDEO_TIME_IN_SECONDS,
} from "@/constants/Session";
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
};

const MemoryContext = createContext<MemoryContextType>({} as MemoryContextType);
export function useMemoryWorkout() {
  return useContext(MemoryContext);
}

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
  const prepareIteration = ({
    i,
    timeToWorkout,
    ...rest
  }: {
    i: Iteration;
    timeToWorkout: number;
    type: WORKOUT_TYPE;
    memberType: MEMBER_TYPE;
    breakDuration: number;
  }) => {
    const a1 = i.answers.length ? i.answers[0].video1.answer1 : undefined;
    const a2 = i.answers.length ? i.answers[0].video1.answer2 : undefined;
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
    const i_: IterationMemory = {
      idIteration: i.id,
      video: i.answers.length ? i.answers[0].video1.video : undefined,
      answer1: i.answers.length
        ? Number(i.answers[0].video1.answer1)
        : undefined,
      answer2: i.answers.length
        ? Number(i.answers[0].video1.answer2)
        : undefined,
      timeToGetReadyInSec: calculateTimeToGetReady({ i, ...rest }),
      timeToWorkoutInSec: timeToWorkout,
      timeToAnswerInSec: TIME_TO_ANSWER[rest.memberType][rest.type],
      timeToRPEInSec: TIME_TO_RPE[rest.memberType][rest.type],
      answeredInMs: TIME_TO_ANSWER[rest.memberType][rest.type],
      iterationNumber: i.repetitionNumber,
      answer_1Options: optionsA1,
      answer_2Options: optionsA2,
      isCorrect: false,
    };
    return i_;
  };
  const calculateTimeToGetReady = (props: {
    i: Iteration;
    type: WORKOUT_TYPE;
    memberType: MEMBER_TYPE;
    breakDuration: number;
  }) => {
    if (props.i.repetitionNumber === 1) return 3;
    if (props.i.answers.length === 0)
      return (
        props.breakDuration -
        ITERATION_TOTAL_TIME[props.memberType][props.type] +
        VIDEO_TIME_IN_SECONDS[props.memberType][props.type]
      );
    else
      return (
        props.breakDuration - ITERATION_TOTAL_TIME[props.memberType][props.type]
      );
  };
  const handleUserAnswer = (a: MEMORY_ANSWER) => {
    const a_: IterationMemory = {
      ...currentIterarion,
      userAnswer1: a.answer1,
      userAnswer2: a.asnwer2,
      answeredInMs: a.answeredInMs ?? 7,
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
      iterations: iterations_.map((i) =>
        prepareIteration({
          i,
          timeToWorkout: w.excerciseDuration,
          breakDuration: w.breakDuration,
          memberType: w.memberType,
          type: w.type,
        })
      ),
      status: "pending",
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
  return (
    <MemoryContext.Provider
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
        startWorkout,
        workout,
        resultCharBarData,
      }}
    >
      {children}
    </MemoryContext.Provider>
  );
}
