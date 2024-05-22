import { View, Box } from "@gluestack-ui/themed";
import React, { useMemo } from "react";
import { Image } from "expo-image";

type Props = {
  children: React.ReactNode;
  imageURI: string;
};
const SessionGetReady = ({ children }: Props) => {
  const imageSource = useMemo(() => {
    return require("@/assets/images/man_running_ready_to_workout.png");
  }, []);
  return (
    <View
      flex={1}
      justifyContent="space-evenly"
      flexDirection="row"
      alignItems="center"
      bg="$primary"
    >
      <Box flex={2} height={"100%"} justifyContent="center">
        {children}
      </Box>
      <Box flex={1}>
        <Image
          source={imageSource}
          style={{ height: 150, width: "100%" }}
          contentFit="contain"
        />
      </Box>
    </View>
  );
};

export default SessionGetReady;
