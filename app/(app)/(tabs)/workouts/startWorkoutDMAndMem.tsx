import React, { useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { View } from "@gluestack-ui/themed";
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
  useEffect(() => {
    if (screenOrientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
    } else if (
      screenOrientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT
    ) {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    }
  }, [screenOrientation]);
  const navigation = useNavigation();
  useEffect(() => {
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () => {
      ScreenOrientation.unlockAsync();
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
    };
  }, [navigation]);
  const handleSaveResult = () => {
    saveSession();
  };
  return (
    <View style={{ flex: 1 }}>
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
          workoutType={workout.type}
          memberType={workout.memberType || "ar"}
        />
      )}
    </View>
  );
};
export default startWorkoutDMAndMem;
