import { Box, Text } from "@gluestack-ui/themed";
import { Dimensions } from "react-native";
import { VictoryPie, VictoryTheme } from "victory-native";

const chartWidth = Dimensions.get("window").width;

const colors = ["#FF6622", "#58DAFC", "#051232"];
type Props = {
  data: { x: string; y: number }[];
};

export const PieChart = ({ data }: Props) => {
  return (
    <Box display="flex" flexDirection="row" alignItems="center" gap={20}>
      <VictoryPie
        colorScale={colors}
        theme={VictoryTheme.material}
        width={chartWidth * 0.6}
        data={data}
        padding={{ top: 0, bottom: 0 }}
        labels={({ datum }) => ``}
      />
      <Box display="flex" gap={32} flex={1}>
        {data.map(({ x, y }, i) => (
          <Box key={i} alignItems="flex-start" gap={4}>
            <Box
              rounded="$full"
              bg={colors[i]}
              width="90%"
              height={10}
              mr={8}
            />
            <Text numberOfLines={3} fontSize="$sm">
              {x}
            </Text>
            <Text fontSize="$lg" fontWeight="bold">
              {y}%
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
