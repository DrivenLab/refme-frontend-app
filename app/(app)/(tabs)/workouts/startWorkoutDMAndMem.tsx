import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "@gluestack-ui/themed";
import useOrientation from "@/hooks/useOrientation";
import RotateScreen from "@/components/session/RotateScreen";
import { ORIENTATION_NUMBER } from "@/constants/Orientation";
import SessionStatistics from "@/components/session/SessionStatistics";
import { useNavigation } from "expo-router";
import { setStatusBarHidden } from "expo-status-bar";
import { useDMAndMemWorkout } from "@/context/DmAndMemoryContext";
import DMAndMemIteration from "@/components/session/dm-and-memory/DMAndMemIteration";

const startWorkoutDMAndMem = () => {
  const { resume, workout, resultCharBarData, startWorkout, saveSession } =
    useDMAndMemWorkout();
  const { screenOrientation } = useOrientation();
  useEffect(() => {
    //loadFiles();
    setStatusBarHidden(true, "slide");
    return () => {
      setStatusBarHidden(false, "slide");
    };
  }, []);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);
  const handleSaveResult = () => {
    saveSession();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {workout.status === "pending" ? (
        <RotateScreen
          orientation={
            ORIENTATION_NUMBER[
              screenOrientation as keyof typeof ORIENTATION_NUMBER
            ]
          }
          onStartWorkout={startWorkout}
        />
      ) : workout.status === "inCourse" ? (
        <DMAndMemIteration />
      ) : (
        <SessionStatistics
          resume={resume}
          resultBarData={resultCharBarData}
          handleSaveResult={handleSaveResult}
        />
      )}
    </SafeAreaView>
  );
};
export default startWorkoutDMAndMem;
