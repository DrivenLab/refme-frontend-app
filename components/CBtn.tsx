import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
type Props = {
  title: string;
  disabled?: boolean;
  onPress?: () => void;
};
function CBtn({ title, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {title}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    borderColor: "#eee",
    borderRadius: 4,
    backgroundColor: "#f2f3f4",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

export default CBtn;
