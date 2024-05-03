import { Box, Pressable, Text } from "@gluestack-ui/themed";
type Options = {
  label: string;
  value: string;
};
type Props = {
  currentTab: string;
  tabs: Options[];
  changeCurrentTab: (tab: string) => void;
};
function CTab({ currentTab, tabs, changeCurrentTab }: Props) {
  return (
    <Box flexDirection="row" my={"$2"}>
      {tabs.map((tab, index) => (
        <Pressable
          onPress={() => changeCurrentTab(tab.value)}
          key={index}
          flex={1}
        >
          <Box
            borderBottomWidth={4}
            borderColor={currentTab === tab.value ? "$black" : "$coolGray100"}
            py={10}
          >
            <Text
              color="black"
              textAlign="center"
              fontWeight={currentTab === tab.value ? "$bold" : "$normal"}
            >
              {tab.label}
            </Text>
          </Box>
        </Pressable>
      ))}
    </Box>
  );
}

export default CTab;
