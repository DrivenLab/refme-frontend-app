import { useCallback, useState } from "react";
import * as FileSystem from "expo-file-system";

import { Answer, Iteration, VideoAnswerDonwload } from "@/types/session";
import { Workout } from "@/types/workout";
import { getData, storeData } from "@/utils/storage";

type Props = {};
const useDownloadVideos = () => {
  const [progresses, setProgresses] = useState<{ [key: string]: number }>({});
  const [isDownloading, setIsDownloading] = useState(false);
  const debounce = useCallback((func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout | null;

    return (...args: any) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        // return;
      }

      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }, []);
  const setProgressDebounced = debounce(setProgresses, 50);
  const calculateDownloadProgress = (
    downloadProgress_: FileSystem.DownloadProgressData,
    url: string
  ) => {
    const progress =
      downloadProgress_.totalBytesWritten /
      downloadProgress_.totalBytesExpectedToWrite;
    setProgressDebounced((old: typeof progresses) => ({
      ...old,
      [url]: progress,
    }));
  };
  //   TODO: HANDLE ERROR IN DOWNLOAD
  const downloadResumable = (url: string, videoName: string) =>
    FileSystem.createDownloadResumable(
      url,
      FileSystem.documentDirectory + videoName,
      {},
      (x) => calculateDownloadProgress(x, url)
    );
  const downloadVideoAnswer = async (i: Iteration, answer: Answer) => {
    const obj: VideoAnswerDonwload = {
      answerId: answer.id,
      idIteration: i.id,
    };

    const url1 = answer.video1.video;
    const ext1 = answer.video1.video.split(".").pop();
    const videoName1 = `video_${answer.video1.id}.${ext1}`;
    setProgresses((old) => ({ ...old, [url1]: 0 }));
    const data = await downloadResumable(url1, videoName1).downloadAsync();
    obj.uri1 = data?.uri;
    if (answer.video2) {
      const url2 = answer.video2.video;
      const ext2 = answer.video2.video.split(".").pop();
      const videoName2 = `video_${answer.video2.id}.${ext2}`;
      setProgresses((old) => ({ ...old, [url2]: 0 }));
      const data2 = await downloadResumable(url2, videoName2).downloadAsync();
      obj.uri2 = data2?.uri;
    }
    return obj;
  };
  const downloadVideos = async (workout: Workout) => {
    const _downloadVideos: Promise<VideoAnswerDonwload | undefined>[] = [];

    workout.iterations
      .filter((i) => i.answers.length)
      .forEach((i) => {
        for (const answer of i.answers) {
          _downloadVideos.push(downloadVideoAnswer(i, answer));
        }
      });
    if (!_downloadVideos) return;
    setIsDownloading(true);
    try {
      const _downloads = await Promise.all(_downloadVideos);
      const storedUris: string[] = [];
      _downloads.forEach((download) => {
        if (download?.uri1) storedUris.push(download.uri1);
        if (download?.uri2) storedUris.push(download.uri2);
      });
      await storeData({
        name: "DOWNLOADED_VIDEOS",
        value: JSON.stringify(storedUris),
      });
      return _downloads;
    } catch (error) {
      console.log("Error downloading");
      return null;
    } finally {
      setIsDownloading(false);
    }
  };
  const cleanDownloadedVideos = async () => {
    let urisToClean: string[] = [];
    try {
      const arr = JSON.parse(await getData("DOWNLOADED_VIDEOS"));
      if (arr && Array.isArray(arr)) {
        urisToClean = arr;
      } else {
        throw new Error(
          `Stored data is not an array is ${typeof arr} Obj: ${arr}`
        );
      }
    } catch (error) {
      console.log("Error cleaning downloaded videos", error);
    }
    urisToClean.forEach((uri: string) => {
      FileSystem.deleteAsync(uri, { idempotent: true });
    });
  };
  const downloadProgress =
    Object.values(progresses).reduce((prev, curr) => prev + curr, 0) /
    Object.values(progresses).length;
  return {
    downloadProgress: downloadProgress || 0,
    isDownloading,
    downloadVideos,
    setIsDownloading,
    cleanDownloadedVideos,
  };
};

export default useDownloadVideos;
