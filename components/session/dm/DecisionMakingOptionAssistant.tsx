import { Box, Pressable, Text, useColorMode } from "@gluestack-ui/themed";
import React, { useMemo } from "react";
import Colors from "@/constants/Colors";
import SanctionCardIcon from "@/assets/svgs/SanctionCardIcon";
import FlagIcon from "@/assets/svgs/FlagIcon";

type Props = {
  text?: string;
  answerKey: string;
  isCorrect: boolean;
  hasMarked: boolean;
  showAnswer: boolean;
  canTouch: boolean;
  handleUserAnswer: () => void;
};
const DecisionMakingOptionAssistant = ({
  text,
  answerKey,
  isCorrect,
  hasMarked,
  showAnswer,
  canTouch,
  handleUserAnswer,
}: Props) => {
  const handleOnPress = () => {
    if (canTouch) handleUserAnswer();
  };
  const mode = useColorMode();
  const bgColor = useMemo(() => {
    if (!hasMarked) return "#f5f5f6";

    if (!isCorrect) return "#FF3A3180";
    if (isCorrect) return "#4ED96480";
    else return "#ff9c97";
  }, [isCorrect, hasMarked, showAnswer]);

  return (
    <Pressable
      flex={1}
      justifyContent="center"
      height={"100%"}
      style={{
        backgroundColor: bgColor,
      }}
      rounded={10}
      onPress={handleOnPress}
      borderWidth={showAnswer && hasMarked ? 2 : 0}
      borderColor={
        isCorrect ? Colors[mode as keyof typeof Colors].success : "#FF3A31"
      }
    >
      <Box gap={16}>
        {answerKey === "off" ? (
          <Box margin="auto">
            <FlagIcon />
          </Box>
        ) : answerKey === "noff" ? (
          <Box margin="auto">
            <FlagIcon isGray />
          </Box>
        ) : null}
        <Text color="black" textAlign="center" fontSize={20} fontWeight="$bold">
          {text?.toUpperCase()}
        </Text>
      </Box>
    </Pressable>
  );
};

export default DecisionMakingOptionAssistant;
