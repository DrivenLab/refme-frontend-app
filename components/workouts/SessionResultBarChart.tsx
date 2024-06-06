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
  "0": "#58DAFC",
  "1": "#58DAFC",
  "2": "#58DAFC",
  "3": "#4ed964",
  "4": "#4ed964",
  "5": "#F3e790",
  "6": "#F3e790",
  "7": "#FF6622",
  "8": "#FF6622",
  "9": "#FF3A31",
  "10": "#FF3A31",
};
type Props = { data: WorkoutResultBarChart[] };
const SessionResultBarChart = ({ data }: Props) => {
  const colors = data.map(
    // TODO: CAMBIAR POR COLORES PASTELES QUE ESTAN EL FIGMA
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
