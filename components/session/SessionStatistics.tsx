import { SessionContext } from "@/types/session";
import { getSessionResume } from "@/utils/session";
import { Box, Text, VStack, Pressable } from "@gluestack-ui/themed";
import React, { useState } from "react";
import StatsResultPill from "../workouts/StatsResultPill";
import SessionResultBarChart from "../workouts/SessionResultBarChart";
import XIcon from "@/assets/svgs/XIcon";
type Props = {
  session: SessionContext;
};
const SessionStatistics = ({ session }: Props) => {
  //console.log("ses", session.iterations);
  const [resume, setResume] = useState(getSessionResume(session));
  return (
    <Box py={"$5"} flex={1} bg="$white">
      {/* <Text fontWeight={"$bold"} fontSize={30} color="black">
        Resultados
      </Text> */}
      <Box display="flex" flexDirection="row" height={270}>
        <VStack width="30%" height="$full" space="md" paddingVertical={"$1"}>
          <StatsResultPill type="time" text={resume.totalTime} />
          <StatsResultPill type="success" text={resume.correctAnswers + ""} />
          <StatsResultPill type="error" text={resume.wrongAnswers + ""} />
          <Text>Promedio de respuesta</Text>
          <StatsResultPill type="time" text={resume.answerAverageTime + ""} />
        </VStack>
        <Box width="70%" height="100%">
          <SessionResultBarChart session={session} />
        </Box>
      </Box>
      <Box display="flex" flexDirection="row">
        <Box width="45%">
          <Text
            bgColor="#f2f3f4"
            fontSize="$lg"
            bold
            paddingHorizontal={10}
            paddingVertical={15}
            borderRadius={10}
          >
            Tiempo total de respuestas: <Text>{resume.answerTotalTime}</Text>
          </Text>
        </Box>
        <Box marginHorizontal={10}>
          <Box marginVertical="auto">
            <Text bold>Realizado: </Text>
            <Text>{resume.date}</Text>
          </Box>
        </Box>
        <Box display="flex" alignItems="flex-end" marginStart={10}>
          <Pressable marginVertical="auto">
            <XIcon width={40} height={40}></XIcon>
          </Pressable>
        </Box>
      </Box>
    </Box>
  );
};

export default SessionStatistics;
