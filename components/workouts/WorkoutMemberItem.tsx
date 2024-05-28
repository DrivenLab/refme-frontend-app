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
import WorkoutCard from "./WorkoutCard";

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
      <WorkoutCard
        id={id}
        workout={workout}
        wasSessionDownloaded={wasSessionDownloaded}
        downloadSession={downloadSession}
      />
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
