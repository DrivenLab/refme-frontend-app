import {
  InputField,
  VStack,
  Text,
  Input,
  InputSlot,
  InputIcon,
} from "@gluestack-ui/themed";

import { Input as InputType } from "@/types/inputs";
import { useState } from "react";
type Props = InputType;
function CPasswordInput(props: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  function handelOnChange(text: string) {
    if (props.onChange) props.onChange(props.name, text);
  }
  return (
    <VStack space="md">
      <Text>{props.label ?? "Contraseña"}</Text>
      <Input borderWidth={1} backgroundColor="grey900">
        <InputField
          type={showPassword ? "text" : "password"}
          placeholder="Ingrese su contraseña"
          value={props.value}
          onChangeText={handelOnChange}
        />
        <InputSlot onPress={handleState}>
          {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
          <InputIcon />
        </InputSlot>
      </Input>
    </VStack>
  );
}

export default CPasswordInput;
