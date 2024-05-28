import { StyleSheet } from "react-native";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { Href, useRouter } from "expo-router";
import React from "react";
import DownloadProgressModal from "./DownloadProgressModal";
import useSession from "@/hooks/useSession";

import { useSession as useSessionContext } from "@/context/SessionContext";
import useDownloadSession from "@/hooks/useDownloadSession";

type Props = {
  idSession: number;
};
const ROUTE_TO = {
  dm: "/workouts/startWorkoutDM",
  memory: "/workouts/startWorkoutMemory",
};
const WorkoutMemberDetail = ({ idSession }: Props) => {
  const {
    isDownloading,
    downloadProgress,
    setIsDownloading,
    downloadSession,
    wasSessionDownloaded,
    session,
  } = useDownloadSession({ idSession });

  const router = useRouter();
  const { createSession } = useSessionContext();

  const handleOnPress = () => {
    if (wasSessionDownloaded && session) {
      createSession(session);
      router.push(
        ROUTE_TO[session.workout.type as keyof typeof ROUTE_TO] as Href<string>
      );
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
