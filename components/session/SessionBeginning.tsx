import { View, Text, Box } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import SessionCounter from "./SessionCounter";

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
        bg="$primary"
        height={"100%"}
        justifyContent="center"
        alignItems="center"
        borderTopRightRadius={100}
        borderBottomRightRadius={100}
      >
        <Image
          source={require("@/assets/images/man_running_ready_to_workout.png")}
          style={{ height: 100, width: 100 }}
          contentFit="contain"
        />
        <Text fontSize={30} textAlign="center" color="black">
          <Text fontWeight="bold" fontSize={30} color="black">
            Prepárate{" "}
          </Text>
          para el{" "}
          <Text fontWeight="bold" fontSize={30} color="black">
            ejercicio físico
          </Text>
        </Text>
      </Box>
      <Box flex={1} alignItems="center">
        <Text fontSize={90} fontWeight="bold" textAlign="center" color="black">
          {count}
        </Text>
        <SessionCounter />
      </Box>
    </View>
  );
};

export default SessionBeginning;
