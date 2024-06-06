import { WORKOUT_TYPE, Workout } from "@/types/workout";
import { StyleSheet } from "react-native";
import { Box, Pressable, Text } from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { Href, Link } from "expo-router";
import DownloadSessionBtn from "./DownloadSessionBtn";
import ExerciseLogo from "@/assets/svgs/ExerciseLogo";
const COLOR_TYPE: Record<WORKOUT_TYPE, string> = {
  "dm+memory": "#A6ECB1",
  dm: "#F3E890",
  dmar: "#FFC107",
  memory: "#ABEDFD",
  recognition: "#FFB290",
};
type Props = {
  id: number;
  workout: Workout;
  downloadSession?: () => void;
  wasSessionDownloaded: boolean;
};
const WorkoutCard = ({
  id,
  workout,
  wasSessionDownloaded,
  downloadSession,
}: Props) => {
  return (
    <Link href={`/workouts/${id}/` as Href<string>} asChild>
      <Pressable marginBottom="$2">
        <Box
          rounded={"$md"}
          px={"$5"}
          py={"$2"}
          mb={"$4"}
          style={styles.shadow}
        >
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            alignContent="center"
            style={{
              borderBottomWidth: 2,
              borderBottomColor: COLOR_TYPE[workout.type],
            }}
            py={"$1"}
          >
            <Box display="flex" flexDirection="row" gap={3} alignItems="center">
              <ExerciseLogo type={workout.type} />
              <Text color="secondary" width={150}>
                {i18n.t(`workout_type.${workout.type}`)}
              </Text>
            </Box>
            {downloadSession && (
              <DownloadSessionBtn
                wasDownloaded={wasSessionDownloaded}
                downloadSession={downloadSession}
              />
            )}
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
  );
};

export default WorkoutCard;
const styles = StyleSheet.create({
  shadow: {
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
