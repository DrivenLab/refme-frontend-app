import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, ScrollView, Text } from "@gluestack-ui/themed";
import useOrientation from "@/hooks/useOrientation";
import RotateScreen from "@/components/session/RotateScreen";
import { ORIENTATION_NUMBER } from "@/constants/Orientation";
import useStartSession from "@/hooks/useStartSession";
import SessionIteration from "@/components/session/SessionIteration";
import { Iteration } from "@/types/session";
import { useSession } from "@/context/SessionContext";
import SessionStatistics from "@/components/session/SessionStatistics";

const StartWorkout = () => {
  const { session, updateSessionStatus } = useSession();
  const { screenOrientation } = useOrientation();
  useEffect(() => {
    //loadFiles();
  }, []);

  return (
    <SafeAreaView style={styles.contentContainer}>
      {session.status === "pending" ? (
        <RotateScreen
          orientation={
            ORIENTATION_NUMBER[
              screenOrientation as keyof typeof ORIENTATION_NUMBER
            ]
          }
          onStartWorkout={() => updateSessionStatus("inCourse")}
        />
      ) : session.status === "inCourse" ? (
        <SessionIteration />
      ) : (
        <SessionStatistics session={session} />
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
