import { Iteration } from "./session";
import { User } from "./user";

export interface Workout {
  id: number;
  participants: User[];
  iterations: Iteration[];
  createdAt: string;
  modifiedAt: string;
  isActive: boolean;
  name: string;
  description: string;
  memberType: string;
  type: string;
  usageType: string;
  material: string;
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
