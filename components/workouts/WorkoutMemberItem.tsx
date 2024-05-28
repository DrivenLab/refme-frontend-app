import { Workout } from "@/types/workout";
import { StyleSheet } from "react-native";
import { Box, Pressable, Text } from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { Href, Link } from "expo-router";
import DownloadSessionBtn from "./DownloadSessionBtn";
import React from "react";
import DownloadProgressModal from "./DownloadProgressModal";
import useSession from "@/hooks/useSession";
import DmLogo from "@/assets/svgs/DmLogo";
import { useAuth } from "@/context/auth";

type Props = {
  workout: Workout;
  idSession: number;
};

const WorkoutMemberItem = ({ workout, idSession }: Props) => {
  const {
    downloadSession,
    downloadProgress,
    isDownloading,
    setIsDownloading,
    wasSessionDownloaded,
  } = useSession({
    idSession: idSession,
  });

  const id = idSession;

  return (
    <>
      <DownloadProgressModal
        isModalOpen={isDownloading}
        onCancelDownload={() => setIsDownloading(false)}
        downloadProgress={downloadProgress}
      />
      <Link href={`/workouts/${id}/` as Href<string>} asChild>
        <Pressable marginBottom="$2">
          <Box
            rounded={"$md"}
            px={"$5"}
            py={"$2"}
            mb={"$4"}
            style={styles.workoutMemberItem}
          >
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              alignContent="center"
              style={{ borderBottomWidth: 2, borderBottomColor: "#ede18a" }}
              py={"$1"}
            >
              <Box display="flex" flexDirection="row" gap={3}>
                <DmLogo />
                <Text color="secondary">
                  {i18n.t(`workout_type.${workout.type}`)}
                </Text>
              </Box>
              <DownloadSessionBtn
                wasDownloaded={wasSessionDownloaded}
                downloadSession={downloadSession}
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
    </>
  );
};

export default WorkoutMemberItem;
const styles = StyleSheet.create({
  workoutMemberItem: {
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
