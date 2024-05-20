import React, { useState } from "react";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Heading,
  ModalBody,
  Text,
  ModalFooter,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
type Props = {
  isModalOpen: boolean;
  onCancelDownload: () => void;
  downloadProgress: number;
};
const DownloadProgressModal = ({
  isModalOpen,
  onCancelDownload,
  downloadProgress,
}: Props) => {
  const ref = React.useRef(null);

  return (
    <Modal
      isOpen={isModalOpen}
      finalFocusRef={ref}
      closeOnOverlayClick={false}
      size="lg"
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader justifyContent="center">
          <Heading size="lg" textAlign="center">
            {downloadProgress === 1 && isModalOpen
              ? 99
              : Math.floor(downloadProgress * 100)}{" "}
            %{" "}
          </Heading>
        </ModalHeader>
        <ModalBody>
          <Text fontWeight="bold" color="black" textAlign="center">
            Aguarda un momento
          </Text>
          <Text fontWeight="medium" textAlign="center">
            Estamos descargando tu ejercicio. Por favor no cierres ni salgas de
            esta pantalla hasta que finalice.
          </Text>
          <ModalFooter justifyContent="center">
            <Button
              variant="outline"
              size="md"
              action="secondary"
              mr="$3"
              onPress={() => {
                onCancelDownload();
              }}
              rounded={"$full"}
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DownloadProgressModal;
