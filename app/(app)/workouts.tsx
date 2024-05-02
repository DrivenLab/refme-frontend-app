import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import WorkoutList from "@/components/workouts/WorkoutList";

const Workouts = () => {
  return (
    <SafeAreaView>
      <Text>Workouts</Text>
      <WorkoutList />
    </SafeAreaView>
  );
};

export default Workouts;
