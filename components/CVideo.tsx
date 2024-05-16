import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { View, Text } from "react-native";
import { StyleSheet, Button } from "react-native";
import { useRef, useState } from "react";
type Props = {
  uri: string;
};
const CVideo = ({ uri }: Props) => {
  const video = useRef(null);
  const [status, setStatus] = useState<AVPlaybackStatus>();
  const handleOnPress = () => {
    if (!video.current) return;
    if (status?.isPlaying) video.current.pauseAsync();
    else video.current.playAsync();
  };
  return (
    <View>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status?.isPlaying ? "Pause" : "Play"}
          onPress={handleOnPress}
        />
      </View>
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
