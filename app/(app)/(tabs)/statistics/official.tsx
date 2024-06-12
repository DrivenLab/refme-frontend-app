import { StyleSheet } from "react-native";
import { ScrollView, get } from "@gluestack-ui/themed";

import { RadarChart } from "@/components/statistcs/RadarChart";
import { PieChart } from "@/components/statistcs/PieChart";
import { BarChart } from "@/components/statistcs/BarChart";
import { LineChart } from "@/components/statistcs/LineChart";
import { ChartCard } from "@/components/statistcs/ChartCard";
import { generateFakePoints } from "@/utils";

import { useGetStats } from "@/queries/stats.query";
import { Stats } from "@/types/stats";


export default function TabTwoScreen() {
  const { stats, isLoadingStats } = useGetStats();

  /* %de Acierto por Habilidad Cognitiva */
  const { radarLabels, characterData } = getRadarData(stats as Stats);

  function getRadarData(stats: Stats) {
    const radarLabels = [
      `${stats?.successByType?.[0]?.user?.[1]?.decisions ?? 0} reps. ${stats?.successByType?.[0]?.user?.[1]?.prom ?? 0}%`,
      `${stats?.successByType?.[0]?.user?.[0]?.decisions ?? 0} reps. ${stats?.successByType?.[0]?.user?.[0]?.prom ?? 0}%`,
      `${stats?.successByType?.[0]?.user?.[4]?.decisions ?? 0} reps. ${stats?.successByType?.[0]?.user?.[4]?.prom ?? 0}%`,
      `${stats?.successByType?.[0]?.user?.[3]?.decisions ?? 0} reps. ${stats?.successByType?.[0]?.user?.[3]?.prom ?? 0}%`,
      `${stats?.successByType?.[0]?.user?.[2]?.decisions ?? 0} reps. ${stats?.successByType?.[0]?.user?.[2]?.prom ?? 0}%`,
    ];
  
    const characterData = [
      {
        Memoria: stats?.successByType?.[0]?.user?.[1]?.prom ?? 0,
        "Toma de Decisión": stats?.successByType?.[0]?.user?.[0]?.prom ?? 0,
        Random: stats?.successByType?.[0]?.user?.[4]?.prom ?? 0,
        Reconocimiento: stats?.successByType?.[0]?.user?.[3]?.prom ?? 0,
        "TD + Memoria": stats?.successByType?.[0]?.user?.[2]?.prom ?? 0,
      },
      {
        Memoria: stats?.successByType?.[1]?.refme?.[1]?.prom ?? 0,
        "Toma de Decisión": stats?.successByType?.[1]?.refme?.[0]?.prom ?? 0,
        Random: stats?.successByType?.[1]?.refme?.[4]?.prom ?? 0,
        Reconocimiento: stats?.successByType?.[1]?.refme?.[3]?.prom ?? 0,
        "TD + Memoria": stats?.successByType?.[1]?.refme?.[2]?.prom ?? 0,
      },
    ];
  
    return { radarLabels, characterData };
  }

  /* % de Acierto por zona de RPE  */
  const {  barchartLabels, barchartData } = getBarChartData(stats as Stats);

  function getBarChartData(stats: Stats) {
    const barchartLabels = ["Z1", "Z2", "Z3", "Z4", "Z5"];
    const barchartData = [
      {
        x: stats?.userDataRpeZone?.[0]?.percentageZone ?? 0,
        y: stats?.userDataRpeZone?.[0]?.successPercentage ?? 0,
      },
      {
        x: stats?.userDataRpeZone?.[1]?.percentageZone ?? 0,
        y: stats?.userDataRpeZone?.[1]?.successPercentage ?? 0,
      },
      {
        x: stats?.userDataRpeZone?.[2]?.percentageZone ?? 0,
        y: stats?.userDataRpeZone?.[2]?.successPercentage ?? 0,
      },
      {
        x: stats?.userDataRpeZone?.[3]?.percentageZone ?? 0,
        y: stats?.userDataRpeZone?.[3]?.successPercentage ?? 0,
      },
      {
        x: stats?.userDataRpeZone?.[4]?.percentageZone ?? 0,
        y: stats?.userDataRpeZone?.[4]?.successPercentage ?? 0,
      },
    ];
  
    return { barchartLabels, barchartData };
  }

  /* Evolucion de actividades */
  const activitiesData2  = getActivitiesData(stats as Stats);

  function getActivitiesData(stats: Stats) {
    
    const activitiesData2 = {
      "Toma de decisión": [
        { x: 1, y: stats?.successByTypeAndTime?.dm?.[0]?.prom ?? 0 },
        { x: 2, y: stats?.successByTypeAndTime?.dm?.[1]?.prom ?? 0 },
        { x: 3, y: stats?.successByTypeAndTime?.dm?.[2]?.prom ?? 0 },
        { x: 4, y: stats?.successByTypeAndTime?.dm?.[3]?.prom ?? 0 },
        { x: 5, y: stats?.successByTypeAndTime?.dm?.[4]?.prom ?? 0 },
      ],
      "Memoria": [
        { x: 1, y: stats?.successByTypeAndTime?.memory?.[0]?.prom ?? 0 },
        { x: 2, y: stats?.successByTypeAndTime?.memory?.[1]?.prom ?? 0 },
        { x: 3, y: stats?.successByTypeAndTime?.memory?.[2]?.prom ?? 0 },
        { x: 4, y: stats?.successByTypeAndTime?.memory?.[3]?.prom ?? 0 },
        { x: 5, y: stats?.successByTypeAndTime?.memory?.[4]?.prom ?? 0 },
      ],
      "Reconocimiento": [
        { x: 1, y: stats?.successByTypeAndTime?.recognition?.[0]?.prom ?? 0 },
        { x: 2, y: stats?.successByTypeAndTime?.recognition?.[1]?.prom ?? 0 },
        { x: 3, y: stats?.successByTypeAndTime?.recognition?.[2]?.prom ?? 0 },
        { x: 4, y: stats?.successByTypeAndTime?.recognition?.[3]?.prom ?? 0 },
        { x: 5, y: stats?.successByTypeAndTime?.recognition?.[4]?.prom ?? 0 },
      ],
      "T.D. + Memoria": [
        { x: 1, y: stats?.successByTypeAndTime?.dmMemory?.[0]?.prom ?? 0 },
        { x: 2, y: stats?.successByTypeAndTime?.dmMemory?.[1]?.prom ?? 0 },
        { x: 3, y: stats?.successByTypeAndTime?.dmMemory?.[2]?.prom ?? 0 },
        { x: 4, y: stats?.successByTypeAndTime?.dmMemory?.[3]?.prom ?? 0 },
        { x: 5, y: stats?.successByTypeAndTime?.dmMemory?.[4]?.prom ?? 0 },
      
      ],
      "Random": [
        { x: 1, y: stats?.successByTypeAndTime?.random?.[0]?.prom ?? 0 },
        { x: 2, y: stats?.successByTypeAndTime?.random?.[1]?.prom ?? 0 },
        { x: 3, y: stats?.successByTypeAndTime?.random?.[2]?.prom ?? 0 },
        { x: 4, y: stats?.successByTypeAndTime?.random?.[3]?.prom ?? 0 },
        { x: 5, y: stats?.successByTypeAndTime?.random?.[4]?.prom ?? 0 },
      
      ],
    };

    
    return  activitiesData2 ;
  }

  /* Evolucion de Toma de Decision */
  const { decisionData } = getDecisionData(stats as Stats);

  function getDecisionData(stats: Stats) {
    const decisionData = {
      "Manos":  [
        { x: 1, y: stats?.successByTopicAndTime?.hand?.[0]?.prom ?? 0 },
        { x: 2, y: stats?.successByTopicAndTime?.hand?.[1]?.prom ?? 0 },
        { x: 3, y: stats?.successByTopicAndTime?.hand?.[2]?.prom ?? 0 },
        { x: 4, y: stats?.successByTopicAndTime?.hand?.[3]?.prom ?? 0 },
        { x: 5, y: stats?.successByTopicAndTime?.hand?.[4]?.prom ?? 0 },
      ],
      "Faltas tácticas": [
        { x: 1, y: stats?.successByTopicAndTime?.tacticalFouls?.[0]?.prom ?? 0 },
        { x: 2, y: stats?.successByTopicAndTime?.tacticalFouls?.[1]?.prom ?? 0 },
        { x: 3, y: stats?.successByTopicAndTime?.tacticalFouls?.[2]?.prom ?? 0 },
        { x: 4, y: stats?.successByTopicAndTime?.tacticalFouls?.[3]?.prom ?? 0 },
        { x: 5, y: stats?.successByTopicAndTime?.tacticalFouls?.[4]?.prom ?? 0 },
      
      ],
      Disputas: [
        { x: 1, y: stats?.successByTopicAndTime?.disputes?.[0]?.prom ?? 0 },
        { x: 2, y: stats?.successByTopicAndTime?.disputes?.[1]?.prom ?? 0 },
        { x: 3, y: stats?.successByTopicAndTime?.disputes?.[2]?.prom ?? 0 },
        { x: 4, y: stats?.successByTopicAndTime?.disputes?.[3]?.prom ?? 0 },
        { x: 5, y: stats?.successByTopicAndTime?.disputes?.[4]?.prom ?? 0 },
      
      ],
    };
    return { decisionData };
  }

  /* Evolución de tiempo de respuesta */
  const { timeResponseData } = getTimeResponseData(stats as Stats);

  function getTimeResponseData(stats: Stats) {
    const timeResponseData = {
      "Toma de decisión": [
        { x: 1, y: stats?.successByTypeAndTime?.dm?.[0]?.responseAvgTime ?? 0 },
        { x: 2, y: stats?.successByTypeAndTime?.dm?.[1]?.responseAvgTime ?? 0 },
        { x: 3, y: stats?.successByTypeAndTime?.dm?.[2]?.responseAvgTime ?? 0 },
        { x: 4, y: stats?.successByTypeAndTime?.dm?.[3]?.responseAvgTime ?? 0 },
        { x: 5, y: stats?.successByTypeAndTime?.dm?.[4]?.responseAvgTime ?? 0 },
      ],
      Memoria: [
        { x: 1, y: stats?.successByTypeAndTime?.memory?.[0]?.responseAvgTime ?? 0 },
        { x: 2, y: stats?.successByTypeAndTime?.memory?.[1]?.responseAvgTime ?? 0 },
        { x: 3, y: stats?.successByTypeAndTime?.memory?.[2]?.responseAvgTime ?? 0 },
        { x: 4, y: stats?.successByTypeAndTime?.memory?.[3]?.responseAvgTime ?? 0 },
        { x: 5, y: stats?.successByTypeAndTime?.memory?.[4]?.responseAvgTime ?? 0 },
      ],
      Reconocimiento: [
        { x: 1, y: stats?.successByTypeAndTime?.recognition?.[0]?.responseAvgTime ?? 0 },
        { x: 2, y: stats?.successByTypeAndTime?.recognition?.[1]?.responseAvgTime ?? 0 },
        { x: 3, y: stats?.successByTypeAndTime?.recognition?.[2]?.responseAvgTime ?? 0 },
        { x: 4, y: stats?.successByTypeAndTime?.recognition?.[3]?.responseAvgTime ?? 0 },
        { x: 5, y: stats?.successByTypeAndTime?.recognition?.[4]?.responseAvgTime ?? 0 },
      ],
      "T.D. + Memoria": [
        { x: 1, y: stats?.successByTypeAndTime?.dmMemory?.[0]?.responseAvgTime ?? 0 },
        { x: 2, y: stats?.successByTypeAndTime?.dmMemory?.[1]?.responseAvgTime ?? 0 },
        { x: 3, y: stats?.successByTypeAndTime?.dmMemory?.[2]?.responseAvgTime ?? 0 },
        { x: 4, y: stats?.successByTypeAndTime?.dmMemory?.[3]?.responseAvgTime ?? 0 },
        { x: 5, y: stats?.successByTypeAndTime?.dmMemory?.[4]?.responseAvgTime ?? 0 },
      ],
      Random: [
        { x: 1, y: stats?.successByTypeAndTime?.random?.[0]?.responseAvgTime ?? 0 },
        { x: 2, y: stats?.successByTypeAndTime?.random?.[1]?.responseAvgTime ?? 0 },
        { x: 3, y: stats?.successByTypeAndTime?.random?.[2]?.responseAvgTime ?? 0 },
        { x: 4, y: stats?.successByTypeAndTime?.random?.[3]?.responseAvgTime ?? 0 },
        { x: 5, y: stats?.successByTypeAndTime?.random?.[4]?.responseAvgTime ?? 0 },
      ],
    };
    return { timeResponseData };
  }


  return (
    <ScrollView style={styles.container}>
      <ChartCard title="% de acierto por habilidad">
        <RadarChart labels={radarLabels} characterData={characterData} />
      </ChartCard>
      
      <ChartCard title="Respuestas / RPE">
        <BarChart data={barchartData} labels={barchartLabels} />
      </ChartCard>
      <ChartCard title="Evolución de actividades">
        <LineChart linesData={activitiesData2} />
      </ChartCard>
      <ChartCard title="Evolución de toma de decisión">
        <LineChart linesData={decisionData} />
      </ChartCard>
      <ChartCard title="Evolución de tiempo de respuesta">
        <LineChart
          linesData={timeResponseData}
          tickFormat={(v) => `${v} s`}
          yAxis={[0, 1, 2, 3, 4, 5, 6]}
          domain={{ y: [0, 6] }}
        />
      </ChartCard>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

/* Para Grafico de Evolucion de Actividades */



const decisionData = {
  Manos: generateFakePoints(),
  "Faltas tácticas": generateFakePoints(),
  Disputas: generateFakePoints(),
};



/* Para Grafico de % Acierto por Habilidad Cognitiva */


const pieData = [
  { x: "Velocidad", y: 35 },
  { x: "Resistencia", y: 40 },
  { x: "Agilidad y cambio de dirección", y: 55 },
];
/* Para Grafico Respuestas/RPE */
