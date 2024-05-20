import { Iteration, Session } from "@/types/session";
import React, { useEffect, useMemo, useState } from "react";
import * as FileSystem from "expo-file-system";
import { useGetSessionDetailById } from "@/queries/session.query";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

type Props = {
  idSession: string | number;
};
const useSession = ({ idSession }: Props) => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [enableQuery, setEnableQuery] = useState(false);
  const [session, setSession] = useState<Session>();
  const [wasSessionDownlaoded, setWasSessionDownlaoded] = useState(false);
  const queryClient = useQueryClient();
  const { refetchSession } = useGetSessionDetailById({
    idSession,
    enabled: enableQuery,
  });

  useEffect(() => {
    const data = queryClient.getQueryData<AxiosResponse<Session>>([
      "sessions",
      idSession,
    ]);
    if (data) {
      setWasSessionDownlaoded(true);
      setSession(data?.data);
    } else setWasSessionDownlaoded(false);
  }, []);
  const updateSessionIteration = ({ iteration }: { iteration: Iteration }) => {
    const data = queryClient.getQueryData<AxiosResponse<Session>>([
      "sessions",
      idSession,
    ]);
    if (!data) return;
    queryClient.setQueryData(
      ["sessions", idSession],
      (axiosResponse: AxiosResponse<Session>) => {
        const index = axiosResponse.data.workout.iterations.findIndex(
          (i) => i.id === iteration.id
        );
        if (index) {
          axiosResponse.data.workout.iterations[index] = iteration;
        }

        return axiosResponse;
      }
    );
  };
  const getUrl = (iteration: Iteration) => {
    return iteration.answers[0].video1.video;
  };
  const getVideoName = (iteration: Iteration) => {
    return `video_${iteration.answers[0].video1.id}.mp4`;
  };
  const calculateDownloadProgress = (downloadProgress_: any) => {
    const progress =
      downloadProgress_.totalBytesWritten /
      downloadProgress_.totalBytesExpectedToWrite;
    setDownloadProgress((old) => (progress >= old ? progress : old));
  };
  const downloadResumable = (url: string, videoName: string) =>
    FileSystem.createDownloadResumable(
      url,
      FileSystem.documentDirectory + videoName,
      {},
      calculateDownloadProgress
    );
  const updateIterationVideoUrl = (i: Iteration, newURL: string) => {
    const newIteration = { ...i };
    newIteration.answers[0].video1.video = newURL;
    updateSessionIteration({ iteration: newIteration });
  };
  const downloadVideo = async (i: Iteration, updateIteration = false) => {
    try {
      let url = getUrl(i);
      let videoName = getVideoName(i);
      const data = await downloadResumable(url, videoName).downloadAsync();
      if (!data) return;
      if (updateIteration) updateIterationVideoUrl(i, data.uri);

      return { uri: data.uri, idIteration: i.id };
    } catch (e) {
      console.error("eerrrr", e);
    }
  };
  const downloadVideos = async (session: Session) => {
    const downloadVideosPromises = session.workout.iterations.map((i) =>
      downloadVideo(i, true)
    );
    if (!downloadVideosPromises) return;

    try {
      const response = await Promise.all(downloadVideosPromises);
    } catch (error) {}
  };
  const downloadSession = async () => {
    setIsDownloading(true);
    try {
      const { data, isSuccess } = await refetchSession();
      if (isSuccess) {
        setSession(data.data);
        await downloadVideos(data.data);
        setWasSessionDownlaoded(true);
      }
    } catch (error) {
      console.log("error en download session", error);
    } finally {
      setIsDownloading(false);
    }
  };
  return {
    downloadVideos,
    downloadProgress,
    isDownloading,
    setIsDownloading,
    downloadSession,
    session,
    wasSessionDownlaoded,
  };
};

export default useSession;