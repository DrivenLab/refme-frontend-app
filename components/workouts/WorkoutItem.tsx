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
import WorkoutMemberItem from "./WorkoutMemberItem";
import WorkoutInstructorItem from "./WorkoutInstructorItem";

type Props = {
  idSession: number;
  workout: Workout;
};

const WorkoutItem = ({ workout, idSession }: Props) => {
  const {
    downloadSession,
    downloadProgress,
    isDownloading,
    setIsDownloading,
    wasSessionDownloaded,
  } = useSession({
    idSession: idSession,
  });
  const { userRole } = useAuth();

  return (
    <>
      {userRole === "member" ? (
        <WorkoutMemberItem workout={workout} idSession={idSession} />
      ) : (
        <WorkoutInstructorItem workout={workout} />
      )}
    </>
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
