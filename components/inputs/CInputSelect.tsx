import React, { useMemo, useRef, useState } from "react";
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
export type SelectOption = { label: string; value: string | number };
interface CInputSelectProps {
  initialValue: string | number;
  placeholder: string;
  error?: string;
  secureTextEntry?: boolean;
  containerStyle?: Record<string, unknown>;
  width?: string;
  options: SelectOption[]; // Add options prop for dropdown items
  isDisabled?: boolean;
  required?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  onChangeValue: (value: string | number) => void;
}

const CInputSelect = ({
  placeholder,
  onChangeValue,
  error,
  initialValue,
  secureTextEntry,
  containerStyle,
  options = [],
  isDisabled,
  required,
  autoCapitalize = "none",
  autoCorrect = false,
  ...props
}: CInputSelectProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [showDropdown, setShowDropdown] = useState(false);
  const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    animatedLabel(1);
    if (options.length > 0) {
      setShowDropdown(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      animatedLabel(0);
    }
    setTimeout(() => setShowDropdown(false), 200); // Delay to allow option selection
  };

  const handleTextChange = (value_: string | number) => {
    setValue(value_);
    if (onChangeValue) {
      onChangeValue(value_);
    }
    if (value_) {
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

  const handleOptionSelect = (option: SelectOption) => {
    handleTextChange(option.value);
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
  const label = useMemo(() => {
    const value_ = options.find((o) => o.value === value + "");
    if (value_) return value_.label;
    return value;
  }, [value]);
  return (
    <View style={[containerStyle]}>
      <View
        style={[styles.innerContainer, error ? { borderColor: "red" } : {}]}
      >
        <Animated.Text style={[styles.label, labelStyle]}>
          {placeholder} {required && "*"}
        </Animated.Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.touchableContainer}
            onPress={handleFocus}
            activeOpacity={0.7}
          >
            <Text style={styles.input2}>{label}</Text>
            <Ionicons name="chevron-down" size={24} color="gray" />
          </TouchableOpacity>
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
                    <Text>{item.label}</Text>
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

type DisableTextInputProps = Omit<
  CInputSelectProps,
  "onChangeText" | "error" | "isDisabled" | "options"
>;
export const DisableTextInput = ({
  placeholder,
  initialValue,
  secureTextEntry,
  containerStyle,
  ...props
}: DisableTextInputProps) => {
  const labelPosition = useRef(new Animated.Value(1)).current;
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
      <View style={[styles.innerContainer]}>
        <Animated.Text style={[styles.label, labelStyle]}>
          {placeholder}
        </Animated.Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { color: "#ABABAB" }]}
            value={`${initialValue}`}
            textAlignVertical="center"
            editable={false}
          />
        </View>
      </View>
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

export default CInputSelect;
