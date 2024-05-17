import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import useSession from "@/hooks/useSession";
import CVideo from "@/components/CVideo";
import { SafeAreaView, ScrollView, Text } from "@gluestack-ui/themed";
import useOrientation from "@/hooks/useOrientation";
import RotateScreen from "@/components/session/RotateScreen";
import { ORIENTATION_NUMBER } from "@/constants/Orientation";
import useStartSession from "@/hooks/useStartSession";
import SessionIteration from "@/components/session/SessionIteration";
import { Iteration } from "@/types/session";

const StartWorkout = () => {
  const { sessionStatus, setSessionStatus, currentIteration } = useStartSession(
    { idSession: 1 }
  );
  const { screenOrientation } = useOrientation();
  useEffect(() => {
    //loadFiles();
  }, []);

  return (
    <SafeAreaView style={styles.contentContainer}>
      {sessionStatus === "pending" ? (
        <RotateScreen
          orientation={
            ORIENTATION_NUMBER[
              screenOrientation as keyof typeof ORIENTATION_NUMBER
            ]
          }
          onStartWorkout={() => setSessionStatus("inProgress")}
        />
      ) : (
        <SessionIteration iteration={currentIteration || ({} as Iteration)} />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
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
export default StartWorkout;
