import { useGetSessionDetailById } from "@/queries/session.query";
import * as FileSystem from "expo-file-system";
type Props = {
  idSession: string | number;
  enabled: boolean;
  url: string;
  videoName: string;
};

export const useDownloadSession = ({
  idSession,
  enabled,
  url,
  videoName,
}: Props) => {
  //const data = useGetSessionDetailById({ idSession, enabled });
  const callback = (downloadProgress: any) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
  };

  const downloadResumable = FileSystem.createDownloadResumable(
    url,
    FileSystem.documentDirectory + videoName,
    {},
    callback
  );
  const download = async () => {
    try {
      const data = await downloadResumable.downloadAsync();
      console.log("Finished downloading to ", data?.uri);
    } catch (e) {
      console.error(e);
    }
  };
  return { download };
};
