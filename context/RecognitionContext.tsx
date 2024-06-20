import { useState, createContext, useContext, PropsWithChildren } from "react";
import {
  RecognitionWorkout,
  RECOGNITION_STEPS,
  IterationRecognition,
  RECOGNITION_WORKOUT_STATUS,
  RecognitionSingularAnswer,
} from "@/types/session";
import { Iteration } from "@/types/session";
import {
  formatDate,
  formatSeconds,
  formatTimeDifference,
  getIterationsOrdered,
} from "@/utils/session";
import { Workout, WorkoutResultBarChart, WorkoutResume } from "@/types/workout";
import { TIME_TO_ANSWER, TIME_TO_RPE } from "@/constants/Session";
import { usePostSession } from "@/queries/session.query";
import { calculateNextTimeToGetReady } from "@/utils/workoutUtils";

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
  handleUserAnswer: (a: RecognitionSingularAnswer[]) => void;
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
    oldIteration,
    workout,
  }: {
    i: Iteration;
    oldIteration: Iteration;
    workout: Workout;
  }) => {
    const { excerciseDuration, type, memberType, breakDuration } = workout;
    const i_: IterationRecognition = {
      idIteration: i.id,
      video: i.answers.length ? i.answers[0].video1.video : undefined,
      timeToGetReadyInSec: calculateNextTimeToGetReady({
        i: oldIteration,
        breakDuration,
        type,
        memberType,
      }),
      timeToWorkoutInSec: excerciseDuration,
      timeToAnswerInSec: TIME_TO_ANSWER[memberType][type],
      timeToRPEInSec: TIME_TO_RPE[memberType][type],
      answeredInMs: TIME_TO_ANSWER[memberType][type] * 1000,
      iterationNumber: i.repetitionNumber,
      isCorrect: false,
      answers: i.answers,
      repetitionNumber: i.repetitionNumber,
      videoType: i.videoType || "foul",
      userAnswers: [],
    };
    return i_;
  };
  const handleUserAnswer = (a: RecognitionSingularAnswer[]) => {
    const a_: IterationRecognition = {
      ...currentIterarion,
      userAnswers: a,
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
      iterations: iterations_.map((i, itIndex) =>
        prepareIteration({
          i,
          workout: w,
          oldIteration: iterations_[itIndex - 1],
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
      //   saveSession();
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
    setCurrentIterationStep(step_);
  };
  const updateWorkoutStatus = (status: RECOGNITION_WORKOUT_STATUS) => {
    setWorkout((prev) => ({ ...prev, status }));
  };
  const getWorkoutResume = () => {
    const iterationWithVideos = workout.iterations.filter(
      (i) => i.answers.length > 0
    );
    let totalAnswers = 0;
    let correctAnswers = 0;
    iterationWithVideos.forEach((i) => {
      i.userAnswers.forEach((a) => {
        if (a.selectedAnswer) totalAnswers++;
        if (a.isCorrect) correctAnswers++;
      });
    });

    let answerTotalTime = 0;
    for (const i of iterationWithVideos) {
      i.userAnswers.forEach((a) => {
        answerTotalTime += a.answeredInMs;
      });
    }
    return {
      date: formatDate(workout.date.start),
      totalTime: formatTimeDifference(workout.date.start, workout.date.end),
      correctAnswers,
      wrongAnswers: Math.abs(totalAnswers - correctAnswers),
      answerAverageTime: formatSeconds(answerTotalTime / totalAnswers),
      answerTotalTime: formatSeconds(answerTotalTime),
    };
  };
  const calculateResultCharBarData = () => {
    const data_: WorkoutResultBarChart[] = [];
    let xIndex = 1;
    workout.iterations.forEach((i, index) => {
      i.userAnswers.forEach((a) => {
        if (a.selectedAnswer) {
          data_.push({
            x: xIndex,
            y: a.answeredInMs / 1000,
            hasVideo: i.video?.length ? true : false,
            isCorrect: a.isCorrect || false,
            rpe: i.rpe,
          });
          xIndex++;
        }
      });
    });
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
    // const sessionsPayload: SessionPostType[] = workout.iterations.map((it) => ({
    //   workout_iteration: it.idIteration,
    //   answer_1: `${it.userAnswer1}`,
    //   answer_2: `${it.userAnswer2}`,
    //   borgScale: it.rpe,
    //   replyTime: it.answeredInMs,
    // }));
    // postSessionMutation.mutate(sessionsPayload);
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
