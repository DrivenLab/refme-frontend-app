import { Iteration, Session } from "@/types/session";
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

  const getUrl = (iteration: Iteration) => {
    return iteration.answers[0].video1.video;
  };
  const getVideoName = (iteration: Iteration) => {
    return `video_${iteration.answers[0].video1.id}.mp4`;
  };
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
  const downloadResumable = (url: string, videoName: string) =>
    FileSystem.createDownloadResumable(
      url,
      FileSystem.documentDirectory + videoName,
      {},
      (x) => calculateDownloadProgress(x, url)
    );

  const downloadVideo = async (i: Iteration, updateIteration = false) => {
    try {
      let url = getUrl(i);
      let videoName = getVideoName(i);
      const data = await downloadResumable(url, videoName).downloadAsync();
      if (!data) return;
      //if (updateIteration) updateIterationVideoUrl(i, data.uri);

      return { uri: data.uri, idIteration: i.id };
    } catch (e) {
      console.error("eerrrr", e);
    }
  };
  const downloadVideos = async (workout: Workout) => {
    const downloadVideosPromises = workout.iterations
      .filter((i) => i.answers.length)
      .map((i) => downloadVideo(i, true));
    if (!downloadVideosPromises) return;
    setIsDownloading(true);
    try {
      const response = await Promise.all(downloadVideosPromises);
      return response;
    } catch (error) {
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
