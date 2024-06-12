import { Workout } from "@/types/workout";
import { StyleSheet } from "react-native";

import React from "react";
import { useAuth } from "@/context/auth";
import WorkoutMemberItem from "./WorkoutMemberItem";
import WorkoutInstructorItem from "./WorkoutInstructorItem";

type Props = {
  idSession: number;
  workout: Workout;
  isCompleted?: boolean;
};

const WorkoutItem = ({ workout, idSession, isCompleted }: Props) => {
  const { userRole } = useAuth();

  return (
    <>
      {userRole === "member" ? (
        <WorkoutMemberItem
          workout={workout}
          idSession={idSession}
          isCompleted={isCompleted}
        />
      ) : (
        <WorkoutInstructorItem workout={workout} />
      )}
    </>
  );
};

export default WorkoutItem;
const styles = StyleSheet.create({
  workoutItem: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    backgroundColor: "#F3F3F4",
  },
});
