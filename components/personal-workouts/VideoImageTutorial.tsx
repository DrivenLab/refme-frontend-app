import { Box, HStack, Pressable, View } from "@gluestack-ui/themed";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import CVideo from "../CVideo";
type Props = {
  videoTutorial?: string;
  imgTutorial?: string;
  imgVideoMiniature?: string;
};
const VideoImageTutorial = ({
  imgTutorial,
  imgVideoMiniature,
  videoTutorial,
}: Props) => {
  const ref = useRef<PagerView>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const handleNavChange = (pageIndex: number) => {
    if (ref?.current?.setPage) {
      ref.current.setPage(pageIndex);
      setCurrentStep(pageIndex);
    }
  };
  return (
    <Box>
      <PagerView
        ref={ref}
        style={{ height: 300, width: "100%" }}
        initialPage={0}
        onPageSelected={(e) => setCurrentStep(e.nativeEvent.position)}
      >
        <CVideo
          uri={videoTutorial?.split(".mp4?")[0] + ".mp4" ?? ""}
          key="1"
          isLooping
        />
        <Image
          source={imgTutorial?.split(".png?")[0] + ".png"}
          style={{ height: "100%", width: "100%" }}
          key="2"
        />
        <Image
          source={imgVideoMiniature?.split(".png?")[0] + ".png"}
          style={{ height: "100%", width: "100%" }}
          key="3"
        />
      </PagerView>

      <HStack
        width={"$full"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={"$2"}
        marginVertical={"$2"}
      >
        {new Array(2).fill(0).map((s, i) => (
          <Pressable onPress={() => handleNavChange(i)} key={i}>
            <Box
              w="$4"
              h="$4"
              bgColor={i === currentStep ? "#07091B" : "#ccc"}
              rounded={"$full"}
            />
          </Pressable>
        ))}
      </HStack>
    </Box>
  );
};

export default VideoImageTutorial;
