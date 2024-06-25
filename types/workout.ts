import { Iteration } from "./session";
import { User } from "./user";

export interface CreateWorkout {
  name: string;
  description: string;
  memberType: string;
  type: string;
  material: string[];
  numberOfRepetitions: number;
  numberOfDecisions: number;
  excerciseDuration: number;
  breakDuration: number;
  usageType: WORKOUT_USAGE_TYPE;
}
export interface Workout {
  id: number;
  participants: User[];
  iterations: Iteration[];
  createdAt: string;
  modifiedAt: string;
  isActive: boolean;
  name: string;
  description: string;
  memberType: MEMBER_TYPE;
  type: WORKOUT_TYPE;
  usageType: WORKOUT_USAGE_TYPE;
  material?: string[];
  numberOfRepetitions: number;
  numberOfDecisions: number;
  excerciseDuration: number;
  breakDuration: number;
  totalDuration: number;
  isDraft: boolean;
  organization: number;
}
export type DownloadProgress = {
  key: string;
  value: number;
};

export type WorkoutResultBarChart = {
  x: number;
  y: number;
  isCorrect: boolean;
  hasVideo: boolean;
  rpe?: number;
};
export type WorkoutResume = {
  date: string;
  totalTime: string;
  correctAnswers: any;
  wrongAnswers: number;
  answerAverageTime: string;
  answerTotalTime: string;
};

export type TEXT_TYPES = "dm" | "memory" | "rpe" | "recognition" | "go";

export type MEMBER_TYPE = "re" | "ar";
export type WORKOUT_TYPE =
  | "dm"
  | "memory"
  | "dmar"
  | "dm+memory"
  | "recognition"
  | "random";
export type WORKOUT_USAGE_TYPE = "personal" | "official";
