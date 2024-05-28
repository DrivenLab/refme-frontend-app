import React from "react";
import { Box, FlatList } from "@gluestack-ui/themed";
import { ListRenderItemInfo } from "react-native";
import WorkoutItem from "../workouts/WorkoutItem";
import EmptyWorkouts from "../workouts/EmptyWorkouts";
import { Workout } from "@/types/workout";

type Props = {
  workouts: Workout[];
};
const WorkoutList = ({ workouts }: Props) => {
  return (
    <>
      {workouts.length === 0 ? (
        <Box height="$3/4">
          <EmptyWorkouts count={workouts.length} state={"pending"} />
        </Box>
      ) : (
        <FlatList
          // mt={30}
          height="$3/4"
          data={workouts}
          renderItem={({ item: workout }: ListRenderItemInfo<any>) => (
            <WorkoutItem workout={workout as Workout} idSession={workout.id} />
          )}
          keyExtractor={(item: any) => item.id}
        />
      )}
    </>
  );
};

export default WorkoutList;
