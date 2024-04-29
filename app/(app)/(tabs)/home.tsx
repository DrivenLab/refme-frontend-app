import { Button, StyleSheet, TextInput } from "react-native";
import { Text, View } from "@/components/Themed";
import { useAuth } from "@/context/auth";
export default function TabOneScreen() {
  const { signOut } = useAuth();
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="Sign Out" color={"orange"} onPress={signOut} />
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
