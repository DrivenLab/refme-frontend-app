import {
  InputField,
  VStack,
  Text,
  Input,
  InputSlot,
  InputIcon,
} from "@/theme/components";
import { Input as InputType } from "@/types/inputs";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
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
    <VStack space="sm" width={"100%"}>
      <Text color="$secondary0">Contraseña</Text>
      <Input backgroundColor="$grey" borderWidth={0}>
        <InputField
          type={showPassword ? "text" : "password"}
          placeholder="Ingrese su contraseña"
          value={props.value}
          onChangeText={handelOnChange}
        />
        <InputSlot pr="$3" onPress={handleState}>
          {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
          <InputIcon
            as={showPassword ? EyeIcon : EyeOffIcon}
            color="$secondary0"
          />
        </InputSlot>
      </Input>
    </VStack>
  );
}

export default CPasswordInput;
