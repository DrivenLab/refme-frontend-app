import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import useSession from "@/hooks/useSession";
import CVideo from "@/components/CVideo";
import { SafeAreaView, ScrollView } from "@gluestack-ui/themed";

const StartWorkout = () => {
  const { session } = useSession({ idSession: 1 });

  useEffect(() => {
    //loadFiles();
  }, []);

  return (
    <SafeAreaView style={styles.contentContainer}>
      <ScrollView>
        {session?.workout.iterations.map((i) => (
          <CVideo key={i.id} uri={i.answers[0].video1.video} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
