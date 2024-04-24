import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  placeholder: string;
  onChangeText?: (value: string) => void;
  error?: string;
  name: string;
};
function CTextInput(props: Props) {
  return (
    <View style={styles.containerStyle}>
      <TextInput
        style={styles.innerContainer}
        placeholder={props.placeholder}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  containerStyle: {
    width: "100%",
  },
  innerContainer: {
    borderColor: "#eee",
    borderRadius: 4,
    backgroundColor: "#f2f3f4",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

export default CTextInput;
