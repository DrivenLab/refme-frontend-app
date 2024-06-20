import { Video } from "./multimedia";
import { WORKOUT_TYPE, Workout } from "./workout";

export interface Session {
  id: number;
  workout: Workout;
  createdAt: string;
  modifiedAt: string;
  isActive: boolean;
  isCompleted: boolean;
  user: number;
  workoutId: number;
  userIterationAnswer: any[];
}
export type IterationWorkout = {
  idIteration: number;
  video?: string;
  answeredInMs: number;
  rpe?: number;
  timeToAnswerInSec: number;
  timeToRPEInSec: number;
  timeToGetReadyInSec: number;
  timeToWorkoutInSec: number;
  iterationNumber: number;
};
export type IterationDM = IterationWorkout & {
  answer1?: string;
  answer2?: string;
  userAnswer1?: string;
  userAnswer2?: string;
  isCorrect: boolean;
};
type _IterationDMAndMem = IterationWorkout & {
  dmVideo?: string;
  memoryVideo?: string;
  dmAnswer1?: string;
  dmAnswer2?: string;
  answeredMemInMs: number;
  answeredDmInMs: number;
  memoryAnswer1?: number;
  memoryAnswer2?: number;
  userAnswerDM1?: string;
  userAnswerDM2?: string;
  userAnswerMem1?: number;
  userAnswerMem2?: number;
  rpeMem?: number;
  isCorrectDm: boolean;
  isCorrectMem: boolean;
  answer_1Options: number[];
  answer_2Options: number[];
};
export type IterationDMAndMem = Omit<
  _IterationDMAndMem,
  "answeredInMs" | "isCorrect"
>;
export type IterationMemory = IterationWorkout & {
  answer1?: number;
  answer2?: number;
  userAnswer1?: number;
  userAnswer2?: number;
  answer_1Options: number[];
  answer_2Options: number[];
  isCorrect: boolean;
};
export type RECOGNITION_VIDEO_TYPE = "players" | "contact" | "foul" | "hand" | "dm" | "memory";
export type IterationRecognition = IterationWorkout & {
  answers: Answer[];
  //   userAnswers: [];
  isCorrect: boolean;
  videoType: RECOGNITION_VIDEO_TYPE;
  repetitionNumber: number;
  userAnswers: RecognitionSingularAnswer[];
};
export type WorkoutDate = {
  start: Date;
  end: Date;
};
type GeneralWorkout = {
  type: WORKOUT_TYPE;
  date: WorkoutDate;
  breakDuration: number;
  numberOfRepetitions: number;
  numberOfDecisions: number;
  exerciseDuration: number;
  maxDesicionTime: number;
  maxRPETime: number;
  workoutId: number;
  memberType?: "ar" | "re";
};
export type DMWorkout = GeneralWorkout & {
  iterations: IterationDM[];
  status: DM_WORKOUT_STATUS;
};
export type DMAndMemWorkout = GeneralWorkout & {
  iterations: IterationDMAndMem[];
  status: DM_WORKOUT_STATUS;
};
export type MemoryWorkout = GeneralWorkout & {
  iterations: IterationMemory[];
  status: DM_WORKOUT_STATUS;
};

export type RecognitionWorkout = GeneralWorkout & {
  iterations: IterationRecognition[];
  status: RECOGNITION_WORKOUT_STATUS;
};
export interface Iteration {
  id: number;
  answers: Answer[];
  createdAt: string;
  modifiedAt: string;
  isActive: boolean;
  repetitionNumber: number;
  workout: number;
  videoType?: RECOGNITION_VIDEO_TYPE;
}
export type SessionPostType = {
  workout_iteration: string | number;
  answer_1?: string;
  answer_2?: string;
  borgScale?: number | null;
  replyTime?: number;
  

};
export type DMandMemorySessionPostType = {
  videoType: string;
} & SessionPostType;

export interface Answer {
  id: number;
  video1: Video;
  video2?: Video;
  createdAt: string;
  modifiedAt: string;
  isActive: boolean;
  workoutIteration: number;
  videoType?: RECOGNITION_VIDEO_TYPE;
}
export type IMAGE_NAME =
  | "man_running_ready_to_workout"
  | "play_video"
  | "man_running_with_color"
  | "how_you_feel"
  | "hand_ball"
  | "shirt_plus"
  | "target_image"
  | "whistle"
  | "touching_with_finger";

export type DM_ANSWER = {
  answer1?: string;
  asnwer2?: string;
  answeredInMs: number;
  isCorrect?: boolean;
};

export type MEMORY_ANSWER = {
  answer1?: number;
  asnwer2?: number;
  answeredInMs: number;
  isCorrect?: boolean;
};
export type RecognitionSingularAnswer = {
  selectedAnswer?: string | null;
  answeredInMs: number;
  isCorrect?: boolean;
};
export type RECOGNITION_ANSWER_DATA = {
  answers: RecognitionSingularAnswer[];
  isCorrect?: boolean;
};

export type t_DM_ANSWER1 = "nf" | "ifk" | "dfk" | "pk";
export type t_DM_ANSWER2 = "nc" | "yc" | "rc";

export type Steps = "beginning" | "workout" | "video" | "decision" | "rpe";
export type SESSION_STATUS = "pending" | "inCourse" | "finished";

export type DM_WORKOUT_STATUS = "pending" | "inCourse" | "finished";
export type DM_STEPS = "beginning" | "workout" | "video" | "decision" | "rpe";
export type DM_MEM_STEPS =
  | "beginning"
  | "mem-beginning"
  | "mem-video"
  | "dm-beginning"
  | "dm-workout"
  | "dm-video"
  | "dm-decision"
  | "beginning-mem-workout"
  | "mem-workout"
  | "mem-decision"
  | "dm-rpe"
  | "mem-rpe";

export type MEMORY_WORKOUT_STATUS = "pending" | "inCourse" | "finished";
export type MEMORY_STEPS =
  | "beginning"
  | "workout"
  | "video"
  | "decision"
  | "rpe"
  | "beginMemoryWorkout";

export type VideoAnswerDonwload = {
  uri1?: string;
  uri2?: string;
  idIteration: number;
  answerId: number;
};
export type RECOGNITION_WORKOUT_STATUS = "pending" | "inCourse" | "finished";
export type RECOGNITION_STEPS =
  | "beginning"
  | "workout"
  | "imageDecision"
  | "rpe";
