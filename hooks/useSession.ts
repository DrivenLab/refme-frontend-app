import { Iteration, Session } from "@/types/session";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import { useGetSessionDetailById } from "@/queries/session.query";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Workout } from "@/types/workout";
import { useAuth } from "@/context/auth";

type Props = {
  idWorkout: string | number;
  workout: Workout;
  idSession: number;
};
const useSession = ({ idWorkout, workout, idSession }: Props) => {
  const [progresses, setProgresses] = useState<{ [key: string]: number }>({});
  const [isDownloading, setIsDownloading] = useState(false);
  const [enableQuery, setEnableQuery] = useState(false);
  const [session, setSession] = useState<Session>();
  const [wasSessionDownloaded, setWasSessionDownloaded] = useState(false);
  const queryClient = useQueryClient();
  const { userRole } = useAuth();

  const sessionId = idSession ?? idWorkout;

  const { refetchSession } = useGetSessionDetailById({
    idSession: sessionId,
    enabled: enableQuery,
  });

  useEffect(() => {
    const data = queryClient.getQueryData<AxiosResponse<Session>>([
      "sessions",
      idWorkout,
    ]);
    if (data) {
      setWasSessionDownloaded(true);
      setSession(data?.data);
    } else setWasSessionDownloaded(false);
  }, []);
  const updateSessionIteration = ({ iteration }: { iteration: Iteration }) => {
    const data = queryClient.getQueryData<AxiosResponse<Session>>([
      "sessions",
      idWorkout,
    ]);
    if (!data) return;
    queryClient.setQueryData(
      ["sessions", idWorkout],
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
  const calculateDownloadProgress = (
    downloadProgress_: FileSystem.DownloadProgressData,
    url: string
  ) => {
    const progress =
      downloadProgress_.totalBytesWritten /
      downloadProgress_.totalBytesExpectedToWrite;
    setProgresses((old) => ({ ...old, [url]: progress }));
  };
  const downloadResumable = (url: string, videoName: string) =>
    FileSystem.createDownloadResumable(
      url,
      FileSystem.documentDirectory + videoName,
      {},
      (x) => calculateDownloadProgress(x, url)
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
  const downloadVideos = async (workout: Workout) => {
    const downloadVideosPromises = workout.iterations
      .filter((i) => i.answers.length)
      .map((i) => downloadVideo(i, true));
    if (!downloadVideosPromises) return;

    try {
      const response = await Promise.all(downloadVideosPromises);
    } catch (error) {}
  };
  const downloadSession = async () => {
    setIsDownloading(true);
    if (userRole === "member") {
      try {
        const { data, isSuccess } = await refetchSession();
        if (isSuccess) {
          setSession(data.data);
          await downloadVideos(data.data.workout);
          setWasSessionDownloaded(true);
        }
      } catch (error) {
        console.log("error en download session", error);
      } finally {
        setIsDownloading(false);
      }
    } else if (workout) {
      try {
        await downloadVideos(workout);
        setWasSessionDownloaded(true);
      } catch (error) {
        console.log("error en download session", error);
      } finally {
        setIsDownloading(false);
      }
    } else {
      console.log("ERROR, workout undefined");
    }
    setIsDownloading(false);
  };
  const downloadProgress =
    Object.values(progresses).reduce((prev, curr) => prev + curr, 0) /
    Object.values(progresses).length;
  return {
    downloadProgress: downloadProgress || 0,
    isDownloading,
    session,
    wasSessionDownloaded,
    downloadVideos,
    setIsDownloading,
    downloadSession,
  };
};

export default useSession;
