import { Box, HStack, Text } from "@gluestack-ui/themed";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "victory-native";
import {
  MEMBER_TYPE,
  WORKOUT_TYPE,
  WorkoutResultBarChart,
} from "@/types/workout";
import { TIME_TO_ANSWER } from "@/constants/Session";
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
const ZONE_COLORS = ["#92e2f9", "#9ae3ab", "#e7e7c0", "#f3aa8b", "#f39592"];

type Props = {
  data: WorkoutResultBarChart[];
  workoutType: WORKOUT_TYPE;
  memberType: MEMBER_TYPE;
};
const labels = ["Zona 1", "Zona 2", "Zona 3", "Zona 4", "Zona 5"];
const SessionResultBarChart = ({ data, workoutType, memberType }: Props) => {
  const colors = data.map(
    (d) => PASTEL_RPE_COLORS[`${d.rpe}` as keyof typeof PASTEL_RPE_COLORS]
  );
  const maxYValue = TIME_TO_ANSWER[memberType][workoutType] || 6;
  return (
    <Box borderWidth={1} margin={10} borderColor="#a1a1a1" borderRadius={7}>
      <VictoryChart theme={VictoryTheme.material} height={200} width={500}>
        <VictoryStack
          colorScale={colors}
          domain={{ x: [0, data.length + 1], y: [0, maxYValue] }}
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
      <HStack
        bgColor=""
        display="flex"
        flexDirection="row"
        justifyContent="center"
        gap={15}
        alignItems="center"
        marginBottom={"$2"}
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
              width={15}
              height={15}
              borderRadius={10}
              backgroundColor={ZONE_COLORS[i]}
            />
            <Text fontSize={"$sm"}>{label}</Text>
          </Box>
        ))}
      </HStack>
    </Box>
  );
};
export default SessionResultBarChart;
