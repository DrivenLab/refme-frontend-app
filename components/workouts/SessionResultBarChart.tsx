import { RPE_COLORS } from "@/constants/Session";
import { Box } from "@gluestack-ui/themed";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "victory-native";
import { WorkoutResultBarChart } from "@/types/workout";

type Props = { data: WorkoutResultBarChart[] };
const SessionResultBarChart = ({ data }: Props) => {
  const data_ = data.map((d, index) => ({
    ...d,
  }));
  const colors = data.map(
    (d) => RPE_COLORS[`${d.rpe}` as keyof typeof RPE_COLORS]
  );
  return (
    <Box borderWidth={1} margin={10} borderColor="#a1a1a1" borderRadius={7}>
      <VictoryChart theme={VictoryTheme.material} height={220} width={500}>
        <VictoryStack colorScale={colors} domain={{ x: [0, 8], y: [0, 7] }}>
          <VictoryBar
            animate={{ duration: 1000, onLoad: { duration: 500 } }}
            data={data_}
            barWidth={15}
            style={{
              data: {
                fill: ({ datum }) => {
                  return RPE_COLORS[datum.rpe as keyof typeof RPE_COLORS];
                },
              },
            }}
            labels={({ datum }) =>
              !datum.hasVideo ? "" : datum.answerIsCorrect ? "✅" : "❌"
            }
            cornerRadius={5}
          />

          <VictoryAxis dependentAxis tickFormat={(t) => `${t}s`} />
          <VictoryAxis tickFormat={(t) => `HIT ${t}`} />
        </VictoryStack>
      </VictoryChart>
    </Box>
  );
};
export default SessionResultBarChart;
