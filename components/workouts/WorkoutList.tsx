import React from "react";
import { Workout } from "@/types/workout";
import WorkoutItem from "./WorkoutItem";
import { FlatList } from "@gluestack-ui/themed";
import { ListRenderItemInfo } from "react-native";
const WORKOUT_LIST: Workout[] = [
  {
    id: 2,
    participants: [],
    iterations: [
      {
        id: 2,
        answers: [],
        createdAt: "2024-04-30T20:34:12.238750-04:00",
        modifiedAt: "2024-04-30T20:34:12.238768-04:00",
        isActive: true,
        repetitionNumber: 1,
        workout: 2,
      },
      {
        id: 3,
        answers: [],
        createdAt: "2024-04-30T20:34:12.239788-04:00",
        modifiedAt: "2024-04-30T20:34:12.239806-04:00",
        isActive: true,
        repetitionNumber: 2,
        workout: 2,
      },
      {
        id: 4,
        answers: [],
        createdAt: "2024-04-30T20:34:12.240880-04:00",
        modifiedAt: "2024-04-30T20:34:12.240899-04:00",
        isActive: true,
        repetitionNumber: 3,
        workout: 2,
      },
      {
        id: 5,
        answers: [],
        createdAt: "2024-04-30T20:34:12.241738-04:00",
        modifiedAt: "2024-04-30T20:34:12.241755-04:00",
        isActive: true,
        repetitionNumber: 4,
        workout: 2,
      },
      {
        id: 6,
        answers: [],
        createdAt: "2024-04-30T20:34:12.242612-04:00",
        modifiedAt: "2024-04-30T20:34:12.242630-04:00",
        isActive: true,
        repetitionNumber: 5,
        workout: 2,
      },
    ],
    createdAt: "2024-04-30T20:34:12.235797-04:00",
    modifiedAt: "2024-04-30T20:34:12.237076-04:00",
    isActive: true,
    name: "Entrenamiento Prueba Final",
    description: "Es el primer Entrenamiento de prueba con todo",
    memberType: "re",
    type: "dm",
    usageType: "official",
    material: "dos conos",
    numberOfRepetitions: 5,
    numberOfDecisions: 0,
    excerciseDuration: 5,
    breakDuration: 21,
    totalDuration: 130,
    isDraft: true,
    organization: 2,
  },
];
type Props = {
  state: "pending" | "finished";
};
const WorkoutList = () => {
  return (
    <FlatList
      data={WORKOUT_LIST}
      renderItem={({ item }: ListRenderItemInfo<any>) => (
        <WorkoutItem workout={item} />
      )}
      keyExtractor={(item: any) => item.id}
    />
  );
};

export default WorkoutList;
