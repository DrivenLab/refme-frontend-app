import { View, Text } from "@gluestack-ui/themed";
type Props = {
  current: number;
  total: number;
};
const SessionCounter = ({ current, total }: Props) => {
  return (
    <View
      style={{ backgroundColor: "#FF6622" }}
      rounded={"$full"}
      px={"$4"}
      py={"$2"}
    >
      <Text color="white" fontWeight="bold" fontSize={40}>
        {current}/{total}
      </Text>
    </View>
  );
};

export default SessionCounter;
