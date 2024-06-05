import { useState, createContext, useContext, PropsWithChildren } from "react";
import {
  DM_ANSWER,
  DMAndMemWorkout,
  IterationDMAndMem,
  DM_WORKOUT_STATUS,
  SessionPostType,
  DM_MEM_STEPS,
  MEMORY_ANSWER,
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
  workout: DMAndMemWorkout;
  resultCharBarData: WorkoutResultBarChart[];
  startWorkout: () => void;
  prepareWorkout: (w: Workout) => void;
  changeIterationStep: (s: DM_MEM_STEPS) => void;
  handleUserDMAnswer: (a: DM_ANSWER) => void;
  handleUserMemAnswer: (ans: MEMORY_ANSWER) => void;
  handleUserDMRPE: (a?: number) => IterationDMAndMem;
  handleUserMemRPE: (a?: number) => IterationDMAndMem;
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
  const [workout, setWorkout] = useState<DMAndMemWorkout>(
    {} as DMAndMemWorkout
  );
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
      answeredDmInMs: 7,
      answeredMemInMs: 7,
      iterationNumber: i.repetitionNumber,
      isCorrect: false,
      answer_1Options: getOptions(i).optionsA1,
      answer_2Options: getOptions(i).optionsA2,
    };
    return i_;
  };
  const handleUserDMAnswer = (a: DM_ANSWER) => {
    const a_: IterationDMAndMem = {
      ...currentIterarion,
      userAnswerDM1: a.answer1,
      userAnswerDM2: a.asnwer2,
      isCorrect: a.isCorrect ?? false,
      answeredDmInMs: a.answeredInMs ?? 7,
    };
    setCurrentIterarion(a_);
  };
  const handleUserMemAnswer = (a: MEMORY_ANSWER) => {
    const a_: IterationDMAndMem = {
      ...currentIterarion,
      userAnswerMem1: a.answer1,
      userAnswerMem2: a.asnwer2,
      answeredMemInMs: a.answeredInMs ?? 7,
      isCorrect: a.isCorrect ?? false,
    };
    setCurrentIterarion(a_);
  };
  const handleUserDMRPE = (rpe?: number) => {
    const a_: IterationDMAndMem = {
      ...currentIterarion,
      rpe: rpe,
    };
    setCurrentIterarion(a_);
    return a_;
  };
  const handleUserMemRPE = (rpe?: number) => {
    const a_: IterationDMAndMem = {
      ...currentIterarion,
      rpeMem: rpe,
    };
    setCurrentIterarion(a_);
    return a_;
  };
  const prepareWorkout = (w: Workout) => {
    console.log("prepareWorkout", JSON.stringify(w, null, 2));
    const iterations_ = getIterationsOrdered(w);
    const workout_: DMAndMemWorkout = {
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
    const iterationWithVideos = workout.iterations.filter(
      (i) => i.dmVideo || i.memoryVideo
    );
    const correctAnswers = iterationWithVideos.reduce((ant, act) => {
      let count = 0;
      if (
        act.dmAnswer1 == act.userAnswerDM1 &&
        act.dmAnswer2 == act.userAnswerDM2
      )
        count++;
      if (
        act.memoryAnswer1 == act.userAnswerMem1 &&
        act.memoryAnswer2 == act.userAnswerMem2
      )
        count++;

      return count + ant;
    }, 0);
    //Manejo de Promedio
    let answerTotalTime = 0;
    for (const i of iterationWithVideos) {
      answerTotalTime += i.answeredDmInMs;
      answerTotalTime += i.answeredMemInMs;
    }
    console.log("answerTotalTime", answerTotalTime);

    return {
      date: formatDate(workout.date.start),
      totalTime: formatTimeDifference(workout.date.start, workout.date.end),
      correctAnswers,
      wrongAnswers: Math.abs(2 * iterationWithVideos.length - correctAnswers),
      answerAverageTime: formatSeconds(
        answerTotalTime / iterationWithVideos.length
      ),
      answerTotalTime: formatSeconds(answerTotalTime),
    };
  };
  const calculateResultCharBarData = () => {
    const memData: WorkoutResultBarChart[] = workout.iterations.map(
      (i, index) => ({
        x: index + 1,
        y: i.answeredMemInMs / 1000,
        hasVideo: i.memoryVideo?.length ? true : false,
        isCorrect: i.isCorrect,
        rpe: i.rpe,
      })
    );
    const dataDm: WorkoutResultBarChart[] = workout.iterations.map(
      (i, index) => ({
        x: index + 1,
        y: i.answeredDmInMs / 1000,
        hasVideo: i.dmVideo?.length ? true : false,
        isCorrect: i.isCorrect,
        rpe: i.rpe,
      })
    );
    setResultCharBarData([...memData, ...dataDm]);
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
        handleUserDMAnswer,
        handleUserMemAnswer,
        handleUserDMRPE,
        handleUserMemRPE,
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
  const a1 = i.answers.length ? i.answers[1].video1.answer1 : undefined;
  const a2 = i.answers.length ? i.answers[1].video1.answer2 : undefined;
  console.log("responses", a1, a2);
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
