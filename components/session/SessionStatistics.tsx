import { Box, Text, VStack, Pressable, ScrollView } from "@gluestack-ui/themed";
import React from "react";
import StatsResultPill from "../workouts/StatsResultPill";
import XIcon from "@/assets/svgs/XIcon";
import i18n from "@/languages/i18n";
import { useRouter } from "expo-router";
import { WorkoutResultBarChart, WorkoutResume } from "@/types/workout";
import { DMWorkout } from "@/types/session";
import SessionResultBarChart from "../workouts/SessionResultBarChart";
type Props = {
  resume: WorkoutResume;
  resultBarData: WorkoutResultBarChart[];
};
const SessionStatistics = ({ resume, resultBarData }: Props) => {
  const router = useRouter();
  const handleXPress = () => {
    router.replace(`/workouts/`);
  };
  return (
    <ScrollView>
      <Box py={"$2"} px={"$3"} flex={1} bg="$white">
        <Box display="flex" flexDirection="row" height={270}>
          <VStack width="30%" height="$full" space="md" paddingVertical={"$1"}>
            <StatsResultPill type="time" text={resume.totalTime} />
            <StatsResultPill type="success" text={resume.correctAnswers + ""} />
            <StatsResultPill type="error" text={resume.wrongAnswers + ""} />
            <Text>{i18n.t("workout_flow.answer_avg")}</Text>
            <StatsResultPill type="time" text={resume.answerAverageTime + ""} />
          </VStack>
          <Box width="70%" height="100%">
            <SessionResultBarChart data={resultBarData} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" mt={"$5"}>
          <Box width="50%">
            <Box
              bgColor="#f2f3f4"
              paddingHorizontal={10}
              paddingVertical={15}
              borderRadius={10}
            >
              <Text fontSize="$lg" bold>
                {i18n.t("workout_flow.total_time")}
                <Text>{resume.answerTotalTime}</Text>
              </Text>
            </Box>
          </Box>
          <Box marginHorizontal={10}>
            <Box marginVertical="auto">
              <Text bold>{i18n.t("workout_flow.date_title")}</Text>
              <Text>{resume.date}</Text>
            </Box>
          </Box>
          <Box display="flex" alignItems="flex-end" marginStart={10}>
            <Pressable marginVertical="auto" onPress={handleXPress}>
              <XIcon width={40} height={40}></XIcon>
            </Pressable>
          </Box>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default SessionStatistics;
