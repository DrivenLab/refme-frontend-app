import { Workout } from "@/types/workout";
import { StyleSheet } from "react-native";
import {
  Box,
  Button,
  ButtonIcon,
  DownloadIcon,
  Pressable,
  Text,
} from "@gluestack-ui/themed";
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
    console.log("here");
    setEnabled(true);
    refetchSession();
  };
  console.log("session", session);
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
