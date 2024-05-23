import React, { useState } from "react";
import { Box, HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import {
  RPE_COLORS,
  RPE_STRING_VALUES,
  RPE_NUMBER_VALUES,
} from "@/constants/Session";
import i18n from "@/languages/i18n";
type Props = {
  onFinishRPE: (rpe: number) => void;
};
const RPE = ({ onFinishRPE }: Props) => {
  const [rpe, setRpe] = useState<number | undefined>();
  const handleOnPress = (rpe_: number) => {
    setRpe(rpe_);
    onFinishRPE(Number(rpe_));
  };
  return (
    <Box
      flex={1}
      alignContent="center"
      alignItems="center"
      height={"100%"}
      bg="$white"
      px="$8"
    >
      <HStack
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        flexWrap="wrap"
      >
        <Box width="$1/6">
          <Text fontSize={20} color="black" fontWeight="mediun">
            {i18n.t("rpe_how_do_you_feel")}
          </Text>
        </Box>
        {Object.entries(RPE_NUMBER_VALUES).map(([key, value]) => (
          <Box width="$1/6" height={180} key={key} p={"$2"}>
            <Pressable
              flex={1}
              justifyContent="center"
              alignItems="center"
              alignContent="center"
              bgColor={
                rpe === value
                  ? "#090b22"
                  : RPE_COLORS[key as keyof typeof RPE_COLORS]
              }
              rounded={10}
              onPress={() => handleOnPress(value)}
            >
              <Text
                color={
                  rpe === value
                    ? RPE_COLORS[key as keyof typeof RPE_COLORS]
                    : "#090b22"
                }
                textAlign="center"
                fontSize={50}
                fontWeight={"bold"}
              >
                {key}
              </Text>
              <Text
                color={
                  rpe === value
                    ? RPE_COLORS[key as keyof typeof RPE_COLORS]
                    : "#090b22"
                }
                textAlign="center"
              >
                {i18n.t(
                  "rpe_" +
                    RPE_STRING_VALUES[key as keyof typeof RPE_STRING_VALUES]
                )}
              </Text>
            </Pressable>
          </Box>
        ))}
      </HStack>
    </Box>
  );
};

export default RPE;
