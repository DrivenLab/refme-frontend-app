import { SessionContext } from "@/types/session";
import { getSessionResume } from "@/utils/session";
import { Box, Text } from "@gluestack-ui/themed";
import React, { useState } from "react";
type Props = {
  session: SessionContext;
};
const SessionStatistics = ({ session }: Props) => {
  //console.log("ses", session.iterations);
  const [resume, setResume] = useState(getSessionResume(session));
  return (
    <Box py={"$5"} flex={1} bg="$white">
      <Text fontWeight={"$bold"} fontSize={30} color="black">
        Resultados
      </Text>
      <Text fontWeight={"$bold"} fontSize={20} color="black">
        Tiempo total:{" "}
        <Text color="black" fontSize={20}>
          10 seg
        </Text>
      </Text>
      <Text fontWeight={"$bold"} fontSize={20} color="black">
        Número de respuestas correctas:{" "}
        <Text color="black" fontSize={20}>
          {resume.correctAnswers}
        </Text>
      </Text>
      <Text fontWeight={"$bold"} fontSize={20} color="black">
        Número de respuestas incorrectas:{" "}
        <Text color="black" fontSize={20}>
          {resume.wrongAnswers}
        </Text>
      </Text>
      <Text fontWeight={"$bold"} fontSize={20} color="black">
        Promedio respuesta:{" "}
        <Text color="black" fontSize={20}>
          {resume.answerAverage}
        </Text>
      </Text>
      <Text fontWeight={"$bold"} fontSize={20} color="black">
        Tiempo total de respuestas:{" "}
        <Text color="black" fontSize={20}>
          {resume.answerTotalTime}
        </Text>
      </Text>
      <Text>{JSON.stringify(session)}</Text>
    </Box>
  );
};

export default SessionStatistics;
