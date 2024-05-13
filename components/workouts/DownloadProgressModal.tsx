import React, { useState } from "react";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Heading,
  ModalBody,
  Text,
} from "@gluestack-ui/themed";
type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  downloadProgress: number;
};
const DownloadProgressModal = ({
  isModalOpen,
  setIsModalOpen,
  downloadProgress,
}: Props) => {
  const ref = React.useRef(null);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
      finalFocusRef={ref}
      closeOnOverlayClick={false}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader justifyContent="center">
          <Heading size="lg" textAlign="center">
            {Math.floor(downloadProgress * 100)} %{" "}
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DownloadProgressModal;
