import { PersonalWorkoutAbility } from "@/types/personalWorkouts";
import {
  Text,
  ScrollView,
  VStack,
  Button,
  ButtonText,
  Box,
} from "@gluestack-ui/themed";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { getImageFromName } from "@/utils/libs";
import CTextInput from "@/components/inputs/CTextInput";
import i18n from "@/languages/i18n";

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
  material: ["20--1", "20-4"],
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
    <ScrollView backgroundColor="white">
      <Image
        source={getImageFromName("distance")}
        style={{ height: 300, width: "100%" }}
      />
      <VStack px={"$3"} pt={"$2"} space="md">
        <Text color="#091233" fontWeight={"$bold"} fontSize={"$lg"}>
          Tutorial
        </Text>
        <Text color="#091233" fontWeight={400}>
          {PERSONAL_WORKOUT.description}
        </Text>
        <CTextInput
          value={1}
          placeholder={"Nivel de dificultad  "}
          options={["Principiante"]}
          onChangeText={() => console.log("ha")}
          error=""
          secureTextEntry={false}
          width="100%"
          required
        />
        <VStack flexDirection="row" space="sm" alignItems="center">
          <Box flex={1}>
            <CTextInput
              value={1}
              placeholder={"Habilidad cognitiva"}
              options={["Principiante"]}
              onChangeText={() => console.log("ha")}
              error=""
              secureTextEntry={false}
              width="100%"
              required
            />
          </Box>
          <Button variant="link">
            <ButtonText fontWeight="medium">
              {i18n.t("workout_flow.watch_tutorial_label")}
            </ButtonText>
          </Button>
        </VStack>
        <Text color="#091233" fontWeight={"$bold"} fontSize={"$lg"}>
          Características
        </Text>
        <Text color="#091233" fontWeight={400}>
          -
        </Text>
        <Text color="#091233" fontWeight={"$bold"} fontSize={"$lg"}>
          Materiales
        </Text>
        <VStack flexDirection="row" space="sm">
          {PERSONAL_WORKOUT.material.map((m) => (
            <Text color="#091233" fontWeight={400}>
              {m}
            </Text>
          ))}
        </VStack>
        <Button
          mt={"$6"}
          bg="$primary"
          rounded="$full"
          height={50}
          mb={20}
          disabled
        >
          <ButtonText color="black" fontWeight="medium">
            {"Preparar"}
          </ButtonText>
        </Button>
      </VStack>
    </ScrollView>
  );
};

export default Config;
