import React from "react";
import { G, Rect } from "react-native-svg";
import {
  VictoryArea,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryPolarAxis,
  VictoryScatter,
  VictoryTheme,
} from "victory-native";

type Data = Record<string, number>[];

const characterData = [
  {
    "Toma de Decisión": 2,
    Memoria: 300,
    "TD + Memoria": 2,
    Reconocimiento: 80,
    Random: 90,
  },
  {
    "Toma de Decisión": 5,
    Memoria: 225,
    "TD + Memoria": 3,
    Reconocimiento: 60,
    Random: 120,
  },
];

type Props = {
  labels: string[];
  characterData: Data;
};

export function RadarChart({ labels, characterData }: Props) {
  const state = {
    data: processData(characterData),
    maxima: getMaxima(characterData),
  };

  return (
    <VictoryChart
      polar
      theme={VictoryTheme.material}
      domain={{ y: [0, 1] }}
      height={350}
      style={{
        parent: {
          paddingTop: 10,
          paddingBottom: 10,
          transform: `rotate(-${90 / 5}deg)`,
        },
      }}
    >
      <VictoryGroup
        colorScale={["#58DAFC", "#FF6622", "tomato"]}
        style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
      >
        {state.data.map((data, i) => {
          return <VictoryArea key={i} data={data} />;
        })}
      </VictoryGroup>
      {Object.keys(state.maxima).map((key, i) => {
        return (
          <VictoryPolarAxis
            key={i}
            dependentAxis
            style={{
              axisLabel: {
                padding: 40,
                fontWeight: "bold",
              },
              axis: { stroke: "none" },
              grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 },
            }}
            tickLabelComponent={<VictoryLabel labelPlacement="vertical" />}
            labelPlacement="perpendicular"
            axisValue={i + 1}
            label={key}
            tickFormat={(t) => ""}
          />
        );
      })}
      <VictoryPolarAxis
        labelPlacement="parallel"
        tickFormat={() => ""}
        style={{
          axis: { stroke: "none" },
          grid: { stroke: "grey", opacity: 0.8 },
        }}
        tickLabelComponent={<VictoryLabel labelPlacement="vertical" />}
      />
      {Object.entries(state.data[0]).map(([key, value], i) => (
        <VictoryScatter
          key={i}
          data={[
            {
              x: i + 1,
              y: value.y,
            },
          ]}
          size={6}
          style={{
            data: { fill: "#58DAFC" },
            labels: {
              fill: "black",
              fontSize: 10,
              padding: 18,
              backgroundColor: "#ff0000",
            },
          }}
          labelComponent={<CustomLabelWithBackground />}
          labels={labels}
        />
      ))}
    </VictoryChart>
  );
}

function getMaxima(data: Data) {
  const groupedData = Object.keys(data[0]).reduce((memo: any, key) => {
    memo[key] = data.map((d) => d[key]);
    return memo;
  }, {});
  return Object.keys(groupedData).reduce((memo: any, key) => {
    memo[key] = Math.max(...groupedData[key]);
    return memo;
  }, {});
}

function processData(data: Data) {
  const maxByGroup = getMaxima(data);
  const makeDataArray = (d: any) => {
    return Object.keys(d).map((key) => {
      return { x: key, y: d[key] / maxByGroup[key] };
    });
  };
  return data.map((datum) => makeDataArray(datum));
}

const CustomLabelWithBackground = (props: any) => {
  const { x, y, text, datum } = props;
  const angles = [90, 90 / 5, -(3 * 90) / 5, (3 * 90) / 5, -90 / 5];
  const angle = angles[datum._x - 1];

  return (
    <G transform={`rotate(${angle}, ${x}, ${y})`}>
      <Rect
        x={x - 60}
        y={y - 8}
        width={120}
        height={16}
        fill="#ABEDFD"
        stroke="#ABEDFD"
        strokeWidth={1}
        rx={8}
        ry={8}
      />
      <VictoryLabel
        {...props}
        datum={datum}
        labelPlacement="vertical"
        verticalAnchor="middle"
      />
    </G>
  );
};
