import i18n from "@/languages/i18n";
import { RECOGNITION_VIDEO_TYPE } from "@/types/session";
import { TEXT_TYPES } from "@/types/workout";
import { Box, Text } from "@gluestack-ui/themed";
type Props = {
  type: TEXT_TYPES;
  step: number;
  hasVideo?: boolean;
  recognitionType?: RECOGNITION_VIDEO_TYPE;
};
const FONT_SIZE = 36;
const TEXT_COLOR = "black";

const TextInformation = ({ type, step, hasVideo }: Props) => {
  if (step === 2 && !hasVideo)
    return (
      <Box>
        <Text fontSize={FONT_SIZE} textAlign="center" bold color={TEXT_COLOR}>
          {i18n.t("workout_flow.before_rpe_text")}
        </Text>
      </Box>
    );
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
  if (type === "memory" && step === 1)
    return (
      <Box>
        <Text fontSize={FONT_SIZE} textAlign="center" color={TEXT_COLOR}>
          <Text fontWeight="bold" fontSize={FONT_SIZE} color={TEXT_COLOR}>
            {i18n.t("workout_flow.remember_infractor_1")}
          </Text>
          {i18n.t("workout_flow.remember_infractor_2")}
          <Text fontWeight="bold" fontSize={FONT_SIZE} color={TEXT_COLOR}>
            {i18n.t("workout_flow.remember_infractor_3")}
          </Text>
        </Text>
      </Box>
    );
  if (type === "memory" && step === 2) {
    return (
      <Box>
        <Text fontSize={FONT_SIZE} textAlign="center" color={TEXT_COLOR}>
          <Text fontWeight="bold" fontSize={FONT_SIZE} color={TEXT_COLOR}>
            {i18n.t("workout_flow.select_infractor_1")}
          </Text>
          {i18n.t("workout_flow.select_infractor_2")}
          <Text fontWeight="bold" fontSize={FONT_SIZE} color={TEXT_COLOR}>
            {i18n.t("workout_flow.select_infractor_3")}
          </Text>
        </Text>
      </Box>
    );
  }
  if (type === "recognition") {
    return (
      <Box>
        <Text fontSize={FONT_SIZE} textAlign="center" color={TEXT_COLOR}>
          Selecciona la
          <Text bold>falta mano</Text>
        </Text>
      </Box>
    );
  }
};

export default TextInformation;
