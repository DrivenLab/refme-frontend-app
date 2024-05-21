import { ComponentProps, useEffect, useRef, useState } from "react";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import {
  Input,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  Text,
  Button,
  ButtonText,
  View,
} from "@gluestack-ui/themed";
import { Platform, Animated, StyleSheet, TextInput } from "react-native";

export const DateTimePickerInput = (
  props: Omit<DateTimePickerProps, "onChange"> & {
    onChange: (value: Date) => void;
    placeholder?: string;
    containerStyle?: Record<string, unknown>;
    error?: string;
    required?: boolean;
  }
) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  useEffect(() => {
    if (show) {
      animatedLabel(1);
    } else {
      animatedLabel(value ? 1 : 0);
    }
  }, [show]);
  const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;

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
  const animatedLabel = (toValue: number) => {
    Animated.timing(labelPosition, {
      toValue: toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  return (
    <View style={[props.containerStyle]}>
      <View
        style={[
          styles.innerContainer,
          props.error ? { borderColor: "red" } : {},
        ]}
      >
        <Animated.Text style={[styles.label, labelStyle]}>
          {props.placeholder} {props.required && "*"}
        </Animated.Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={`${value?.toLocaleDateString() || ""}`}
            textAlignVertical="center"
            onTouchStart={() => setShow(!show)}
          />
          {show && (
            <DateTimePicker
              // @ts-ignore
              locale="es-PY"
              {...props}
              onChange={(e, d) => {
                setValue(d!);
                if (e && e.type == "dismissed") return;
                props.onChange && props.onChange(d!);
                setShow(false);
              }}
              value={value ?? new Date()}
            />
          )}
        </View>
      </View>
      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
    </View>
  );
};

type DateTimePickerProps = Omit<
  ComponentProps<typeof RNDateTimePicker>,
  "value"
> & {
  value?: ComponentProps<typeof RNDateTimePicker>["value"];
};

const DateTimePicker = (props: DateTimePickerProps) => {
  const [date, setDate] = useState(props.value);
  const [event, setEvent] = useState<DateTimePickerEvent>();

  const handleSubmit = () => {
    const evt = event || ({ type: "set" } as DateTimePickerEvent);
    props?.onChange && props?.onChange(evt, date);
  };

  const handleDismiss = () => {
    const dismissed = { type: "dismissed" } as DateTimePickerEvent;
    props?.onChange && props?.onChange(dismissed, date);
  };
  const isIos = Platform.OS === "ios";

  return (
    <DateTimePickerModal onSubmit={handleSubmit} onDismiss={handleDismiss}>
      <RNDateTimePicker
        // @ts-ignore
        locale="es-PY"
        {...props}
        value={date ?? new Date()}
        display={isIos ? "spinner" : undefined}
        onChange={(e, d) => {
          if (!isIos) {
            props.onChange && props.onChange(e, d);
            return;
          }
          setDate(d!);
          setEvent(e);
        }}
      />
    </DateTimePickerModal>
  );
};

type DateTimePickerModalProps = {
  children: React.ReactNode;
  onSubmit: () => void;
  onDismiss: () => void;
};

const DateTimePickerModal = ({
  children,
  onSubmit,
  onDismiss,
}: DateTimePickerModalProps) => {
  if (Platform.OS === "android") {
    return children;
  }
  return (
    <Modal isOpen={true} onClose={onDismiss}>
      <ModalBackdrop />
      <ModalContent>
        <ModalBody>{children}</ModalBody>
        <ModalFooter gap={6}>
          <Button onPress={onDismiss} variant="outline">
            <ButtonText>Cancelar</ButtonText>
          </Button>
          <Button onPress={onSubmit}>
            <ButtonText>Aceptar</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
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
  input: {
    flex: 1,
    fontSize: 16,
    height: 50,
    marginTop: 10,
    paddingLeft: 10,
    borderWidth: 0,
  },
  errorText: {
    marginTop: 5,
    fontSize: 14,
    color: "red",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
});
