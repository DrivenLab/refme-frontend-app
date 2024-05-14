import { View, Text, Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import React, { useRef, useState, useEffect } from "react";
import { PixelRatio, StyleSheet, Button } from "react-native";

const URI = "file:///data/user/0/host.exp.exponent/files/session1_video_24.mp4";
const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const StartWorkout = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState<AVPlaybackStatus>(
    {} as AVPlaybackStatus
  );
  const loadFiles = async () => {
    const a = await FileSystem.getInfoAsync(URI);

    console.log("is calling", a);
    if (Platform.OS === "android") {
      //const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (false) {
        const base64 =
          await FileSystem.StorageAccessFramework.readAsStringAsync(URI, {
            encoding: FileSystem.EncodingType.Base64,
          });

        console.log({ base64 });
      } else {
        //shareAsync(URI);
      }
    } else {
      //shareAsync(URI);
    }
  };
  useEffect(() => {
    //loadFiles();
  }, []);

  return (
    <View style={styles.contentContainer}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: URI,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
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
export default StartWorkout;
