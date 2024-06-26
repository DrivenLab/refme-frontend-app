import { Workout } from "@/types/workout";
import React from "react";
import DownloadProgressModal from "./DownloadProgressModal";
import WorkoutCard from "./WorkoutCard";
import useDownloadSession from "@/hooks/useDownloadSession";

type Props = {
  workout: Workout;
  idSession: number;
  isCompleted?: boolean;
};

const WorkoutMemberItem = ({ workout, idSession, isCompleted }: Props) => {
  const {
    isDownloading,
    downloadProgress,
    wasSessionDownloaded,
    cancelDownload,
    downloadSession,
  } = useDownloadSession({ idSession });

  return (
    <>
      <DownloadProgressModal
        isModalOpen={isDownloading}
        onCancelDownload={cancelDownload}
        downloadProgress={downloadProgress}
      />
      <WorkoutCard
        id={idSession}
        workout={workout}
        wasSessionDownloaded={wasSessionDownloaded}
        downloadSession={downloadSession}
        isCompleted={isCompleted || false}
      />
    </>
  );
};

export default WorkoutMemberItem;
