import { Box, Text } from "@gluestack-ui/themed";
import React, { useCallback, useEffect } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
//TODO: CHECK GLITCHING ON CIRCULAR PROGRESS BAR
// https://medium.com/@dexpetkovic/creating-a-circular-progress-react-component-a-step-by-step-guide-722bc13af548
// https://github.com/dexpetkovic/elands-react-helpers

export const CircularProgress = (props: {
  progress: number;
  circleColor: string;
  size?: number;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
  text?: string;
}): React.ReactElement => {
  const {
    progress = 0,
    circleColor,
    size = 24,
    strokeWidth = 6,
    style = {},
  } = props;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  useEffect(() => {
    currentProgress.value = withTiming(progress, { duration: 500 });
  }, [progress]);

  const getStrokeDashOffset = useCallback(() => {
    return circumference * (1 - progress);
  }, [progress]);
  const strokeDashOffset = getStrokeDashOffset();
  const currentProgress = useSharedValue(0);
  const strokeDashOffsetAnimation = useDerivedValue(
    () => circumference * (1 - currentProgress.value)
  );
  const animatedProps = useAnimatedProps(() => {
    return { strokeDashoffset: strokeDashOffsetAnimation?.value };
  });
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  //   console.log({ progress });
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
