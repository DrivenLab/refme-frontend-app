import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import i18n from "@/languages/i18n";

interface CNumericInputProps {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  containerStyle?: Record<string, unknown>;
  width?: string;
  options?: string[]; // Add options prop for dropdown items
  isDisabled?: boolean;
}

const CNumericInput = ({
  placeholder,
  onChangeText,
  unity,
  error,
  value,
  secureTextEntry,
  containerStyle,
  options = [],
  isDisabled,
  ...props
}: CNumericInputProps) => {
  const [text, setText] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);
  const labelPosition = useRef(new Animated.Value(text ? 1 : 0)).current;

  const handleTextChange = (text: string) => {
    setText(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const incrementValue = () => {
    const newValue = parseInt(value) + 1;
    handleTextChange(newValue.toString());
  };

  const decrementValue = () => {
    const newValue = Math.max(0, parseInt(value) - 1); // Ensure the value never goes below 0
    handleTextChange(newValue.toString());
  };

  return (
    <View
      style={[
        styles.innerContainer,
        { marginTop: 25 },
        error && { borderColor: "red" },
      ]}
    >
      <Text fontSize={24} color="black">
        {placeholder}
      </Text>
      <View style={styles.valueContainer}>
        <Ionicons
          name="remove-circle-outline"
          size={24}
          color="gray"
          onPress={decrementValue} // Reducir el valor en 1
        />
        <Text style={{ marginRight: 20, marginLeft: 20 }}>
          {value}
          {unity}
        </Text>
        <Ionicons
          name="add-circle-outline"
          size={24}
          color="gray"
          onPress={incrementValue} // Incrementar el valor en 1
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  valueContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  label: {
    position: "absolute",
    color: "gray",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 50,
    marginTop: 10,
    paddingLeft: 10,
  },
  input2: {
    flex: 1,
    fontSize: 16,
    height: 50,
    marginTop: 40,
  },
  errorText: {
    marginTop: 5,
    fontSize: 14,
    color: "red",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dropdown: {
    width: "80%",
    maxHeight: "50%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  touchableContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    padding: 10,
  },
});

export default CNumericInput;
