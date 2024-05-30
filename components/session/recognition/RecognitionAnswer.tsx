import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Box,
  HStack,
  Image,
} from "@gluestack-ui/themed";
import React, { useEffect, useMemo, useState } from "react";

import { DM_ANSWER, IMAGE_NAME, IterationContext } from "@/types/session";
import CProgress from "@/components/progress-bar/CProgress";
import useCountdown from "@/hooks/useCountdown";
import { get_image_from_name } from "@/utils/libs";
import RecognitionOption from "./RecognitionOption";

type Props = {
  onFinish: (a: any) => void;
  iteration: IterationContext;
};

type RecognitionAnswerType = "1" | "2" | "";

const PROP_IMAGE_NAME: IMAGE_NAME = "target_image";
const REAL_ANSWER: RecognitionAnswerType = "2";

const RecognitionAnswer = ({ onFinish, iteration }: Props) => {
  const imageIconSource = useMemo(
    () => get_image_from_name(PROP_IMAGE_NAME),
    []
  );
  const [answer, setAnswer] = useState<RecognitionAnswerType>("");
  //   const [hasCompleted, setHasCompleted] = useState(false);
  const isCorrect = answer === REAL_ANSWER;
  const { hasFinished, elapsedRunningTime } = useCountdown({
    stopInSec: iteration.timeToAnswerInSec,
    delay: 1,
  });
  useEffect(() => {
    if (hasFinished.current) handleOnFinishCountdown();
  }, [hasFinished.current]);

  function handleOnFinishCountdown() {
    // const a: DM_ANSWER = { ...asnwer };
    onFinish(isCorrect);
  }
  return (
    <Box bg="$white" flex={1} height="100%">
      <CProgress totalTimeInSec={iteration.timeToAnswerInSec} />
      <HStack>
        <RecognitionOption
          uri="https://j.gifs.com/xGgo4r.gif"
          onPress={() => setAnswer("1")}
          isCorrect={isCorrect}
          isMarked={answer === "1"}
        />
        <Box w="15%" display="flex" alignItems="center" justifyContent="center">
          {/* <ArrowLeftIcon color="#ceced3" w="$16" h="$16" /> */}
          <ArrowLeftIcon
            color={
              answer === ""
                ? "#ceced3"
                : REAL_ANSWER === "1"
                ? "#4ed964"
                : "#ff3a31"
            }
            w="$16"
            h="$16"
          />
          <Box
            rounded="$full"
            bgColor="$primary"
            padding={10}
            style={{ transform: "scale(0.7)" }}
          >
            <Image source={imageIconSource} alt={PROP_IMAGE_NAME} />
          </Box>
          <ArrowRightIcon
            color={
              answer === ""
                ? "#ceced3"
                : REAL_ANSWER === "2"
                ? "#4ed964"
                : "#ff3a31"
            }
            w="$16"
            h="$16"
          />
        </Box>
        <RecognitionOption
          uri="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmFoMXlnY29mNG05OGxzcTVoYmE5MDh1cTFsZjJ6aWZ3bDl5dTNiNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XI287y0miNy3Y1dq5O/giphy.gif"
          onPress={() => setAnswer("2")}
          isCorrect={isCorrect}
          isMarked={answer === "2"}
        />
      </HStack>
    </Box>
  );
};

export default RecognitionAnswer;
