import React from "react";
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
import i18n from "@/languages/i18n";
type Props = {
  isModalOpen: boolean;
  downloadProgress: number;
  onCancelDownload: () => void;
};
const DownloadProgressModal = ({
  isModalOpen,
  downloadProgress,
  onCancelDownload,
}: Props) => {
  const ref = React.useRef(null);
  const dynamicColor =
    downloadProgress < 0.3
      ? "$red400"
      : downloadProgress < 0.6
      ? "$yellow400"
      : "$green400";
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
          <Heading size="lg" textAlign="center" color={dynamicColor}>
            {downloadProgress === 1 && isModalOpen
              ? 99
              : Math.floor(downloadProgress * 100)}{" "}
            %{" "}
          </Heading>
        </ModalHeader>
        <ModalBody>
          <Text
            fontWeight="bold"
            color="black"
            textAlign="center"
            marginBottom="$2"
          >
            {i18n.t("workout_flow.download_modal_title")}
          </Text>
          <Text fontWeight="medium" textAlign="center">
            {i18n.t("workout_flow.download_modal_message")}
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
              <ButtonText>{i18n.t("common.cancel")}</ButtonText>
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DownloadProgressModal;
