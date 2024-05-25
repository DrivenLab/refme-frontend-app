import Colors from "@/constants/Colors";
import { View, useColorMode } from "@gluestack-ui/themed";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  totalTimeInSec: number;
};
const CProgress = ({ totalTimeInSec }: Props) => {
  const mode = useColorMode();
  const reverseProgress = useSharedValue(100);
  useEffect(() => {
    reverseProgress.value = withTiming(0, { duration: totalTimeInSec * 1000 });
  }, []);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${reverseProgress.value}%`,
    };
  });
  return (
    <View w={"100%"} bg="#e6FAFF" h={20} borderRadius={10} overflow="hidden">
      <Animated.View
        style={[
          {
            height: "100%",
            borderRadius: 10,
            backgroundColor:
              reverseProgress.value > 40
                ? Colors[mode as keyof typeof Colors].primary
                : Colors[mode as keyof typeof Colors].orange,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};

export default CProgress;
