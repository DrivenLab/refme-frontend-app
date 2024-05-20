import { View, Text } from "@gluestack-ui/themed";

const SessionCounter = () => {
  return (
    <View style={{ backgroundColor: "#FF6622" }} rounded={"$full"} p={"$2"}>
      <Text color="white" fontWeight="bold">
        1/10
      </Text>
    </View>
  );
};

export default SessionCounter;
