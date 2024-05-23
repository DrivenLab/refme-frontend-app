import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonIcon,
  Pressable,
  SafeAreaView,
  Text,
  VStack,
  FlatList,
} from "@gluestack-ui/themed";
import { ListRenderItemInfo } from "react-native";
import { router } from "expo-router";

import CTab from "@/components/CTab";
import i18n from "@/languages/i18n";
import { Image } from "expo-image";
import { AddIcon } from "@gluestack-ui/themed";
import { useGetWorkouts } from "@/queries/workouts.query";
import { useAuth } from "@/context/auth";
import WorkoutList from "@/components/workouts/WorkoutList";
import WorkoutItem from "@/components/workouts/WorkoutItem";
import EmptyWorkouts from "@/components/workouts/EmptyWorkouts";

const InstructorWorkouts = () => {
  const { workouts, isLoadingWorkout } = useGetWorkouts();

  return (
    <>
      <Box flexDirection="row" justifyContent="center">
        <Button
          width={60}
          rounded="$full"
          height={60}
          bg="$primary"
          borderColor="indigo600"
          position="absolute"
          onPress={() => router.push("/workouts/createWorkout")}
          top={-30}
        >
          <ButtonIcon color="white" as={AddIcon} />
        </Button>
      </Box>

      <Box borderBottomWidth={4} borderColor={"$black"} pb={10} pt={20}>
        <Text color="black" textAlign="center" fontWeight={"$bold"}>
          {i18n.t("workout_flow.training_title")}
        </Text>
      </Box>

      <WorkoutList workouts={workouts} />
    </>
  );
};

export default InstructorWorkouts;
