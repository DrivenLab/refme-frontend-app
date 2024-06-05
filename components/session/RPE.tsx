import React, { useEffect, useState } from "react";
import { Box, HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import {
  RPE_COLORS,
  RPE_STRING_VALUES,
  RPE_NUMBER_VALUES,
} from "@/constants/Session";
import i18n from "@/languages/i18n";
import CProgress from "../progress-bar/CProgress";
import useCountdown from "@/hooks/useCountdown";

type Props = {
  onFinishRPE: (rpe?: number) => void;
  iteration: {
    timeToRPEInSec: number;
  };
};
const RPE = ({ onFinishRPE, iteration }: Props) => {
  const [rpe, setRpe] = useState<number>();
  const { hasFinished } = useCountdown({
    stopInSec: iteration.timeToRPEInSec,
    delay: 1,
  });
  useEffect(() => {
    if (hasFinished.current) onFinishRPE(rpe);
  }, [hasFinished.current]);

  const handleOnPress = (rpe_: number) => {
    setRpe(rpe_);
  };
  return (
    <Box bg="$white" flex={1}>
      <CProgress totalTimeInSec={iteration.timeToRPEInSec} />
      <HStack
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        flexWrap="wrap"
        pt="$2"
        px={"$10"}
      >
        <Box
          width="$1/6"
          height={160}
          p="$2"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize={20} color="black" fontWeight="$bold">
            {i18n.t("rpe_how_do_you_feel")}
          </Text>
        </Box>
        {Object.entries(RPE_NUMBER_VALUES).map(([key, value]) => (
          <Box width="$1/6" height={160} key={key} px={"$1"} py={"$2"}>
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
              rounded={20}
              width={"90%"}
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
                style={{ fontFamily: "PlusJakartaSans_700Bold" }}
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
                paddingHorizontal="$2"
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
