import { StyleProp, ViewStyle } from "react-native";

export type Input = {
  containerStyle?: StyleProp<ViewStyle>;
  placeholder: string;
  onChange?: (name: string, value: string) => void;
  error?: string;
  name: string;
  value?: string;
};
