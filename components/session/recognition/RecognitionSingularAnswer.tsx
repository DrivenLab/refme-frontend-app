import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Box,
  HStack,
} from "@gluestack-ui/themed";
import RecognitionOption from "./RecognitionOption";
import { Answer, IMAGE_NAME, RECOGNITION_VIDEO_TYPE } from "@/types/session";
import { useMemo, useState } from "react";
import { getImageFromName } from "@/utils/libs";
import { Image } from "@gluestack-ui/themed";
import { ImageSourcePropType } from "react-native";
import { RecognitionImageMap } from "@/utils/session";
type Props = {
  recognitionAnswer: Answer;
  selectedAnswer: string | null;
  recognitionType: RECOGNITION_VIDEO_TYPE;
  setAnswer: (a: string) => void;
};
const PROP_IMAGE_NAME: IMAGE_NAME = "target_image";

const RecognitionSingularAnswer = ({
  recognitionAnswer,
  selectedAnswer,
  recognitionType,
  setAnswer,
}: Props) => {
  const imageIconSource = useMemo(
    () => getImageFromName(RecognitionImageMap[recognitionType]),
    []
  );
  const firstIsCorrect = recognitionAnswer.video1.answer1 === "yes";
  const secondIsCorrect = recognitionAnswer.video2?.answer1 === "yes";
  return (
    <HStack height="100%" bg="$white">
      <RecognitionOption
        uri={recognitionAnswer.video1.video}
        onPress={() => setAnswer(recognitionAnswer.video1.answer1)}
        isCorrect={firstIsCorrect}
        isMarked={selectedAnswer === recognitionAnswer.video1.answer1}
      />
      <Box w="15%" display="flex" alignItems="center" justifyContent="center">
        <ArrowLeftIcon
          color={firstIsCorrect ? "#4ed964" : "#ff3a31"}
          w="$16"
          h="$16"
        />
        <Box
          rounded="$full"
          bgColor="$primary"
          padding={10}
          style={{ transform: "scale(0.7)" }}
        >
          <Image
            source={imageIconSource as unknown as ImageSourcePropType}
            alt={PROP_IMAGE_NAME}
          />
        </Box>
        <ArrowRightIcon
          color={secondIsCorrect ? "#4ed964" : "#ff3a31"}
          w="$16"
          h="$16"
        />
      </Box>
      {recognitionAnswer.video2 && (
        <RecognitionOption
          uri={recognitionAnswer.video2.video}
          onPress={() => setAnswer(recognitionAnswer.video2?.answer1 || "no")}
          isCorrect={secondIsCorrect}
          isMarked={selectedAnswer === recognitionAnswer.video2.answer1}
        />
      )}
    </HStack>
  );
};

const RecognitionSingularAnswerContactPoint = ({
  recognitionAnswer,
  setAnswer,
}: Props) => {
  const imageIconSource = useMemo(() => getImageFromName("shirt_plus"), []);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const firstIsCorrect = recognitionAnswer.video2
    ? recognitionAnswer.video1.answer1 > recognitionAnswer.video2?.answer1
    : false;
  const secondIsCorrect = recognitionAnswer.video2
    ? recognitionAnswer.video1.answer1 < recognitionAnswer.video2?.answer1
    : false;
  return (
    <Box bg="$white" flex={1} height="100%">
      <HStack>
        <RecognitionOption
          uri={recognitionAnswer.video1.video}
          onPress={() => setSelectedAnswer(recognitionAnswer.video1.answer1)}
          isCorrect={firstIsCorrect}
          isMarked={selectedAnswer === recognitionAnswer.video1.answer1}
        />
        <Box w="15%" display="flex" alignItems="center" justifyContent="center">
          {/* <ArrowLeftIcon color="#ceced3" w="$16" h="$16" /> */}
          <ArrowLeftIcon
            color={
              !selectedAnswer
                ? "#ceced3"
                : selectedAnswer === recognitionAnswer.video1.answer1
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
            <Image
              source={imageIconSource as unknown as ImageSourcePropType}
              alt={PROP_IMAGE_NAME}
            />
          </Box>
          <ArrowRightIcon
            color={
              !selectedAnswer
                ? "#ceced3"
                : selectedAnswer === recognitionAnswer.video2?.answer2
                ? "#4ed964"
                : "#ff3a31"
            }
            w="$16"
            h="$16"
          />
        </Box>
        {recognitionAnswer.video2 && (
          <RecognitionOption
            uri={recognitionAnswer.video2.video}
            onPress={() =>
              setSelectedAnswer(
                recognitionAnswer.video2
                  ? recognitionAnswer.video2?.answer1
                  : null
              )
            }
            isCorrect={secondIsCorrect}
            isMarked={selectedAnswer === recognitionAnswer.video2.answer1}
          />
        )}
      </HStack>
    </Box>
  );
};
export { RecognitionSingularAnswer, RecognitionSingularAnswerContactPoint };
