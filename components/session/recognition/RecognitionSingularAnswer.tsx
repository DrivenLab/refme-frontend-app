import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Box,
  HStack,
} from "@gluestack-ui/themed";
import RecognitionOption from "./RecognitionOption";
import { Answer, IMAGE_NAME } from "@/types/session";
import { useMemo, useState } from "react";
import { get_image_from_name } from "@/utils/libs";
import { Image } from "@gluestack-ui/themed";
type Props = {
  recognitionAnswer: Answer;
  setAnswer: (a: string | number) => void;
};
const PROP_IMAGE_NAME: IMAGE_NAME = "target_image";

const RecognitionSingularAnswerFault = ({
  recognitionAnswer,
  setAnswer,
}: Props) => {
  const imageIconSource = useMemo(() => get_image_from_name("whistle"), []);
  const [selectedAnswer, setSelectedAnswer] = useState<"yes" | "no" | null>(
    null
  );
  const firstIsCorrect = recognitionAnswer.video1.answer1 === "yes";
  const secondIsCorrect = recognitionAnswer.video2?.answer1 === "yes";
  return (
    <Box bg="$white" flex={1} height="100%">
      <HStack>
        <RecognitionOption
          uri={recognitionAnswer.video1.video}
          onPress={() =>
            setSelectedAnswer(recognitionAnswer.video1.answer1 as "yes" | "no")
          }
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
            <Image source={imageIconSource} alt={PROP_IMAGE_NAME} />
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
                (recognitionAnswer.video2?.answer1 as "yes" | "no") || null
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

const RecognitionSingularAnswerHand = ({
  recognitionAnswer,
  setAnswer,
}: Props) => {
  const imageIconSource = useMemo(() => get_image_from_name("hand_ball"), []);
  const [selectedAnswer, setSelectedAnswer] = useState<"yes" | "no" | null>(
    null
  );
  const firstIsCorrect = recognitionAnswer.video1.answer1 === "yes";
  const secondIsCorrect = recognitionAnswer.video2?.answer1 === "yes";
  return (
    <Box bg="$white" flex={1} height="100%">
      <HStack>
        <RecognitionOption
          uri={recognitionAnswer.video1.video}
          onPress={() =>
            setSelectedAnswer(recognitionAnswer.video1.answer1 as "yes" | "no")
          }
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
            <Image source={imageIconSource} alt={PROP_IMAGE_NAME} />
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
                (recognitionAnswer.video2?.answer1 as "yes" | "no") || null
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
const RecognitionSingularAnswerNumberOfPlayers = ({
  recognitionAnswer,
  setAnswer,
}: Props) => {
  const imageIconSource = useMemo(() => get_image_from_name("shirt_plus"), []);
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
            <Image source={imageIconSource} alt={PROP_IMAGE_NAME} />
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
const RecognitionSingularAnswerContactPoint = ({
  recognitionAnswer,
  setAnswer,
}: Props) => {
  const imageIconSource = useMemo(() => get_image_from_name("shirt_plus"), []);
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
            <Image source={imageIconSource} alt={PROP_IMAGE_NAME} />
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
export {
  RecognitionSingularAnswerFault,
  RecognitionSingularAnswerHand,
  RecognitionSingularAnswerNumberOfPlayers,
  RecognitionSingularAnswerContactPoint,
};
