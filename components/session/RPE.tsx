import React, { useEffect, useState } from "react";
import { Box, Pressable, Text, VStack } from "@gluestack-ui/themed";
import {
  RPE_COLORS,
  RPE_STRING_VALUES,
  RPE_NUMBER_VALUES,
} from "@/constants/Session";
import i18n from "@/languages/i18n";
import CProgress from "../progress-bar/CProgress";
import useCountdown from "@/hooks/useCountdown";
import { IterationContext } from "@/types/session";
type Props = {
  onFinishRPE: (rpe?: number) => void;
  iteration: IterationContext;
};
const RPE = ({ onFinishRPE, iteration }: Props) => {
  const [rpe, setRpe] = useState<number | undefined>();
  const { countdownInSec, hasFinished } = useCountdown({
    stopInSec: iteration.timeToRPEInSec,
    delay: 1,
  });
  useEffect(() => {
    if (hasFinished.current) onFinishRPE(rpe);
  }, [hasFinished.current]);
  const handleOnPress = (rpe_: number) => {
    console.log("rpe", rpe_);
    setRpe(rpe_);
    //onFinishRPE(Number(rpe_));
  };
  return (
    <Box bg="$white" flex={1}>
      <CProgress
        progressValue={countdownInSec}
        initialProgressValue={iteration.timeToRPEInSec}
      />
      <Box bg="$white" flex={1} px={"$4"} py="$5" justifyContent="center"></Box>

      <VStack
        flexDirection="row"
        space="md"
        justifyContent="flex-start"
        alignItems="center"
        flexWrap="wrap"
      >
        <Text fontSize={20} color="black" fontWeight="mediumn">
          {i18n.t("rpe_how_do_you_feel")}
        </Text>
        {Object.entries(RPE_NUMBER_VALUES).map(([key, value]) => (
          <Pressable
            flex={1}
            height={150}
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            style={{
              backgroundColor:
                rpe === value
                  ? "#090b22"
                  : RPE_COLORS[key as keyof typeof RPE_COLORS],
            }}
            rounded={10}
            key={key}
            minWidth={100}
            py={"$8"}
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
        ))}
      </VStack>
    </Box>
  );
};

export default RPE;
