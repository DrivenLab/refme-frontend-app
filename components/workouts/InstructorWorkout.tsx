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
import { Link } from "expo-router";

import CTab from "@/components/CTab";
import i18n from "@/languages/i18n";
import { Image } from "expo-image";
import { AddIcon } from "@gluestack-ui/themed";
import { useGetSessions } from "@/queries/session.query";
import { useAuth } from "@/context/auth";
import SessionList from "@/components/session/SessionList";
import WorkoutItem from "@/components/workouts/WorkoutItem";
import EmptyWorkouts from "@/components/workouts/EmptyWorkouts";

const InstructorWorkouts = () => {
  const { workouts, isLoadingWorkout } = useGetWorkouts();

  return (
    <SafeAreaView bg="$white" flex={1}>
      <Link href="/workouts/createWorkout" asChild>
        <Button
          width={60}
          rounded="$full"
          height={60}
          bg="$primary"
          borderColor="indigo600"
          position="absolute"
          top={-30}
        >
          <ButtonIcon color="white" as={AddIcon} />
        </Button>
      </Link>

      <Box borderBottomWidth={4} borderColor={"$black"} pb={10} pt={25}>
        <Text color="black" textAlign="center" fontWeight={"$bold"}>
          {i18n.t("workout_flow.training_title")}
        </Text>
      </Box>
      {workouts.length === 0 ? (
        <Box height="$3/4">
          <EmptyWorkouts workoutsCount={0} state={"pending"} />
        </Box>
      ) : (
        <FlatList
          data={workouts}
          mb={200}
          renderItem={({ item: workout }: ListRenderItemInfo<any>) => (
            <WorkoutItem workout={workout} idWorkout={workout.id} />
          )}
          keyExtractor={(item: any) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default InstructorWorkouts;
