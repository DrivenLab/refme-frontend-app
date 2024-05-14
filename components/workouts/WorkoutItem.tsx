import { DownloadProgress, Workout } from "@/types/workout";
import { StyleSheet } from "react-native";
import { Box, Pressable, Text } from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { Href, Link } from "expo-router";
import { useGetSessionDetailById } from "@/queries/session.query";
import { useState } from "react";
import DownloadSessionBtn from "./DownloadSessionBtn";
import React from "react";
import DownloadProgressModal from "./DownloadProgressModal";
import { downloadVideo, getVideoName, saveVideo } from "@/utils/downloadFiles";
type Props = {
  workout: Workout;
  idSession: number;
};

const WorkoutItem = ({ workout, idSession }: Props) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progressValue, setProgessValue] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const { session, isLoadingSession, refetchSession } = useGetSessionDetailById(
    {
      idSession,
      enabled,
    }
  );
  const [wasDownloaded, setWasDownloaded] = useState(session !== undefined);

  const downloadWorkout = async () => {
    setEnabled(true);
    const { isSuccess, data } = await refetchSession();
    if (isSuccess) {
      let workout = data.data.workout;
      setIsDownloading(true);
      setWasDownloaded(false);
      try {
        const promises = workout.iterations.map((iteration, index, array) => {
          // El tamaño del lote es 100. Estamos procesando un conjunto de 100 usuarios.
          return downloadVideo({
            url: iteration.answers[0].video1.video,
            videoName: getVideoName({
              idSession: data.data.id,
              iteration,
            }),
            setDonwloadProgress:
              index === array.length - 1
                ? (value) => setProgessValue(value)
                : undefined,
          });
        });

        // las peticiones tendrán 100 o menos promesas pendientes.
        // Promise.all esperará hasta que todas las promesas se resuelvan y después toma el siguiente 100.
        const videos = await Promise.all(promises);
        console.log("videos", videos);
        /*
        videos.forEach((v) => {
          if (v)
            saveVideo(v?.uri, v.videoName, v.mimeType || "application/mp4");
        });
        */
        setWasDownloaded(true);
      } catch (error) {
      } finally {
        setIsDownloading(false);
      }
    }

    //setIsDownloading(true);
  };
  return (
    <>
      <DownloadProgressModal
        isModalOpen={isDownloading}
        setIsModalOpen={(value) => setIsDownloading(value)}
        downloadProgress={progressValue}
      />
      <Link href={`/workouts/${idSession}/` as Href<string>} asChild>
        <Pressable>
          <Box
            rounded={"$md"}
            px={"$5"}
            py={"$2"}
            mb={"$4"}
            style={styles.workoutItem}
          >
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              alignContent="center"
              style={{ borderBottomWidth: 2, borderBottomColor: "#ede18a" }}
              py={"$1"}
            >
              <Box>
                <Text>{i18n.t("dm")}</Text>
              </Box>
              <DownloadSessionBtn
                wasDownloaded={wasDownloaded}
                downloadSession={downloadWorkout}
              />
            </Box>
            <Box>
              <Text fontWeight="bold" color="black" fontSize={20} py={"$2"}>
                {workout.name}
              </Text>
              <Text>{workout.description}</Text>
            </Box>
          </Box>
        </Pressable>
      </Link>
    </>
  );
};

export default WorkoutItem;
const styles = StyleSheet.create({
  workoutItem: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    backgroundColor: "#F3F3F4",
  },
});
