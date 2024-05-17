import { View, Text, Box } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";

type Props = {
  onFinishCountdown: () => void;
};
const SessionBeginning = ({ onFinishCountdown }: Props) => {
  const [count, setCount] = useState(3);

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
      <Box
        flex={1}
        bg="$primary0"
        height={"100%"}
        justifyContent="center"
        borderTopRightRadius={100}
        borderBottomRightRadius={100}
      >
        <Text fontSize={30} textAlign="center">
          <Text fontWeight="bold" fontSize={30}>
            Prepárate{" "}
          </Text>
          para el{" "}
          <Text fontWeight="bold" fontSize={30}>
            ejercicio físico
          </Text>
        </Text>
      </Box>
      <Box flex={1}>
        <Text fontSize={90} fontWeight="bold" textAlign="center">
          {count}
        </Text>
      </Box>
    </View>
  );
};

export default SessionBeginning;
