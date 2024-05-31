import { Workout } from "@/types/workout";
import React from "react";
import DownloadProgressModal from "./DownloadProgressModal";
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
