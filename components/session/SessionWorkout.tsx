import { View, Text, Box } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";

type Props = {
  onFinishCountdown: () => void;
};
const SessionWorkout = ({ onFinishCountdown }: Props) => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 0) {
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
      {count >= 3 ? (
        <>
          <Box flex={1} bg="$primary0" height={"100%"} justifyContent="center">
            <Text>Image</Text>
          </Box>
        </>
      ) : (
        <>
          <Box flex={1} bg="$primary0" height={"100%"} justifyContent="center">
            <Text>Text information</Text>
          </Box>
        </>
      )}
      <Box flex={1}>
        <Text fontSize={90} fontWeight="bold" textAlign="center">
          {count}
        </Text>
      </Box>
    </View>
  );
};

export default SessionWorkout;
