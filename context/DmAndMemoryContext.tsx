import { useState, createContext, useContext, PropsWithChildren } from "react";
import {
  DM_ANSWER,
  DMWorkout,
  IterationDMAndMem,
  DM_WORKOUT_STATUS,
  SessionPostType,
  DM_MEM_STEPS,
} from "@/types/session";
import { Iteration } from "@/types/session";
import {
  formatDate,
  formatTimeDifference,
  formatSeconds,
  getIterationsOrdered,
  generateUniqueRandomNumbersWithInitialValues,
  shuffleArray,
} from "@/utils/session";
import { Workout, WorkoutResultBarChart, WorkoutResume } from "@/types/workout";
import { usePostSession } from "@/queries/session.query";

type DMAndMemoryContextType = {
  currentIterarion: IterationDMAndMem;
  currentIterationStep: DM_MEM_STEPS;
  resume: WorkoutResume;
  status: DM_WORKOUT_STATUS;
  workout: DMWorkout;
  resultCharBarData: WorkoutResultBarChart[];
  startWorkout: () => void;
  prepareWorkout: (w: Workout) => void;
  changeIterationStep: (s: DM_MEM_STEPS) => void;
  handleUserAnswer: (a: DM_ANSWER) => void;
  handleUserRPE: (a?: number) => IterationDMAndMem;
  handleNextIteration: (i: IterationDMAndMem) => void;
  updateWorkoutStatus: (s: DM_WORKOUT_STATUS) => void;
  saveSession: () => void;
};

const DMAndMemoryContext = createContext<DMAndMemoryContextType>(
  {} as DMAndMemoryContextType
);
export function useDMAndMemWorkout() {
  return useContext(DMAndMemoryContext);
}

const INITIAL_ITERATION_INDEX = 0;
export function DMAndMemProvider({ children }: PropsWithChildren) {
  const [workout, setWorkout] = useState<DMWorkout>({} as DMWorkout);
  const [iterationIndex, setIterationIndex] = useState(0);
  const [currentIterarion, setCurrentIterarion] = useState<IterationDMAndMem>(
    {} as IterationDMAndMem
  );
  const [currentIterationStep, setCurrentIterationStep] =
    useState<DM_MEM_STEPS>("beginning");
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
    const i_: IterationDMAndMem = {
      idIteration: i.id,
      dmVideo: i.answers.length ? i.answers[0].video1.video : undefined,
      memoryVideo: i.answers.length ? i.answers[1].video1.video : undefined,
      dmAnswer1: i.answers.length ? i.answers[0].video1.answer1 : undefined,
      dmAnswer2: i.answers.length ? i.answers[0].video1.answer2 : undefined,
      memoryAnswer1: i.answers.length ? i.answers[1].video1.answer1 : undefined,
      memoryAnswer2: i.answers.length ? i.answers[1].video1.answer2 : undefined,

      timeToGetReadyInSec:
        i.repetitionNumber === 1 ? 3 : i.answers.length ? 0 : 10,
      timeToWorkoutInSec: timeToWorkout,
      timeToAnswerInSec: timeToAnswerInSec,
      timeToRPEInSec: 3,
      answeredInMs: 7,
      iterationNumber: i.repetitionNumber,
      isCorrect: false,
      answer_1Options: getOptions(i).optionsA1,
      answer_2Options: getOptions(i).optionsA2,
    } as IterationDMAndMem;
    return i_;
  };
  const handleUserAnswer = (a: DM_ANSWER) => {
    const a_: IterationDMAndMem = {
      ...currentIterarion,
      userAnswer1: a.answer1,
      userAnswer2: a.asnwer2,
      isCorrect: a.isCorrect ?? false,
      answeredInMs: a.answeredInMs ?? 7,
    };
    setCurrentIterarion(a_);
  };
  const handleUserRPE = (rpe?: number) => {
    const a_: IterationDMAndMem = {
      ...currentIterarion,
      rpe: rpe,
    };
    setCurrentIterarion(a_);
    return a_;
  };
  const prepareWorkout = (w: Workout) => {
    console.log("prepareWorkout", JSON.stringify(w, null, 2));
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
          timeToAnswerInSec: 7,
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

  const handleNextIteration = (currentIterarion: IterationDMAndMem) => {
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
  const updateIteration = (iteration: IterationDMAndMem) => {
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

  const changeIterationStep = (step_: DM_MEM_STEPS) => {
    setCurrentIterationStep(step_);
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
    <DMAndMemoryContext.Provider
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
    </DMAndMemoryContext.Provider>
  );
}

const getOptions = (i: Iteration) => {
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
  return { optionsA1, optionsA2 };
};
