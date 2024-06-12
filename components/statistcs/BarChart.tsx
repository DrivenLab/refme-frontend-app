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
const yAxisDefault = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const xAxisDefault = ["Z1", "Z2", "Z3", "Z4", "Z5"];


type Props = {
  data: { x: number; y: number }[];
  xAxis?: string[];

  yAxis?: number[];

  labels: string[];
};

export const BarChart = ({ data, labels, yAxis = yAxisDefault, xAxis=xAxisDefault }: Props) => {
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
                  datum.x === xdata ? `${xAxis[i]}\n${data[i].x}%` : ""
                }
                labelComponent={<VictoryLabel y={390} />}
                style={{labels: { fontSize: 12, fill: "black" }}}
                
              />
            );
          })}

          <VictoryAxis 
            dependentAxis 
            tickValues={yAxis}
            tickFormat={(t) => `${t}%`} 
            style={{
              axis: {stroke: "none"},
              ticks: {stroke: "none", padding: 0},
              tickLabels: {fontSize: 12, padding: 10, fill: "black",},
              grid: {stroke:  "lightgray", strokeWidth: 1, strokeDasharray: "0",},
              }} 
          />
        

        </VictoryStack>
      </VictoryChart>
      <Box
        borderColor="lightgray"
        mx={5}
        borderWidth={1}
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
