import DownloadProgressModal from "@/components/workouts/DownloadProgressModal";
import useDownloadSession from "@/hooks/useDownloadSession";
import usePrepareWorkout from "@/hooks/usePrepareWorkout";
import { Session } from "@/types/session";
import { Workout } from "@/types/workout";
import { useEffect, useState } from "react";
type Props = {
  idSession: number;
};
const DownloadSessionModal = ({ idSession }: Props) => {
  const { isDownloading, downloadProgress, cancelDownload, downloadSession } =
    useDownloadSession({
      idSession,
      onCompleteDownloading: handleOnCompleteDownloading,
    });
  const { prepareWorkout, goToWorkout } = usePrepareWorkout();

  function handleOnCompleteDownloading(session_?: Session) {
    if (!session_) return;
    prepareWorkout(session_?.workout);
    goToWorkout(session_?.workout.type);
  }

  useEffect(() => {
    downloadSession();
  }, []);

  return (
    <DownloadProgressModal
      isModalOpen={isDownloading}
      onCancelDownload={cancelDownload}
      downloadProgress={downloadProgress}
    />
  );
};

export default DownloadSessionModal;
