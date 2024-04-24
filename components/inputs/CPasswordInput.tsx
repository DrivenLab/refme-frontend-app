import { Input } from "@/types/inputs";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  Text,
} from "react-native";
type Props = Input;
function CPasswordInput(props: Props) {
  function handelOnChange(text: string) {
    if (props.onChange) props.onChange(props.name, text);
  }
  return (
    <View style={styles.containerStyle}>
      <Text>{props.placeholder}</Text>
      <TextInput
        style={styles.innerContainer}
        placeholder={props.placeholder}
        onChangeText={handelOnChange}
        value={props.value}
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

export default CPasswordInput;
