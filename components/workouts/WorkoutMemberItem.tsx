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
import useDownloadSession from "@/hooks/useDownloadSession";

type Props = {
  workout: Workout;
  idSession: number;
};

const WorkoutMemberItem = ({ workout, idSession }: Props) => {
  const {
    isDownloading,
    downloadProgress,
    setIsDownloading,
    downloadSession,
    wasSessionDownloaded,
  } = useDownloadSession({ idSession });

  return (
    <>
      <DownloadProgressModal
        isModalOpen={isDownloading}
        onCancelDownload={() => setIsDownloading(false)}
        downloadProgress={downloadProgress}
      />
      <WorkoutCard
        id={idSession}
        workout={workout}
        wasSessionDownloaded={wasSessionDownloaded}
        downloadSession={downloadSession}
      />
    </>
  );
};

export default WorkoutMemberItem;
