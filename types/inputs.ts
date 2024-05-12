import { DimensionValue, StyleProp, ViewStyle } from "react-native";

export type Input = {
  containerStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  onChange?: (name: string, value: string) => void;
  error?: string;
  name: string;
  label: string;
  value?: string;
  width?:
    | DimensionValue
    | "$px"
    | "$0"
    | "$0.5"
    | "$1"
    | "$1.5"
    | "$2"
    | "$2.5"
    | "$3"
    | "$3.5"
    | "$4"
    | "$4.5"
    | "$5"
    | "$6"
    | "$7"
    | "$8"
    | "$9"
    | "$10"
    | "$11"
    | "$12"
    | "$16";
};
