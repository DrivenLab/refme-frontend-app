import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "@gluestack-ui/themed";
import useOrientation from "@/hooks/useOrientation";
import RotateScreen from "@/components/session/RotateScreen";
import { ORIENTATION_NUMBER } from "@/constants/Orientation";

import SessionIteration from "@/components/session/SessionIteration";
import { useSession } from "@/context/SessionContext";
import SessionStatistics from "@/components/session/SessionStatistics";
import { useNavigation } from "expo-router";

const StartWorkout = () => {
  const { session, updateSessionStatus } = useSession();
  const { screenOrientation } = useOrientation();
  useEffect(() => {
    //loadFiles();
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
