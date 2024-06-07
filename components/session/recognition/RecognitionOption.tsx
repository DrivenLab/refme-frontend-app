import ErrorIcon from "@/assets/svgs/ErrorIcon";
import SuccessIcon from "@/assets/svgs/SuccessIcon";
import { Box, Image, Pressable } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
type Props = {
  uri: string;
  isMarked: boolean;
  isCorrect: boolean;
  onPress: () => void;
};
const RecognitionOption = ({ uri, isMarked, isCorrect, onPress }: Props) => {
  return (
    <Pressable
      h="$full"
      w="42.5%"
      onPress={onPress}
      borderWidth={isMarked ? 5 : 0}
      borderColor={isCorrect ? "#4ed964" : "#ff3a31"}
      position="relative"
    >
      <Box position="absolute" top={10} left={10} zIndex={10}>
        {isMarked && isCorrect && <SuccessIcon width={35} height={35} />}
        {isMarked && !isCorrect && <ErrorIcon width={35} height={35} />}
      </Box>
      <Image
        source={{
          uri,
        }}
        alt="Gif 2"
        style={styles.image}
      />
    </Pressable>
  );
};
export default RecognitionOption;
const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
  },
  icon: {},
});
