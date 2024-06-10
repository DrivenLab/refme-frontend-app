import { View, Box } from "@gluestack-ui/themed";
import React, { useMemo } from "react";
import { Image } from "expo-image";
import { IMAGE_NAME } from "@/types/session";
import { getImageFromName } from "@/utils/libs";

type Props = {
  children: React.ReactNode;
  imageName: IMAGE_NAME;
};
const IterationTextImage = ({ children, imageName }: Props) => {
  const imageSource = useMemo(() => getImageFromName(imageName), []);

  return (
    <View
      flex={1}
      justifyContent="space-evenly"
      flexDirection="row"
      alignItems="center"
      bg="$primary"
      height={"100%"}
    >
      <Box flex={2} height={"100%"} justifyContent="center">
        {children}
      </Box>
      <Box flex={1}>
        <Image
          source={imageSource}
          style={{ height: 150, width: "100%" }}
          contentFit="contain"
        />
      </Box>
    </View>
  );
};

export default IterationTextImage;
