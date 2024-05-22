import { Box, Text } from "@gluestack-ui/themed";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryGroup,
  VictoryLabel,
  VictoryStack,
  VictoryTheme,
} from "victory-native";

const sampleData = [
  { label: "Hit 1", y: 35, x: 1 },
  { label: "Hit 2", y: 40, x: 2 },
  { label: "Hit 3", y: 55, x: 3 },
];

const SessionResultBarChart = () => {
  const data = [
    { x: 1, y: 4 },
    { x: 2, y: 5 },
    { x: 3, y: 4 },
    { x: 4, y: 2 },
    { x: 5, y: 1 },
  ];
  //   const accumulativeX = data.reduce((acc, { x }) => acc + x, 0);
  const getAccumulativeX = (i: number) =>
    data.slice(0, i).reduce((acc, { x }) => acc + x, 0);
  //   console.log(getAccumulativeX(1));
  return (
    <Box>
      <VictoryChart theme={VictoryTheme.material} height={280} width={550}>
        <VictoryStack
          colorScale={"qualitative"}
          domain={{ x: [0, 8], y: [0, 10] }}
        >
          {data.map(({ x, y }, i) => {
            // const xdata = x / 2 + getAccumulativeX(i);
            return (
              <VictoryBar
                key={i}
                data={[{ x, y: y }]}
                barWidth={15}
                labels={({ datum }) => (datum.x == x ? `${data[i].x}%` : "")}
                // barRatio={0.5}
                labelComponent={<VictoryLabel y={380} />}
              />
            );
          })}

          <VictoryAxis dependentAxis tickFormat={(t) => `${t}s`} />
          <VictoryAxis tickFormat={(t) => `HIT ${t}`} />
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
    </Box>
  );
};
export default SessionResultBarChart;
