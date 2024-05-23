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
import MemberWorkouts from "@/components/workouts/MemberWorkouts";
import InstructorWorkouts from "@/components/workouts/InstructorWorkouts";

const Workouts = () => {
  const { userRole } = useAuth();

  const [tab, setTab] = useState<"pending" | "finished">("pending");

  return (
    <SafeAreaView bg="$white" flex={1}>
      <Image
        source={require("@/assets/images/workout_list.png")}
        style={{ height: 130, width: "100%" }}
      />
      <VStack
        px={"$3"}
        space="lg"
        borderTopLeftRadius={30}
        borderTopRightRadius={30}
        position="relative"
        top={-20}
        bg="$white"
      >
        {userRole === "member" ? <MemberWorkouts /> : <InstructorWorkouts />}
      </VStack>
    </SafeAreaView>
  );
};

export default Workouts;
