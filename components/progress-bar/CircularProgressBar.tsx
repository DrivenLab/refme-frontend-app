import { Box, Text } from "@gluestack-ui/themed";
import React, { memo, useEffect } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

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
    size = 220,
    strokeWidth = 6,
    style = {},
    initialCountdown,
    text,
  } = props;

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
      <CircularProgressBar
        size={size}
        strokeWidth={strokeWidth}
        circleColor={circleColor}
        initialCountdown={initialCountdown}
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        justifyContent="center"
        alignItems="center"
      >
        <Text
          bold
          fontSize={Number(text) > 100 ? 100 : 150}
          textAlign="center"
          color="black"
        >
          {text ?? ""}
        </Text>
      </Box>
    </View>
  );
};

export default CircularProgress;

type _CircularProgressBarProps = {
  size: number;
  strokeWidth: number;
  initialCountdown: number;
  circleColor: string;
};
const _CircularProgressBar = ({
  size,
  strokeWidth,
  initialCountdown,
  circleColor,
}: _CircularProgressBarProps) => {
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
  );
};

const CircularProgressBar = memo(_CircularProgressBar);
