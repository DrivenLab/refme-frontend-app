import { StyleSheet } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useAuth } from "@/context/auth";
import { Button } from "@gluestack-ui/themed";
import CBtn from "@/components/CBtn";
import { useGetProfile } from "@/queries/users.query";

export default function TabTwoScreen() {
  const { signOut } = useAuth();
  const { profile, isLoadingProfile } = useGetProfile();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.fullName}</Text>
      <CBtn title="Sign Out" onPress={signOut} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
