import PagerView from "react-native-pager-view";
import { ImageSource } from "expo-image";
import { Dimensions, StyleSheet } from "react-native";

import { Text, View, Image } from "@gluestack-ui/themed";
type PageProps = {
  key: number;
  text?: string;
  asset: ImageSource;
};
const PageViewItem = ({ key, text = "Swipe ➡️", asset }: PageProps) => (
  <View style={styles.page} key={key}>
    <Image
      source={asset}
      width={Dimensions.get("window").width}
      height={300}
      alt="Instructions image"
    />
    <Text color="white" marginVertical={"$3"}>
      {text}
    </Text>
  </View>
);

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
      asset={require("@/assets/images/tutorials/eng/dm-1.png")}
    />
    <PageViewItem
      key={2}
      asset={require("@/assets/images/tutorials/eng/dm-2.png")}
    />
    <PageViewItem
      key={3}
      asset={require("@/assets/images/tutorials/eng/dm-3.png")}
    />
    <PageViewItem
      key={4}
      asset={require("@/assets/images/tutorials/eng/dm-4.png")}
    />
    <PageViewItem
      key={5}
      asset={require("@/assets/images/tutorials/eng/dm-5.png")}
    />
    <PageViewItem
      key={6}
      asset={require("@/assets/images/tutorials/eng/dm-6.png")}
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
      asset={require("@/assets/images/tutorials/eng/me-1.png")}
    />
    <PageViewItem
      key={2}
      asset={require("@/assets/images/tutorials/eng/me-2.png")}
    />
    <PageViewItem
      key={3}
      asset={require("@/assets/images/tutorials/eng/me-3.png")}
    />
    <PageViewItem
      key={4}
      asset={require("@/assets/images/tutorials/eng/me-4.png")}
    />
    <PageViewItem
      key={5}
      asset={require("@/assets/images/tutorials/eng/me-5.png")}
    />
    <PageViewItem
      key={6}
      asset={require("@/assets/images/tutorials/eng/me-6.png")}
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
      asset={require("@/assets/images/tutorials/eng/re-1.png")}
    />
    <PageViewItem
      key={2}
      asset={require("@/assets/images/tutorials/eng/re-2.png")}
    />
    <PageViewItem
      key={3}
      asset={require("@/assets/images/tutorials/eng/re-3.png")}
    />
    <PageViewItem
      key={4}
      asset={require("@/assets/images/tutorials/eng/re-4.png")}
    />
    <PageViewItem
      key={5}
      asset={require("@/assets/images/tutorials/eng/re-5.png")}
    />
    <PageViewItem
      key={6}
      asset={require("@/assets/images/tutorials/eng/re-6.png")}
    />
    <PageViewItem
      key={7}
      asset={require("@/assets/images/tutorials/eng/re-7.png")}
    />
    <PageViewItem
      key={8}
      asset={require("@/assets/images/tutorials/eng/re-8.png")}
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
      asset={require("@/assets/images/tutorials/eng/dmm-1.png")}
    />
    <PageViewItem
      key={2}
      asset={require("@/assets/images/tutorials/eng/dmm-2.png")}
    />
    <PageViewItem
      key={3}
      asset={require("@/assets/images/tutorials/eng/dmm-3.png")}
    />
    <PageViewItem
      key={4}
      asset={require("@/assets/images/tutorials/eng/dmm-4.png")}
    />
    <PageViewItem
      key={5}
      asset={require("@/assets/images/tutorials/eng/dmm-5.png")}
    />
    <PageViewItem
      key={6}
      asset={require("@/assets/images/tutorials/eng/dmm-6.png")}
    />
    <PageViewItem
      key={7}
      asset={require("@/assets/images/tutorials/eng/dmm-7.png")}
    />
    <PageViewItem
      key={8}
      asset={require("@/assets/images/tutorials/eng/dmm-8.png")}
    />
    <PageViewItem
      key={9}
      asset={require("@/assets/images/tutorials/eng/dmm-9.png")}
    />
    <PageViewItem
      key={10}
      asset={require("@/assets/images/tutorials/eng/dmm-10.png")}
    />
  </PagerView>
);

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

export {
  DmInstructions,
  MemoryInstructions,
  RecognitionInstructions,
  TdMInstructions,
  PageViewItem,
};
