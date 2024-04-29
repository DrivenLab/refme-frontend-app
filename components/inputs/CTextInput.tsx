import { InputField, VStack, Text, Input } from "@/theme/components";
import { Input as InputType } from "@/types/inputs";
import { StyleProp, ViewStyle } from "react-native";
type Props = InputType;
function CTextInput(props: Props) {
  function handelOnChange(text: string) {
    if (props.onChange) props.onChange(props.name, text);
  }
  return (
    <VStack space="sm" width={"100%"}>
      <Text color="$secondary0" lineHeight="$xs">
        {props.label}
      </Text>
      <Input backgroundColor="$grey" borderWidth={0}>
        <InputField
          type="text"
          onChangeText={handelOnChange}
          placeholder={props.placeholder}
          value={props.value}
        />
      </Input>
    </VStack>
  );
}

export default CTextInput;
