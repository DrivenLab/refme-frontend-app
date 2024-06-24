export interface PersonalWorkoutConfig {
  velocidad: PersonalWorkoutDistance;
  resistencia: PersonalWorkoutDistance;
}
export type PersonalWorkoutType = "velocidad" | "resistencia";
export interface PersonalWorkoutDistance {
  [key: string]: PersonalWorkoutName;
}

export interface PersonalWorkoutName {
  [key: string]: PersonalWorkout[];
}

export interface PersonalWorkout {
  id: number;
  createdAt: string;
  modifiedAt: string;
  isActive: boolean;
  group: string;
  level: string;
  ability: string;
  name: string;
  description: string;
  material: string[];
  numberOfRepetitions: number;
  numberOfDecisions: number;
  excerciseDuration: number;
  breakDuration: number;
  series: number;
  pauseBetweenSeries: number;
  videoTutorial: string;
  imgTutorial: string;
}
