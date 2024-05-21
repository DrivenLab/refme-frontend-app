import { Box, Text } from "@gluestack-ui/themed";
type Props = {
  type: "dm";
  step: number;
};
const FONT_SIZE = 30;
const TEXT_COLOR = "black";
const TextInformation = ({ type, step }: Props) => {
  if (type === "dm" && step === 1)
    return (
      <Box>
        <Text fontSize={FONT_SIZE} textAlign="center" color={TEXT_COLOR}>
          <Text fontWeight="bold" fontSize={FONT_SIZE} color={TEXT_COLOR}>
            Prepárate{" "}
          </Text>
          para el{" "}
          <Text fontWeight="bold" fontSize={FONT_SIZE} color={TEXT_COLOR}>
            ejercicio físico
          </Text>
        </Text>
      </Box>
    );
  if (type === "dm" && step === 2)
    return (
      <Box>
        <Text fontSize={FONT_SIZE} textAlign="center" color={TEXT_COLOR}>
          <Text fontWeight="bold" fontSize={FONT_SIZE} color={TEXT_COLOR}>
            Mira{" "}
          </Text>
          el{" "}
          <Text fontWeight="bold" fontSize={FONT_SIZE} color={TEXT_COLOR}>
            video{" "}
          </Text>
          y toma una{" "}
          <Text fontWeight="bold" fontSize={FONT_SIZE} color={TEXT_COLOR}>
            decisión
          </Text>
        </Text>
      </Box>
    );
};

export default TextInformation;
