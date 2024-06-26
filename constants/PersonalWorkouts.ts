import { PersonalWorkoutAbility } from "@/types/personalWorkouts";

export const LEVEL_INPUT_SELECT_OPTIONS = [
  { label: "Principiante", value: "principiante" },
  { label: "Intermedio", value: "intermedio" },
  { label: "Avanzado", value: "avanzado" },
];
export const WORKOUT_TYPE_INPUT_SELECT_OPTIONS = [
  { label: "Toma de decisión", value: "dm" },
  { label: "Memoria", value: "memory" },
  { label: "Reconocimiento", value: "recognition" },
  { label: "Toma de decisión y Memoria", value: "dm+memory" },
  { label: "Random", value: "random" },
];

export const PERSONAL_WORKOUT_CARD_COLORS: Record<string, string> = {
  agilidad: "#58DAFC",
  resistencia: "#090B22",
  velocidad: "#FF6622",
};
