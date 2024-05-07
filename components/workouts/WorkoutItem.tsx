import { Workout } from "@/types/workout";
import { StyleSheet } from "react-native";
import {
  Box,
  Button,
  ButtonIcon,
  DownloadIcon,
  Pressable,
  Text,
} from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { Link } from "expo-router";
type Props = {
  workout: Workout;
};

const WorkoutItem = ({ workout }: Props) => {
  return (
    <Link href={"/workouts/1/"} asChild>
      <Pressable>
        <Box rounded={"$md"} px={"$5"} py={"$2"} style={styles.workoutItem}>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            style={{ borderBottomWidth: 2, borderBottomColor: "#ede18a" }}
            py={"$1"}
          >
            <Box>
              <Text>{i18n.t("dm")}</Text>
            </Box>
            <Box flexDirection="row" alignItems="center">
              <Text mr={"$1"}>{i18n.t("download")}</Text>
              <Button
                rounded="$full"
                size="xs"
                p="$3.5"
                borderColor="black"
                variant="outline"
              >
                {/* EditIcon is imported from 'lucide-react-native' */}
                <ButtonIcon color="black" as={DownloadIcon} />
              </Button>
            </Box>
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
