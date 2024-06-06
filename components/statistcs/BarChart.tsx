import { Box, Text } from "@gluestack-ui/themed";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryStack,
  VictoryTheme,
} from "victory-native";

const sampleData = [
  { label: "Cats", y: 35, x: 1 },
  { label: "Dogs", y: 40, x: 2 },
  { label: "Birds", y: 55, x: 3 },
];

export const BarChart = () => {
  const data = [
    { x: 10, y: 60 },
    { x: 20, y: 50 },
    { x: 30, y: 70 },
    { x: 30, y: 50 },
    { x: 10, y: 30 },
  ];
  const accumulativeX = data.reduce((acc, { x }) => acc + x, 0);
  const getAccumulativeX = (i: number) =>
    data.slice(0, i).reduce((acc, { x }) => acc + x, 0);
  return (
    <Box>
      <VictoryChart theme={VictoryTheme.material} height={400}>
        <VictoryStack
          colorScale={"qualitative"}
          domain={{ x: [0, 100], y: [0, 100] }}
        >
          {data.map(({ x, y }, i) => {
            const xdata = x / 2 + getAccumulativeX(i);
            return (
              <VictoryBar
                key={i}
                data={[{ x: xdata, y: y }]}
                barWidth={x * 3}
                labels={({ datum }) =>
                  datum.x == xdata ? `${data[i].x}%` : ""
                }
                labelComponent={<VictoryLabel y={380} />}
              />
            );
          })}

          <VictoryAxis dependentAxis tickFormat={(t) => `${t}%`} />
        </VictoryStack>
      </VictoryChart>
      {/* divider */}
      <Box
        borderColor="lightgray"
        mx={10}
        borderWidth={1}
        width="100%"
        height={1}
      />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        p={10}
      >
        <Box display="flex" flexDirection="row" gap={4} alignItems="center">
          <Box
            width={20}
            height={20}
            borderRadius={10}
            backgroundColor="#ABEDFD"
          />
          <Text>Z1</Text>
        </Box>
        <Box display="flex" flexDirection="row" gap={4} alignItems="center">
          <Box
            width={16}
            height={16}
            borderRadius={10}
            backgroundColor="#A6ECB1"
          />
          <Text>Z2</Text>
        </Box>
        <Box display="flex" flexDirection="row" gap={4} alignItems="center">
          <Box
            width={16}
            height={16}
            borderRadius={10}
            backgroundColor="#F9F3C8"
          />
          <Text>Z3</Text>
        </Box>
        <Box display="flex" flexDirection="row" gap={4} alignItems="center">
          <Box
            width={16}
            height={16}
            borderRadius={10}
            backgroundColor="#FFB290"
          />
          <Text>Z4</Text>
        </Box>
        <Box display="flex" flexDirection="row" gap={4} alignItems="center">
          <Box
            width={16}
            height={16}
            borderRadius={10}
            backgroundColor="#FF9C98"
          />
          <Text>Z5</Text>
        </Box>
      </Box>
    </Box>
  );
};
