import PagerView from "react-native-pager-view";
import { Pressable } from "react-native";
import { useRef, useState } from "react";

import {
  HStack,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalHeader,
  Text,
  Box,
} from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { WORKOUT_TYPE } from "@/types/workout";
import {
  DmInstructions,
  MemoryInstructions,
  RecognitionInstructions,
  TdMInstructions,
} from "./Instructions";
import * as InstrEng from "./InstructionsEng";
import { getLocales } from "expo-localization";

type Props = {
  modalIsOpen: boolean;
  workoutType: WORKOUT_TYPE;
  onClose: () => void;
};
type Props2 = {
  modalIsOpen: boolean;
  workoutType: WORKOUT_TYPE;
  cmpRef: React.RefObject<PagerView>;
  steps: number;
  selectedStep: number;
  setSelectedStep: (x: number) => void;
  handleNavChange: (pageIndex: number) => void;
};
const InstructionsEng = ({
  workoutType,
  cmpRef,
  steps,
  selectedStep,
  setSelectedStep,
  handleNavChange,
}: Props2) => (
  <ModalBody>
    {workoutType === "dm" && (
      <InstrEng.DmInstructions
        setSelectedStep={setSelectedStep}
        pagerRef={cmpRef}
      />
    )}
    {workoutType === "memory" && (
      <InstrEng.MemoryInstructions
        setSelectedStep={setSelectedStep}
        pagerRef={cmpRef}
      />
    )}
    {workoutType === "recognition" && (
      <InstrEng.RecognitionInstructions
        setSelectedStep={setSelectedStep}
        pagerRef={cmpRef}
      />
    )}
    {workoutType === "dm+memory" && (
      <InstrEng.TdMInstructions
        setSelectedStep={setSelectedStep}
        pagerRef={cmpRef}
      />
    )}
    <HStack
      width={"$full"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={"$2"}
      marginBottom={"$2"}
    >
      {new Array(steps).fill(0).map((s, i) => (
        <Pressable onPress={() => handleNavChange(i)} key={i}>
          <Box
            w="$4"
            h="$4"
            bgColor={i === selectedStep ? "#07091B" : "#ccc"}
            rounded={"$full"}
          />
        </Pressable>
      ))}
    </HStack>
  </ModalBody>
);
const InstructionsEs = ({
  workoutType,
  cmpRef,
  steps,
  selectedStep,
  setSelectedStep,
  handleNavChange,
}: Props2) => (
  <ModalBody>
    {workoutType === "dm" && (
      <DmInstructions setSelectedStep={setSelectedStep} pagerRef={cmpRef} />
    )}
    {workoutType === "memory" && (
      <MemoryInstructions setSelectedStep={setSelectedStep} pagerRef={cmpRef} />
    )}
    {workoutType === "recognition" && (
      <RecognitionInstructions
        setSelectedStep={setSelectedStep}
        pagerRef={cmpRef}
      />
    )}
    {workoutType === "dm+memory" && (
      <TdMInstructions setSelectedStep={setSelectedStep} pagerRef={cmpRef} />
    )}
    <HStack
      width={"$full"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={"$2"}
      marginBottom={"$2"}
    >
      {new Array(steps).fill(0).map((s, i) => (
        <Pressable onPress={() => handleNavChange(i)} key={i}>
          <Box
            w="$4"
            h="$4"
            bgColor={i === selectedStep ? "#07091B" : "#ccc"}
            rounded={"$full"}
          />
        </Pressable>
      ))}
    </HStack>
  </ModalBody>
);
const deviceLanguage = getLocales()[0]?.languageCode || "es";
const ViewInstructionsModal = ({
  modalIsOpen,
  workoutType,
  onClose,
}: Props) => {
  const [selectedStep, setSelectedStep] = useState(0);
  const steps =
    workoutType === "dm" || workoutType === "memory"
      ? 6
      : workoutType === "recognition"
      ? 8
      : 10;
  const ref = useRef<PagerView>(null);
  const handleNavChange = (pageIndex: number) => {
    if (ref?.current?.setPage) {
      ref.current.setPage(pageIndex);
      setSelectedStep(pageIndex);
    }
  };
  return (
    <Modal isOpen={modalIsOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Text>{i18n.t("instructions_modal.title")}</Text>
        </ModalHeader>
        {deviceLanguage === "es" ? (
          <InstructionsEs
            cmpRef={ref}
            modalIsOpen={modalIsOpen}
            selectedStep={selectedStep}
            steps={steps}
            workoutType={workoutType}
            setSelectedStep={setSelectedStep}
            handleNavChange={handleNavChange}
          />
        ) : (
          <InstructionsEng
            cmpRef={ref}
            modalIsOpen={modalIsOpen}
            steps={steps}
            selectedStep={selectedStep}
            workoutType={workoutType}
            setSelectedStep={setSelectedStep}
            handleNavChange={handleNavChange}
          />
        )}
      </ModalContent>
    </Modal>
  );
};
export { ViewInstructionsModal };
