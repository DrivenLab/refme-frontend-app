import { Box, Text } from "@gluestack-ui/themed";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryStack,
  VictoryTheme,
} from "victory-native";

const colors = ["#ABEDFD", "#A6ECB1", "#F9F3C8", "#FFB290", "#FF9C98"];

type Props = {
  data: { x: number; y: number }[];
  labels: string[];
};

export const BarChart = ({ data, labels }: Props) => {
  const getAccumulativeX = (i: number) =>
    data.slice(0, i).reduce((acc, { x }) => acc + x, 0);

  return (
    <Box>
      <VictoryChart theme={VictoryTheme.material} height={400}>
        <VictoryStack colorScale={colors} domain={{ x: [0, 100], y: [0, 100] }}>
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
        {labels.map((label, i) => (
          <Box
            key={i}
            display="flex"
            flexDirection="row"
            gap={4}
            alignItems="center"
          >
            <Box
              width={20}
              height={20}
              borderRadius={10}
              backgroundColor={colors[i]}
            />
            <Text>{label}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
