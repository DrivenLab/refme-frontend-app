import { useSession } from "@/context/SessionContext";
import { View, Text } from "@gluestack-ui/themed";

const SessionCounter = () => {
  const { session, iterationIndex } = useSession();
  return (
    <View
      style={{ backgroundColor: "#FF6622" }}
      rounded={"$full"}
      px={"$4"}
      py={"$2"}
    >
      <Text color="white" fontWeight="bold" fontSize={30}>
        {iterationIndex + 1}/{session.iterations.length}
      </Text>
    </View>
  );
};

export default SessionCounter;
