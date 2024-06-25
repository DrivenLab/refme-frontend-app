import {
  HStack,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalHeader,
  Text,
  View,
} from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import PagerView from "react-native-pager-view";
import {
  Dimensions,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
} from "react-native";
import { WORKOUT_TYPE } from "@/types/workout";
import { Image, Box } from "@gluestack-ui/themed";
import { useRef, useState } from "react";

type PageProps = {
  key: number;
  text?: string;
  asset: NodeRequire;
};
const PageViewItem = ({ key, text = "Swipe ➡️", asset }: PageProps) => (
  <View style={styles.page} key={key}>
    <Image
      source={asset as unknown as ImageSourcePropType}
      width={Dimensions.get("window").width}
      height={300}
      alt="Instructions image"
    />
    <Text color="white" marginVertical={"$3"}>
      {text}
    </Text>
  </View>
);

type Props = {
  modalIsOpen: boolean;
  workoutType: WORKOUT_TYPE;
  onClose: () => void;
};
type InstructionProps = {
  pagerRef: React.RefObject<PagerView>;
  setSelectedStep: (x: number) => void;
};
const DmInstructions = ({ pagerRef, setSelectedStep }: InstructionProps) => (
  <PagerView
    ref={pagerRef}
    style={styles.container}
    initialPage={0}
    onPageSelected={(e) => setSelectedStep(e.nativeEvent.position)}
  >
    <PageViewItem
      key={1}
      asset={require("@/assets/images/tutorials/main-referee/dm-1.png")}
    />
    <PageViewItem
      key={2}
      asset={require("@/assets/images/tutorials/main-referee/dm-2.png")}
    />
    <PageViewItem
      key={3}
      asset={require("@/assets/images/tutorials/main-referee/dm-3.png")}
    />
    <PageViewItem
      key={4}
      asset={require("@/assets/images/tutorials/main-referee/dm-4.png")}
    />
    <PageViewItem
      key={5}
      asset={require("@/assets/images/tutorials/main-referee/dm-5.png")}
    />
    <PageViewItem
      key={6}
      asset={require("@/assets/images/tutorials/main-referee/dm-6.png")}
      text=""
    />
  </PagerView>
);
const MemoryInstructions = ({
  pagerRef,
  setSelectedStep,
}: InstructionProps) => (
  <PagerView
    style={styles.container}
    ref={pagerRef}
    initialPage={0}
    onPageSelected={(e) => setSelectedStep(e.nativeEvent.position)}
  >
    <PageViewItem
      key={1}
      asset={require("@/assets/images/tutorials/main-referee/mem-1.png")}
    />
    <PageViewItem
      key={2}
      asset={require("@/assets/images/tutorials/main-referee/mem-2.png")}
    />
    <PageViewItem
      key={3}
      asset={require("@/assets/images/tutorials/main-referee/mem-3.png")}
    />
    <PageViewItem
      key={4}
      asset={require("@/assets/images/tutorials/main-referee/mem-4.png")}
    />
    <PageViewItem
      key={5}
      asset={require("@/assets/images/tutorials/main-referee/mem-5.png")}
    />
    <PageViewItem
      key={6}
      asset={require("@/assets/images/tutorials/main-referee/mem-6.png")}
      text=""
    />
  </PagerView>
);
const RecognitionInstructions = ({
  pagerRef,
  setSelectedStep,
}: InstructionProps) => (
  <PagerView
    style={styles.container}
    ref={pagerRef}
    initialPage={0}
    onPageSelected={(e) => setSelectedStep(e.nativeEvent.position)}
  >
    <PageViewItem
      key={1}
      asset={require("@/assets/images/tutorials/main-referee/rec-1.png")}
    />
    <PageViewItem
      key={2}
      asset={require("@/assets/images/tutorials/main-referee/rec-2.png")}
    />
    <PageViewItem
      key={3}
      asset={require("@/assets/images/tutorials/main-referee/rec-3.png")}
    />
    <PageViewItem
      key={4}
      asset={require("@/assets/images/tutorials/main-referee/rec-4.png")}
    />
    <PageViewItem
      key={5}
      asset={require("@/assets/images/tutorials/main-referee/rec-5.png")}
    />
    <PageViewItem
      key={6}
      asset={require("@/assets/images/tutorials/main-referee/rec-6.png")}
    />
    <PageViewItem
      key={7}
      asset={require("@/assets/images/tutorials/main-referee/rec-7.png")}
    />
    <PageViewItem
      key={8}
      asset={require("@/assets/images/tutorials/main-referee/rec-8.png")}
      text=""
    />
  </PagerView>
);
const TdMInstructions = ({ pagerRef, setSelectedStep }: InstructionProps) => (
  <PagerView
    style={styles.container}
    initialPage={0}
    ref={pagerRef}
    onPageSelected={(e) => setSelectedStep(e.nativeEvent.position)}
  >
    <PageViewItem
      key={1}
      asset={require("@/assets/images/tutorials/main-referee/tdm-1.png")}
    />
    <PageViewItem
      key={2}
      asset={require("@/assets/images/tutorials/main-referee/tdm-2.png")}
    />
    <PageViewItem
      key={3}
      asset={require("@/assets/images/tutorials/main-referee/tdm-3.png")}
    />
    <PageViewItem
      key={4}
      asset={require("@/assets/images/tutorials/main-referee/tdm-4.png")}
    />
    <PageViewItem
      key={5}
      asset={require("@/assets/images/tutorials/main-referee/tdm-5.png")}
    />
    <PageViewItem
      key={6}
      asset={require("@/assets/images/tutorials/main-referee/tdm-6.png")}
    />
    <PageViewItem
      key={7}
      asset={require("@/assets/images/tutorials/main-referee/tdm-7.png")}
    />
    <PageViewItem
      key={8}
      asset={require("@/assets/images/tutorials/main-referee/tdm-8.png")}
    />
    <PageViewItem
      key={9}
      asset={require("@/assets/images/tutorials/main-referee/tdm-9.png")}
    />
    <PageViewItem
      key={10}
      asset={require("@/assets/images/tutorials/main-referee/tdm-10.png")}
    />
  </PagerView>
);
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
        <ModalBody>
          {workoutType === "dm" && (
            <DmInstructions setSelectedStep={setSelectedStep} pagerRef={ref} />
          )}
          {workoutType === "memory" && (
            <MemoryInstructions
              setSelectedStep={setSelectedStep}
              pagerRef={ref}
            />
          )}
          {workoutType === "recognition" && (
            <RecognitionInstructions
              setSelectedStep={setSelectedStep}
              pagerRef={ref}
            />
          )}
          {workoutType === "dm+memory" && (
            <TdMInstructions setSelectedStep={setSelectedStep} pagerRef={ref} />
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
      </ModalContent>
    </Modal>
  );
};
export { ViewInstructionsModal };

const styles = StyleSheet.create({
  container: {
    height: 360,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#090B22",
  },
});
