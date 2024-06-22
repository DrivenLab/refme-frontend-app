import { Box, Text, VStack, Pressable, ScrollView } from "@gluestack-ui/themed";
import React from "react";
import { useRouter } from "expo-router";

import StatsResultPill from "../workouts/StatsResultPill";
import XIcon from "@/assets/svgs/XIcon";
import i18n from "@/languages/i18n";
import {
  MEMBER_TYPE,
  WORKOUT_TYPE,
  WorkoutResultBarChart,
  WorkoutResume,
} from "@/types/workout";
import SessionResultBarChart from "../workouts/SessionResultBarChart";

type Props = {
  resume: WorkoutResume;
  resultBarData: WorkoutResultBarChart[];
  workoutType: WORKOUT_TYPE;
  memberType: MEMBER_TYPE;
  handleSaveResult: () => void;
};
const SessionStatistics = ({
  resume,
  resultBarData,
  workoutType,
  memberType,
  handleSaveResult,
}: Props) => {
  const router = useRouter();
  const handleXPress = () => {
    router.replace(`/workouts/`);
  };
  return (
    <ScrollView bgColor="white" px="$6" pt="$2">
      <Box py={"$2"} px={"$3"} flex={1} bg="$white" margin="auto">
        <Box display="flex" flexDirection="row" height={270}>
          <VStack width="30%" height="$full" space="md" paddingVertical={"$3"}>
            <StatsResultPill type="time" text={resume.totalTime} />
            <StatsResultPill type="success" text={resume.correctAnswers + ""} />
            <StatsResultPill type="error" text={resume.wrongAnswers + ""} />
            <Text>{i18n.t("workout_flow.answer_avg")}</Text>
            <StatsResultPill type="time" text={resume.answerAverageTime + ""} />
          </VStack>
          <Box width="70%" height="100%">
            <SessionResultBarChart
              data={resultBarData}
              workoutType={workoutType}
              memberType={memberType}
            />
          </Box>
        </Box>
        <Box display="flex" flexDirection="row">
          <Box width="42%">
            <Box
              bgColor="#f2f3f4"
              paddingHorizontal={10}
              paddingVertical={15}
              borderRadius={10}
              marginTop={"$2"}
            >
              <Text fontSize="$md" bold>
                {i18n.t("workout_flow.total_time")}
                <Text>{resume.answerTotalTime}</Text>
              </Text>
            </Box>
          </Box>
          <Box width={"58%"} display="flex" flexDirection="row">
            <Box
              marginHorizontal={10}
              flexGrow={1}
              display="flex"
              justifyContent="center"
              paddingVertical={15}
            >
              <Box marginVertical="auto">
                <Text bold>{i18n.t("workout_flow.date_title")}</Text>
                <Text>{resume.date}</Text>
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-end"
              marginStart={10}
              gap={5}
              flexGrow={1}
              //   width={"100%"}
            >
              <Pressable
                marginVertical="auto"
                onPress={handleXPress}
                marginRight={10}
              >
                <XIcon width={40} height={40}></XIcon>
              </Pressable>
            </Box>
          </Box>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default SessionStatistics;
