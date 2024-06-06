import React, { useState } from "react";
import { SafeAreaView, VStack } from "@gluestack-ui/themed";

import { Image } from "expo-image";
import { useAuth } from "@/context/auth";

import MemberWorkouts from "@/components/workouts/MemberWorkouts";
import InstructorWorkouts from "@/components/workouts/InstructorWorkouts";
import { SafeAreaViewStyle } from "@/utils/Styles";

const Workouts = () => {
  const { userRole } = useAuth();
  return (
    <SafeAreaView bg="$white" style={SafeAreaViewStyle.s}>
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
