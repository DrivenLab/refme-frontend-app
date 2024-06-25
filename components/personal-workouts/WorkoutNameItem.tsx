import { IMAGE_NAME } from "@/types/session";
import { getImageFromName } from "@/utils/libs";
import { Text, View, Box, Pressable } from "@gluestack-ui/themed";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

type Props = {
  imgName?: IMAGE_NAME;
  description: string;
  params: Record<string, string>;
};
const WorkoutNameItem = ({
  imgName = "distance",
  description,
  params,
}: Props) => {
  console.log("params------", params);
  return (
    <Link
      href={{
        pathname: "/personalWorkouts/config",
        params,
      }}
      asChild
    >
      <Pressable>
        <View width={200} style={styles.container} mr={"$3"}>
          <Image
            source={getImageFromName(imgName)}
            style={{ height: 130, width: "100%" }}
          />
          <Box p={"$2"}>
            <Text fontWeight={"$bold"} color="#000000" fontSize={"$xl"}>
              {params.name}
            </Text>
            <Text color="#000000" numberOfLines={1}>
              {description}
            </Text>
          </Box>
        </View>
      </Pressable>
    </Link>
  );
};

export default WorkoutNameItem;
const styles = StyleSheet.create({
  container: { borderRadius: 15, backgroundColor: "#f3f3f4" },
});
