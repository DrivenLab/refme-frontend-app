import { useEffect, useRef } from "react";
import { Audio } from "expo-av";

import ShortSound from "@/assets/audio/silbato-corto.mp3";
import LongSound from "@/assets/audio/silbato-largo.mp3";

export const useWhistle = () => {
  const shortSound = useRef<Audio.Sound | null>(null);
  const longSound = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const enableAudio = async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
      });
    };
    const loadSounds = async () => {
      const { sound: _sound } = await Audio.Sound.createAsync(ShortSound);
      shortSound.current = _sound;
      const { sound: __sound } = await Audio.Sound.createAsync(LongSound);
      longSound.current = __sound;
    };
    enableAudio();
    loadSounds();

    return () => {
      shortSound.current?.unloadAsync();
      longSound.current?.unloadAsync();
    };
  }, []);

  const playShortSound = () => {
    shortSound.current?.replayAsync();
  };
  const playLongSound = () => {
    longSound.current?.replayAsync();
  };

  return {
    playShortSound,
    playLongSound,
  };
};
