import { Box, Pressable, Text, ScrollView, View } from "@gluestack-ui/themed";
import { useRef, useState } from "react";
import { LayoutChangeEvent } from "react-native";
type Options = {
  label: string;
  value: string;
};
type Props = {
  currentTab: string;
  tabs: Options[];
  changeCurrentTab: (tab: string) => void;
};
export function CTabScroll({ currentTab, tabs, changeCurrentTab }: Props) {
  // @ts-ignore
  const ref = useRef<ScrollView | null>(null);
  const [coordinate] = useState<number[]>([]);

  const handleOnLayout = (event: LayoutChangeEvent, index: number) => {
    const layout = event.nativeEvent.layout;
    coordinate[index] = layout.x;
  };
  const handleOnPress = (value: string, index: number) => {
    ref.current?.scrollTo({
      x: coordinate[index],
      y: 0,
      animated: true,
    });
    changeCurrentTab(value);
  };

  return (
    <ScrollView
      ref={ref}
      horizontal
      bg="transparent"
      flexDirection="row"
      px={10}
      borderBottomWidth={3}
      borderColor="$coolGray100"
      showsHorizontalScrollIndicator={false}
    >
      {tabs.map((tab, index) => (
        <Pressable
          onPress={() => handleOnPress(tab.value, index)}
          onLayout={(e) => handleOnLayout(e, index)}
          key={index}
          mx={0}
          mb={-3}
          px={10}
        >
          <Box
            borderBottomWidth={3}
            borderColor={currentTab === tab.value ? "$black" : "$coolGray100"}
            py={10}
          >
            <Text
              color="black"
              textAlign="center"
              numberOfLines={1}
              fontWeight={currentTab === tab.value ? "$semibold" : "$normal"}
            >
              {tab.label}
            </Text>
          </Box>
        </Pressable>
      ))}
      <View width={20} h="$full" />
    </ScrollView>
  );
}
