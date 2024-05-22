import { SessionContext } from "@/types/session";
import { View, Text } from "@gluestack-ui/themed";
import React from "react";
type Props = {
  session: SessionContext;
};
const SessionStatistics = ({ session }: Props) => {
  return (
    <View>
      <Text>Está es la pantalla de estadisticas</Text>
      <Text>{JSON.stringify(session)}</Text>
    </View>
  );
};

export default SessionStatistics;
