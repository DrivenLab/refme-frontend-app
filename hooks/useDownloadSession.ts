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
  const { downloadProgress, isDownloading, downloadVideos, setIsDownloading } =
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
      const responses = await downloadVideos(data.data.workout);
      const iterationsUpdated = data.data.workout.iterations;
      if (!responses) {
        // Toast("Error descargando");
        console.warn("TODO: Mostrar toast de error en descarga");
        setWasSessionDownloaded(false);
        return;
      }
      responses?.forEach((r) => {
        const itIndex = iterationsUpdated.findIndex(
          (it) => it.id === r?.idIteration
        );
        if (r && itIndex !== -1) {
          const answerIndex = iterationsUpdated[itIndex].answers.findIndex(
            (a) => a.id === r.answerId
          );
          if (answerIndex !== -1) {
            if (r.uri1) {
              iterationsUpdated[itIndex].answers[answerIndex].video1.video =
                r.uri1;
            }
            if (
              r.uri2 &&
              iterationsUpdated[itIndex].answers[answerIndex].video2
            ) {
              //@ts-ignore TS A veces no funciona :(
              iterationsUpdated[itIndex].answers[answerIndex].video2.video =
                r.uri2;
            }
          }
        }
      });
      updateSessionIterations({ iterations: iterationsUpdated });
      setWasSessionDownloaded(true);
    } catch (error) {
      console.log("error en download session", error);
    } finally {
    }
  };
  const cancelDownload = () => {
    setIsDownloading(false);
    setWasSessionDownloaded(false);
  };
  return {
    session,
    wasSessionDownloaded,
    downloadProgress,
    isDownloading,
    downloadSession,
    setIsDownloading,
    cancelDownload,
  };
};

export default useDownloadSession;
