import { StyleSheet } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { RadarChart } from "@/components/statistcs/RadarChart";
import { PieChart } from "@/components/statistcs/PieChart";
import { ScrollView } from "@gluestack-ui/themed";
import { BarChart } from "@/components/statistcs/BarChart";
import { LineChart } from "@/components/statistcs/LineChart";
import { generateFakePoints } from "@/utils";

export default function TabTwoScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>% de acierto por habilidad</Text>
      <PieChart />
      <Text style={styles.title}>Áreas entrenadas / entrenamiento total</Text>
      <RadarChart labels={radarLabels} characterData={characterData} />
      <Text style={styles.title}>Respuestas / RPE</Text>
      <BarChart />
      <Text style={styles.title}>Evolución de actividades</Text>
      <LineChart linesData={activitiesData} />
      <Text style={styles.title}>Evolución de toma de decisión</Text>
      <LineChart linesData={decisionData} />
      <Text style={styles.title}>Evolución de tiempo de respuesta</Text>
      <LineChart
        linesData={timeResponseData}
        tickFormat={(v) => `${v} s`}
        yAxis={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        domain={{ y: [0, 10] }}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
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

const activitiesData = {
  "Toma de decisión": generateFakePoints(),
  Memoria: generateFakePoints(),
  Reconocimiento: generateFakePoints(),
  "T.D. + Memoria": generateFakePoints(),
  Random: generateFakePoints(),
};

const decisionData = {
  Manos: generateFakePoints(),
  "Faltas tácticas": generateFakePoints(),
  Disputas: generateFakePoints(),
};

const timeResponseData = {
  "Toma de decisión": [
    { x: 1, y: 6 },
    { x: 2, y: 5 },
    { x: 3, y: 6 },
    { x: 4, y: 5 },
    { x: 5, y: 6 },
    { x: 6, y: 5 },
  ],
  Memoria: [
    { x: 1, y: 5 },
    { x: 2, y: 4 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 5 },
    { x: 6, y: 4 },
  ],
  Reconocimiento: [
    { x: 1, y: 4 },
    { x: 2, y: 3 },
    { x: 3, y: 4 },
    { x: 4, y: 3 },
    { x: 5, y: 4 },
    { x: 6, y: 3 },
  ],
  "T.D. + Memoria": [
    { x: 1, y: 3 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 2 },
    { x: 5, y: 3 },
    { x: 6, y: 2 },
  ],
  Random: [
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 3, y: 2 },
    { x: 4, y: 1 },
    { x: 5, y: 2 },
    { x: 6, y: 1 },
  ],
};

const radarLabels = [
  "2O reps. 80% / T 3,4s",
  "2O reps. 40% / T 3,4s",
  "18 reps. 60% / T 3,4s",
  "12 reps. 40% / T 3,4s",
  "2O reps. 90% / T 3,4s",
];

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
