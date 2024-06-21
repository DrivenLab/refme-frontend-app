import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Box,
  FlatList,
  HStack,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import RecognitionOption from "./RecognitionOption";
import { Answer, IMAGE_NAME, RECOGNITION_VIDEO_TYPE } from "@/types/session";
import { useMemo } from "react";
import { getImageFromName } from "@/utils/libs";
import { Image } from "@gluestack-ui/themed";
import { ImageSourcePropType } from "react-native";
import { RecognitionImageMap, shuffleArray } from "@/utils/session";
import { ContactPointOptions } from "@/constants/Session";
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
const getRandomItemFromArray = (arr: string[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
const RecognitionSingularAnswerContactPoint = ({
  recognitionAnswer,
  selectedAnswer,
  recognitionType,
  setAnswer,
}: Props) => {
  const imageIconSource = useMemo(
    () => getImageFromName(RecognitionImageMap[recognitionType]),
    []
  );
  const possibleAnswers = useMemo(() => {
    const answerStr = recognitionAnswer.video1.answer3;
    const answerStrSplit = answerStr.split("-");
    const firstPart = answerStrSplit[0];
    const secondPart = answerStrSplit[1];
    const options = Object.keys(ContactPointOptions);
    const similarToFirstPart = options.filter(
      (cp) => cp.includes(firstPart) && cp !== answerStr
    );
    const similarToSecondPart = options.filter(
      (cp) => cp.includes(secondPart) && cp !== answerStr
    );
    const random1 = getRandomItemFromArray(similarToFirstPart);
    const random2 = getRandomItemFromArray(similarToSecondPart);

    return shuffleArray([random1, random2, answerStr]);
  }, [recognitionAnswer.video1.answer3]);
  const isCorrect = selectedAnswer === recognitionAnswer.video1.answer3;

  const getAnswerBgColor = (item: string) => {
    if (isCorrect && item == recognitionAnswer.video1.answer3) return "#A6ECB1";
    if (
      selectedAnswer &&
      !isCorrect &&
      item == recognitionAnswer.video1.answer3
    )
      return "#f29490";
    return "#f5f5f6";
  };
  const getAnswerBorderColor = (item: string) => {
    if (isCorrect && item == recognitionAnswer.video1.answer3) return "#4ED964";
    if (
      selectedAnswer &&
      !isCorrect &&
      item == recognitionAnswer.video1.answer3
    )
      return "#FF3A31";
    return "#f5f5f6";
  };
  return (
    <HStack height="100%" bg="$white">
      <RecognitionOption
        uri={recognitionAnswer.video1.video}
        onPress={() => {}}
        isCorrect={false}
        isMarked={false}
      />
      <Box w="15%" display="flex" alignItems="center" justifyContent="center">
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
      </Box>
      <VStack>
        <FlatList
          h="$full"
          contentContainerStyle={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 25,
            height: "100%",
          }}
          data={possibleAnswers}
          keyExtractor={(item, i) => `option-${item}-${i}`}
          renderItem={({ item }: { item: any }) => (
            <Pressable
              paddingHorizontal={50}
              paddingVertical={20}
              rounded="$xl"
              onPress={() => setAnswer(`${item}`)}
              bgColor={getAnswerBgColor(item)}
              borderWidth={1}
              borderColor={getAnswerBorderColor(item)}
            >
              <Text fontSize={"$2xl"} textAlign="center" color="$secondary">
                {ContactPointOptions[item as keyof typeof ContactPointOptions]}
              </Text>
            </Pressable>
          )}
        />
      </VStack>
    </HStack>
  );
};

export { RecognitionSingularAnswer, RecognitionSingularAnswerContactPoint };
