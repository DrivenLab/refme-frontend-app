import React, { useState } from "react";
import { Box, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { RPE_COLORS, RPE_VALUES } from "@/constants/Session";
import i18n from "@/languages/i18n";
type Props = {
  onFinishRPE: () => void;
};
const RPE = ({ onFinishRPE }: Props) => {
  const [rpe, setRpe] = useState<string | undefined>();
  const handleOnPress = (rpe_: string) => {
    setRpe(rpe_);
    onFinishRPE();
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
        {Object.entries(RPE_VALUES).map(([key, value]) => (
          <Pressable
            flex={1}
            height={150}
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            style={{
              backgroundColor:
                rpe === key
                  ? "#090b22"
                  : RPE_COLORS[key as keyof typeof RPE_COLORS],
            }}
            rounded={10}
            key={key}
            minWidth={100}
            py={"$8"}
            onPress={() => handleOnPress(key)}
          >
            <Text
              color={
                rpe === key
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
                rpe === key
                  ? RPE_COLORS[key as keyof typeof RPE_COLORS]
                  : "#090b22"
              }
              textAlign="center"
            >
              {i18n.t("rpe_" + value)}
            </Text>
          </Pressable>
        ))}
      </VStack>
    </Box>
  );
};

export default RPE;
