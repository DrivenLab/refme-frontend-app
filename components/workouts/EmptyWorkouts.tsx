import { VStack, Text } from "@gluestack-ui/themed";
import { Image } from "expo-image";
import React from "react";
import i18n from "@/languages/i18n";
type Props = {
  state: "pending" | "finished";
  count: number;
};

const EmptyWorkouts = ({ count, state }: Props) => {
  const source =
    state == "pending" && count !== 0
      ? require("@/assets/images/man_running_with_color.png")
      : require("@/assets/images/man_running.png");
  const message =
    state === "pending" && count !== 0
      ? i18n.t("sessions_up_to_date")
      : state === "finished"
      ? i18n.t("empty_completed_session")
      : i18n.t("empty_pending_session");
  return (
    <VStack space="lg" marginVertical="auto">
      <Image
        source={source}
        style={{ height: 130, width: 300, marginHorizontal: "auto" }}
        contentFit="contain"
      />
      <Text textAlign="center" fontWeight="bold">
        {message}
      </Text>
    </VStack>
  );
};

export default EmptyWorkouts;
