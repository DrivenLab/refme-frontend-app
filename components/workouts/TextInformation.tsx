import i18n from "@/languages/i18n";
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
          {/* Prepárate para el ejercicio físico */}
          <Text fontWeight="bold" fontSize={FONT_SIZE} color={TEXT_COLOR}>
            {i18n.t("workout_flow.prepare_bold")}
          </Text>
          {i18n.t("workout_flow.prepare_for")}
          <Text fontWeight="bold" fontSize={FONT_SIZE} color={TEXT_COLOR}>
            {/* ejercicio físico */}
            {i18n.t("workout_flow.prepare_to_bold")}
          </Text>
        </Text>
      </Box>
    );
  if (type === "dm" && step === 2)
    return (
      <Box>
        <Text fontSize={FONT_SIZE} textAlign="center" color={TEXT_COLOR}>
          <Text fontWeight="bold" fontSize={FONT_SIZE} color={TEXT_COLOR}>
            {i18n.t("workout_flow.look_at_bold")}
          </Text>
          {i18n.t("workout_flow.look_at_the")}
          <Text fontWeight="bold" fontSize={FONT_SIZE} color={TEXT_COLOR}>
            {i18n.t("workout_flow.look_at_video_bold")}
          </Text>
          {i18n.t("workout_flow.look_at_take")}
          <Text fontWeight="bold" fontSize={FONT_SIZE} color={TEXT_COLOR}>
            {i18n.t("workout_flow.look_at_decision")}
          </Text>
        </Text>
      </Box>
    );
};

export default TextInformation;
