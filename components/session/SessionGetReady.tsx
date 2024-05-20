import { View, Box } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";

type Props = {
  onFinishCountdown: () => void;
  children: React.ReactNode;
};
const SessionGetReady = ({ onFinishCountdown, children }: Props) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 0) {
          console.log("calling here");
          clearInterval(interval);
          onFinishCountdown();
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
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
          source={require("@/assets/images/man_running_ready_to_workout.png")}
          style={{ height: 150, width: "100%" }}
          contentFit="contain"
        />
      </Box>
    </View>
  );
};

export default SessionGetReady;
