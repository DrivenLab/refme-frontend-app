import { useEffect, useRef } from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { useDelay } from "react-use-precision-timer";
import { View } from "@gluestack-ui/themed";

type Props = {
  uri: string;
  isLooping?: boolean;
  customStyles?: StyleProp<ViewStyle>;
  onFinishVideo?: () => void;
  delayTime?: number;
};
const CVideo = ({
  uri,
  isLooping = false,
  customStyles,
  onFinishVideo,
  delayTime = 10,
}: Props) => {
  const video = useRef<Video>(null);

  const onceTimer = useDelay(delayTime * 1000, () => {
    if (onFinishVideo) onFinishVideo();
  });
  useEffect(() => {
    onceTimer.start();
  }, []);

  const handleLoad = async (status: any) => {
    if (status.durationMillis) {
      const duration = status.durationMillis;
      const desiredDuration = delayTime * 1000;
      const speedFactor = duration / desiredDuration;

      await video.current!.setRateAsync(speedFactor, false);
      await video.current!.playAsync();
    }
  };

  return (
    <View flex={1}>
      <Video
        ref={video}
        source={{ uri }}
        volume={1.0}
        isMuted={true}
        resizeMode={ResizeMode.COVER}
        isLooping={isLooping}
        shouldPlay={true}
        style={[{ width: "100%", height: "100%" }, customStyles]}
      />
    </View>
  );
};
export default CVideo;
