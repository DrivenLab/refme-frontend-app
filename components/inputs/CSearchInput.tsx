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

interface CSearchInputProps {
  value: string | number;
  placeholder: string;
  onChangeText: (text: string) => void;
  error?: string;
  containerStyle?: Record<string, unknown>;
  width?: string;
  required?: boolean;
}

const CSearchInput = ({
  placeholder,
  onChangeText,
  error,
  value,
  containerStyle,
  required,
  ...props
}: CSearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);
  const labelPosition = useRef(new Animated.Value(text ? 1 : 0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    animatedLabel(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!text) {
      animatedLabel(0);
    }
    setTimeout(() => setShowDropdown(false), 200); // Delay to allow option selection
  };

  const handleTextChange = (text: string) => {
    setText(text);
    if (onChangeText) {
      onChangeText(text);
    }
    if (text) {
      animatedLabel(1);
    } else {
      animatedLabel(isFocused ? 1 : 0);
    }
  };

  const animatedLabel = (toValue: number) => {
    Animated.timing(labelPosition, {
      toValue: toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const labelStyle = {
    left: 10,
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [17, 0],
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14],
    }),
    color: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: ["gray", "#888"],
    }),
  };

  return (
    <View style={[containerStyle]}>
      <View
        style={[styles.innerContainer, error ? { borderColor: "red" } : {}]}
      >
        <Animated.Text style={[styles.label, labelStyle]}>
          {placeholder} {required && "*"}
        </Animated.Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleTextChange}
            value={text === 0 ? "" : text + ""}
            textAlignVertical="center"
            keyboardType={typeof "default"}
          />
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 50,
    height: 50,
    backgroundColor: "#090B2205",
    justifyContent: "center",
  },
  label: {
    position: "absolute",
    paddingHorizontal: 10,
    color: "gray",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
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

export default CSearchInput;
