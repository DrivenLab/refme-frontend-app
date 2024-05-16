import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import useSession from "@/hooks/useSession";
import CVideo from "@/components/CVideo";
import { SafeAreaView, ScrollView, Text } from "@gluestack-ui/themed";
import useOrientation from "@/hooks/useOrientation";
import RotateScreen from "@/components/session/RotateScreen";
import { ORIENTATION_NUMBER } from "@/constants/Orientation";

const StartWorkout = () => {
  const { session } = useSession({ idSession: 1 });
  const { screenOrientation } = useOrientation();
  useEffect(() => {
    //loadFiles();
  }, []);

  return (
    <SafeAreaView style={styles.contentContainer}>
      <RotateScreen
        orientation={
          ORIENTATION_NUMBER[
            screenOrientation as keyof typeof ORIENTATION_NUMBER
          ]
        }
      />

      {/*
      <ScrollView>
        <Text>{screenOrientation}</Text>

        {session?.workout.iterations.map((i) => (
          <CVideo key={i.id} uri={i.answers[0].video1.video} />
        ))}
      </ScrollView>
      */}
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
