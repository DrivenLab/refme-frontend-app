import React from "react";
import { Dimensions } from "react-native";
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
import { Box, Text } from "@gluestack-ui/themed";

const width = Dimensions.get("window").width;

type Data = Record<string, number>[];

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
    <Box>

    <VictoryChart
      polar
      theme={VictoryTheme.material}
      domain={{ y: [0, 1] }}
      height={350}
      width={width - 40}
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
                padding: 30,
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
          grid: { stroke: "grey", opacity: 0.4 },
        }}
        tickLabelComponent={<VictoryLabel labelPlacement="parallel" />}
      />
      {Object.entries(state.data[0]).map(([key, value], i) => (
        <VictoryScatter
          key={i}
          data={[
            {
              x: i + 1,
              y: 1,
            },
          ]}
          size={6}
          style={{
            data: { fill: "#58DAFC", opacity: 0 },
            labels: {
              fill: "black",
              fontSize: 10,
              padding: 10,
              backgroundColor: "#ff0000",
            },
          }}
          labelComponent={<CustomLabelWithBackground />}
          labels={[labels[i]]} 
        />
      ))}
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
          
            <Box
              display="flex"
              flexDirection="row"
              gap={4}
              alignItems="center"
            >
              <Box
                width={16}
                height={16}
                borderRadius={10}
                backgroundColor={"#FF6622"}
              />
              <Text size="sm">Promedio de todos los usuarios REFME</Text>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              gap={4}
              alignItems="center"
            >
              <Box
                width={16}
                height={16}
                borderRadius={10}
                backgroundColor={"#ABEDFD"}
              />
              <Text size="sm">Promedio personal</Text>
            </Box>
         
        </Box>
      </Box>
    </Box>
  );
}

function getMaxima(data: Data) {
  const groupedData = Object.keys(data[0]).reduce((memo: any, key) => {
    memo[key] = data.map((d) => d[key]);
    return memo;
  }, {});
  return Object.keys(groupedData).reduce((memo: any, key) => {
    memo[key] = Math.max(...groupedData[key], 100);
    
    return memo;
  }, {});
}

function processData(data: Data ) {
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
