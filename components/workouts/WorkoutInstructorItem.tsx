import { Workout } from "@/types/workout";
import { StyleSheet } from "react-native";
import { Box, Pressable, Text } from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { Href, Link } from "expo-router";
import React from "react";
import DmLogo from "@/assets/svgs/DmLogo";
import WorkoutCard from "./WorkoutCard";

type Props = {
  workout: Workout;
};

const WorkoutInstructorItem = ({ workout }: Props) => {
  const id = workout.id;

  return (
    <>
      <WorkoutCard id={id} workout={workout} wasSessionDownloaded={false} />
    </>
  );
};

export default WorkoutInstructorItem;
const styles = StyleSheet.create({
  workoutInstructorItem: {
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
