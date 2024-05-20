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
