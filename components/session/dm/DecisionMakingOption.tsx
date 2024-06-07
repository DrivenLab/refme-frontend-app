import { Box, Pressable, Text, useColorMode } from "@gluestack-ui/themed";
import React, { useMemo } from "react";
import Colors from "@/constants/Colors";
import SanctionCardIcon from "@/assets/svgs/SanctionCardIcon";

type Props = {
  text?: string;
  answerKey: string;
  isCorrect: boolean;
  hasMarked: boolean;
  showAnswer: boolean;
  canTouch: boolean;
  handleUserAnswer: () => void;
};
const DecisionMakingOption = ({
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
    if (!showAnswer) return "#090b22";
    if (isCorrect) return "#a6ebb1";
    else return "#ff9c97";
  }, [isCorrect, hasMarked, showAnswer]);
  const textColor = useMemo(() => {
    if (!hasMarked) return "#090b22";
    else if (!showAnswer) return "#ffffff";
    else return "#090b22";
  }, [isCorrect, hasMarked, showAnswer]);
  return (
    <Pressable
      flex={1}
      justifyContent="center"
      height={100}
      style={{
        backgroundColor: bgColor,
      }}
      rounded={10}
      onPress={handleOnPress}
      borderWidth={showAnswer && hasMarked ? 2 : 0}
      borderColor={
        isCorrect
          ? Colors[mode as keyof typeof Colors].success
          : Colors[mode as keyof typeof Colors].error
      }
    >
      {answerKey === "yc" ? (
        <Box margin="auto">
          <SanctionCardIcon
            cardColor="yellow"
            width={80}
            height={80}
            outlineFillColor={bgColor === "#090b22" ? "#ffffff" : "black"}
          />
        </Box>
      ) : answerKey === "rc" ? (
        <Box margin="auto">
          <SanctionCardIcon
            cardColor="red"
            width={80}
            height={80}
            outlineFillColor={bgColor === "#090b22" ? "#ffffff" : "black"}
          />
        </Box>
      ) : (
        text && (
          <Text
            color={textColor}
            textAlign="center"
            fontSize={20}
            fontWeight="bold"
            textTransform="uppercase"
          >
            {text}
          </Text>
        )
      )}
    </Pressable>
  );
};

export default DecisionMakingOption;
