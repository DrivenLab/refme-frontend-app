import {
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
  ResizeMode,
  Video,
} from "expo-av";
import { StyleSheet, Button } from "react-native";
import { useEffect, useRef, useState } from "react";
import { View } from "@gluestack-ui/themed";
type Props = {
  uri: string;
  onFinishVideo: () => void;
};
const CVideo = ({ uri, onFinishVideo }: Props) => {
  const video = useRef<any>(null);
  const [status, setStatus] = useState<AVPlaybackStatus>();
  useEffect(() => {}, []);
  const handleOnPress = () => {
    if (!video.current) return;
    if (status?.isLoaded && status.isPlaying) video.current.pauseAsync();
    else video.current.playAsync();
  };
  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      onFinishVideo();
      // Handle the event when the video finishes
    }
  };
  return (
    <View flex={1}>
      <Video
        ref={video}
        source={{ uri }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping={false}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
  buttons: {
    width: 100,
    height: 100,
  },
});
export default CVideo;
