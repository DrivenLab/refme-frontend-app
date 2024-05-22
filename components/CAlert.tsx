import { Pressable, Text } from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";
import XIcon from "@/assets/svgs/XIcon";
import { useState } from "react";

interface Props {
  text: string;
}

const CAlert = ({ text }: Props) => {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) {
    return <></>;
  }
  return (
    <Box
      bg="$alertYellow"
      paddingHorizontal={10}
      paddingVertical={5}
      borderRadius={5}
      height={70}
      display="flex"
      flexDirection="row"
      alignItems="center"
      gap={10}
      marginTop={"$2"}
      width="$full"
    >
      <Text color="$secondary" width="90%">
        {text}
      </Text>
      <Pressable onPress={() => setIsVisible(false)}>
        <XIcon />
      </Pressable>
    </Box>
  );
};
export default CAlert;
