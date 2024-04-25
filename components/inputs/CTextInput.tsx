import { InputField, VStack, Text, Input } from "@/theme/components";
import { Input as InputType } from "@/types/inputs";
import { StyleProp, ViewStyle } from "react-native";
type Props = InputType;
function CTextInput(props: Props) {
  function handelOnChange(text: string) {
    if (props.onChange) props.onChange(props.name, text);
  }
  return (
    <VStack space="sm">
      <Text color="$secondary0" lineHeight="$xs">
        {props.placeholder}
      </Text>
      <Input>
        <InputField type="text" onChangeText={handelOnChange} />
      </Input>
    </VStack>
  );
}

export default CTextInput;
