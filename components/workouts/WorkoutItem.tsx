import { Workout } from "@/types/workout";
import { StyleSheet } from "react-native";
import { Box, Pressable, Text } from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { Href, Link } from "expo-router";
import { useGetSessionDetailById } from "@/queries/session.query";
import { useState } from "react";
import DownloadSessionBtn from "./DownloadSessionBtn";
type Props = {
  workout: Workout;
  idSession: number;
};

const WorkoutItem = ({ workout, idSession }: Props) => {
  const [enabled, setEnabled] = useState(false);
  const { session, isLoadingSession, refetchSession } = useGetSessionDetailById(
    {
      idSession,
      enabled,
    }
  );
  const downloadWorkout = () => {
    /*
    if (true)
      downloadVideo({
        url: `https://cd9c-181-126-32-247.ngrok-free.app/media/Asociacion%20Paraguay%20de%20Futbol/videos/official_training/V25-3-6_zQBoXLJ.mp4`,
        videoName: "V25-3-6_zQBoXLJ.mp4",
      });
      */
    setEnabled(true);
    refetchSession();
  };
  return (
    <Link href={`/workouts/${idSession}/` as Href<string>} asChild>
      <Pressable>
        <Box
          rounded={"$md"}
          px={"$5"}
          py={"$2"}
          mb={"$4"}
          style={styles.workoutItem}
        >
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            alignContent="center"
            style={{ borderBottomWidth: 2, borderBottomColor: "#ede18a" }}
            py={"$1"}
          >
            <Box>
              <Text>{i18n.t("dm")}</Text>
            </Box>
            <DownloadSessionBtn
              wasDownloaded={session !== undefined}
              downloadSession={downloadWorkout}
            />
          </Box>
          <Box>
            <Text fontWeight="bold" color="black" fontSize={20} py={"$2"}>
              {workout.name}
            </Text>
            <Text>{workout.description}</Text>
          </Box>
        </Box>
      </Pressable>
    </Link>
  );
};

export default WorkoutItem;
const styles = StyleSheet.create({
  workoutItem: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    backgroundColor: "#F3F3F4",
  },
});
