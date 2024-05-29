import { RPE_COLORS } from "@/constants/Session";
import { SessionContext } from "@/types/session";
import { Box } from "@gluestack-ui/themed";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "victory-native";

type Props = { session: SessionContext };
const SessionResultBarChart = ({ session }: Props) => {
  const data = session.iterations.map((iteration, index) => ({
    x: index + 1,
    y: iteration.answeredInMs / 1000,
    iteration,
    hasVideo: iteration.video ? true : false,
    answerIsCorrect:
      iteration.answer1 === iteration.userAnswer1 &&
      iteration.answer2 === iteration.userAnswer2,
  }));
  const colors = session.iterations.map(
    (iteration) => RPE_COLORS[`${iteration.rpe}` as keyof typeof RPE_COLORS]
  );
  return (
    <Box borderWidth={1} margin={10} borderColor="#a1a1a1" borderRadius={7}>
      <VictoryChart theme={VictoryTheme.material} height={220} width={500}>
        <VictoryStack
          colorScale={colors}
          domain={{ x: [0, session.iterations.length + 1], y: [0, 7] }}
        >
          <VictoryBar
            animate={{ duration: 1000, onLoad: { duration: 500 } }}
            data={data}
            barWidth={15}
            style={{
              data: {
                fill: ({ datum }) => {
                  return RPE_COLORS[
                    datum.iteration.rpe as keyof typeof RPE_COLORS
                  ];
                },
              },
            }}
            labels={({ datum }) =>
              !datum.hasVideo ? "" : datum.answerIsCorrect ? "✅" : "❌"
            }
            cornerRadius={5}
          />

          <VictoryAxis dependentAxis tickFormat={(t) => `${t}s`} />
          <VictoryAxis
            tickFormat={(t) => `HIT\n${t}`}
            tickValues={session.iterations.map((it, i) => i + 1)}
          />
        </VictoryStack>
      </VictoryChart>
    </Box>
  );
};
export default SessionResultBarChart;
