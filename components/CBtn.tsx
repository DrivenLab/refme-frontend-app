import { Button, ButtonSpinner, ButtonText } from "@gluestack-ui/themed";
import { ComponentProps } from "react";
import { StyleSheet } from "react-native";
export interface CBtnProps extends ComponentProps<typeof Button> {}

interface Props extends CBtnProps {
  title: string;
  isLoading?: boolean;
  secondary?: boolean;
}
function CBtn({ title, secondary, ...props }: Props) {
  return (
    <Button
      isDisabled={props.isDisabled}
      onPress={props.onPress}
      mt={props.mt}
      bg={secondary ? "#f0f0f0" : "#58DAFC"}
      rounded="$full"
      style={[
        { height: 50 },
        secondary ? { borderWidth: 1, borderColor: "#0f0f0f" } : {},
      ]} // Agregar la altura deseada aquí
    >
      {props.isLoading ? (
        <ButtonSpinner />
      ) : (
        <ButtonText color="#0F0F0F"> {title} </ButtonText>
      )}
    </Button>
  );
}
const styles = StyleSheet.create({
  container: {
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: "#f2f3f4",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

export default CBtn;
