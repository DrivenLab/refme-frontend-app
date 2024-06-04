import { StyleSheet } from "react-native";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { Href, useRouter } from "expo-router";
import React from "react";
import DownloadProgressModal from "./DownloadProgressModal";

import useDownloadSession from "@/hooks/useDownloadSession";
import { useDMWorkout } from "@/context/DmContext";
import { useMemoryWorkout } from "@/context/MemoryContext";
import { Workout } from "@/types/workout";
import { useDMAndMemWorkout } from "@/context/DmAndMemoryContext";

type Props = {
  idSession: number;
};
const ROUTE_TO = {
  dm: "/workouts/startWorkoutDM",
  memory: "/workouts/startWorkoutMemory",
  dmar: "/workouts/startWorkoutDM",
  "dm+memory": "/workouts/startWorkoutDMAndMem",
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
  const { prepareWorkout: prepareDM } = useDMWorkout();
  const { prepareWorkout: prepareDMAndMem } = useDMAndMemWorkout();
  const { prepareWorkout: prepareWorkoutMemory } = useMemoryWorkout();
  const handleOnPress = () => {
    if (wasSessionDownloaded && session) {
      prepareWorkout(session.workout);
      router.push(
        ROUTE_TO[session.workout.type as keyof typeof ROUTE_TO] as Href<string>
      );
    } else {
      downloadSession();
    }
  };
  const prepareWorkout = (workout: Workout) => {
    if (["dm", "dmar"].includes(workout.type)) {
      prepareDM(workout);
    } else if (workout.type === "dm+memory") {
      prepareDMAndMem(workout);
    } else prepareWorkoutMemory(workout);
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
