import { View, Box, Text } from "@gluestack-ui/themed";
import { Image } from "expo-image";
import TextInformation from "../workouts/TextInformation";
import SessionCounter from "./SessionCounter";
import { useMemo } from "react";
import { IMAGE_NAME } from "@/types/session";
import { get_image_from_name } from "@/utils/libs";
type Props = {
  count: number;
  imageName: IMAGE_NAME;
};
const IterationImageCountdown = ({ count, imageName }: Props) => {
  const imageSource = useMemo(() => get_image_from_name(imageName), []);

  return (
    <View
      flex={1}
      justifyContent="space-evenly"
      flexDirection="row"
      alignItems="center"
      bg="white"
      height={"100%"}
    >
      <Box flex={1} justifyContent="center" alignItems="center">
        <Image
          source={imageSource}
          style={{ height: "50%", width: "50%" }}
          contentFit="contain"
        />
      </Box>
      <Box flex={1} alignItems="center">
        <Text fontSize={90} fontWeight="bold" textAlign="center" color="black">
          {count}
        </Text>
        <SessionCounter />
      </Box>
    </View>
  );
};

export default IterationImageCountdown;
