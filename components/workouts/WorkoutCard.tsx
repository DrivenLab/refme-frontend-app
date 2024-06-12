import { WORKOUT_TYPE, Workout } from "@/types/workout";
import { StyleSheet } from "react-native";
import { Box, Pressable, Text } from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { Link } from "expo-router";
import DownloadSessionBtn from "./DownloadSessionBtn";
import ExerciseLogo from "@/assets/svgs/ExerciseLogo";

// TODO: ACA TIENE QUE SER TODO EL BG NO SOLO EL BORDER
const COLOR_TYPE: Record<WORKOUT_TYPE, string> = {
  "dm+memory": "#A6ECB1",
  dm: "#F3E890",
  dmar: "#FFC107",
  memory: "#ABEDFD",
  recognition: "#FFB290",
  random: "#fff",
};
type Props = {
  id: number;
  workout: Workout;
  wasSessionDownloaded: boolean;
  isCompleted: boolean;
  downloadSession?: () => void;
};
const WorkoutCard = ({
  id,
  workout,
  wasSessionDownloaded,
  isCompleted,
  downloadSession,
}: Props) => {
  return (
    <Link href={`/workouts/${id}/`} asChild>
      <Pressable marginBottom="$3">
        <Box
          rounded={"$md"}
          overflow="hidden"
          borderWidth={workout.type === "random" ? 1 : 0}
          borderColor="#F3F3F4"
          borderBottomWidth={3}
          borderBottomColor={COLOR_TYPE[workout.type]}
          borderTopWidth={workout.type === "random" ? 1 : 0}
          borderRightWidth={workout.type === "random" ? 1 : 0}
          borderLeftWidth={workout.type === "random" ? 1 : 0}
          backgroundColor="#F3F3F4"
        >
          <Box bgColor={COLOR_TYPE[workout.type]}>
            <Box
              px={"$5"}
              py="$3"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              alignContent="center"
            >
              <Box
                display="flex"
                flexDirection="row"
                gap={3}
                alignItems="center"
              >
                <ExerciseLogo type={workout.type} />
                <Text color="secondary" width={150}>
                  {i18n.t(`workout_type.${workout.type}`)}
                </Text>
              </Box>
              {downloadSession && !isCompleted && (
                <DownloadSessionBtn
                  wasDownloaded={wasSessionDownloaded}
                  downloadSession={downloadSession}
                />
              )}
            </Box>
          </Box>
          <Box px={"$5"} py={"$2"}>
            <Text fontWeight="bold" color="black" fontSize={20} py={"$2"}>
              {workout.name}
            </Text>
            <Text>{workout.description}</Text>
          </Box>
        </Box>
      </Pressable>
    </Link>
  );
};

export default WorkoutCard;
const styles = StyleSheet.create({});
