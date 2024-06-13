import { createContext, useContext, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import { Vibration } from "react-native";

import ShortSound from "@/assets/audio/silbato-corto.mp3";
import LongSound from "@/assets/audio/silbato-largo.mp3";

const waitOneSecond = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
};
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
  const vibrate = (x?: "long") => {
    Vibration.vibrate(x === "long" ? 1200 : 500);
  };
  const playAllSounds = async () => {
    shortSound.current?.replayAsync();
    vibrate();
    await waitOneSecond();
    shortSound.current?.replayAsync();
    vibrate();
    await waitOneSecond();
    shortSound.current?.replayAsync();
    vibrate();
    await waitOneSecond();
    longSound.current?.replayAsync();
    vibrate("long");
  };

  return {
    playShortSound,
    playLongSound,
    playAllSounds,
  };
};

type Props = {
  playShortSound: () => void;
  playLongSound: () => void;
  playAllSounds: () => Promise<void>;
};
const WhistleContext = createContext<Props>({
  playShortSound: () => {},
  playLongSound: () => {},
  playAllSounds: async () => {},
});

export const useWhistleContext = () => useContext(WhistleContext);

export const WhistleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const whistle = useWhistle();

  return (
    <WhistleContext.Provider value={whistle}>
      {children}
    </WhistleContext.Provider>
  );
};
