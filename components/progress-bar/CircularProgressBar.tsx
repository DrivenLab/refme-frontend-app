import { Box, Text } from "@gluestack-ui/themed";
import React, { useEffect } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

//TODO: CHECK GLITCHING ON CIRCULAR PROGRESS BAR
// https://medium.com/@dexpetkovic/creating-a-circular-progress-react-component-a-step-by-step-guide-722bc13af548
// https://github.com/dexpetkovic/elands-react-helpers

export const CircularProgress = (props: {
  initialCountdown: number;
  circleColor: string;
  size?: number;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
  text?: string;
}): React.ReactElement => {
  const {
    circleColor,
    size = 24,
    strokeWidth = 6,
    style = {},
    initialCountdown,
  } = props;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const currentProgress = useSharedValue(1);

  useEffect(() => {
    currentProgress.value = withTiming(0, {
      duration: initialCountdown * 1000,
    });
  }, []);

  const animatedProps = useAnimatedProps(() => {
    return { strokeDashoffset: circumference * (1 - currentProgress.value) };
  });
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  return (
    <View
      style={[
        style,
        {
          width: size,
          height: size,
          position: "relative",
        },
      ]}
    >
      <Svg>
        <Circle
          stroke={"#e6e6e8"}
          strokeWidth={strokeWidth}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill={"none"}
          strokeDasharray={circumference}
        />
        {/* <Circle
          stroke="#e6e6e8"
          //   stroke="red"
          strokeWidth={strokeWidth}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill={"none"}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashOffset}
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        /> */}
        <AnimatedCircle
          animatedProps={animatedProps}
          stroke={circleColor}
          strokeWidth={strokeWidth}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill={"none"}
          strokeDasharray={circumference}
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />
      </Svg>
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        justifyContent="center"
        alignItems="center"
      >
        <Text bold fontSize={70}>
          {props.text || ""}
        </Text>
      </Box>
    </View>
  );
};

export default CircularProgress;
