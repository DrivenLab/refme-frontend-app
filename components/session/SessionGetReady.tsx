import { View, Text, Box } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";

type Props = {
  onFinishCountdown: () => void;
  children: React.ReactNode;
};
const SessionGetReady = ({ onFinishCountdown, children }: Props) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    console.log("heree");
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
      bg="white"
    >
      <Box flex={1} bg="$primary0" height={"100%"} justifyContent="center">
        {children}
      </Box>
    </View>
  );
};

export default SessionGetReady;
