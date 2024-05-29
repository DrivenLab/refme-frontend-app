import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "@gluestack-ui/themed";
import useOrientation from "@/hooks/useOrientation";
import RotateScreen from "@/components/session/RotateScreen";
import { ORIENTATION_NUMBER } from "@/constants/Orientation";
import SessionStatistics from "@/components/session/SessionStatistics";
import { useNavigation } from "expo-router";
import { setStatusBarHidden } from "expo-status-bar";
import { useDMWorkout } from "@/context/DmContext";
import DecisionMakingIteration from "@/components/session/dm/DecisionMakingIteration";

const StartWorkoutDM = () => {
  const { resume, startWorkout, workout, resultCharBarData } = useDMWorkout();
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
        <DecisionMakingIteration />
      ) : (
        <SessionStatistics resume={resume} resultBarData={resultCharBarData} />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
  buttons: {
    width: 100,
    height: 100,
  },
});
export default StartWorkoutDM;
