import { Box } from "@gluestack-ui/themed";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "victory-native";
import { WorkoutResultBarChart } from "@/types/workout";
export const PASTEL_RPE_COLORS = {
  "1": "#92e2f9",
  "2": "#92e2f9",
  "3": "#9ae3ab",
  "4": "#9ae3ab",
  "5": "#e7e7c0",
  "6": "#e7e7c0",
  "7": "#f3aa8b",
  "8": "#f3aa8b",
  "9": "#f39592",
  "10": "#f39592",
};
type Props = { data: WorkoutResultBarChart[] };
const SessionResultBarChart = ({ data }: Props) => {
  const colors = data.map(
    (d) => PASTEL_RPE_COLORS[`${d.rpe}` as keyof typeof PASTEL_RPE_COLORS]
  );
  return (
    <Box borderWidth={1} margin={10} borderColor="#a1a1a1" borderRadius={7}>
      <VictoryChart theme={VictoryTheme.material} height={220} width={500}>
        <VictoryStack
          colorScale={colors}
          domain={{ x: [0, data.length + 1], y: [0, 7] }}
        >
          <VictoryBar
            animate={{ duration: 1000, onLoad: { duration: 500 } }}
            data={data}
            barWidth={15}
            style={{
              data: {
                fill: ({ datum }: { datum?: WorkoutResultBarChart }) => {
                  const colorIndex = datum?.rpe;
                  if (colorIndex)
                    return PASTEL_RPE_COLORS[
                      `${colorIndex}` as keyof typeof PASTEL_RPE_COLORS
                    ];
                  else return "#a1a1a1";
                },
              },
            }}
            labels={({ datum }: { datum: WorkoutResultBarChart }) =>
              !datum.hasVideo ? "" : datum.isCorrect ? "✅" : "❌"
            }
            cornerRadius={5}
          />

          <VictoryAxis dependentAxis tickFormat={(t) => `${t}s`} />
          <VictoryAxis
            tickFormat={(t) => `HIT\n${t}`}
            tickValues={data.map((it, i) => i + 1)}
          />
        </VictoryStack>
      </VictoryChart>
    </Box>
  );
};
export default SessionResultBarChart;
