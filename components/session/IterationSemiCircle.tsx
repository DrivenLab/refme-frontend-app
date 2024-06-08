import { Box } from "@gluestack-ui/themed";
import { Image } from "expo-image";
import TextInformation from "../workouts/TextInformation";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { ComponentProps } from "react";

type Props = {
  imageSource: ComponentProps<typeof Image>["source"];
  textType: ComponentProps<typeof TextInformation>["type"];
  textStep: ComponentProps<typeof TextInformation>["step"];
  recognitionType?: ComponentProps<typeof TextInformation>["recognitionType"];
};

export function IterationSemiCircle(props: Props) {
  return (
    <Animate>
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <Box
          width="150%"
          aspectRatio={1}
          left={"-50%"}
          bg="$primary"
          position="absolute"
          borderRadius="$full"
        />
        <Image
          source={props.imageSource}
          style={{
            height: 100,
            width: 100,
          }}
          contentFit="contain"
        />
        <TextInformation
          type={props.textType}
          step={props.textStep}
          recognitionType={props.recognitionType}
        />
      </Box>
    </Animate>
  );
}

const Animate = ({ children }: { children: React.ReactNode }) => {
  return (
    <Animated.View
      key={"key"}
      entering={SlideInLeft.duration(200)}
      style={{
        flex: 1,
        zIndex: 9999,
      }}
    >
      {children}
    </Animated.View>
  );
};
