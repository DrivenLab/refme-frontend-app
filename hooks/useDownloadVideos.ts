import {
  Answer,
  Iteration,
  Session,
  VideoAnswerDonwload,
} from "@/types/session";
import { useCallback, useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import { useGetSessionDetailById } from "@/queries/session.query";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Workout } from "@/types/workout";
import { useAuth } from "@/context/auth";

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
    const data = await downloadResumable(url1, videoName1).downloadAsync();
    obj.uri1 = data?.uri;
    if (answer.video2) {
      const url2 = answer.video2.video;
      const ext2 = answer.video2.video.split(".").pop();
      const videoName2 = `video_${answer.video2.id}.${ext2}`;
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
      return _downloads;
    } catch (error) {
      console.log("Error downloading");
      return null;
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadProgress =
    Object.values(progresses).reduce((prev, curr) => prev + curr, 0) /
    Object.values(progresses).length;
  return {
    downloadProgress: downloadProgress || 0,
    isDownloading,
    downloadVideos,
    setIsDownloading,
  };
};

export default useDownloadVideos;
