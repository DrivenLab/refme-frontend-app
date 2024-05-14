import { Iteration } from "@/types/session";
import * as FileSystem from "expo-file-system";
//import { shareAsync } from "expo-sharing";
import { Platform } from "react-native";
type Props = {
  url: string;
  videoName: string;
  setDonwloadProgress?: (progressValue: number) => void;
};
export class SessionDownload {
  idSession: number;
  iteration: Iteration;
  setDonwloadProgress?: (value: number) => void;
  constructor(
    idSession: number,
    iteration: Iteration,
    setDonwloadProgress?: (value: number) => void
  ) {
    this.idSession = idSession;
    this.iteration = iteration;
    this.setDonwloadProgress = setDonwloadProgress;
  }
  callback = (downloadProgress: any) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    if (this.setDonwloadProgress) this.setDonwloadProgress(progress);
  };
  getUrl = () => this.iteration.answers[0].video1.video;
  getVideoName = () => this.iteration.answers[0].video1.video;
  downloadResumable = FileSystem.createDownloadResumable(
    this.getUrl(),
    FileSystem.documentDirectory + this.getVideoName(),
    {},
    this.callback
  );
  download = async () => {
    try {
      const data = await this.downloadResumable.downloadAsync();
      if (data?.uri) {
        console.log("uri downloaded", data.uri);
      }
    } catch (e) {
      //console.error("eerrrr", e, url, videoName);
    }
  };
}
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
    if (data?.uri) {
      /*
      const base64 = await FileSystem.readAsStringAsync(data?.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
*/
      return { ...data, videoName };
    }
  } catch (e) {
    console.error("eerrrr", e, url, videoName);
  }
};
async function saveVideo(
  uri: string,
  filename: string,
  mimetype = "application/mp4"
) {
  if (Platform.OS === "android") {
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permissions.granted) {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        filename,
        mimetype
      )
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });
        })
        .catch((e) => console.log(e));
    } else {
      //shareAsync(uri);
    }
  } else {
    //shareAsync(uri);
  }
}
type GenerateVideoNameProps = {
  idSession: number;
  iteration: Iteration;
};
const getVideoName = ({ idSession, iteration }: GenerateVideoNameProps) => {
  return `session${idSession}_video_${iteration.answers[0].video1.id}.mp4`;
};
export { downloadVideo, getVideoName, saveVideo };
