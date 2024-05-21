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
import { Platform } from "react-native";

export const DateTimePickerInput = (
  props: DateTimePickerProps & {
    onChange: (value: Date) => void;
    placeholder?: string;
    containerStyle?: Record<string, unknown>;
    error?: string;
  }
) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <View style={[props.containerStyle]}>
      <Input onTouchStart={() => setShow(!show)}>
        <Text m={8}>
          {value ? value?.toLocaleDateString() : props.placeholder}
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
