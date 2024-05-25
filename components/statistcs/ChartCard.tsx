import { View, Text } from "@gluestack-ui/themed";

type Props = {
  title: string;
  children: React.ReactNode;
};

export const ChartCard = ({ title, children }: Props) => {
  return (
    <>
      <Text fontSize="$xl" fontWeight="bold" color="black" mb={10}>
        {title}
      </Text>
      <View
        borderColor="$lightgray"
        borderWidth={1}
        rounded="$md"
        p={10}
        my={4}
        mb={30}
      >
        {children}
      </View>
    </>
  );
};
