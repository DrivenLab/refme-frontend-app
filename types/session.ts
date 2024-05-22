import { Video } from "./multimedia";
import { Workout } from "./workout";

export interface Session {
  id: number;
  workout: Workout;
  createdAt: string;
  modifiedAt: string;
  isActive: boolean;
  isCompleted: boolean;
  user: number;
  userIterationAnswer: any[];
}
export type IterationContext = {
  idIteration: number | string;
  video?: string;
  answeredIn: Date;
  rpeIn: Date;
  answer1?: string;
  answer2?: string;
  userAnswer1?: string;
  userAnswer2?: string;
  rpe?: number;
  timeToAnswer?: string;
  timeToGetReady: number;
  timeToWorkout: number;
};
export type SessionContext = {
  breakDuration: number;
  numberOfRepetitions: number;
  numberOfDecisions: number;
  exerciseDuration: number;
  maxDesicionTime: number;
  maxRPETime: number;
  iterations: IterationContext[];
  status: SESSION_STATUS;
};
export interface Iteration {
  id: number;
  answers: Answer[];
  createdAt: string;
  modifiedAt: string;
  isActive: boolean;
  repetitionNumber: number;
  workout: number;
}
export interface Answer {
  id: number;
  video1: Video;
  video2: Video;
  createdAt: string;
  modifiedAt: string;
  isActive: boolean;
  workoutIteration: number;
}
export type IMAGE_NAME =
  | "man_running_ready_to_workout"
  | "play_video"
  | "man_running_with_color";

export type DM_ANSWER = {
  answer1?: string;
  asnwer2?: string;
  answeredIn: Date;
};
export type t_DM_ANSWER1 = "nf" | "ifk" | "dfk" | "pk";
export type t_DM_ANSWER2 = "nc" | "yc" | "rc";
export type Steps = "beginning" | "workout" | "video" | "decision" | "rpe";
export type SESSION_STATUS = "pending" | "inCourse" | "finished";
