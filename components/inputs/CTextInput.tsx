import { InputField, VStack, Text, Input } from "@gluestack-ui/themed";
import { Input as InputType } from "@/types/inputs";
type Props = InputType;
function CTextInput(props: Props) {
  function handelOnChange(text: string) {
    if (props.onChange) props.onChange(props.name, text);
  }
  return (
    <VStack width={"100%"}>
      <Text>{props.label}</Text>
      <Input borderWidth={0}>
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
