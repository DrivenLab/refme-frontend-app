import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { OrientationChangeListener } from "expo-screen-orientation";

const useOrientation = () => {
  const [screenOrientation, setScreenOrientation] = useState(
    ScreenOrientation.Orientation.PORTRAIT_UP
  );
  useEffect(() => {
    const screenOrientationListener =
      ScreenOrientation.addOrientationChangeListener((e) =>
        onOrientationChange(e.orientationInfo)
      );
    return () => {
      ScreenOrientation.removeOrientationChangeListener(
        screenOrientationListener
      );
    };
  }, []);
  useEffect(() => {
    initScreenOrientation();
  }, []);
  const onOrientationChange = (
    orientationInfo: ScreenOrientation.ScreenOrientationInfo
  ) => {
    const orientationValue = orientationInfo.orientation;
    setScreenOrientation(orientationValue);
  };
  const initScreenOrientation = async () => {
    const currentOrientation = await ScreenOrientation.getOrientationAsync();
    setScreenOrientation(currentOrientation);
  };

  return { screenOrientation };
};

export default useOrientation;
