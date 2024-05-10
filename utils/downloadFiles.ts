import * as FileSystem from "expo-file-system";
type Props = {
  url: string;
  videoName: string;
};

const downloadVideo = async ({ url, videoName }: Props) => {
  const callback = (downloadProgress: any) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    console.log("progress", progress);
  };
  const downloadResumable = FileSystem.createDownloadResumable(
    url,
    FileSystem.documentDirectory + videoName,
    {},
    callback
  );
  try {
    const data = await downloadResumable.downloadAsync();
    console.log("Finished downloading to ", data?.uri);
  } catch (e) {
    console.error("eerrrr", e, url, videoName);
  }
};
export { downloadVideo };
