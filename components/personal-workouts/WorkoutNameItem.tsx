import { IMAGE_NAME } from "@/types/session";
import { getImageFromName } from "@/utils/libs";
import { Text, View, Box } from "@gluestack-ui/themed";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";

type Props = {
  name: string;
  imgName?: IMAGE_NAME;
  description: string;
};
const WorkoutNameItem = ({
  name,
  imgName = "distance",
  description,
}: Props) => {
  return (
    <View width={200} style={styles.container} mr={"$3"}>
      <Image
        source={getImageFromName(imgName)}
        style={{ height: 130, width: "100%" }}
      />
      <Box p={"$2"}>
        <Text fontWeight={"$bold"} color="#000000" fontSize={"$xl"}>
          {name}
        </Text>
        <Text color="#000000" numberOfLines={1}>
          {description}
        </Text>
      </Box>
    </View>
  );
};

export default WorkoutNameItem;
const styles = StyleSheet.create({
  container: { borderRadius: 15, backgroundColor: "#f3f3f4" },
});
