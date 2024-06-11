import { useEffect, useRef } from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { useDelay } from "react-use-precision-timer";
import { View } from "@gluestack-ui/themed";

type Props = {
  uri: string;
  isLooping?: boolean;
  customStyles?: StyleProp<ViewStyle>;
  onFinishVideo: () => void;
};
const CVideo = ({ uri, isLooping, customStyles, onFinishVideo }: Props) => {
  const video = useRef<Video>(null);

  const onceTimer = useDelay(10 * 1000, () => onFinishVideo());
  useEffect(() => {
    onceTimer.start();
  }, []);

  const handleLoad = async (status: any) => {
    if (status.durationMillis) {
      const duration = status.durationMillis;
      const desiredDuration = 10 * 1000;
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
        onLoad={handleLoad}
        isLooping={isLooping}
        style={[{ width: "100%", height: "100%" }, customStyles]}
      />
    </View>
  );
};
export default CVideo;
