import { generateFakePoints } from "@/utils";
import { Box, Text } from "@gluestack-ui/themed";
import { ComponentProps } from "react";
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
const xAxisDefault = ["W1", "W2", "W3", "W4", "W5"];
const domainDefault: DomainType = { y: [0, 100] };
const tickFormatDefault = (t: number) => `${t}%`;

type DomainType = ComponentProps<typeof VictoryChart>["domain"];
type Point = { x: number; y: number };
type Props = {
  linesData: Record<string, Point[]>;
  xAxis?: string[];
  yAxis?: number[];
  tickFormat?: ComponentProps<typeof VictoryAxis>["tickFormat"];
  domain?: DomainType;
};

export const LineChart = ({
  linesData,
  xAxis = xAxisDefault,
  yAxis = yAxisDefault,
  tickFormat = tickFormatDefault,
  domain = domainDefault,
}: Props) => {
  const lineNames = Object.keys(linesData);

  

  return (
    <Box>
      <VictoryChart
        theme={VictoryTheme.material}
        height={400}
        padding={{ top: 10, bottom: 40, left: 50, right: 60 }}
      >
        <VictoryAxis
          dependentAxis
          tickValues={yAxis}
          tickFormat={tickFormat}
          style={{
            grid: {stroke:  "lightgray", strokeWidth: 1, strokeDasharray: "0", },
            tickLabels: {fontSize: 12, padding: 10, fill: "black",},
            ticks: {stroke: "none", padding: 0},
            axis: {stroke: "none"},
            
          }}
        />
        <VictoryAxis
          tickValues={xAxis}          
          style={{
            axis: {stroke: "none"},
            ticks: {stroke: "none", padding: 0},
            tickLabels: {fontSize: 12, padding: 10, fill: "black",},
            grid: {stroke:  "lightgray", strokeWidth: 1, strokeDasharray: "0",},
          }}
        />
        <VictoryGroup colorScale={COLORS} domain={domain}>
          {Object.entries(linesData).map(([key, data], i) => (
            <VictoryLine
              key={i}
              data={data}
              labels={({ datum }) => datum.x}
              labelComponent={<Circle cx={0} cy={0} r={5} fill={COLORS[i]} />}
            />
          ))}
        </VictoryGroup>
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
