import { PersonalWorkoutAbility } from "@/types/personalWorkouts";
import { View, Text, ScrollView } from "@gluestack-ui/themed";
import { useLocalSearchParams } from "expo-router";
const PERSONAL_WORKOUT = {
  id: 1,
  createdAt: "2024-06-21T21:40:50.745523-04:00",
  modifiedAt: "2024-06-21T21:40:50.745565-04:00",
  isActive: true,
  group: "20",
  level: "principiante",
  ability: "velocidad",
  name: "20--1",
  description:
    "Realiza un sprint de 20 metros a máxima velocidad, seguido de un cambio de dirección y un sprint de retorno de 20 metros.",
  material: ["20--1"],
  numberOfRepetitions: 6,
  numberOfDecisions: 6,
  excerciseDuration: 8,
  breakDuration: 30,
  series: 1,
  pauseBetweenSeries: 0,
  videoTutorial:
    "https://s3-neural.s3.amazonaws.com/refme/workouts/personal/tutorial/videos/34.mp4?AWSAccessKeyId=AKIA54EFFCNP56D5YBFD&Signature=DUs2OnkNQGfxlrm1ZPYWLCoHyGg%3D&Expires=1719248026",
  imgTutorial:
    "https://s3-neural.s3.amazonaws.com/refme/workouts/personal/tutorial/images/34.png?AWSAccessKeyId=AKIA54EFFCNP56D5YBFD&Signature=4R1gOcwwhEnABco%2B%2Fnkk39ZIU%2FY%3D&Expires=1719248026",
};
const Config = () => {
  const {
    ability = "agilidad",
    distance,
    name,
  } = useLocalSearchParams<{
    ability: PersonalWorkoutAbility;
    distance: string;
    name: string;
  }>();
  console.log("rest---", ability, distance, name);
  return (
    <ScrollView>
      <Text>Config</Text>
    </ScrollView>
  );
};

export default Config;
