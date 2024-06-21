import { View, Box } from "@gluestack-ui/themed";
import React, { useMemo } from "react";
import { Image } from "expo-image";
import { IMAGE_NAME } from "@/types/session";
import { getImageFromName } from "@/utils/libs";

type Props = {
  children: React.ReactNode;
  imageName: IMAGE_NAME;
  imageSize?: number;
  isCenterContent?: boolean;
};
const IterationTextImage = ({
  children,
  imageName,
  imageSize = 150,
  isCenterContent = false,
}: Props) => {
  const imageSource = useMemo(() => getImageFromName(imageName), []);

  return (
    <View
      flex={1}
      justifyContent={isCenterContent ? "center" : "space-evenly"}
      flexDirection="row"
      alignItems="center"
      bg="$primary"
      w="$full"
      height={"100%"}
      gap={isCenterContent ? 32 : 0}
    >
      <Box height={"100%"} justifyContent="center">
        {children}
      </Box>
      <Box>
        <Image
          source={imageSource}
          style={{ height: imageSize, aspectRatio: 1 }}
          contentFit="contain"
        />
      </Box>
    </View>
  );
};

export default IterationTextImage;
