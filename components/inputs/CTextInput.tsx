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

interface CTextInputProps {
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

const CTextInput = ({
  placeholder,
  onChangeText,
  error,
  value,
  secureTextEntry,
  containerStyle,
  options = [],
  isDisabled,
  ...props
}: CTextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);
  const labelPosition = useRef(new Animated.Value(text ? 1 : 0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    animatedLabel(1);
    if (options.length > 0) {
      setShowDropdown(true);
    }
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

  const handleOptionSelect = (option: string) => {
    handleTextChange(option);
    setShowDropdown(false);
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
      <View style={[styles.innerContainer, error && { borderColor: "red" }]}>
        <Animated.Text style={[styles.label, labelStyle]}>
          {placeholder}
        </Animated.Text>
        <View style={styles.inputContainer}>
          {options.length > 0 ? (
            <TouchableOpacity
              style={styles.touchableContainer}
              onPress={handleFocus}
              activeOpacity={0.7}
            >
              <Text style={styles.input2}>{text}</Text>
              <Ionicons name="chevron-down" size={24} color="gray" />
            </TouchableOpacity>
          ) : (
            <TextInput
              style={styles.input}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChangeText={handleTextChange}
              value={text}
              textAlignVertical="center"
              textContentType={secureTextEntry ? "newPassword" : "none"}
              secureTextEntry={secureTextEntry}
              editable={!isDisabled}
            />
          )}
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {showDropdown && (
        <Modal transparent={true} animationType="fade">
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setShowDropdown(false)}
          >
            <View style={styles.dropdown}>
              <FlatList
                data={options}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleOptionSelect(item)}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    height: 60,
    backgroundColor: "#090B2205",
    justifyContent: "center",
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

export default CTextInput;
