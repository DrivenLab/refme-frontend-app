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
      <RadarChart />
      <Text style={styles.title}>Respuestas / RPE</Text>
      <BarChart />
      <Text style={styles.title}>Evolución de actividades</Text>
      <LineChart linesData={activitiesData} />
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
