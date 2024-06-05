import { useState, createContext, useContext, PropsWithChildren } from "react";
import {
  RECOGNITION_ANSWER,
  RecognitionWorkout,
  RECOGNITION_STEPS,
  IterationRecognition,
  RECOGNITION_WORKOUT_STATUS,
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
import { usePostSession } from "@/queries/session.query";
type RecognitionContextType = {
  currentIterarion: IterationRecognition;
  currentIterationStep: RECOGNITION_STEPS;
  resume: WorkoutResume;
  workout: RecognitionWorkout;
  resultCharBarData: WorkoutResultBarChart[];
  startWorkout: () => void;
  saveSession: () => void;
  prepareWorkout: (w: Workout) => void;
  changeIterationStep: (s: RECOGNITION_STEPS) => void;
  handleUserAnswer: (a: RECOGNITION_ANSWER) => void;
  handleUserRPE: (a?: number) => IterationRecognition;
  handleNextIteration: (i: IterationRecognition) => void;
  updateWorkoutStatus: (s: RECOGNITION_WORKOUT_STATUS) => void;
};

const RecognitionContext = createContext<RecognitionContextType>(
  {} as RecognitionContextType
);
export function useRecognitionWorkout() {
  return useContext(RecognitionContext);
}

const INITIAL_ITERATION_INDEX = 0;
export function RecognitionProvider({ children }: PropsWithChildren) {
  const [workout, setWorkout] = useState<RecognitionWorkout>(
    {} as RecognitionWorkout
  );
  const [iterationIndex, setIterationIndex] = useState(0);
  const [currentIterarion, setCurrentIterarion] =
    useState<IterationRecognition>({} as IterationRecognition);
  const [currentIterationStep, setCurrentIterationStep] =
    useState<RECOGNITION_STEPS>("beginning");
  const [resume, setResume] = useState<WorkoutResume>({} as WorkoutResume);
  const [resultCharBarData, setResultCharBarData] = useState<
    WorkoutResultBarChart[]
  >([]);
  const { postSessionMutation } = usePostSession({
    workoutId: workout.workoutId,
  });
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
    const i_: IterationRecognition = {
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
      //   answer_1Options: optionsA1,
      //   answer_2Options: optionsA2,
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
  const handleUserAnswer = (a: RECOGNITION_ANSWER) => {
    // TODO: CORRECT ANSWERS TO USE 3
    const a_: IterationRecognition = {
      ...currentIterarion,
      userAnswer1: a.answer1,
      userAnswer2: a.asnwer2,
      answeredInMs: a.answeredInMs ?? 7,
      isCorrect: a.isCorrect ?? false,
      //   answers: [];
    };
    setCurrentIterarion(a_);
  };
  const handleUserRPE = (rpe?: number) => {
    const a_: IterationRecognition = {
      ...currentIterarion,
      rpe: rpe,
    };
    setCurrentIterarion(a_);
    return a_;
  };

  const prepareWorkout = (w: Workout) => {
    const iterations_ = getIterationsOrdered(w);
    const workout_: RecognitionWorkout = {
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
      workoutId: w.id,
    };
    setWorkout(workout_);
    setCurrentIterationStep("beginning");
    setCurrentIterarion(workout_.iterations[INITIAL_ITERATION_INDEX]);
    setIterationIndex(0);
  };

  const handleNextIteration = (currentIterarion: IterationRecognition) => {
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
  const updateIteration = (iteration: IterationRecognition) => {
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

  const changeIterationStep = (step_: RECOGNITION_STEPS) => {
    if (step_ === "imageDecision" && !currentIterarion.video)
      setCurrentIterationStep("rpe");
    else if (step_ === "workout" && !currentIterarion.video)
      setCurrentIterationStep("rpe");
    else setCurrentIterationStep(step_);
  };
  const updateWorkoutStatus = (status: RECOGNITION_WORKOUT_STATUS) => {
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
      answer_1: `${it.userAnswer1}`,
      answer_2: `${it.userAnswer2}`,
      borgScale: it.rpe,
      replyTime: it.answeredInMs,
    }));
    postSessionMutation.mutate(sessionsPayload);
  };
  return (
    <RecognitionContext.Provider
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
    </RecognitionContext.Provider>
  );
}
