import i18n from "@/languages/i18n";

export const LEVEL_INPUT_SELECT_OPTIONS = [
  {
    label: i18n.t("personal_workout_flow.config.beginner"),
    value: "principiante",
  },
  {
    label: i18n.t("personal_workout_flow.config.intermediate"),
    value: "intermedio",
  },
  { label: i18n.t("personal_workout_flow.config.advanced"), value: "avanzado" },
];
export const WORKOUT_TYPE_INPUT_SELECT_OPTIONS = [
  { label: i18n.t("workout_type.dm"), value: "dm" },
  { label: i18n.t("workout_type.memory"), value: "memory" },
  { label: i18n.t("workout_type.recognition"), value: "recognition" },
  { label: i18n.t("workout_type.dm+memory"), value: "dm+memory" },
];

export const PERSONAL_WORKOUT_CARD_COLORS: Record<string, string> = {
  agilidad: "#58DAFC",
  resistencia: "#090B22",
  velocidad: "#FF6622",
};
