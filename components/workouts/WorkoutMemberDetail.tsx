import { Workout } from "@/types/workout";
import { StyleSheet } from "react-native";
import { Box, Pressable, Text, Button, ButtonText } from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { Href, Link, useRouter } from "expo-router";
import DownloadSessionBtn from "./DownloadSessionBtn";
import React from "react";
import DownloadProgressModal from "./DownloadProgressModal";
import useSession from "@/hooks/useSession";
import DmLogo from "@/assets/svgs/DmLogo";
import { useAuth } from "@/context/auth";
import { useSession as useSessionContext } from "@/context/SessionContext";

type Props = {
  idSession: number;
};

const WorkoutMemberDetail = ({ idSession }: Props) => {
  const {
    downloadProgress,
    setIsDownloading,
    isDownloading,
    wasSessionDownloaded,
    downloadSession,
    session,
  } = useSession({ idSession: Number(idSession as string) });
  const router = useRouter();
  const { createSession } = useSessionContext();

  const handleOnPress = () => {
    if (wasSessionDownloaded && session) {
      createSession(session);
      router.push("/workouts/startWorkout/" as Href<string>);
    } else {
      downloadSession();
    }
  };

  return (
    <>
      <DownloadProgressModal
        isModalOpen={isDownloading}
        onCancelDownload={() => setIsDownloading(false)}
        downloadProgress={downloadProgress}
      />
      <Button
        onPress={handleOnPress}
        mt={"$6"}
        bg="$primary"
        rounded="$full"
        height={50}
        mb={20}
      >
        <ButtonText color="black" fontWeight="medium">
          {wasSessionDownloaded ? "Comenzar" : "Preparar"}
        </ButtonText>
      </Button>
    </>
  );
};

export default WorkoutMemberDetail;
const styles = StyleSheet.create({
  WorkoutMemberDetail: {
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
