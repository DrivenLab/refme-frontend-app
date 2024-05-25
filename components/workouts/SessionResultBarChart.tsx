import { RPE_COLORS } from "@/constants/Session";
import { SessionContext } from "@/types/session";
import { Box } from "@gluestack-ui/themed";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryStack,
  VictoryTheme,
} from "victory-native";

type Props = { session: SessionContext };
const SessionResultBarChart = ({ session }: Props) => {
  const data = session.iterations.map((iteration, index) => ({
    x: index + 1,
    y: iteration.answeredInMs / 1000,
  }));
  const colors = session.iterations.map(
    (iteration) => RPE_COLORS[`${iteration.rpe}` as keyof typeof RPE_COLORS]
  );
  return (
    <Box borderWidth={1} margin={10} borderColor="#a1a1a1" borderRadius={7}>
      <VictoryChart theme={VictoryTheme.material} height={220} width={500}>
        <VictoryStack colorScale={colors} domain={{ x: [0, 8], y: [0, 7] }}>
          {data.map(({ x, y }, i) => {
            return (
              <VictoryBar
                key={i}
                data={[{ x, y: y }]}
                barWidth={15}
                labels={({ datum }) => (datum.x == x ? `${data[i].x}%` : "")}
                labelComponent={<VictoryLabel y={380} />}
                cornerRadius={5}
              />
            );
          })}

          <VictoryAxis dependentAxis tickFormat={(t) => `${t}s`} />
          <VictoryAxis tickFormat={(t) => `HIT ${t}`} />
        </VictoryStack>
      </VictoryChart>
    </Box>
  );
};
export default SessionResultBarChart;
