import { View, Box, SafeAreaView } from "@gluestack-ui/themed";
import React, { useMemo } from "react";
import { Image } from "expo-image";
import { IMAGE_NAME } from "@/types/session";
import { getImageFromName } from "@/utils/libs";

type Props = {
  children: React.ReactNode;
  imageName: IMAGE_NAME;
  imageSize?: number;
};
const IterationTextImage = ({
  children,
  imageName,
  imageSize = 150,
}: Props) => {
  const imageSource = useMemo(() => getImageFromName(imageName), []);
  return (
    <SafeAreaView
      flex={1}
      justifyContent={"center"}
      flexDirection="row"
      alignItems="center"
      bg="$primary"
      w="$full"
      height={"100%"}
      gap={32}
    >
      <Box height={"100%"} justifyContent="center" maxWidth="60%">
        {children}
      </Box>
      <Box>
        <Image
          source={imageSource}
          style={{ height: imageSize, aspectRatio: 1 }}
          contentFit="contain"
        />
      </Box>
    </SafeAreaView>
  );
};

export default IterationTextImage;
