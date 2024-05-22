import { VictoryPie, VictoryTheme } from "victory-native";

export const PieChart = () => {
  return (
    <VictoryPie
      theme={VictoryTheme.material}
      data={[
        { x: "Cats", y: 35 },
        { x: "Dogs", y: 40 },
        { x: "Birds", y: 55 },
      ]}
    />
  );
};
