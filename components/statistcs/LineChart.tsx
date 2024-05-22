import { generateFakePoints } from "@/utils";
import { Box, Text } from "@gluestack-ui/themed";
import { Circle } from "react-native-svg";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryGroup,
  VictoryLabel,
  VictoryLine,
  VictoryStack,
  VictoryTheme,
} from "victory-native";

const COLORS = ["#ABEDFD", "#FF6622", "#4ED964", "#E8D122", "#090B22"];
const yAxisDefault = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const xAxisDefault = ["Z1", "Z2", "Z3", "Z4", "Z5", "Z6", "Z7"];

type Point = { x: number; y: number };

type Props = {
  linesData: Record<string, Point[]>;
  xAxis?: string[];
  yAxis?: number[];
};

export const LineChart = ({
  linesData,
  xAxis = xAxisDefault,
  yAxis = yAxisDefault,
}: Props) => {
  const lineNames = Object.keys(linesData);

  return (
    <Box>
      <VictoryChart
        theme={VictoryTheme.material}
        height={400}
        domainPadding={{ x: 10 }}
      >
        <VictoryAxis
          dependentAxis
          tickValues={yAxis}
          tickFormat={(t) => `${t}%`}
          style={{
            grid: { stroke: "lightgray" },
          }}
        />
        <VictoryAxis
          tickValues={xAxis}
          style={{
            grid: { stroke: "lightgray", strokeWidth: 1 },
          }}
        />
        <VictoryGroup colorScale={COLORS} domain={{ y: [0, 100] }}>
          {Object.entries(linesData).map(([key, data], i) => (
            <VictoryLine
              data={data}
              labels={({ datum }) => datum.x}
              labelComponent={<Circle cx={0} cy={0} r={3} fill={COLORS[i]} />}
            />
          ))}
        </VictoryGroup>
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
        <Box
          display="flex"
          flexDirection="row"
          gap={16}
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
        >
          {lineNames.map((d, i) => (
            <Box
              key={i}
              display="flex"
              flexDirection="row"
              gap={4}
              alignItems="center"
            >
              <Box
                width={16}
                height={16}
                borderRadius={10}
                backgroundColor={COLORS[i]}
              />
              <Text size="sm">{d}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
