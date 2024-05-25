import { StyleSheet, Platform, StatusBar } from "react-native";

export const SafeAreaViewStyle = StyleSheet.create({
  s: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
