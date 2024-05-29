import { Iteration, Session } from "@/types/session";
import { useEffect, useState } from "react";
import { useGetSessionDetailById } from "@/queries/session.query";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import useDownloadVideos from "./useDownloadVideos";

type Props = {
  idSession: number;
};
const useDownloadSession = ({ idSession }: Props) => {
  const [session, setSession] = useState<Session>();
  const [wasSessionDownloaded, setWasSessionDownloaded] = useState(false);
  const { downloadVideos, downloadProgress, isDownloading, setIsDownloading } =
    useDownloadVideos();
  const queryClient = useQueryClient();

  const { refetchSession } = useGetSessionDetailById({
    idSession,
    enabled: false,
  });

  useEffect(() => {
    const data = queryClient.getQueryData<AxiosResponse<Session>>([
      "sessions",
      idSession,
    ]);
    if (data) {
      setWasSessionDownloaded(true);
      setSession(data?.data);
    } else setWasSessionDownloaded(false);
  }, []);

  const updateSessionIterations = ({
    iterations,
  }: {
    iterations: Iteration[];
  }) => {
    const data = queryClient.getQueryData<AxiosResponse<Session>>([
      "sessions",
      idSession,
    ]);
    if (!data) return;
    queryClient.setQueryData(
      ["sessions", idSession],
      (axiosResponse: AxiosResponse<Session>) => {
        axiosResponse.data.workout.iterations = iterations;
        return axiosResponse;
      }
    );
  };

  const downloadSession = async () => {
    setIsDownloading(true);
    try {
      const { data, isSuccess } = await refetchSession();
      if (!isSuccess) return;
      setSession(data.data);
      const response = await downloadVideos(data.data.workout);
      const iterationsUpdated = data.data.workout.iterations.map((i) => {
        const item = response?.find((r) => r?.idIteration === i.id);
        if (!item) return i;
        i.answers[0].video1.video = item.uri;
        return i;
      });
      updateSessionIterations({ iterations: iterationsUpdated });
      setWasSessionDownloaded(true);
    } catch (error) {
      console.log("error en download session", error);
    } finally {
    }
  };

  return {
    session,
    wasSessionDownloaded,
    downloadSession,
    downloadProgress,
    isDownloading,
    setIsDownloading,
  };
};

export default useDownloadSession;
