import { StyleSheet } from "react-native";
import { Button, ButtonText } from "@gluestack-ui/themed";
import React from "react";
import DownloadProgressModal from "./DownloadProgressModal";

import useDownloadSession from "@/hooks/useDownloadSession";

import usePrepareWorkout from "@/hooks/usePrepareWorkout";
import i18n from "@/languages/i18n";

type Props = {
  idSession: number;
};

const WorkoutMemberDetail = ({ idSession }: Props) => {
  const {
    isDownloading,
    downloadProgress,
    wasSessionDownloaded,
    session,
    cancelDownload,
    downloadSession,
  } = useDownloadSession({ idSession });

  const { prepareWorkout, goToWorkout } = usePrepareWorkout();

  const handleOnPress = () => {
    if (wasSessionDownloaded && session) {
      prepareWorkout(session.workout);
      goToWorkout(session.workout.type);
    } else {
      downloadSession();
    }
  };

  return (
    <>
      <DownloadProgressModal
        isModalOpen={isDownloading}
        onCancelDownload={cancelDownload}
        downloadProgress={downloadProgress}
      />
      {/* {!session?.isCompleted ?? ( */}
      <Button
        onPress={handleOnPress}
        mt={"$6"}
        bg="$primary"
        rounded="$full"
        height={50}
        mb={20}
      >
        <ButtonText color="black" fontWeight="medium">
          {wasSessionDownloaded ? i18n.t("start") : i18n.t("prepare")}
        </ButtonText>
      </Button>
      {/* )} */}
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
