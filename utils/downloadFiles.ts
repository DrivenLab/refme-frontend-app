import { Iteration } from "@/types/session";
import * as FileSystem from "expo-file-system";
type Props = {
  url: string;
  videoName: string;
  setDonwloadProgress?: (progressValue: number) => void;
};

const downloadVideo = async ({
  url,
  videoName,
  setDonwloadProgress,
}: Props) => {
  const callback = (downloadProgress: any) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    if (setDonwloadProgress) setDonwloadProgress(progress);
    console.log(
      `progress of video ${videoName} is ${progress}`,
      setDonwloadProgress
    );
  };
  const downloadResumable = FileSystem.createDownloadResumable(
    url,
    FileSystem.documentDirectory + videoName,
    {},
    callback
  );
  try {
    console.log({ url, videoName });
    const data = await downloadResumable.downloadAsync();
    console.log("Finished downloading to ", data?.uri);
  } catch (e) {
    console.error("eerrrr", e, url, videoName);
  }
};
type GenerateVideoNameProps = {
  idSession: number;
  iteration: Iteration;
};
const getVideoName = ({ idSession, iteration }: GenerateVideoNameProps) => {
  return `session${idSession}_video_${iteration.answers[0].video1.id}.mp4`;
};
export { downloadVideo, getVideoName };
