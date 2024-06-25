import DownloadProgressModal from "@/components/workouts/DownloadProgressModal";
import useDownloadSession from "@/hooks/useDownloadSession";
import { useEffect } from "react";
type Props = {
  idSession: number;
  onCompleteDownloading: () => void;
};
const DownloadSessionModal = ({ idSession, onCompleteDownloading }: Props) => {
  const { isDownloading, downloadProgress, cancelDownload, downloadSession } =
    useDownloadSession({ idSession, onCompleteDownloading });

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
