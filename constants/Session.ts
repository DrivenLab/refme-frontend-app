import { MEMBER_TYPE, WORKOUT_TYPE } from "@/types/workout";

export const ANSWER1 = {
  nf: "nf",
  ifk: "ifk",
  dfk: "dfk",
  pk: "pk",
  off: "off",
  noff: "noff",
  yes: "yes",
  no: "no",
};
export const DM_ANSWER1 = {
  nf: "nf",
  ifk: "ifk",
  dfk: "dfk",
  pk: "pk",
};
export const DMAR_ANSWER = {
  off: "off",
  noff: "noff",
};
export const ANSWER2 = {
  nc: "nc",
  yc: "yc",
  rc: "rc",
};
export const DM_ANSWER2 = {
  nc: "nc",
  yc: "yc",
  rc: "rc",
};
export type MapRefTypeWorkoutType = Record<
  MEMBER_TYPE,
  Record<WORKOUT_TYPE, number>
>;
export const VIDEO_TIME_IN_SECONDS: MapRefTypeWorkoutType = {
  re: {
    dm: 10,
    memory: 10,
    recognition: 10,
    dmar: 5,
    "dm+memory": 20,
  },
  ar: {
    dm: 5,
    memory: 10,
    recognition: 10,
    dmar: 5,
    "dm+memory": 15,
  },
};
export const ITERATION_TOTAL_TIME: MapRefTypeWorkoutType = {
  re: {
    dm: 21,
    memory: 21,
    "dm+memory": 22,
    recognition: 14,
    dmar: 14,
  },
  ar: {
    dm: 14,
    memory: 21,
    "dm+memory": 22,
    recognition: 14,
    dmar: 14,
  },
};
export const TIME_TO_ANSWER: MapRefTypeWorkoutType = {
  re: {
    dm: 6,
    memory: 6,
    "dm+memory": 6,
    recognition: 10,
    dmar: 4,
  },
  ar: {
    dm: 4,
    memory: 6,
    "dm+memory": 6,
    recognition: 10,
    dmar: 4,
  },
};
export const TIME_TO_RPE: MapRefTypeWorkoutType = {
  re: {
    dm: 3,
    memory: 3,
    "dm+memory": 3,
    recognition: 3,
    dmar: 3,
  },
  ar: {
    dm: 3,
    memory: 3,
    "dm+memory": 3,
    recognition: 3,
    dmar: 3,
  },
};
export const INITAL_TIME_TO_GET_READY = 3;
export const RPE_STRING_VALUES = {
  "0": "nothing_at_all",
  "1": "very_light",
  "2": "light",
  "3": "moderate",
  "4": "somewhat_hard",
  "5": "hard",
  "6": "harder",
  "7": "very_hard",
  "8": "very_very_hard",
  "9": "almost_maximal",
  "10": "maximal_exertion",
};
export const RPE_NUMBER_VALUES = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
};
export const RPE_COLORS = {
  "0": "#58DAFC",
  "1": "#58DAFC",
  "2": "#58DAFC",
  "3": "#4ed964",
  "4": "#4ed964",
  "5": "#F3e790",
  "6": "#F3e790",
  "7": "#FF6622",
  "8": "#FF6622",
  "9": "#FF3A31",
  "10": "#FF3A31",
};

export const MEMORY_NUMBER_OPTIONS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];
