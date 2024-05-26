import { ComponentProps, useEffect, useState } from "react";
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
import { Platform, StyleSheet } from "react-native";

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
  const getFormattedDate = (d: Date) => {
    const strDate = d.toISOString().substring(0, 10);
    const year = strDate.substring(0, 4);
    const month = strDate.substring(5, 7);
    const day = strDate.substring(8, 10);
    return `${day}/${month}/${year}`;
  };
  return (
    <View style={[props.containerStyle]}>
      <View
        style={[
          styles.innerContainer,
          props.error ? { borderColor: "red" } : {},
        ]}
      >
        <View style={styles.inputContainer}>
          <Input
            onTouchStart={() => setShow(!show)}
            width="100%"
            height="100%"
            borderWidth={0}
          >
            <Text m={8}>
              {value
                ? // ? value?.toISOString().substring(0, 10)
                  getFormattedDate(value)
                : props.placeholder}
            </Text>
            {show && (
              <DateTimePicker
                // @ts-ignore
                locale="es-PY"
                {...props}
                onChange={(e, d) => {
                  setShow(false);
                  if (e && e.type == "dismissed") return;
                  props.onChange && props.onChange(d!);
                  setValue(d!);
                }}
                value={value ?? new Date()}
              />
            )}
          </Input>
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
